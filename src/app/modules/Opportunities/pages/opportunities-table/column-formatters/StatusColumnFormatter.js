import React from "react";
import {
  OpportunityStatusCssClasses,
  OpportunityStatusTitles,
} from "../../OpportunitiesUIHelpers";

export function StatusColumnFormatter(cellContent, row) {
  const getLabelCssClasses = () => {
    return `label label-lg label-light-${
      OpportunityStatusCssClasses[row.status]
    } label-inline`;
  };
  return (
    <span className={getLabelCssClasses()}>
      {OpportunityStatusTitles[row.status]}
    </span>
  );
}
