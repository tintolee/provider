import React, { useMemo } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { SpecialProjectsTable } from "./special-projects-table/SpecialProjectsTable";
import { useSpecialProjectsUIContext } from "./SpecialProjectsUIContext";

export function SpecialProjectsCard() {
    const specialProjectsUIContext = useSpecialProjectsUIContext();
    const specialProjectsUIProps = useMemo(() => {
        return {
            ids: specialProjectsUIContext.ids,
            queryParams: specialProjectsUIContext.queryParams,
            setQueryParams: specialProjectsUIContext.setQueryParams,
            newSpecialProjectButtonClick: specialProjectsUIContext.newSpecialProjectButtonClick
        };
    }, [specialProjectsUIContext]);

    return (
        <Card>
            <CardHeader title="Special Projects">
                <CardHeaderToolbar>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={specialProjectsUIProps.newSpecialProjectButtonClick}
                    >
                        New Special Project
            </button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <SpecialProjectsTable />
            </CardBody>
        </Card>
    );
}