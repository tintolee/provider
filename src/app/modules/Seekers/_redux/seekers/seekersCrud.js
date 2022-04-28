import { API, graphqlOperation } from "aws-amplify";

export function getAllProviderFollowers(providerId, queryParams) {
  const getProviderFollowers = /* GraphQL */ `
    query GetOpportunityProvider(
      $id: ID!
      $filterFollower: ModelOpportunityProviderFollowerFilterInput
      $filterRouteMap: ModelRouteMapFilterInput
      $filterPost: ModelPostFilterInput
    ) {
      getOpportunityProvider(id: $id) {
        followers(filter: $filterFollower) {
          items {
            seeker {
              firstName
              lastName
              id
              dateOfBirth
              biography
              postcodeArea
              profilePic
              routeMaps(filter: $filterRouteMap) {
                items {
                  id
                }
              }
              posts(filter: $filterPost) {
                items {
                  id
                }
              }
            }
            startedAt
          }
        }
      }
    }
  `;
  return API.graphql(
    graphqlOperation(getProviderFollowers, {
      id: providerId,
      filterFollower: queryParams.filterFollower,
      filterRouteMap: queryParams.filterRouteMap,
      filterPost: queryParams.filterPost,
    })
  );
}

export function getSeekerById(seekerId, queryParams) {
  const getSeeker = /* GraphQL */ `
    query GetSeeker(
      $id: ID!
      $filterRouteMap: ModelRouteMapFilterInput
      $filterPost: ModelPostFilterInput
    ) {
      getSeeker(id: $id) {
        id
        username
        firstName
        lastName
        email
        status
        mobileNumber
        postcodeArea
        dateOfBirth
        biography
        profilePic
        routeMaps(filter: $filterRouteMap) {
          items {
            id
            visibility
            status
            destination
            createdAt
            coverPhoto
            focusAreas
            posts(filter: $filterPost) {
              items {
                id
                createdAt
              }
            }
          }
          nextToken
        }
        posts {
          items {
            id
            caption
            photo
            type
            createdAt
            blog {
              blogTitle
              blogDescription
              blogCoverPhoto
            }
          }
        }
        createdAt
        updatedAt
      }
    }
  `;
  return API.graphql(
    graphqlOperation(getSeeker, {
      id: seekerId,
      filterRouteMap: queryParams.filterRouteMap,
      filterPost: queryParams.filterPost,
    })
  );
}

export function getRouteMapById(routeMapId, queryParams) {
  const getRouteMap = /* GraphQL */ `
    query GetRouteMap(
      $id: ID!
      $filterRouteMap: ModelRouteMapFilterInput
      $filterPost: ModelPostFilterInput
    ) {
      getRouteMap(id: $id) {
        id
        destination
        posts(filter: $filterPost) {
          items {
            id
            type
            caption
            blog {
              blogTitle
              blogDescription
              blogCoverPhoto
            }
            photo
            video
            createdAt
            visibility
          }
        }
        coverPhoto
        focusAreas
        owner {
          firstName
          lastName
          biography
          dateOfBirth
          profilePic
          posts(filter: $filterPost) {
            items {
              id
            }
          }
          routeMaps(filter: $filterRouteMap) {
            items {
              id
            }
          }
          id
          postcodeArea
        }
      }
    }
  `;
  return API.graphql(
    graphqlOperation(getRouteMap, {
      id: routeMapId,
      filterRouteMap: queryParams.filterRouteMap,
      filterPost: queryParams.filterPost,
    })
  );
}

export function getRouteMapPostsById(routeMapId, queryParams) {
  const getRouteMapPosts = /* GraphQL */ `
    query getRouteMapPosts(
      $id: ID!
      $filterRouteMap: ModelRouteMapFilterInput
      $filterPost: ModelPostFilterInput
    ) {
      getRouteMap(id: $id) {
        id
        destination
        posts(filter: $filterPost) {
          items {
            id
            type
            caption
            blog {
              blogTitle
              blogDescription
              blogCoverPhoto
              visibility
            }
            createdAt
            visibility
            seeker {
              firstName
              lastName
            }
            photo
            video
          }
        }
        coverPhoto
        focusAreas
        owner {
          firstName
          lastName
          biography
          dateOfBirth
          profilePic
          posts(filter: $filterPost) {
            items {
              id
            }
          }
          routeMaps(filter: $filterRouteMap) {
            items {
              id
            }
          }
          id
          postcodeArea
        }
      }
    }
  `;
  return API.graphql(
    graphqlOperation(getRouteMapPosts, {
      id: routeMapId,
      filterRouteMap: queryParams.filterRouteMap,
      filterPost: queryParams.filterPost,
    })
  );
}
