import * as requestFromServer from "./userCrud";
import { providerUsersSlice, callTypes } from "./userSlice";

const { actions } = providerUsersSlice;
export const fetchProviderUserByEmail = (email) => {
  if (!email) {
    return undefined;
  }
  return requestFromServer
    .getOpportunityProviderUserByEmail(email)
    .then((response) => {
      console.log(response);

      const user = response.data.listOpportunityProviderUsers;
      if (user.items) {
        return user.items[0];
      }
      return undefined;
    })
    .catch((error) => {
      console.log(error);
      return undefined;
    });
};

export const fetchProviderUsersByProvider = (providerId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllOpportunityProviderUsersByProvider(providerId)
    .then((response) => {
      const { items } = response.data.listOpportunityProviderUsers;
      dispatch(actions.providerUsersFetched({ items }));
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find Opportunity Provider Users";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
