/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const bringOpportunity = /* GraphQL */ `
  query BringOpportunity($id: ID!) {
    bringOpportunity(id: $id) {
      id
      title
      location
      date
      description
      caption
      capacity
      status
      cover
      applicationRequired
      applicationDeadline
      opportunityType {
        id
        name
        status
        createdAt
        updatedAt
      }
      opportunityCreatedSteps {
        nextToken
      }
      organiser {
        id
        firstName
        lastName
        email
        status
        opportunityProviderUserOpportunityProviderId
        createdAt
        updatedAt
      }
      opportunityProvider {
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
        createdAt
        updatedAt
      }
      opportunityOpportunityProviderId
      attendees {
        nextToken
      }
      likes {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const getOpportunityProvider = /* GraphQL */ `
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
        createdAt
        updatedAt
      }
      otherSectors {
        nextToken
      }
      followers {
        nextToken
      }
      contents {
        nextToken
      }
      opportunities {
        nextToken
      }
      opportunityTypes {
        nextToken
      }
      users {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listOpportunityProviders = /* GraphQL */ `
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOpportunityProviderFollower = /* GraphQL */ `
  query GetOpportunityProviderFollower($id: ID!) {
    getOpportunityProviderFollower(id: $id) {
      id
      status
      startedAt
      opportunityProviderId
      seekerId
      opportunityProvider {
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
export const listOpportunityProviderFollowers = /* GraphQL */ `
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
        status
        startedAt
        opportunityProviderId
        seekerId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOpportunityProviderSector = /* GraphQL */ `
  query GetOpportunityProviderSector($id: ID!) {
    getOpportunityProviderSector(id: $id) {
      id
      name
      status
      opportunityProviders {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listOpportunityProviderSectors = /* GraphQL */ `
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
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOpportunityProviderUser = /* GraphQL */ `
  query GetOpportunityProviderUser($id: ID!) {
    getOpportunityProviderUser(id: $id) {
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
        educationalInstitution
        status
        logo
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
  }
`;
export const listOpportunityProviderUsers = /* GraphQL */ `
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
        opportunityProviderUserOpportunityProviderId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOpportunity = /* GraphQL */ `
  query GetOpportunity($id: ID!) {
    getOpportunity(id: $id) {
      id
      title
      location
      date
      description
      caption
      capacity
      status
      cover
      applicationRequired
      applicationDeadline
      opportunityType {
        id
        name
        status
        createdAt
        updatedAt
      }
      opportunityCreatedSteps {
        nextToken
      }
      organiser {
        id
        firstName
        lastName
        email
        status
        opportunityProviderUserOpportunityProviderId
        createdAt
        updatedAt
      }
      opportunityProvider {
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
        createdAt
        updatedAt
      }
      opportunityOpportunityProviderId
      attendees {
        nextToken
      }
      likes {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listOpportunitys = /* GraphQL */ `
  query ListOpportunitys(
    $filter: ModelOpportunityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpportunitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        location
        date
        description
        caption
        capacity
        status
        cover
        applicationRequired
        applicationDeadline
        opportunityOpportunityProviderId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOpportunityType = /* GraphQL */ `
  query GetOpportunityType($id: ID!) {
    getOpportunityType(id: $id) {
      id
      name
      status
      createdAt
      updatedAt
    }
  }
`;
export const listOpportunityTypes = /* GraphQL */ `
  query ListOpportunityTypes(
    $filter: ModelOpportunityTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpportunityTypes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOpportunityStep = /* GraphQL */ `
  query GetOpportunityStep($id: ID!) {
    getOpportunityStep(id: $id) {
      id
      opportunity {
        id
        title
        location
        date
        description
        caption
        capacity
        status
        cover
        applicationRequired
        applicationDeadline
        opportunityOpportunityProviderId
        createdAt
        updatedAt
      }
      opportunityStepOpportunityId
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
export const listOpportunitySteps = /* GraphQL */ `
  query ListOpportunitySteps(
    $filter: ModelOpportunityStepFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpportunitySteps(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        opportunityStepOpportunityId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSeeker = /* GraphQL */ `
  query GetSeeker($id: ID!) {
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
      routeMaps {
        nextToken
      }
      opportunityProviders {
        nextToken
      }
      opportunities {
        nextToken
      }
      posts {
        nextToken
      }
      interests
      admireBrands
      profileCompleted
      visibleToProviders
      visibleToSeekers
      friends {
        nextToken
      }
      friendRequests {
        nextToken
      }
      collaborations {
        nextToken
      }
      collaborationMembers {
        nextToken
      }
      conversationMembers {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSeekers = /* GraphQL */ `
  query ListSeekers(
    $filter: ModelSeekerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSeekers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getRouteMap = /* GraphQL */ `
  query GetRouteMap($id: ID!) {
    getRouteMap(id: $id) {
      id
      visibility
      status
      coverPhoto
      destination
      category {
        id
        name
        iconName
        bgColor
        status
        createdAt
        updatedAt
      }
      owner {
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
      focusAreas
      posts {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listRouteMaps = /* GraphQL */ `
  query ListRouteMaps(
    $filter: ModelRouteMapFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRouteMaps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        visibility
        status
        coverPhoto
        destination
        focusAreas
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRouteMapCategory = /* GraphQL */ `
  query GetRouteMapCategory($id: ID!) {
    getRouteMapCategory(id: $id) {
      id
      name
      iconName
      bgColor
      status
      createdAt
      updatedAt
    }
  }
`;
export const listRouteMapCategorys = /* GraphQL */ `
  query ListRouteMapCategorys(
    $filter: ModelRouteMapCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRouteMapCategorys(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        iconName
        bgColor
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRouteMapDestination = /* GraphQL */ `
  query GetRouteMapDestination($id: ID!) {
    getRouteMapDestination(id: $id) {
      id
      name
      status
      createdAt
      updatedAt
    }
  }
`;
export const listRouteMapDestinations = /* GraphQL */ `
  query ListRouteMapDestinations(
    $filter: ModelRouteMapDestinationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRouteMapDestinations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      type
      caption
      status
      visibility
      blog {
        blogTitle
        blogDescription
        blogBody
        blogCoverPhoto
        visibility
      }
      photo
      video
      videoThumbnail
      milestone {
        title
        date
      }
      createdAt
      routeMap {
        id
        visibility
        status
        coverPhoto
        destination
        focusAreas
        createdAt
        updatedAt
      }
      opportunity {
        id
        title
        location
        date
        description
        caption
        capacity
        status
        cover
        applicationRequired
        applicationDeadline
        opportunityOpportunityProviderId
        createdAt
        updatedAt
      }
      tags {
        id
        tag
        link
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
      likes {
        nextToken
      }
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        caption
        status
        visibility
        photo
        video
        videoThumbnail
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPostTag = /* GraphQL */ `
  query GetPostTag($id: ID!) {
    getPostTag(id: $id) {
      id
      tag
      link
      posts {
        id
        type
        caption
        status
        visibility
        photo
        video
        videoThumbnail
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPostTags = /* GraphQL */ `
  query ListPostTags(
    $filter: ModelPostTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tag
        link
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOpsNotInApp = /* GraphQL */ `
  query GetOpsNotInApp($id: ID!) {
    getOpsNotInApp(id: $id) {
      id
      name
      interested
      status
      createdAt
      updatedAt
    }
  }
`;
export const listOpsNotInApps = /* GraphQL */ `
  query ListOpsNotInApps(
    $filter: ModelOpsNotInAppFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpsNotInApps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        interested
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReport = /* GraphQL */ `
  query GetReport($id: ID!) {
    getReport(id: $id) {
      id
      dateTime
      from
      details
      typeId
      type
      about
      status
      createdAt
      updatedAt
    }
  }
`;
export const listReports = /* GraphQL */ `
  query ListReports(
    $filter: ModelReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        dateTime
        from
        details
        typeId
        type
        about
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSpecialProject = /* GraphQL */ `
  query GetSpecialProject($id: ID!) {
    getSpecialProject(id: $id) {
      id
      opportunityProviderId
      opportunityProviderUserId
      contactName
      email
      telephoneNumber
      mobileNumber
      employeeCount
      projectSummary
      status
      primarySectorId
      primarySector {
        id
        name
        status
        createdAt
        updatedAt
      }
      createdBy {
        id
        firstName
        lastName
        email
        status
        opportunityProviderUserOpportunityProviderId
        createdAt
        updatedAt
      }
      opportunityProvider {
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSpecialProjects = /* GraphQL */ `
  query ListSpecialProjects(
    $filter: ModelSpecialProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSpecialProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        opportunityProviderId
        opportunityProviderUserId
        contactName
        email
        telephoneNumber
        mobileNumber
        employeeCount
        projectSummary
        status
        primarySectorId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getContent = /* GraphQL */ `
  query GetContent($id: ID!) {
    getContent(id: $id) {
      id
      title
      caption
      description
      type
      positiveFeedbacks {
        nextToken
      }
      blog {
        blogTitle
        blogDescription
        blogBody
        blogCoverPhoto
        visibility
      }
      photo
      video
      status
      opportunityProviderId
      opportunityProviderUserId
      createdBy {
        id
        firstName
        lastName
        email
        status
        opportunityProviderUserOpportunityProviderId
        createdAt
        updatedAt
      }
      opportunityProvider {
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
        createdAt
        updatedAt
      }
      likes {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listContents = /* GraphQL */ `
  query ListContents(
    $filter: ModelContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        caption
        description
        type
        photo
        video
        status
        opportunityProviderId
        opportunityProviderUserId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFriendshipRequest = /* GraphQL */ `
  query GetFriendshipRequest($id: ID!) {
    getFriendshipRequest(id: $id) {
      id
      status
      recipientId
      requesterId
      recipient {
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
      requester {
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
export const listFriendshipRequests = /* GraphQL */ `
  query ListFriendshipRequests(
    $filter: ModelFriendshipRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriendshipRequests(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        status
        recipientId
        requesterId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
      id
      message
      date
      type
      createdAt
      updatedAt
    }
  }
`;
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        message
        date
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCollaboration = /* GraphQL */ `
  query GetCollaboration($id: ID!) {
    getCollaboration(id: $id) {
      id
      title
      location
      startDate
      endDate
      description
      caption
      capacity
      status
      cover
      coverThumb
      inviteOnly
      owner {
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
      members {
        nextToken
      }
      likes {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listCollaborations = /* GraphQL */ `
  query ListCollaborations(
    $filter: ModelCollaborationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollaborations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        location
        startDate
        endDate
        description
        caption
        capacity
        status
        cover
        coverThumb
        inviteOnly
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        conversationId
        author
        body
        content
        seekerId
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getConversation = /* GraphQL */ `
  query GetConversation($id: ID!) {
    getConversation(id: $id) {
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
export const listConversations = /* GraphQL */ `
  query ListConversations(
    $filter: ModelConversationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConversations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        title
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const messagesByConversationId = /* GraphQL */ `
  query MessagesByConversationId(
    $conversationId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByConversationId(
      conversationId: $conversationId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        conversationId
        author
        body
        content
        seekerId
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
