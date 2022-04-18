import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
import { DashboardPage } from "./pages/DashboardPage";

const GoogleMaterialPage = lazy(() =>
  import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);
const CompanyProfilepage = lazy(() =>
  import("./modules/CompanyProfile/CompanyProfilePage")
);
const OpportunitiesBasePage = lazy(() =>
  import("./modules/Opportunities/pages/OpportunitiesBasePage")
);
const OtherProvidersBasePage = lazy(() =>
  import("./modules/OtherProviders/pages/OtherProvidersBasePage")
);
const ContentsBasePage = lazy(() =>
  import("./modules/Contents/pages/ContentsBasePage")
);
const SeekersBasePage = lazy(() =>
  import("./modules/Seekers/pages/SeekersBasePage")
);
const SpecialProjectsBasePage = lazy(() =>
  import("./modules/SpecialProjects/pages/SpecialProjectsBasePage")
);
const UsersBasePage = lazy(() =>
  import("./modules/Users/pages/UsersBasePage")
);
const MessagesBasePage = lazy(() =>
  import("./modules/Messages/pages/MessagesBasePage")
);

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <ContentRoute path="/builder" component={BuilderPage} />
        <ContentRoute path="/my-page" component={MyPage} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/e-commerce" component={ECommercePage} />
        <Route path="/company-profile" component={CompanyProfilepage} />
        <Route path="/opportunities" component={OpportunitiesBasePage} />
        <Route path="/providers-community" component={OtherProvidersBasePage} />
        <Route path="/contents" component={ContentsBasePage} />
        <Route path="/followers" component={SeekersBasePage} />
        <Route path="/special-projects" component={SpecialProjectsBasePage} />
        <Route path="/users" component={UsersBasePage} />
        <Route path="/messages" component={MessagesBasePage} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
