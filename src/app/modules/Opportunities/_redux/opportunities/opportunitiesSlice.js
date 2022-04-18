import { createSlice } from "@reduxjs/toolkit";

const initialOpportunitiesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  opportunityForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const opportunitiesSlice = createSlice({
  name: "opportunities",
  initialState: initialOpportunitiesState,
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
    // getOpportunityById
    opportunityFetched: (state, action) => {
      state.opportunityForEdit = action.payload.opportunityForEdit;
      state.error = null;
      state.actionsLoading = false;
    },
    // findOpportunities
    opportunitiesFetched: (state, action) => {
      const { items } = action.payload;
      state.error = null;
      state.entities = items;
      state.totalCount = items.length;
      state.listLoading = false;
    },
    // createOpportunity
    opportunityCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
    },
    // updateOpportunity
    opportunityUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      // state.entities = state.entities.map((entity) => {
      //   if (entity.id === action.payload.opportunity.id) {
      //     return action.payload.opportunity;
      //   }
      //   return entity;
      // });
    },
    opportunityStatusUpdated: (state, action) => {
      const { id, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (entity.id === id) {
          entity.status = status;
        }
        return entity;
      });
      state.error = null;
      state.actionsLoading = false;
    },
  },
});
