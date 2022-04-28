/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMessageByConversationId = /* GraphQL */ `
  subscription OnCreateMessageByConversationId($conversationId: ID!) {
    onCreateMessageByConversationId(conversationId: $conversationId) {
      id
      conversationId
      author
      body
      content
      seekerId
      type
      seeker {
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
        interests
        admireBrands
        profileCompleted
        visibleToProviders
        visibleToSeekers
        createdAt
        updatedAt
      }
      conversation {
        id
        type
        title
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateConversationMemberBySeekerId = /* GraphQL */ `
  subscription OnCreateConversationMemberBySeekerId($seekerId: ID!) {
    onCreateConversationMemberBySeekerId(seekerId: $seekerId) {
      id
      status
      comment
      conversationId
      seekerId
      conversation {
        id
        type
        title
        createdAt
        updatedAt
      }
      seeker {
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
        interests
        admireBrands
        profileCompleted
        visibleToProviders
        visibleToSeekers
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
      id
      conversationId
      author
      body
      content
      seekerId
      type
      seeker {
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
        interests
        admireBrands
        profileCompleted
        visibleToProviders
        visibleToSeekers
        createdAt
        updatedAt
      }
      conversation {
        id
        type
        title
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      conversationId
      author
      body
      content
      seekerId
      type
      seeker {
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
        interests
        admireBrands
        profileCompleted
        visibleToProviders
        visibleToSeekers
        createdAt
        updatedAt
      }
      conversation {
        id
        type
        title
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
      id
      conversationId
      author
      body
      content
      seekerId
      type
      seeker {
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
        interests
        admireBrands
        profileCompleted
        visibleToProviders
        visibleToSeekers
        createdAt
        updatedAt
      }
      conversation {
        id
        type
        title
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateConversation = /* GraphQL */ `
  subscription OnCreateConversation {
    onCreateConversation {
      id
      type
      title
      createdAt
      updatedAt
      members {
        nextToken
      }
      messages {
        nextToken
      }
    }
  }
`;
export const onUpdateConversation = /* GraphQL */ `
  subscription OnUpdateConversation {
    onUpdateConversation {
      id
      type
      title
      createdAt
      updatedAt
      members {
        nextToken
      }
      messages {
        nextToken
      }
    }
  }
`;
export const onDeleteConversation = /* GraphQL */ `
  subscription OnDeleteConversation {
    onDeleteConversation {
      id
      type
      title
      createdAt
      updatedAt
      members {
        nextToken
      }
      messages {
        nextToken
      }
    }
  }
`;
