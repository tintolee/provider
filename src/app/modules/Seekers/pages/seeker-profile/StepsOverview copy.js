import React, { useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import * as actions from "../../_redux/seekers/seekersActions";
import { useSubheader } from "../../../../../_metronic/layout";
import { ProfileCard } from "../../components/ProfileCard";
import { RouteMapCard } from "../../components/RouteMapCard";
import { PostCard } from "../seeker-posts/PostCard";

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
    let _title = id ? "" : "Follower";
    if (seekerProfile && id) {
      _title = `${seekerProfile.firstName} ${seekerProfile.lastName} - Route Maps`;
    }

    suhbeader.setTitle(_title);
  }, [seekerProfile, suhbeader, id]);

  if (actionsLoading) {
    return <Spinner animation="border" variant="primary" />;
  }

  console.log(seekerProfile)

  return (
    <>
      <ProfileCard seeker={seekerProfile} onTab='steps'/>
      
      {seekerProfile &&
        (seekerProfile.posts.items.length === 0 ? (
          <div
            className="alert alert-custom alert-light-primary fade show mb-5"
            role="alert"
          >
            <div className="alert-icon">
              <i className="flaticon-information"></i>
            </div>
            <div className="alert-text">No steps yet!</div>
          </div>
        ) : (
          <div className="row">
            {seekerProfile.posts.items.map((item, index) => (
              <div key={`ki${index}`} className="col-xl-4 col-lg-4">
                <PostCard seeker={seekerProfile} post={item}/>
              </div>
            ))}
          </div>
        ))}
    </>
  );
}