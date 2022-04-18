import React from "react";
import {
    SpecialProjectStatusCssClasses,
    SpecialProjectStatusTitles,
} from "../../SpecialProjectsUIHelpers";

export function StatusColumnFormatter(cellContent, row) {
    const getLabelCssClasses = () => {
        return `label label-lg label-light-${SpecialProjectStatusCssClasses[row.status]
            } label-inline`;
    };
    return (
        <span className={getLabelCssClasses()}>
            {SpecialProjectStatusTitles[row.status]}
        </span>
    );
}