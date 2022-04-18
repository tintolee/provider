import { createSlice } from "@reduxjs/toolkit";

const initialProvidersState = {
    listLoading: false,
    actionsLoading: false,
    providerForEdit: undefined,
    lastError: null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const opportunityProvidersSlice = createSlice({
    name: "opportunityProviders",
    initialState: initialProvidersState,
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
        // getOpportunityProviderById
        opportunityProviderFetched: (state, action) => {
            state.actionsLoading = false;
            state.providerForEdit = action.payload.providerForEdit;
            state.error = null;
        },
        // updateopportunityProvider
        opportunityProviderUpdated: (state, action) => {
            state.error = null;
            state.actionsLoading = false;
        },
    }
});