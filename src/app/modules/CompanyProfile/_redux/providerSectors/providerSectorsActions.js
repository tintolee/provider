import * as requestFromServer from "./providerSectorsCrud";
import {
  opportunityProviderSectorsSlice,
  callTypes,
} from "./providerSectorsSlice";

const { actions } = opportunityProviderSectorsSlice;

export const fetchOpportunityProviderSectors = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllOpportunityProviderSectors(queryParams)
    .then((response) => {
      const { items } = response.data.listOpportunityProviderSectors;
      dispatch(actions.opportunityProviderSectorsFetched({ items }));
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find Opportunity Provider Sectors";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
