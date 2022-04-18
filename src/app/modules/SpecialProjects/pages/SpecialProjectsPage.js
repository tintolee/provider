import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { SpecialProjectsLoadingDialog } from "./special-projects-loading-dialog/SpecialProjectsLoadingDialog";
import { SpecialProjectsCard } from "./SpecialProjectsCard";
import { SpecialProjectsUIProvider } from "./SpecialProjectsUIContext";

export function SpecialProjectsPage({ history }) {
    const user = useSelector((state) => state.auth.user, shallowEqual);

    const specialProjectsUIEvents = {
        newSpecialProjectButtonClick: () => {
            history.push("/special-projects/new");
        }
    };

    return (
        <SpecialProjectsUIProvider specialProjectsUIEvents={specialProjectsUIEvents} currentProviderId={user.providerId}>
            <SpecialProjectsLoadingDialog />
            <SpecialProjectsCard />
        </SpecialProjectsUIProvider>
    );
}
