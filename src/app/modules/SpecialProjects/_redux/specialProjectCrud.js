import { API, graphqlOperation } from 'aws-amplify';
import {
  createSpecialProject as apiCreateSpecialProject
} from '../../../../graphql/mutations';
export function createSpecialProject(project) {
  return API.graphql(graphqlOperation(apiCreateSpecialProject, { input: project }));
}

export function getAllSpecialProjects(queryParams) {
  const listSpecialProjects = /* GraphQL */ `
  query ListSpecialProjects(
    $filter: ModelSpecialProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSpecialProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        contactName
        email
        telephoneNumber
        mobileNumber
        employeeCount
        projectSummary
        status
        primarySector {
          name
        }
      }
      nextToken
    }
  }
`;

  return API.graphql(graphqlOperation(listSpecialProjects, { filter: queryParams.filter }));
}

