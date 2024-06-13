import { gql } from '@apollo/client';

export const LOGIN = gql`
  query Login($infos: InputLogin!) {
    login(infos: $infos) {
      success
      message
    }
  }
`;

export const LOGOUT = gql`
  query Logout {
    logout {
      message
      success
    }
  }
`;

export const USER_BY_NAME = gql`
  query GetUserByName($name: String!) {
    userByName(name: $name) {
      id
      name
      email
      activityEntries {
        id
        name
        input
        category {
          id
          name
        }
        createdAt
        spendedAt
      }
    }
  }
`;
