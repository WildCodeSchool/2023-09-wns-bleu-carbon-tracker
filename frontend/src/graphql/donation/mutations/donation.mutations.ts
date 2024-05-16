import { gql } from '@apollo/client';

const CREATE_DONATION = gql`
  mutation CreateDonation($amount: Int!, $userId: String!) {
    createDonation(amount: $amount, userId: $userId) {
      amount
      createdAt
      id
    }
  }
`;

export default CREATE_DONATION;
