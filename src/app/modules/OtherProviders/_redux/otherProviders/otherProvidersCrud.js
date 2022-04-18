import { API, graphqlOperation } from 'aws-amplify';
import { startOfWeek } from 'date-fns'
import {
  createOpportunityProvider as apiCreateOpportunityProvider
} from '../../../../../graphql/mutations';
import { getOpportunityProvider } from '../../../../../graphql/queries';

export function getAllOpportunityProviders(queryParams) {
  const listOpportunityProviders = /* GraphQL */ `
  query ListOpportunityProviders(
    $filter: ModelOpportunityProviderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpportunityProviders(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        primarySector {
          id
          name
        }
        otherSectors {
          items {
            sector {
              id
              name
            }
          }
        }
        followers {
          items {
            id
          }
        }
        contents {
          items {
            id
          }
        }
        opportunities {
          items {
            id
          }
        }
      }
      nextToken
    }
  }
`;

  return API.graphql(graphqlOperation(listOpportunityProviders, { filter: queryParams.filter }));
}

export function createOpportunityProviders(provider) {
  return API.graphql(graphqlOperation(apiCreateOpportunityProvider, { input: provider }));
}

export function getOpportunityProviderById(providerId) {
  return API.graphql(graphqlOperation(getOpportunityProvider, { id: providerId }));
}

export function getFollowersByOpportunityProviderId(providerId) {
  var current = new Date();
  const startDate = startOfWeek(current, { weekStartsOn: 1 });

  let filter = {
    opportunityProviderId: {
      eq: providerId
    },
    startedAt: { between: [startDate.toISOString(), current.toISOString()] }
  };

  const listOpportunityProviderFollowers = /* GraphQL */ `
  query ListOpportunityProviderFollowers(
    $filter: ModelOpportunityProviderFollowerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpportunityProviderFollowers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
      }
    }
  }
`;

  return API.graphql(graphqlOperation(listOpportunityProviderFollowers, { filter: filter }));
}


