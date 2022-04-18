import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { ContentsPage } from "./ContentsPage";
import { ContentEdit } from "./content-edit/ContentEdit";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function ContentsBasePage() {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                <ContentRoute path="/contents/new" component={ContentEdit} />
                <ContentRoute
                    path="/contents/:id/edit"
                    component={ContentEdit}
                />
                <ContentRoute path="/contents" component={ContentsPage} />
            </Switch>
        </Suspense>
    );
}
