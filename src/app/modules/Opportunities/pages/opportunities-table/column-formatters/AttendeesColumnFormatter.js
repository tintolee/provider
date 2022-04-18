import React from "react";

export function AttendeesColumnFormatter(attendees) {
  return (
    <span className="align-items-center">
      <div className="font-weight-bolder text-primary mb-0">{attendees}</div>
    </span>
  );
}
