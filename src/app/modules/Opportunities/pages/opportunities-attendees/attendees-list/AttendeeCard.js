import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Storage } from "aws-amplify";
import { toAbsoluteUrl } from "../../../../../../_metronic/_helpers";
import SVG from "react-inlinesvg";
import {
  AttendeeStatusCssClasses,
  AttendeeStatusTitles,
} from "../AttendeesUIHelper";
export function AttendeeCard({
  opportunityAttendee,
  ids,
  setIds,
  entities,
  index,
}) {
  const [imageSource, setImageSource] = useState("");

  const getImage = async () => {
    try {
      const imageURL = await Storage.get(
        opportunityAttendee.seeker.profilePic.key,
        {
          bucket: opportunityAttendee.seeker.profilePic.bucket,
          region: opportunityAttendee.seeker.profilePic.region,
        }
      );
      setImageSource(imageURL);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (opportunityAttendee.seeker && opportunityAttendee.seeker.profilePic) {
      getImage();
    }
  }, []);

  if (!opportunityAttendee) return null;
  const SeekerFriend = () => {
    return (
      <div
        className="symbol symbol-30 symbol-circle"
        data-toggle="tooltip"
        title="Teresa Fox"
      >
        <span className="symbol-label font-weight-bold">A B</span>
      </div>
    );
  };

  const SelectionCheckbox = ({ isSelected, onChange }) => {
    return (
      <>
        <input type="checkbox" style={{ display: "none" }} />
        <label className="checkbox checkbox-single">
          <input type="checkbox" checked={isSelected} onChange={onChange} />
          <span />
        </label>
      </>
    );
  };

  const groupingItemOnSelect = (selection) => {
    const { ids, setIds, customerId } = selection;
    if (ids.some((id) => id === customerId)) {
      setIds(ids.filter((id) => id !== customerId));
    } else {
      const newIds = [...ids];
      newIds.push(customerId);
      setIds(newIds);
    }
  };

  const SelectionRenderer = () => {
    const isSelected = ids.some((el) => el === entities[index].id);
    const props = {
      ids: ids,
      setIds: setIds,
      customerId: entities[index].id,
    };
    return (
      <SelectionCheckbox
        isSelected={isSelected}
        onChange={() => groupingItemOnSelect(props)}
      />
    );
  };

  const StatusField = ({ status }) => {
    const getLabelCssClasses = () => {
      return `label label-lg label-${AttendeeStatusCssClasses[status]} label-inline font-weight-bold`;
    };
    return (
      <span className={getLabelCssClasses()}>
        {AttendeeStatusTitles[status]}
      </span>
    );
  };

  return (
    <div className="card card-custom gutter-b">
      <div className="card-body">
        <div className="d-flex">
          <div className="flex-shrink-0 mr-1">
            <SelectionRenderer />
          </div>
          {opportunityAttendee.seeker.profilePic !== null ? (
            <div className="flex-shrink-0 mr-6">
              <div className="symbol symbol-50 symbol-lg-120">
                <img
                  alt="Pic"
                  src={imageSource}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = toAbsoluteUrl(
                      "/media/routemap-media/false-post.jpg"
                    );
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex-shrink-0 mr-7">
              <div className="symbol symbol-50 symbol-lg-120 symbol-light-success">
                <span className="font-size-h3 symbol-label font-weight-boldest">
                  {opportunityAttendee.seeker.firstName[0]}{" "}
                  {opportunityAttendee.seeker.lastName[0]}
                </span>
              </div>
            </div>
          )}
          <div className="flex-grow-1">
            <div className="d-flex align-items-center justify-content-between flex-wrap mt-2">
              <div className="mr-3">
                <NavLink
                  to={`/followers/${opportunityAttendee.seeker.id}/profile`}
                  className="d-flex align-items-center text-dark text-hover-primary font-size-h5 font-weight-bold mr-3"
                >
                  {opportunityAttendee.seeker.firstName}{" "}
                  {opportunityAttendee.seeker.lastName}
                </NavLink>
                <div className="d-flex flex-wrap my-2">
                  <div className="text-muted text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2">
                    <StatusField status={opportunityAttendee.status} />
                  </div>
                  <div className="text-muted text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2">
                    <span className="text-dark-75 font-weight-bolder">
                      Age:{" "}
                    </span>
                  </div>
                </div>
              </div>
              <div className="my-lg-0 my-1">
                <NavLink
                  to={`/followers/${opportunityAttendee.seeker.id}/profile`}
                  className="btn btn-sm btn-secondary font-weight-bolder mr-2"
                >
                  Route Maps
                </NavLink>
                <NavLink
                  to="/user-profile/personal-information"
                  className="btn btn-sm btn-warning font-weight-bolder"
                >
                  Message
                </NavLink>
              </div>
            </div>
            <div className="d-flex align-items-center flex-wrap justify-content-between">
              <div className="flex-grow-1 font-weight-bold text-dark-50 py-2 py-lg-2 mr-5">
                <span className="text-dark-75 font-weight-bolder">Bio:</span>{" "}
                {opportunityAttendee.seeker.biography}
                <br />
                <span className="text-dark-75 font-weight-bolder">
                  Pick me because:
                </span>{" "}
                {opportunityAttendee.seekerComment}
              </div>
            </div>
          </div>
        </div>
        <div className="separator separator-solid my-7"></div>
        <div className="d-flex align-items-center flex-wrap">
          <NavLink
            to={`/followers/${opportunityAttendee.seeker.id}/profile`}
            className="d-flex align-items-center flex-lg-fill mr-5 py-2 my-1 JG__profileCardHover-primary"
          >
            <span className="mr-4">
              <span className={`svg-icon svg-icon-3x pl-5`}>
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Design/Bezier-curve.svg"
                  )}
                  // src={toAbsoluteUrl("/media/svg/icons/Communication/Flag.svg")}
                />
              </span>
            </span>
            <div className="d-flex flex-column text-dark-75">
              <span className="font-weight-bolder font-size-sm">
                Route maps
              </span>
              {opportunityAttendee.seeker.routeMaps && (
                <span className="font-weight-bolder font-size-h5">
                  {opportunityAttendee.seeker.routeMaps.items.length}
                </span>
              )}
            </div>
          </NavLink>
          {/* <NavLink
            to={`/followers/${opportunityAttendee.seeker.id}/profile`}
            className="d-flex align-items-center flex-lg-fill mr-5 py-2 my-1 JG__profileCardHover-tertiary"
          >
            <span className="mr-4">
              <span className={`svg-icon svg-icon-3x pl-5`}>
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Layout/Layout-4-blocks.svg"
                  )}
                />
              </span>
            </span>
            <div className="d-flex flex-column text-dark-75">
              <span className="font-weight-bolder font-size-sm">Steps</span>
              {opportunityAttendee.seeker.posts && (
                <span className="font-weight-bolder font-size-h5">
                  {opportunityAttendee.seeker.posts.items.length}
                </span>
              )}
            </div>
          </NavLink> */}
          <div className="d-flex align-items-center flex-lg-fill mr-5 py-2 my-1 JG__profileCardHover-secondary">
            <span className="mr-4">
              <span className={`svg-icon svg-icon-3x pl-5`}>
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Communication/Group.svg"
                  )}
                />
              </span>
            </span>
            <div className="d-flex flex-column text-dark-75">
              <span className="font-weight-bolder font-size-sm">
                Connections
              </span>
              <span className="font-weight-bolder font-size-h5">4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
