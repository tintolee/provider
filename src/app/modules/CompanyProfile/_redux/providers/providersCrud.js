import { API, graphqlOperation } from "aws-amplify";
import { updateOpportunityProvider as apiUpdateOpportunityProvider } from "../../../../../graphql/mutations";

export function getOpportunityProviderById(providerId) {
  const getOpportunityProvider = /* GraphQL */ `
    query GetOpportunityProvider($id: ID!) {
      getOpportunityProvider(id: $id) {
        id
        name
        displayName
        companyNo
        parent
        email
        educationalInstitution
        status
        logo
        tagline
        address
        phone
        website
        primarySector {
          id
          name
          status
          opportunityProviders {
            nextToken
          }
          createdAt
          updatedAt
        }
        otherSectors {
          items {
            id
            opportunityProviderId
            sectorId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  `;
  return API.graphql(
    graphqlOperation(getOpportunityProvider, { id: providerId })
  );
}

export function updateOpportunityProvider(provider) {
  return API.graphql(
    graphqlOperation(apiUpdateOpportunityProvider, { input: provider })
  );
}
