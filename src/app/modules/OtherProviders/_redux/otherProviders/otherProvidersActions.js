import * as requestFromServer from "./otherProvidersCrud";
import { OtherProvidersSlice, callTypes } from "./otherProvidersSlice";

const { actions } = OtherProvidersSlice;

export const fetchOpportunityProviders = (queryParams, providerId) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  if (!providerId) {
    return dispatch(
      actions.opportunityProvidersFetched({ totalCount: 0, entities: null })
    );
  }

  const filter = {
    ...queryParams,
    filter: {
      id: { ne: providerId },
      ...queryParams.filter,
    },
  };

  return requestFromServer
    .getAllOpportunityProviders(filter)
    .then((response) => {
      const { items } = response.data.listOpportunityProviders;
      var secondarySector = "";

      for (var i = 0; i < items.length; i++) {
        secondarySector = "";
        for (var y = 0; y < items[i].otherSectors.items.length; y++) {
          secondarySector += items[i].otherSectors.items[y].sector.name + ", ";
        }
        secondarySector = secondarySector.slice(0, -2);
        items[i] = { ...items[i], secondarySector: secondarySector };
      }

      dispatch(actions.opportunityProvidersFetched({ items }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find Opportunity Providers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchOpportunityProvider = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.opportunityProviderFetched({
        opportunityProvoderForDetail: undefined,
      })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  var opportunityProvider;
  return requestFromServer
    .getOpportunityProviderById(id)
    .then((response) => {
      var item = response.data.getOpportunityProvider;
      var secondarySector = "";
      var opportunityTypes = "";

      for (var x = 0; x < item.opportunityTypes.items.length; x++) {
        opportunityTypes +=
          item.opportunityTypes.items[x].opportunityType.name + ", ";
      }
      for (var y = 0; y < item.otherSectors.items.length; y++) {
        secondarySector += item.otherSectors.items[y].sector.name + ", ";
      }
      secondarySector = secondarySector.slice(0, -2);
      opportunityTypes = opportunityTypes.slice(0, -2);
      item = {
        ...item,
        secondarySector: secondarySector,
        opportunityTypes: opportunityTypes,
      };

      opportunityProvider = item;
    })
    .then(() => {
      requestFromServer
        .getFollowersByOpportunityProviderId(id)
        .then((response) => {
          var noOfWeeklyFollowers =
            response.data.listOpportunityProviderFollowers.items.length;
          opportunityProvider = {
            ...opportunityProvider,
            weeklyFollowers: noOfWeeklyFollowers,
          };
          dispatch(
            actions.opportunityProviderFetched({
              opportunityProvoderForDetail: opportunityProvider,
            })
          );
        })
        .catch((error) => {
          console.log(error);
          error.clientMessage =
            "Can't find followers for given Opportunity Provider";
          dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find given Opportunity Provider";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
