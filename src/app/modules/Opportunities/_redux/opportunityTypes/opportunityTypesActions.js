import * as requestFromServer from "./opportunityTypesCrud";
import {
    opportunityTypesSlice,
  callTypes,
} from "./opportunityTypesSlice";

const { actions } = opportunityTypesSlice;

export const fetchOpportunityTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllOpportunityTypes(queryParams)
    .then((response) => {
      const { items } = response.data.listOpportunityTypes;
      dispatch(actions.opportunityTypesFetched({ items }));
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find Opportunity Types";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
