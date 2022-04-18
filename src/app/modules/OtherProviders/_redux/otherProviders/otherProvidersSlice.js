import { createSlice } from "@reduxjs/toolkit";

const initialOtherProvidersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  opportunityProvoderForDetail: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const OtherProvidersSlice = createSlice({
  name: "opportunityProviders",
  initialState: initialOtherProvidersState,
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
    // getOPById
    opportunityProviderFetched: (state, action) => {
      state.actionsLoading = false;
      state.opportunityProvoderForDetail = action.payload.opportunityProvoderForDetail;
      state.error = null;
    },

    // findOP
    opportunityProvidersFetched: (state, action) => {
      const { items } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = items;
      state.totalCount = items.length;
    },

    // updateOP
    opportunityproviderUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.project.id) {
          return action.payload.project;
        }
        return entity;
      });
    },
  }
});
