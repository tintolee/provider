import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { MessagesPage } from "./MessagesPage";
// import { UserEdit } from "./users-edit/UserEdit";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function MessagesBasePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {/* <ContentRoute path="/users/new" component={UserEdit} />
        <ContentRoute
          path="/users/:id/edit"
          component={UserEdit}
        /> */}
        <ContentRoute path="/:selectedChatID" component={MessagesPage} />
      </Switch>
    </Suspense>
  );
}
