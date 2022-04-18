import { API, graphqlOperation } from "aws-amplify";

export function getDashboardById(providerId, queryParams) {
  const getDashboard = /* GraphQL */ `
    query GetDashboard(
      $id: ID!
      $filterFollowers: ModelOpportunityProviderFollowerFilterInput
      $filterContents: ModelContentFilterInput
      $filterOpportunities: ModelOpportunityFilterInput
    ) {
      getOpportunityProvider(id: $id) {
        companyNo
        followers(filter: $filterFollowers) {
          items {
            id
          }
        }
        contents(filter: $filterContents) {
          items {
            id
          }
        }
        opportunities(filter: $filterOpportunities) {
          items {
            opportunityType {
              name
            }
            title
            id
            cover {
              bucket
              region
              key
            }
          }
        }
      }
    }
  `;
  return API.graphql(
    graphqlOperation(getDashboard, {
      id: providerId,
      filterFollowers: queryParams.filterFollowers,
      filterContents: queryParams.filterContents,
      filterOpportunities: queryParams.filterOpportunities,
    })
  );
}
