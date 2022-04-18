import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { OtherProvidersPage } from "./OtherProvidersPage";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { OtherProviderDetail } from "./otherProviders/other-provider-detail/OtherProviderDetail";

export default function OtherProvidersBasePage() {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                <ContentRoute
                    path="/providers-community/:id/detail"
                    component={OtherProviderDetail}
                />
                <ContentRoute path="/providers-community" component={OtherProvidersPage} />
            </Switch>
        </Suspense>
    );
}
