import { gql } from '@apollo/client';

const UPDATE_USER = gql`
  mutation updateUser($picture: String, $name: String) {
    updateUser(picture: $picture, name: $name) {
      name
      id
      picture
    }
  }
`;

export default UPDATE_USER;
