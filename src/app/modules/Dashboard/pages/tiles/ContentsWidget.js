/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { NavLink } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";

export function ContentsWidget({
  className,
  baseColor = "primary",
  widgetHeight = "150px",
  contents,
}) {
  return (
    <>
      <div
        className={`card card-custom ${className}`}
        style={{ height: widgetHeight }}
      >
        <div className="card-body">
          <NavLink to="contents">
            <span className="svg-icon svg-icon-3x svg-icon-white ml-n2">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Layout/Layout-4-blocks.svg"
                )}
              />
            </span>
          </NavLink>

          <div className="mt-3">
            <NavLink
              to="contents"
              className="text-dark font-weight-bolder font-size-h2 text-hover-primary"
            >
              {contents && contents.items.length}
            </NavLink>
          </div>
          <NavLink
            to="contents"
            className="text-muted font-weight-bold font-size-lg mt-1 text-hover-primary"
          >
            Total Content
          </NavLink>
        </div>
      </div>
    </>
  );
}
