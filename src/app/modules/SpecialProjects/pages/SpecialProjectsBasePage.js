import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { SpecialProjectsPage } from "./SpecialProjectsPage";
import { SpecialProjectEdit } from "./special-project-edit/SpecialProjectEdit";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function SpecialProjectsBasePage() {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                <ContentRoute path="/special-projects/new" component={SpecialProjectEdit} />
                <ContentRoute path="/special-projects" component={SpecialProjectsPage} />
            </Switch>
        </Suspense>
    );
}
