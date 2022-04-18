import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { SeekersPage } from "./SeekersPage";
import { SeekerProfile } from "./seeker-profile/SeekerProfile";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function SeekersBasePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute
          path="/followers/:id"
          component={SeekerProfile}
        />
        <ContentRoute path="/followers" component={SeekersPage} />
      </Switch>
    </Suspense>
  );
}
