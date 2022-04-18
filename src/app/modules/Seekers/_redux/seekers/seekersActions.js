import * as requestFromServer from "./seekersCrud";
import { seekersSlice, callTypes } from "./seekersSlice";

const { actions } = seekersSlice;

export const fetchFollowers = (queryParams, providerId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  if (!providerId) {
    return dispatch(
      actions.followersFetched({ totalCount: 0, entities: null })
    );
  }

  // const filter = {
  //   ...queryParams,
  //   filter: {
  //     opportunityOpportunityProviderId: { eq: providerId },
  //     ...queryParams.filter,
  //   },
  // };

  //Fetch active route maps and posts
  const queryParams = {
    filterFollower: { status: { eq: 1 } },
    filterRouteMap: { status: { eq: 1 } },
    filterPost: { status: { eq: 1 } },
  };

  return requestFromServer
    .getAllProviderFollowers(providerId, queryParams)
    .then((response) => {
      const { items } = response.data.getOpportunityProvider.followers;
      dispatch(actions.followersFetched({ items }));
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find followers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchFollower = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.seekerFetched({ seekerProfile: undefined }));
  }

  //Fetch active route maps and posts
  const queryParams = {
    filterRouteMap: { status: { eq: 1 } },
    filterPost: { status: { eq: 1 } },
  };

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getSeekerById(id, queryParams)
    .then((response) => {
      const seeker = response.data.getSeeker;
      dispatch(actions.seekerFetched({ seekerProfile: seeker }));
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find seeker 2";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const fetchRouteMap = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.routeMapFetched({ routeMap: undefined }));
  }

  //Fetch active route maps and posts
  const queryParams = {
    filterRouteMap: { status: { eq: 1 } },
    filterPost: { status: { eq: 1 } },
  };

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getRouteMapById(id, queryParams)
    .then((response) => {
      const routeMap = response.data.getRouteMap;
      dispatch(actions.routeMapFetched({ routeMap: routeMap }));
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find Route Map";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const fetchRouteMapSteps = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.routeMapPostsFetched({ routeMapPosts: undefined }));
  }
  //Fetch active route maps and posts
  const queryParams = {
    filterRouteMap: { status: { eq: 1 } },
    filterPost: { status: { eq: 1 } },
  };

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getRouteMapPostsById(id, queryParams)
    .then((response) => {
      const routeMap = response.data.getRouteMap;
      dispatch(actions.routeMapPostsFetched({ routeMapPosts: routeMap }));
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find Route Map";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
