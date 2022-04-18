/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import ImageS3 from "../../../../components/Images/S3Image";

export function OpportunitiesWidget({ className, opportunities }) {
  console.log(opportunities.items);
  return (
    <>
      <div className={className}>
        <div className="card-body mh-100">
          <div className="d-flex">
            <div className="d-flex flex-column w-100">
              <NavLink to="/opportunities">
                <h3 className="card-title font-weight-bolder text-dark text-hover-primary">
                  Latest Opportunities
                </h3>
              </NavLink>

              <div className="mt-1 overflow-auto h-sm-475px">
                {opportunities.items.map((item, index) => (
                  <div
                    key={`ki${index}`}
                    className="d-flex align-items-center mb-10"
                  >
                    <NavLink to={`/opportunities/${item.id}/edit`}>
                      <div className="symbol symbol-80 symbol-2by3 flex-shrink-0 mr-4">
                        <ImageS3
                          className="card-img-top"
                          alt=" "
                          photo={item.cover}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = toAbsoluteUrl(
                              "/media/routemap-media/false-post.jpg"
                            );
                          }}
                        />
                      </div>
                    </NavLink>
                    <div className="d-flex flex-column flex-grow-1 my-lg-0 my-2 mr-2">
                      <NavLink
                        to={`/opportunities/${item.id}/edit`}
                        className="text-dark-75 font-weight-bold text-hover-primary font-size-lg mb-1"
                      >
                        {item.title}
                      </NavLink>
                      <span className="text-muted font-weight-bold">
                        {item.opportunityType.name}
                      </span>
                    </div>
                    <div className="d-flex align-items-center mt-lg-0 mt-3">
                      {/* <div className="mr-6">
                  <span className="text-dark-75 font-weight-bolder">4.2</span>
                </div> */}
                      <NavLink
                        to={`/opportunities/${item.id}/edit`}
                        className="btn btn-icon btn-light btn-hover-primary btn-sm"
                      >
                        <span className="svg-icon svg-icon-success">
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/icons/Navigation/Right-2.svg"
                            )}
                          ></SVG>
                        </span>
                      </NavLink>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
