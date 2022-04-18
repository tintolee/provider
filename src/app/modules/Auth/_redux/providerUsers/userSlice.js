import { createSlice } from "@reduxjs/toolkit";

const initialProviderUsersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: [],
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const providerUsersSlice = createSlice({
  name: "providerUsers",
  initialState: initialProviderUsersState,
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
    providerUsersFetched: (state, action) => {
      const { items } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = items;
      state.totalCount = items.length;
    },
  },
});
