import React, { useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import * as actions from "../_redux/dashboardActions";
import { FollowersWidget } from "./tiles/FollowersWidget";
import { ContentsWidget } from "./tiles/ContentsWidget";
import { SpecialProjectWidget } from "./tiles/SpecialProjectWidget";
import { OpportunitiesWidget } from "./lists/OpportunitiesWidget";
import { Inbox } from "../../Messages/components/inbox";

export function Dashboard() {
  const { dashboard, user } = useSelector(
    (state) => ({
      actionsLoading: state.dashboard.actionsLoading,
      dashboard: state.dashboard.dashboard,
      user: state.auth.user,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchDashboard(user.providerId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user.providerId]);
  return (
    <>
      {dashboard && (
        <div className="row">
          <div className="col-xl-6 col-lg-6">
            <div className="row">
              <div className="col-xl-8 col-lg-6">
                {dashboard.followers && (
                  <FollowersWidget
                    className="gutter-b"
                    iconColor="success"
                    widgetHeight="150px"
                    followers={dashboard.followers}
                  />
                )}
              </div>
              <div className="col-xl-4 col-lg-6">
                {dashboard.contents && (
                  <ContentsWidget
                    className="gutter-b"
                    baseColor="secondary"
                    widgetHeight="150px"
                    contents={dashboard.contents}
                  />
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                {dashboard.opportunities && (
                  <OpportunitiesWidget
                    className="card card-custom gutter-b h-sm-600px"
                    opportunities={dashboard.opportunities}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="row">
              <div className="col-xl-12">
                <SpecialProjectWidget
                  className="gutter-b"
                  widgetHeight="150px"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <Inbox dashboard={true}/>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
