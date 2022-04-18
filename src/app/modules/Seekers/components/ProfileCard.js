/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import moment from "moment";
import { Storage } from "aws-amplify";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";

export function ProfileCard({ seeker, followingStarted, onTab }) {
  const [imageSource, setImageSource] = useState("");

  const getImage = async () => {
    try {
      const imageURL = await Storage.get(seeker.profilePic.key, {
        bucket: seeker.profilePic.bucket,
        region: seeker.profilePic.region,
      });
      setImageSource(imageURL);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (seeker && seeker.profilePic) {
      getImage();
    }
  }, []);
  return (
    <>
      {seeker && (
        <div className="card card-custom gutter-b">
          <div className="card-body jg-gbg">
            <div className="d-flex">
              {seeker.profilePic !== null ? (
                <div className="flex-shrink-0 mr-7">
                  <NavLink to={`/followers/${seeker.id}/profile`}>
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
                  </NavLink>
                </div>
              ) : (
                <div className="flex-shrink-0 mr-7">
                  <div className="symbol symbol-50 symbol-lg-120 symbol-light-success">
                    <span className="font-size-h3 symbol-label font-weight-boldest">
                      {seeker.firstName[0]} {seeker.lastName[0]}
                    </span>
                  </div>
                </div>
              )}
              <div className="flex-grow-1">
                <div className="d-flex align-items-center justify-content-between flex-wrap mt-2">
                  <div className="mr-3">
                    <NavLink
                      to={`/followers/${seeker.id}/profile`}
                      className="d-flex align-items-center text-dark text-hover-primary font-size-h5 font-weight-bold mr-3"
                    >
                      {seeker.firstName} {seeker.lastName}
                    </NavLink>

                    <div className="d-flex flex-wrap my-2">
                      <div className="text-muted text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2">
                        <span className="text-dark-75 font-weight-bolder">
                          Age:{" "}
                        </span>
                        {seeker.dateOfBirth &&
                          seeker.dateOfBirth.diff(moment(), "years")}
                      </div>
                      <div className="text-muted text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2">
                        <span className="text-dark-75 font-weight-bolder">
                          Postcode area:{" "}
                        </span>
                        {seeker.dateOfBirth && seeker.postcodeArea}
                      </div>
                      {followingStarted && (
                        <div className="text-muted text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2">
                          <span className="text-dark-75 font-weight-bolder">
                            Started following:{" "}
                          </span>
                          {moment(followingStarted).format("DD/MM/YYYY")}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="my-lg-0 my-1">
                    <NavLink
                      to={`/followers/${seeker.id}/profile`}
                      className="btn btn-sm btn-primary font-weight-bolder mr-2"
                    >
                      Route Maps
                    </NavLink>
                    <NavLink
                      to={`/followers/${seeker.id}/profile`}
                      className="btn btn-sm btn-secondary font-weight-bolder"
                    >
                      Message
                    </NavLink>
                  </div>
                </div>
                <div className="d-flex align-items-center flex-wrap justify-content-between">
                  <div className="flex-grow-1 font-weight-bold text-dark-50 py-2 py-lg-2 mr-5">
                    <span className="text-dark-75 font-weight-bolder">
                      Bio:
                    </span>{" "}
                    {seeker.biography}
                  </div>
                </div>
              </div>
            </div>
            <div className="separator separator-solid my-7"></div>
            <div className="d-flex align-items-center flex-wrap">
              <NavLink
                to={`/followers/${seeker.id}/profile`}
                className={`d-flex align-items-center mr-5 py-2 my-1 JG__profileCardHover-primary ${
                  onTab && onTab === "route maps" ? "is--active" : ""
                }`}
              >
                <span className="mr-4">
                  <span className={`svg-icon svg-icon-3x pl-5`}>
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Design/Bezier-curve.svg"
                      )}
                    />
                  </span>
                </span>
                <div className="d-flex flex-column text-dark-75">
                  <span className="font-weight-bolder font-size-sm">
                    Route maps
                  </span>
                  {seeker.routeMaps && (
                    <span className="font-weight-bolder font-size-h5">
                      {seeker.routeMaps.items.length}
                    </span>
                  )}
                </div>
              </NavLink>
              <NavLink
                to={`/followers/${seeker.id}/steps`}
                className={`d-flex align-items-center mr-5 py-2 my-1 JG__profileCardHover-tertiary ${
                  onTab && onTab === "steps" ? "is--active" : ""
                }`}
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
                  {seeker.posts && (
                    <span className="font-weight-bolder font-size-h5">
                      {seeker.posts.items.length}
                    </span>
                  )}
                </div>
              </NavLink>
              <div className="d-flex align-items-center mr-5 py-2 my-1 JG__profileCardHover-secondary">
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
      )}
    </>
  );
}
