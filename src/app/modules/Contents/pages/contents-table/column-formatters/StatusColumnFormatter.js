import React from "react";
import {
    ContentStatusCssClasses,
    ContentStatusTitles,
} from "../../ContentsUIHelpers";

export function StatusColumnFormatter(cellContent, row) {
    const getLabelCssClasses = () => {
        return `label label-lg label-light-${ContentStatusCssClasses[row.status]
            } label-inline`;
    };
    return (
        <span className={getLabelCssClasses()}>
            {ContentStatusTitles[row.status]}
        </span>
    );
}