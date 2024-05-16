import { gql } from '@apollo/client';

const GET_CAGNOTTE = gql`
  query GetCagnotte {
    getTotalDonations
  }
`;

export default GET_CAGNOTTE;
