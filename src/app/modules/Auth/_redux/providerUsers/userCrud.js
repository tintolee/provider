import { API, graphqlOperation } from "aws-amplify";
import {
  getOpportunityProviderUser,
  listOpportunityProviderUsers,
} from "../../../../../graphql/queries";
export function getOpportunityProviderUserById(userId) {
  return API.graphql(
    graphqlOperation(getOpportunityProviderUser, { id: userId })
  );
}

export function getOpportunityProviderUserByEmail(email) {
  const listOpportunityProviderUsers = /* GraphQL */ `
    query ListOpportunityProviderUsers(
      $filter: ModelOpportunityProviderUserFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listOpportunityProviderUsers(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        items {
          id
          firstName
          lastName
          email
          status
          opportunityProvider {
            id
            name
            displayName
            companyNo
            parent
            email
            logo {
              bucket
              region
              key
            }
            educationalInstitution
            status
            tagline
            address
            phone
            website
            createdAt
            updatedAt
          }
          opportunityProviderUserOpportunityProviderId
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  `;
  return API.graphql(
    graphqlOperation(listOpportunityProviderUsers, {
      filter: { email: { eq: email } },
    })
  );
}

export function getAllOpportunityProviderUsersByProvider(providerId) {
  return API.graphql(
    graphqlOperation(listOpportunityProviderUsers, {
      filter: {
        opportunityProviderUserOpportunityProviderId: { eq: providerId },
      },
    })
  );
}
