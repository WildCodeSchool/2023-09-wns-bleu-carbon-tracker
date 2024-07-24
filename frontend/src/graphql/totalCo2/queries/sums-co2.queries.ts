import { gql } from '@apollo/client';

export const SUM_BY_CATEGORY = gql`
  query GetSumByCategory($userId: String) {
    getSumByCategory(userId: $userId) {
      categoryId
      categoryName
      sumKgCO2
    }
  }
`;

export const SUM_BY_MONTH = gql`
  query GetSumByMonth($userId: String) {
    getSumByMonth(userId: $userId) {
      month
      sumKgCO2
    }
  }
`;
