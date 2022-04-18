import { API, graphqlOperation } from "aws-amplify";
import {
  updateOpportunityProviderUser as apiUpdateOpportunityProviderUser,
  createOpportunityProviderUser as apiCreateOpportunityProviderUser,
} from "../../../../graphql/mutations";
import { getOpportunityProviderUser } from "../../../../graphql/queries";

export function getAllProviderUsers(providerId, queryParams) {
  const getProviderUsers = /* GraphQL */ `
    query GetOpportunityProvider(
      $id: ID!
      $filter: ModelOpportunityProviderUserFilterInput
    ) {
      getOpportunityProvider(id: $id) {
        users(filter: $filter) {
          items {
            email
            firstName
            id
            createdAt
            lastName
            status
            updatedAt
          }
        }
      }
    }
  `;
  return API.graphql(
    graphqlOperation(getProviderUsers, {
      id: providerId,
      filter: queryParams.filter,
    })
  );
}

export function getUserById(userId) {
  return API.graphql(
    graphqlOperation(getOpportunityProviderUser, { id: userId })
  );
}

export function createUser(user) {
  return API.graphql(
    graphqlOperation(apiCreateOpportunityProviderUser, { input: user })
  );
}

export function updateUser(user) {
  return API.graphql(
    graphqlOperation(apiUpdateOpportunityProviderUser, { input: user })
  );
}
