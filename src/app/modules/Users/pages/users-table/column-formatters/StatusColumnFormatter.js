import React from "react";
import { UserStatusCssClasses, UserStatusTitles } from "../../UsersUIHelper";

export function StatusColumnFormatter(cellContent, row) {
  const getLabelCssClasses = () => {
    return `label label-lg label-light-${
      UserStatusCssClasses[row.status]
    } label-inline`;
  };
  return (
    <span className={getLabelCssClasses()}>{UserStatusTitles[row.status]}</span>
  );
}
