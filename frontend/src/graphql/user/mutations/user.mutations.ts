import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation updateUser($picture: String, $name: String) {
    updateUser(picture: $picture, name: $name) {
      name
      id
      picture
    }
  }
`;

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      id
      name
    }
  }
`;
