import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation Register($infos: InputRegister!) {
    register(infos: $infos) {
      id
      email
    }
  }
`;

export const UPDATE_USER_NAME = gql`
  mutation UpdateUserName($infos: InputUpdateUserName!) {
    updateUserName(infos: $infos) {
      id
      name
      email
    }
  }
`;
