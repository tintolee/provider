import { createSlice } from "@reduxjs/toolkit";

const initialSeekersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  seekerProfile: undefined,
  routeMap: undefined,
  routeMapPosts: undefined,
  posts: null,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const seekersSlice = createSlice({
  name: "seekers",
  initialState: initialSeekersState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getSeekerById
    seekerFetched: (state, action) => {
      state.actionsLoading = false;
      state.seekerProfile = action.payload.seekerProfile;
      state.error = null;
    },
    // getAllFollowers
    followersFetched: (state, action) => {
      const { items } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = items;
      state.totalCount = items.length;
    },
    // getRouteMapById
    routeMapFetched: (state, action) => {
      state.actionsLoading = false;
      state.routeMap = action.payload.routeMap;
      state.error = null;
    },
    // getRouteMapPostsById
    routeMapPostsFetched: (state, action) => {
      state.actionsLoading = false;
      state.routeMapPosts = action.payload.routeMapPosts;
      state.error = null;
    },
  },
});
