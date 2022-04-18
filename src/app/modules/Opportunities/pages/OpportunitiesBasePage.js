import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { OpportunitiesPage } from "./OpportunitiesPage";
import { OpportunityEdit } from "./opportunities-edit/OpportunityEdit";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function OpportunitiesBasePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute path="/opportunities/new" component={OpportunityEdit} />
        <ContentRoute
          path="/opportunities/:id/edit"
          component={OpportunityEdit}
        />
        <ContentRoute path="/opportunities" component={OpportunitiesPage} />
      </Switch>
    </Suspense>
  );
}
