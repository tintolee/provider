import React, { useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { useSubheader } from '../../../../../_metronic/layout';
import * as actions from '../../_redux/seekers/seekersActions';
import { ProfileCard } from '../../components/ProfileCard';
import { PostsList } from '../seeker-posts/PostsList';
import RouteMapJack from './RouteMapJack';
import { RouteMapCard } from '../../components/RouteMapCard';

export function RouteMapDetail({
  history,
  match: {
    params: { routemapId },
  },
}) {
  const suhbeader = useSubheader();

  const dispatch = useDispatch();
  const { actionsLoading, routeMap } = useSelector(
    (state) => ({
      actionsLoading: state.followers.actionsLoading,
      routeMap: state.followers.routeMap,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchRouteMap(routemapId));
  }, [routemapId, dispatch]);

  useEffect(() => {
    let _title = routemapId ? '' : 'Follower';
    if (routeMap && routemapId) {
      _title = `${routeMap.owner.firstName} ${routeMap.owner.lastName} - ${routeMap.destination}`;
    }

    suhbeader.setTitle(_title);
  }, [routeMap, suhbeader, routemapId]);

  if (actionsLoading) {
    return (
      <div className='d-flex align-items-center justify-content-center w-100'>
        <Spinner animation='border' variant='primary' />
      </div>
    );
  }

  return (
    <>
      {routeMap && routeMap.owner && (
        <ProfileCard seeker={routeMap.owner} onTab='route maps' />
      )}
      <div className='row'>
        <div className='col-lg-8'>
          <div className='card card-custom gutter-b overflow-y-scroll'>
            <div className='card-body jg-gbg'>
              <RouteMapJack routeMap={routeMap} />
            </div>
          </div>
          {/* <PostsList routeMap={routeMap} /> */}
        </div>
        <div className='col-lg-4'>
          <RouteMapCard routeMap={routeMap} seekerId={routeMap?.owner.id} />
          <PostsList routeMap={routeMap} />
        </div>
        <div className='col-lg-4 col-xxl-4'></div>
      </div>
    </>
  );
}
