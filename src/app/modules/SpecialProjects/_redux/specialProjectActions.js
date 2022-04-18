import * as requestFromServer from "./specialProjectCrud";
import { specialProjectSlice, callTypes } from "./specialProjectSlice";

const { actions } = specialProjectSlice;

export const createSpecialProject = (specialProjectForCreation) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createSpecialProject(specialProjectForCreation)
    .then((response) => {
      const { project } = response.data.createSpecialProject;
      dispatch(actions.projectCreated({ project }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create a special project";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const fetchSpecialProjects = (queryParams, providerId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  if (!providerId) {
    return dispatch(actions.projectsFetched({ totalCount: 0, entities: null }));
  }

  const filter = {
    ...queryParams,
    filter: {
      opportunityProviderId: { eq: providerId },
      ...queryParams.filter,
    },
  };

  return requestFromServer
    .getAllSpecialProjects(filter)
    .then((response) => {
      const { items } = response.data.listSpecialProjects;
      dispatch(actions.projectsFetched({ items }));
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find special projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
