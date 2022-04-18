import * as requestFromServer from "./providersCrud";
import { opportunityProvidersSlice, callTypes } from "./providersSlice";

const { actions } = opportunityProvidersSlice;

export const fetchProvider = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.opportunityProviderFetched({ providerForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getOpportunityProviderById(id)
    .then((response) => {
      // console.log(response);

      const provider = response.data.getOpportunityProvider;
      dispatch(
        actions.opportunityProviderFetched({ providerForEdit: provider })
      );
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find opportunity provider";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateProvider = (provider) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateOpportunityProvider(provider)
    .then(() => {
      dispatch(actions.opportunityProviderUpdated({ provider }));
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't update opportunity provider";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
