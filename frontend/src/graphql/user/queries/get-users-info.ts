import { gql } from '@apollo/client';

const USERBYID = gql`
  query GetUserbyId($userByIdId: String!) {
    userById(id: $userByIdId) {
      name
      email
      posts {
        id
      }
      donations {
        amount
      }
    }
  }
`;

export default USERBYID;
