import * as requestFromServer from "./opportunityAttendeesCrud";
import {
  opportunityAttendeesSlice,
  callTypes,
} from "./opportunityAttendeesSlice";

const { actions } = opportunityAttendeesSlice;

export const fetchAttendees = (queryParams, opportunityId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  // const filter = {
  //   ...queryParams,
  //   filter: {
  //     opportunityAttendeeOpportunityId: { eq: opportunityId },
  //     ...queryParams.filter,
  //   },
  // };
  return requestFromServer
    .getAllOpportunityAttendees(opportunityId, queryParams)
    .then((response) => {
      console.log(response);

      const { items } = response.data.getOpportunity.attendees;
      dispatch(actions.opportunityAttendeesFetched({ items }));
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find Opportunity Attendees";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const updateAttendee = (opportunityAttendee) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateOpportunityAttendee(opportunityAttendee)
    .then(() => {
      dispatch(
        actions.opportunityAttendeesStatusUpdated({ opportunityAttendee })
      );
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't update opportunityAttendee";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateAttendeeStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateOpportunityAttendeeStatus(ids, status)
    .then(() => {
      dispatch(actions.opportunityAttendeesStatusUpdated());
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't update opportunityAttendee status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
