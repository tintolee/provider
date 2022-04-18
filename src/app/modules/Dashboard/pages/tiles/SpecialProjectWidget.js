/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";

export function SpecialProjectWidget({ className, widgetHeight = "175px" }) {
  return (
    <>
      <div
        className={`card card-custom ${className}`}
        style={{ height: widgetHeight }}
      >
        {/* begin::Body */}
        <div className="card-body d-flex align-items-center justify-content-between flex-wrap">
          <div className="mr-2">
            <h3 className="font-weight-bolder">Special Project Request</h3>
            <div className="text-dark-50 font-size-lg mt-2">
              Have a special project you want us to work on?
            </div>
          </div>
          <NavLink
            to="special-projects"
            className="btn btn-primary font-weight-bold py-3 px-6"
          >
            Contact Us
          </NavLink>
        </div>
        {/* end::Body */}
      </div>
    </>
  );
}
