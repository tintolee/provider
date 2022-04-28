import { API, graphqlOperation } from "aws-amplify";
import { updateOpportunityAttendee as apiUpdateOpportunityAttendee } from "../../../../../graphql/mutations";

export function getAllOpportunityAttendees(opportunityId, queryParams) {
  const getOpportunityAttendees = /* GraphQL */ `
    query GetOpportunity(
      $id: ID!
      $filter: ModelOpportunityAttendeeFilterInput
    ) {
      getOpportunity(id: $id) {
        attendees(filter: $filter) {
          items {
            seeker {
              status
              id
              firstName
              lastName
              biography
              profilePic
              routeMaps {
                items {
                  id
                }
              }
            }
            seekerComment
            status
            id
          }
        }
      }
    }
  `;
  return API.graphql(
    graphqlOperation(getOpportunityAttendees, {
      id: opportunityId,
      filter: queryParams.filter,
    })
  );
}

export function updateOpportunityAttendee(opportunityAttendee) {
  return API.graphql(
    graphqlOperation(apiUpdateOpportunityAttendee, {
      input: opportunityAttendee,
    })
  );
}

export function updateOpportunityAttendeeStatus(ids, status) {
  return Promise.all(
    ids.map((id) =>
      API.graphql(
        graphqlOperation(
          `mutation UpdateOpportunityAttendeeStatus {
        updateOpportunityAttendee(input: {id: "${id}", status: ${status}}){id}
      }`
        )
      )
    )
  );
}
