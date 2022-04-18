import React from "react";

export default function Helper({ toggleHelp, content }) {
  return (
    <div className="form-helper d-inline-block" onClick={toggleHelp}>
      {/* <div className="helper-content rounded">
        <div className="card card-custom rounded">
          <div className="card-body p-5 rounded">{content}</div>
        </div>
      </div> */}
      <span class="svg-icon svg-icon-primary svg-icon-1x cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xlink="http://www.w3.org/1999/xlink"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1"
        >
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <rect x="0" y="0" width="24" height="24" />
            <circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10" />
            <path
              d="M12,16 C12.5522847,16 13,16.4477153 13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 C11,16.4477153 11.4477153,16 12,16 Z M10.591,14.868 L10.591,13.209 L11.851,13.209 C13.447,13.209 14.602,11.991 14.602,10.395 C14.602,8.799 13.447,7.581 11.851,7.581 C10.234,7.581 9.121,8.799 9.121,10.395 L7.336,10.395 C7.336,7.875 9.31,5.922 11.851,5.922 C14.392,5.922 16.387,7.875 16.387,10.395 C16.387,12.915 14.392,14.868 11.851,14.868 L10.591,14.868 Z"
              fill="#000000"
            />
          </g>
        </svg>
      </span>
    </div>
  );
}