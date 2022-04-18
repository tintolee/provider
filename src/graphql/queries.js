/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const bringOpportunity = /* GraphQL */ `
  query BringOpportunity($id: ID!) {
    bringOpportunity(id: $id) {
      id
      title
      location
      sortable
      createdAt
      date
      description
      caption
      capacity
      status
      cover {
        bucket
        region
        key
      }
      applicationRequired
      applicationDeadline
      isLimitedCapacity
      opportunityType {
        id
        name
        status
        createdAt
        updatedAt
      }
      opportunityCreatedSteps {
        items {
          id
          opportunityStepOpportunityId
          createdAt
          updatedAt
        }
        nextToken
      }
      organiser {
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
      opportunityProvider {
        id
        name
        displayName
        companyNo
        parent
        email
        educationalInstitution
        status
        logo {
          bucket
          region
          key
        }
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
      opportunityOpportunityProviderId
      attendees {
        items {
          id
          status
          seekerComment
          opportunityId
          seekerId
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          postId
          contentId
          collaborationId
          opportunityId
          seekerId
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const listOrderedContentsAndOpportunities = /* GraphQL */ `
  query ListOrderedContentsAndOpportunities {
    listOrderedContentsAndOpportunities {
      ... on Content {
        id
        title
        sortable
        caption
        description
        createdAt
        type
        positiveFeedbacks {
          items {
            id
            addedAt
            contentId
            seekerId
            createdAt
            updatedAt
          }
          nextToken
        }
        blog {
          blogTitle
          blogDescription
          blogBody
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
        createdBy {
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
        opportunityProvider {
          id
          name
          displayName
          companyNo
          parent
          email
          educationalInstitution
          status
          logo {
            bucket
            region
            key
          }
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
        likes {
          items {
            id
            postId
            contentId
            collaborationId
            opportunityId
            seekerId
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
      ... on Opportunity {
        id
        title
        location
        sortable
        createdAt
        date
        description
        caption
        capacity
        status
        cover {
          bucket
          region
          key
        }
        applicationRequired
        applicationDeadline
        isLimitedCapacity
        opportunityType {
          id
          name
          status
          createdAt
          updatedAt
        }
        opportunityCreatedSteps {
          items {
            id
            opportunityStepOpportunityId
            createdAt
            updatedAt
          }
          nextToken
        }
        organiser {
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
        opportunityProvider {
          id
          name
          displayName
          companyNo
          parent
          email
          educationalInstitution
          status
          logo {
            bucket
            region
            key
          }
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
        opportunityOpportunityProviderId
        attendees {
          items {
            id
            status
            seekerComment
            opportunityId
            seekerId
            createdAt
            updatedAt
          }
          nextToken
        }
        likes {
          items {
            id
            postId
            contentId
            collaborationId
            opportunityId
            seekerId
            createdAt
            updatedAt
          }
          nextToken
        }
        updatedAt
      }
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
      logo {
        bucket
        region
        key
      }
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
      followers {
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
      contents {
        items {
          id
          title
          sortable
          caption
          description
          createdAt
          type
          video
          status
          opportunityProviderId
          opportunityProviderUserId
          updatedAt
        }
        nextToken
      }
      opportunities {
        items {
          id
          title
          location
          sortable
          createdAt
          date
          description
          caption
          capacity
          status
          applicationRequired
          applicationDeadline
          isLimitedCapacity
          opportunityOpportunityProviderId
          updatedAt
        }
        nextToken
      }
      opportunityTypes {
        items {
          id
          opportunityProviderId
          opportunityTypeId
          createdAt
          updatedAt
        }
        nextToken
      }
      users {
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
        logo {
          bucket
          region
          key
        }
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
        logo {
          bucket
          region
          key
        }
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
        profilePic {
          bucket
          region
          key
        }
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
        opportunityProvider {
          id
          name
          displayName
          companyNo
          parent
          email
          educationalInstitution
          status
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
        opportunityProviders {
          nextToken
        }
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
        logo {
          bucket
          region
          key
        }
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
        opportunityProvider {
          id
          name
          displayName
          companyNo
          parent
          email
          educationalInstitution
          status
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
      sortable
      createdAt
      date
      description
      caption
      capacity
      status
      cover {
        bucket
        region
        key
      }
      applicationRequired
      applicationDeadline
      isLimitedCapacity
      opportunityType {
        id
        name
        status
        createdAt
        updatedAt
      }
      opportunityCreatedSteps {
        items {
          id
          opportunityStepOpportunityId
          createdAt
          updatedAt
        }
        nextToken
      }
      organiser {
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
      opportunityProvider {
        id
        name
        displayName
        companyNo
        parent
        email
        educationalInstitution
        status
        logo {
          bucket
          region
          key
        }
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
      opportunityOpportunityProviderId
      attendees {
        items {
          id
          status
          seekerComment
          opportunityId
          seekerId
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          postId
          contentId
          collaborationId
          opportunityId
          seekerId
          createdAt
          updatedAt
        }
        nextToken
      }
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
        sortable
        createdAt
        date
        description
        caption
        capacity
        status
        cover {
          bucket
          region
          key
        }
        applicationRequired
        applicationDeadline
        isLimitedCapacity
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
        sortable
        createdAt
        date
        description
        caption
        capacity
        status
        cover {
          bucket
          region
          key
        }
        applicationRequired
        applicationDeadline
        isLimitedCapacity
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
        profilePic {
          bucket
          region
          key
        }
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
        opportunity {
          id
          title
          location
          sortable
          createdAt
          date
          description
          caption
          capacity
          status
          applicationRequired
          applicationDeadline
          isLimitedCapacity
          opportunityOpportunityProviderId
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
      profilePic {
        bucket
        region
        key
      }
      routeMaps {
        items {
          id
          visibility
          status
          destination
          isCompleted
          focusAreas
          createdAt
          updatedAt
        }
        nextToken
      }
      opportunityProviders {
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
      opportunities {
        items {
          id
          status
          seekerComment
          opportunityId
          seekerId
          createdAt
          updatedAt
        }
        nextToken
      }
      posts {
        items {
          id
          type
          caption
          status
          sortable
          createdAt
          visibility
          updatedAt
        }
        nextToken
      }
      interests
      admireBrands
      profileCompleted
      visibleToProviders
      visibleToSeekers
      friends {
        items {
          id
          status
          friendId
          seekerId
          createdAt
          updatedAt
        }
        nextToken
      }
      friendRequests {
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
      collaborations {
        items {
          id
          title
          sortable
          createdAt
          location
          startDate
          endDate
          description
          caption
          capacity
          status
          inviteOnly
          updatedAt
        }
        nextToken
      }
      collaborationMembers {
        items {
          id
          status
          comment
          collaborationId
          seekerId
          createdAt
          updatedAt
        }
        nextToken
      }
      conversationMembers {
        items {
          id
          status
          comment
          conversationId
          seekerId
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
        profilePic {
          bucket
          region
          key
        }
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
      coverPhoto {
        bucket
        region
        key
      }
      destination
      isCompleted
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
        profilePic {
          bucket
          region
          key
        }
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
      focusAreas
      posts {
        items {
          id
          type
          caption
          status
          sortable
          createdAt
          visibility
          updatedAt
        }
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
        coverPhoto {
          bucket
          region
          key
        }
        destination
        isCompleted
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
      sortable
      createdAt
      visibility
      blog {
        blogTitle
        blogDescription
        blogBody
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
      video {
        bucket
        region
        key
      }
      videoThumbnail {
        bucket
        region
        key
      }
      milestone {
        title
        date
      }
      routeMap {
        id
        visibility
        status
        coverPhoto {
          bucket
          region
          key
        }
        destination
        isCompleted
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
      opportunity {
        id
        title
        location
        sortable
        createdAt
        date
        description
        caption
        capacity
        status
        cover {
          bucket
          region
          key
        }
        applicationRequired
        applicationDeadline
        isLimitedCapacity
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
        updatedAt
      }
      tags {
        id
        tag
        link
        posts {
          id
          type
          caption
          status
          sortable
          createdAt
          visibility
          updatedAt
        }
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
        profilePic {
          bucket
          region
          key
        }
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
      likes {
        items {
          id
          postId
          contentId
          collaborationId
          opportunityId
          seekerId
          createdAt
          updatedAt
        }
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
        sortable
        createdAt
        visibility
        blog {
          blogTitle
          blogDescription
          blogBody
          visibility
        }
        photo {
          bucket
          region
          key
        }
        video {
          bucket
          region
          key
        }
        videoThumbnail {
          bucket
          region
          key
        }
        milestone {
          title
          date
        }
        routeMap {
          id
          visibility
          status
          destination
          isCompleted
          focusAreas
          createdAt
          updatedAt
        }
        opportunity {
          id
          title
          location
          sortable
          createdAt
          date
          description
          caption
          capacity
          status
          applicationRequired
          applicationDeadline
          isLimitedCapacity
          opportunityOpportunityProviderId
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
        sortable
        createdAt
        visibility
        blog {
          blogTitle
          blogDescription
          blogBody
          visibility
        }
        photo {
          bucket
          region
          key
        }
        video {
          bucket
          region
          key
        }
        videoThumbnail {
          bucket
          region
          key
        }
        milestone {
          title
          date
        }
        routeMap {
          id
          visibility
          status
          destination
          isCompleted
          focusAreas
          createdAt
          updatedAt
        }
        opportunity {
          id
          title
          location
          sortable
          createdAt
          date
          description
          caption
          capacity
          status
          applicationRequired
          applicationDeadline
          isLimitedCapacity
          opportunityOpportunityProviderId
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
        posts {
          id
          type
          caption
          status
          sortable
          createdAt
          visibility
          updatedAt
        }
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
        opportunityProviders {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdBy {
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
      opportunityProvider {
        id
        name
        displayName
        companyNo
        parent
        email
        educationalInstitution
        status
        logo {
          bucket
          region
          key
        }
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
      nextToken
    }
  }
`;
export const getContent = /* GraphQL */ `
  query GetContent($id: ID!) {
    getContent(id: $id) {
      id
      title
      sortable
      caption
      description
      createdAt
      type
      positiveFeedbacks {
        items {
          id
          addedAt
          contentId
          seekerId
          createdAt
          updatedAt
        }
        nextToken
      }
      blog {
        blogTitle
        blogDescription
        blogBody
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
      createdBy {
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
      opportunityProvider {
        id
        name
        displayName
        companyNo
        parent
        email
        educationalInstitution
        status
        logo {
          bucket
          region
          key
        }
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
      likes {
        items {
          id
          postId
          contentId
          collaborationId
          opportunityId
          seekerId
          createdAt
          updatedAt
        }
        nextToken
      }
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
        sortable
        caption
        description
        createdAt
        type
        positiveFeedbacks {
          nextToken
        }
        blog {
          blogTitle
          blogDescription
          blogBody
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
        profilePic {
          bucket
          region
          key
        }
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
        profilePic {
          bucket
          region
          key
        }
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
      sortable
      createdAt
      location
      startDate
      endDate
      description
      caption
      capacity
      status
      cover {
        bucket
        region
        key
      }
      coverThumb {
        bucket
        region
        key
      }
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
        profilePic {
          bucket
          region
          key
        }
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
      members {
        items {
          id
          status
          comment
          collaborationId
          seekerId
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          postId
          contentId
          collaborationId
          opportunityId
          seekerId
          createdAt
          updatedAt
        }
        nextToken
      }
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
        sortable
        createdAt
        location
        startDate
        endDate
        description
        caption
        capacity
        status
        cover {
          bucket
          region
          key
        }
        coverThumb {
          bucket
          region
          key
        }
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
        profilePic {
          bucket
          region
          key
        }
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
      conversation {
        id
        type
        title
        createdAt
        updatedAt
        groupId
        avatar
        members {
          nextToken
        }
        messages {
          nextToken
        }
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
          groupId
          avatar
        }
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
      groupId
      avatar
      members {
        items {
          id
          status
          comment
          conversationId
          seekerId
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
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
        groupId
        avatar
        members {
          nextToken
        }
        messages {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listOrderedOpportunities = /* GraphQL */ `
  query ListOrderedOpportunities(
    $sortable: Sortable
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOpportunityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrderedOpportunities(
      sortable: $sortable
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        location
        sortable
        createdAt
        date
        description
        caption
        capacity
        status
        cover {
          bucket
          region
          key
        }
        applicationRequired
        applicationDeadline
        isLimitedCapacity
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
        updatedAt
      }
      nextToken
    }
  }
`;
export const listOrderedPosts = /* GraphQL */ `
  query ListOrderedPosts(
    $sortable: Sortable
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrderedPosts(
      sortable: $sortable
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        caption
        status
        sortable
        createdAt
        visibility
        blog {
          blogTitle
          blogDescription
          blogBody
          visibility
        }
        photo {
          bucket
          region
          key
        }
        video {
          bucket
          region
          key
        }
        videoThumbnail {
          bucket
          region
          key
        }
        milestone {
          title
          date
        }
        routeMap {
          id
          visibility
          status
          destination
          isCompleted
          focusAreas
          createdAt
          updatedAt
        }
        opportunity {
          id
          title
          location
          sortable
          createdAt
          date
          description
          caption
          capacity
          status
          applicationRequired
          applicationDeadline
          isLimitedCapacity
          opportunityOpportunityProviderId
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
      nextToken
    }
  }
`;
export const listOrderedContents = /* GraphQL */ `
  query ListOrderedContents(
    $sortable: Sortable
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrderedContents(
      sortable: $sortable
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        sortable
        caption
        description
        createdAt
        type
        positiveFeedbacks {
          nextToken
        }
        blog {
          blogTitle
          blogDescription
          blogBody
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
        updatedAt
      }
      nextToken
    }
  }
`;
export const listOrderedCollaborations = /* GraphQL */ `
  query ListOrderedCollaborations(
    $sortable: Sortable
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCollaborationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrderedCollaborations(
      sortable: $sortable
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        sortable
        createdAt
        location
        startDate
        endDate
        description
        caption
        capacity
        status
        cover {
          bucket
          region
          key
        }
        coverThumb {
          bucket
          region
          key
        }
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
          groupId
          avatar
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
