import * as requestFromServer from "./usersCrud";
import { usersSlice, callTypes } from "./usersSlice";

const { actions } = usersSlice;

export const fetchUsers = (queryParams, providerId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  if (!providerId) {
    return dispatch(actions.usersFetched({ totalCount: 0, entities: null }));
  }

  return requestFromServer
    .getAllProviderUsers(providerId, queryParams)
    .then((response) => {
      console.log(response);

      const { items } = response.data.getOpportunityProvider.users;
      dispatch(actions.usersFetched({ items }));
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find users";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchUser = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.userFetched({ userForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getUserById(id)
    .then((response) => {
      console.log(response);

      const user = response.data.getOpportunityProviderUser;
      dispatch(actions.userFetched({ userForEdit: user }));
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createUser = (userForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createUser(userForCreation)
    .then((response) => {
      console.log(response);

      const { user } = response.data.createOpportunityProviderUser;
      dispatch(actions.userCreated({ user }));
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't create user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateUser = (user) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateUser(user)
    .then(() => {
      dispatch(actions.userUpdated({ user }));
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't update user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
