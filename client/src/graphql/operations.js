import { gql } from '@apollo/client';

// 🔹 MUTATIONS

export const POST_NEWS = gql`
  mutation PostNews($title: String!, $content: String!, $authorId: ID!, $type: String) {
    postNews(title: $title, content: $content, authorId: $authorId, type: $type) {
      id
      title
      summary
      type
    }
  }
`;


export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id 
        username
        email
        role
        location
        interests
        __typename
      }
      token
      __typename
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
    $location: String
    $interests: [String]
    $role: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      location: $location
      interests: $interests
      role: $role
    ) {
      id
      username
      email
      role
    }
  }
`;

export const POST_HELP_REQUEST = gql`
  mutation PostHelpRequest($title: String!, $description: String!, $requesterId: ID!) {
    postHelpRequest(title: $title, description: $description, requesterId: $requesterId) {
      id
      title
      description
      status
    }
  }
`;

export const CREATE_EMERGENCY_ALERT = gql`
  mutation CreateEmergencyAlert(
    $title: String!
    $description: String!
    $location: String!
    $type: String!
    $reporterId: ID!
  ) {
    createEmergencyAlert(
      title: $title
      description: $description
      location: $location
      type: $type
      reporterId: $reporterId
    ) {
      id
      title
      description
      location
      type
      createdAt
      reporter {
        username
      }
    }
  }
`;

// 🔹 QUERIES

export const GET_ALL_NEWS = gql`
query {
  newsFeed {
    id
    title
    content
    summary
    type       # ✅ ADD THIS LINE
    createdAt
  }
}
`;

export const GET_ALL_HELP_REQUESTS = gql`
  query {
    helpRequests {
      id
      title
      description
      status
      requester {
        username
      }
      matchedVolunteer {
        username
      }
    }
  }
`;


export const GET_ALL_EMERGENCY_ALERTS = gql`
  query {
    emergencyAlerts {
      id
      title
      description
      location
      type
      createdAt
      reporter {
        username
      }
    }
  }
`;
export const ADD_REVIEW = gql`
  mutation AddReview($businessId: ID!, $text: String!) {
    addReview(businessId: $businessId, text: $text) {
      id
      reviews {
        text
        sentiment
        reply
      }
    }
  }
`;

// 🔹 QUERIES
export const GET_ALL_BUSINESSES = gql`
  query {
    businesses {
      id
      name
      description
      deals {
        title
        description
        validUntil
      }
      reviews {
        text
        sentiment
        reply
      }
      owner {
        username
      }
    }
  }
`;

// 🔹 MUTATIONS

export const ADD_BUSINESS = gql`
  mutation AddBusiness($name: String!, $description: String!, $ownerId: ID!) {
    addBusiness(name: $name, description: $description, ownerId: $ownerId) {
      id
      name
      description
    }
  }
`;

export const ADD_BUSINESS_DEAL = gql`
  mutation AddBusinessDeal(
    $businessId: ID!
    $title: String!
    $description: String!
    $validUntil: String!
  ) {
    addBusinessDeal(
      businessId: $businessId
      title: $title
      description: $description
      validUntil: $validUntil
    ) {
      id
      deals {
        title
        description
        validUntil
      }
    }
  }
`;

export const REPLY_TO_REVIEW = gql`
  mutation ReplyToReview($businessId: ID!, $reviewIndex: String!, $replyText: String!) {
    replyToReview(businessId: $businessId, reviewIndex: $reviewIndex, replyText: $replyText) {
      id
      reviews {
        text
        sentiment
        reply
      }
    }
  }
`;

// 🔹 QUERIES (Events)

export const GET_ALL_EVENTS = gql`
  query {
    events {
      title
      date
      description
      organizer {
        username
      }
      volunteers {
        username
      }
    }
  }
`;

export const GET_USERS = gql`
query {
  users {
    id
    username
  }
}
`;

// 🔹 MUTATIONS (Events)

export const CREATE_EVENT = gql`
  mutation CreateEvent($title: String!, $description: String!, $date: String!, $organizerId: ID!) {
    createEvent(title: $title, description: $description, date: $date, organizerId: $organizerId) {
      id
      title
      description
      organizer
      {
        username
      }
    }
  }
`;
