import { gql } from '@apollo/client';

const USER_BY_ID = gql`
  query GetUserbyId($userByIdId: String!) {
    userById(id: $userByIdId) {
      name
      email
      picture
    }
  }
`;

export default USER_BY_ID;
