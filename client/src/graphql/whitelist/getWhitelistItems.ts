import gql from 'graphql-tag';

const GET_WHITELIST_ITEMS = gql`
  query Whitelistitems {
    whitelistitems {
      id
      lisencePlate
      fromTime
      toTime
    }
  }
`;

export default GET_WHITELIST_ITEMS;
