/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";

export const TitleColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { openEditContentPage }
) => (
  <>
    <a
      className="font-size-h6 text-dark-75 text-hover-primary font-weight-bolder"
      onClick={() => openEditContentPage(row.id)}
    >
      {row.title}
    </a>
  </>
);
