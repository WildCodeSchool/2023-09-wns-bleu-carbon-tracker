import gql from 'graphql-tag';

export default gql`
  query ActivityEntries {
    activityEntries {
      id
      name
      input
      category {
        id
        name
      }
      spendedAt
    }
  }
`;
