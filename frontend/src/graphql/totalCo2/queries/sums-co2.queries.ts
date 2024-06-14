import { gql } from '@apollo/client';

export const SUM_BY_CATEGORY = gql`
  query GetSumByCategory {
    getSumByCategory {
      categoryName
      sumKgCO2
      categoryId
    }
  }
`;

export const SUM_BY_MONTH = gql`
  query GetSumByMonth {
    getSumByMonth {
      month
      sumKgCO2
    }
  }
`;
