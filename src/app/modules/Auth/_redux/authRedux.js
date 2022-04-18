import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { currentAuthenticatedUser, logout } from "./awsAuth";
import * as userActions from "../_redux/providerUsers/userActions";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  SetUser: "[Set User] Action",
};

const initialAuthState = {
  user: undefined,
  authToken: undefined,
};

export const reducer = persistReducer(
  { storage, key: "v713-demo1-auth", whitelist: ["user", "authToken"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken } = action.payload;

        return { authToken, user: undefined };
      }

      case actionTypes.Register: {
        const { authToken } = action.payload;

        return { authToken, user: undefined };
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        return { ...state, user };
      }

      case actionTypes.SetUser: {
        const { user } = action.payload;
        return { ...state, user };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: (authToken) => ({ type: actionTypes.Login, payload: { authToken } }),
  register: (authToken) => ({
    type: actionTypes.Register,
    payload: { authToken },
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: (user) => ({
    type: actionTypes.UserRequested,
    payload: { user },
  }),
  fulfillUser: (user) => ({ type: actionTypes.UserLoaded, payload: { user } }),
  setUser: (user) => ({ type: actionTypes.SetUser, payload: { user } }),
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    const { username, attributes } = yield currentAuthenticatedUser();
    // console.log(username);
    // console.log(attributes);

    const providerUser = yield userActions.fetchProviderUserByEmail(
      attributes.email
    );
    //TODO: store user detail on DB.
    const user = {
      username: username,
      userId: providerUser.id ? providerUser.id:"",
      firstname: providerUser.firstName ? providerUser.firstName : "",
      lastname: providerUser.lastName ? providerUser.lastName : "",
      fullname: providerUser.firstName ? providerUser.firstName : "",
      providerId: providerUser.opportunityProvider ? providerUser.opportunityProvider.id : "",
      provider: providerUser.opportunityProvider? providerUser.opportunityProvider: "",
      providerName: providerUser.opportunityProvider ? providerUser.opportunityProvider.name: "",
      email: attributes.email,
    };
    yield put(actions.fulfillUser(user));
  });

  yield takeLatest(actionTypes.Logout, function* logoutSaga() {
    yield logout();
  });
}
