import { API, graphqlOperation } from "aws-amplify";

export function getAllOpportunityProviderSectors(queryParams) {
const listOpportunityProviderSectors = /* GraphQL */ `
  query ListOpportunityProviderSectors(
    $filter: ModelOpportunityProviderSectorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpportunityProviderSectors(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
      }
      nextToken
    }
  }
`;

  return API.graphql(
    graphqlOperation(listOpportunityProviderSectors, {
      
    })
  );
}
