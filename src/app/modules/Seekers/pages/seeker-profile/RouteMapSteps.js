import React, { useEffect, useState, useRef } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { useSubheader } from '../../../../../_metronic/layout';
import * as actions from '../../_redux/seekers/seekersActions';
import { ProfileCard } from '../../components/ProfileCard';
import { RouteMapCard } from '../../components/RouteMapCard';
import { PostCard } from '../seeker-posts/PostCard';

export function RouteMapSteps({
  history,
  match: {
    params: { routemapId },
  },
}) {
  const suhbeader = useSubheader();

  const dispatch = useDispatch();
  const { actionsLoading, routeMapPosts } = useSelector(
    (state) => ({
      actionsLoading: state.followers.actionsLoading,
      routeMapPosts: state.followers.routeMapPosts,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchRouteMapSteps(routemapId));
  }, [routemapId, dispatch]);

  const [sortedRouteMaps, setSortedRouteMaps] = useState(null);

  const hash = window.location.hash.slice(1);
  const scrollTo = useRef();

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function scrollToDiv() {
    await sleep(800);
    scrollTo.current.scrollIntoView();
  }

  useEffect(() => {
    let _title = routemapId ? '' : 'Follower';
    if (routeMapPosts && routemapId) {
      _title = `${routeMapPosts.owner.firstName} ${routeMapPosts.owner.lastName} - ${routeMapPosts.destination}`;
    }

    setSortedRouteMaps(
      routeMapPosts?.posts?.items?.slice()?.sort(function(a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    );

    suhbeader.setTitle(_title);

    if (scrollTo.current) {
      scrollToDiv();
    }
  }, [routeMapPosts, suhbeader, routemapId]);

  if (actionsLoading) {
    return (
      <div className='d-flex align-items-center justify-content-center w-100'>
        <Spinner animation='border' variant='primary' />
      </div>
    );
  }

  return (
    <>
      {routeMapPosts && routeMapPosts?.owner && (
        <ProfileCard seeker={routeMapPosts.owner} onTab='route maps' />
      )}
      <div className='row'>
        <div className='col-lg-8 col-xxl-8'>
          {sortedRouteMaps &&
            sortedRouteMaps.map((item, index) => (
              <PostCard
                scrollTo={item.id === hash ? scrollTo : null}
                key={`ki${index}`}
                seeker={routeMapPosts.owner}
                post={item}
              />
            ))}
        </div>
        <div className='col-lg-4 col-xxl-4'>
          {/* <MixedWidget6 className="gutter-b card-stretch" chartColor="danger" /> */}
          {routeMapPosts && routeMapPosts.owner && (
            <RouteMapCard
              routeMap={routeMapPosts}
              seekerId={routeMapPosts.owner.id}
            />
          )}
          {/* <RouteMapPath /> */}
        </div>
      </div>
    </>
  );
}
