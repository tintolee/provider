import React from "react";
import moment from "moment";

export function DateColumnFormatter(date) {
  return (
    <span className={`font-bold font`}>
      {date && moment(date).format("DD/MM/YYYY hh:mm")}
    </span>
  );
}
