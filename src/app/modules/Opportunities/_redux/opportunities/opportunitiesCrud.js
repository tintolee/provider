import { API, graphqlOperation } from "aws-amplify";
import {
  updateOpportunity as apiUpdateOpportunity,
  createOpportunity as apiCreateOpportunity,
} from "../../../../../graphql/mutations";
import { getOpportunity } from "../../../../../graphql/queries";

export function getAllOpportunities(queryParams, providerId) {
  const getProviderOpportunities = /* GraphQL */ `
    query GetOpportunityProvider(
      $id: ID!
      $filter: ModelOpportunityFilterInput
      $limit: Int
      $nextToken: String
    ) {
      getOpportunityProvider(id: $id) {
        opportunities(filter: $filter, limit: $limit, nextToken: $nextToken) {
          items {
            id
            title
            location
            date
            description
            capacity
            status
            cover {
              bucket
              region
              key
            }
            applicationRequired
            applicationDeadline
            opportunityType {
              name
            }
            organiser {
              firstName
              lastName
            }
            attendees {
              items {
                id
              }
            }
          }
        }
      }
    }
  `;
  return API.graphql(
    graphqlOperation(getProviderOpportunities, {
      id: providerId,
      filter: queryParams.filter,
    })
  );
}

export function getOpportunityById(opportunityId) {
  return API.graphql(graphqlOperation(getOpportunity, { id: opportunityId }));
}

export function createOpportunity(opportunity) {
  return API.graphql(
    graphqlOperation(apiCreateOpportunity, { input: opportunity })
  );
}

export function updateOpportunity(opportunity) {
  return API.graphql(
    graphqlOperation(apiUpdateOpportunity, { input: opportunity })
  );
}
