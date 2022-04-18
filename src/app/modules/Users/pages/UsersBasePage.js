import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { UsersPage } from "./UsersPage";
// import { UserEdit } from "./users-edit/UserEdit";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function UsersBasePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {/* <ContentRoute path="/users/new" component={UserEdit} />
        <ContentRoute
          path="/users/:id/edit"
          component={UserEdit}
        /> */}
        <ContentRoute path="/users" component={UsersPage} />
      </Switch>
    </Suspense>
  );
}
