import * as requestFromServer from "./dashboardCrud";
import { dashboardSlice, callTypes } from "./dashboardSlice";

const { actions } = dashboardSlice;

export const fetchDashboard = (providerId) => (dispatch) => {
  if (!providerId) {
    return dispatch(actions.dashboardFetched({ dashboard: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));

  //Fetch active route maps and posts
  const queryParams = {
    filterFollowers: { status: { eq: 1 } },
    filterContents: { status: { eq: 1 } },
    filterOpportunities: { status: { eq: 1 } },
  };

  return requestFromServer
    .getDashboardById(providerId, queryParams)
    .then((response) => {
      console.log(response);

      const dashboard = response.data.getOpportunityProvider;
      dispatch(actions.dashboardFetched({ dashboard: dashboard }));
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find provider for dashboard";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
