import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { RouteMapsOverview } from "./RouteMapsOverview";
import { RouteMapDetail } from "./RouteMapDetail";
import { RouteMapSteps } from "./RouteMapSteps";
import { StepsOverview } from "./StepsOverview";

export function SeekerProfile() {
  return (
    <>
      <Switch>
        <Redirect
          from="/followers/:id"
          exact={true}
          to="/followers/:id/profile"
        />
        <Route
          path="/followers/:id/route-map/:routemapId/steps"
          component={RouteMapSteps}
        />
        <Route
          path="/followers/:id/route-map/:routemapId"
          component={RouteMapDetail}
        />
        <Route path="/followers/:id/steps" component={StepsOverview} />
        <Route path="/followers/:id/profile" component={RouteMapsOverview} />
      </Switch>
    </>
  );
}
