import * as requestFromServer from './opportunitiesCrud';
import { opportunitiesSlice, callTypes } from './opportunitiesSlice';

const { actions } = opportunitiesSlice;

export const fetchOpportunities = (queryParams, providerId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  if (!providerId) {
    return dispatch(
      actions.opportunitiesFetched({ totalCount: 0, entities: null })
    );
  }

  return requestFromServer
    .getAllOpportunities(queryParams, providerId)
    .then((response) => {
      const { items } = response.data.getOpportunityProvider.opportunities;
      dispatch(actions.opportunitiesFetched({ items }));
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find opportunities";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchOpportunity = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.opportunityFetched({ opportunityForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getOpportunityById(id)
    .then((response) => {
      console.log(response);

      const opportunity = response.data.getOpportunity;
      dispatch(actions.opportunityFetched({ opportunityForEdit: opportunity }));
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find opportunity";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createOpportunity = (opportunityForCreation) => (dispatch) => {

  delete opportunityForCreation?.url
console.log('location data')
  console.log(opportunityForCreation)

  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log('before sending')
  return requestFromServer
    .createOpportunity(opportunityForCreation)
    .then((response) => {
      const { opportunity } = response.data.createOpportunity;
      console.log(opportunity)

      // dispatch(actions.opportunityCreated({ opportunity }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't create opportunity";
      // dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateOpportunity = (opportunity) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateOpportunity(opportunity)
    .then(() => {
      dispatch(actions.opportunityUpdated({ opportunity }));
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't update opportunity";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

// export const updateOpportunityStatus = (id, status) => (dispatch) => {
//   dispatch(actions.startCall({ callType: callTypes.action }));
//   return requestFromServer
//     .updateStatusForOpportunity(id, status)
//     .then(() => {
//       dispatch(actions.opportunityStatusUpdated({ id, status }));
//     })
//     .catch((error) => {
//       error.clientMessage = "Can't update opportunity status";
//       dispatch(actions.catchError({ error, callType: callTypes.action }));
//     });
// };
