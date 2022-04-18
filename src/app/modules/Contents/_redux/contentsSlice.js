import { createSlice } from "@reduxjs/toolkit";

const initialContentsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  contentForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const contentsSlice = createSlice({
  name: "contents",
  initialState: initialContentsState,
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
    // getContentById
    contentFetched: (state, action) => {
      state.contentForEdit = action.payload.contentForEdit;
      state.error = null;
      state.actionsLoading = false;
    },
    // find contents
    contentsFetched: (state, action) => {
      const { items } = action.payload;
      state.entities = items != null ? items : null;
      state.totalCount = items != null ? items.length : 0;
      state.error = null;
      state.listLoading = false;
    },

    // createcontent
    contentCreated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
    },
    // updatecontent
    contentUpdated: (state, action) => {
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.content.id) {
          return action.payload.content;
        }
        return entity;
      });
      state.error = null;
      state.actionsLoading = false;
    },
    // contentUpdateState
    contentStatusUpdated: (state, action) => {
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
