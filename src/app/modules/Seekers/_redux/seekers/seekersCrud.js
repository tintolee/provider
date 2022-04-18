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
              profilePic {
                bucket
                key
                region
              }
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
        profilePic {
          bucket
          region
          key
        }
        routeMaps(filter: $filterRouteMap) {
          items {
            id
            visibility
            status
            destination
            createdAt
            coverPhoto {
              region
              key
              bucket
            }
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
            photo {
              bucket
              key
              region
            }
            type
            createdAt
            blog {
              blogTitle
              blogDescription
              blogCoverPhoto {
                bucket
                region
                key
              }
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
              blogCoverPhoto {
                bucket
                key
                region
              }
            }
            photo {
              bucket
              key
              region
            }
            video {
              key
              region
              bucket
            }
            createdAt
            visibility
          }
        }
        coverPhoto {
          bucket
          key
          region
        }
        focusAreas
        owner {
          firstName
          lastName
          biography
          dateOfBirth
          profilePic {
            bucket
            key
            region
          }
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
              blogCoverPhoto {
                bucket
                key
                region
              }
              visibility
            }
            createdAt
            visibility
            seeker {
              firstName
              lastName
            }
            photo {
              bucket
              key
              region
            }
            video {
              key
              region
              bucket
            }
          }
        }
        coverPhoto {
          bucket
          key
          region
        }
        focusAreas 
        owner {
          firstName
          lastName
          biography
          dateOfBirth
          profilePic {
            bucket
            key
            region
          }
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
