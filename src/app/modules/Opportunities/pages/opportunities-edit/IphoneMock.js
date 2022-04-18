import React, { useRef } from "react";

export default function IphoneMock(props) {

  return (
    <div className="--iphone-mock">
      <div
        className="iphone-wrapper"
        ref={props.wrapper}
        style={{ height: props.wrapper?.current?.offsetWidth * 2.1 }}
      >
        <div className={`iphone-${props.mockType}`}>{props.children}</div>
        {props.mockType === "opportunity" ? (
          <div className="opportunity-action d-flex btn-primary align-items-center justify-content-center py-3">
            <div className="opportunity-action-button d-flex btn-primary align-items-center justify-content-center rounded w-75">
              <h4 className="m-4 text-white">
                {props.applicationRequired === 'true' ? <b>Apply</b> : <b>RSVP</b>}
              </h4>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
