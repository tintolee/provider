import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import moment from "moment";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import ImageS3 from "../../../../components/Images/S3Image";

export default function RouteMapList({ seeker }) {
  const [sortedRouteMaps, setsortedRouteMaps] = useState(null);

  useEffect(() => {
    setsortedRouteMaps(
      seeker?.routeMaps?.items?.slice()?.sort(function(a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      })
    );
  }, []);

  return (
    <>
      {sortedRouteMaps && (
        <div className="card card-custom">
          <div className="card-body d-flex align-items-center">
            <NavLink
              className="text-dark font-weight-bolder font-size-h2 mt-3"
              to={`${seeker.id}/routemaps`}
            >
              <span className="svg-icon svg-icon-3x svg-icon-white ml-n2">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Design/Bezier-curve.svg"
                  )}
                />
              </span>
            </NavLink>
            <div className="ml-3">
              <div className="text-dark font-weight-bolder font-size-h2 mt-3">
                <NavLink
                  className="text-dark font-weight-bolder font-size-h2 mt-3"
                  to={`${seeker.id}/routemaps`}
                >
                  {sortedRouteMaps?.length}
                </NavLink>
              </div>
              <NavLink
                to={`${seeker.id}/routemaps`}
                className={`text-muted font-weight-bold font-size-lg mt-1`}
              >
                Route Maps
              </NavLink>
            </div>
          </div>
          <div className="card-body flex-column">
            {sortedRouteMaps?.map((post) => {
  
              return (
                <div className="d-flex px-1 py-3">
                  <NavLink className="square-post-img-wrapper" to={`steps`}>
                      <ImageS3
                        className="card-img-top"
                        alt=" "
                        photo={post.coverPhoto}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = toAbsoluteUrl(
                            "/media/routemap-media/false-post.jpg"
                          );
                        }}
                      />
                  </NavLink>
                  <div className="ml-3 d-flex flex-column  justify-content-center">
                    <NavLink className="font-size-h5 font-weight-bold text-dark text-hover-primary" to={`route-map/${post.id}`}>
                      {post.destination ? post.destination : "Unititled"}
                    </NavLink>
                    <span className="text-muted">
                      {post.createdAt &&
                        moment(post.createdAt).format("DD MMM")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
