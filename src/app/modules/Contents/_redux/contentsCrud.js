import { API, graphqlOperation } from 'aws-amplify';
import {
  updateContent as apiUpdateContent,
  createContent as apiCreateContent
} from '../../../../graphql/mutations';
import { getContent } from '../../../../graphql/queries';

export function createContent(content) {
  return API.graphql(graphqlOperation(apiCreateContent, { input: content }));
}

export function getAllContents(queryParams) {
  const listContents = /* GraphQL */ `
  query ListContents(
    $filter: ModelContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        type
        positiveFeedbacks {
          items {
            id
          }
          nextToken
        }
        blog {
          blogTitle
          blogDescription
          blogCoverPhoto {
            bucket
            region
            key
          }
          visibility
        }
        photo {
          bucket
          region
          key
        }
        video
        status
        opportunityProviderId
        opportunityProviderUserId
        createdAt
      }
      nextToken
    }
  }
`;
  return API.graphql(graphqlOperation(listContents, { filter: queryParams.filter }));
}

export function getContentById(contentId) {
  return API.graphql(graphqlOperation(getContent, { id: contentId }));
}

export function updateContent(content) {
  return API.graphql(graphqlOperation(apiUpdateContent, { input: content }));
}
