import { createSlice } from "@reduxjs/toolkit";

const initialspecialProjectState = {
    listLoading: false,
    actionsLoading: false,
    totalCount: 0,
    entities: null,
    lastError: null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const specialProjectSlice = createSlice({
    name: "specialProjects",
    initialState: initialspecialProjectState,
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

        // find Special projects
        projectsFetched: (state, action) => {
            const { items } = action.payload;
            state.listLoading = false;
            state.error = null;
            state.entities = items != null ? items : null;
            state.totalCount = items != null ? items.length : 0;
        },

        // createproject
        projectCreated: (state, action) => {
            state.actionsLoading = false;
            state.error = null;
        },
    }
});