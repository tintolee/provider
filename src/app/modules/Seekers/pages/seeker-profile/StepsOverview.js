import React, { useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import * as actions from '../../_redux/seekers/seekersActions';
import { useSubheader } from '../../../../../_metronic/layout';
import { ProfileCard } from '../../components/ProfileCard';
import { RouteMapCard } from '../../components/RouteMapCard';
import { PostCard } from '../seeker-posts/PostCard';
import RouteMapList from './RouteMapList';

export function StepsOverview({
  history,
  match: {
    params: { id },
  },
}) {
  const suhbeader = useSubheader();

  const dispatch = useDispatch();
  const { actionsLoading, seekerProfile } = useSelector(
    (state) => ({
      actionsLoading: state.followers.actionsLoading,
      seekerProfile: state.followers.seekerProfile,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchFollower(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? '' : 'Follower';
    if (seekerProfile && id) {
      _title = `${seekerProfile.firstName} ${seekerProfile.lastName} - Route Maps`;
    }

    suhbeader.setTitle(_title);
  }, [seekerProfile, suhbeader, id]);

  if (actionsLoading) {
    return (
      <div className='d-flex align-items-center justify-content-center w-100'>
        <Spinner animation='border' variant='primary' />
      </div>
    );
  }

  console.log(seekerProfile);

  return (
    <>
      {seekerProfile && <ProfileCard seeker={seekerProfile} onTab='steps' />}
      {seekerProfile &&
        (seekerProfile.posts.items.length === 0 ? (
          <div
            className='alert alert-custom alert-light-primary fade show mb-5'
            role='alert'
          >
            <div className='alert-icon'>
              <i className='flaticon-information'></i>
            </div>
            <div className='alert-text'>No steps yet!</div>
          </div>
        ) : (
          <div className='row'>
            <div className='col-lg-8 col-xxl-8'>
              {seekerProfile &&
                seekerProfile.posts &&
                seekerProfile.posts.items.map((item, index) => (
                  <PostCard
                    key={`ki${index}`}
                    seeker={seekerProfile}
                    post={item}
                  />
                ))}
            </div>
            <div className='col-lg-4 col-xxl-4'>
              {seekerProfile && seekerProfile.routeMaps && (
                <RouteMapList seeker={seekerProfile} />
              )}
            </div>
          </div>
        ))}
    </>
  );
}
