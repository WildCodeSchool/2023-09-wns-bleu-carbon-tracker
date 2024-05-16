import { gql } from '@apollo/client';

const CREATE_DONATION = gql`
  mutation CreateDonation($amount: Int!, $isAnonymous: Boolean) {
    createDonation(amount: $amount, isAnonymous: $isAnonymous) {
      amount
      isAnonymous
    }
  }
`;

export default CREATE_DONATION;
