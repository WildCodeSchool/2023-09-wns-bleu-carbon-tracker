import { gql } from '@apollo/client';

export const LOGIN = gql`
  query Login($infos: InputLogin!) {
    login(infos: $infos) {
      success
      message
      user {
        id
        name
        email
        picture
      }
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

export const GET_USER_BY_ID = gql`
  query GetUserById($id: String!) {
    userById(id: $id) {
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
