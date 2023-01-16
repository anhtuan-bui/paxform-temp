import { gql } from "@apollo/client";
const USERNAME = process.env.REACT_APP_CLIENT_USER_NAME;
const PASSWORD = process.env.REACT_APP_CLIENT_PASSWORD;

const GET_LEGAL_BY_SLUG = gql`
  query GetLegalBySlug($slug: String!) {
    legalBy(slug: $slug) {
      title
      content
    }
  }
`;

const GET_LEGAL_CATEGORIES = gql`
  query GetLegalCategories {
    legalCategories {
      nodes {
        slug
        name
        legals {
          nodes {
            slug
            title
          }
        }
      }
    }
  }
`;

const GET_POSTS = gql`
  query GetPosts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      edges {
        node {
          author {
            node {
              avatar {
                url
              }
              roles {
                edges {
                  node {
                    displayName
                  }
                }
              }
              lastName
              firstName
              username
            }
          }
          title
          content
          date
          id
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            edges {
              node {
                name
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

const LOGIN_CLIENT = gql`
  mutation LoginUser {
    login(input: { username: "client", password: "client" }) {
      authToken
      user {
        id
        name
      }
    }
  }
`;

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      edges {
        node {
          name
        }
      }
    }
  }
`;

export {
  GET_POSTS,
  LOGIN_CLIENT,
  GET_CATEGORIES,
  GET_LEGAL_CATEGORIES,
  GET_LEGAL_BY_SLUG,
};
