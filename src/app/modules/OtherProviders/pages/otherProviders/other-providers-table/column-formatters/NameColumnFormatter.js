/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";

export const NameColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { openDetailOtherProviderPage }
) => (
  <>
    <a
      className="font-size-h6 text-dark-75 text-hover-primary font-weight-bolder"
      onClick={() => openDetailOtherProviderPage(row.id)}
    >
      <u>{row.name}</u>
    </a>
  </>
);
