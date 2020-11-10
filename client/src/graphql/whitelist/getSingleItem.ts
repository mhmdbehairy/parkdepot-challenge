import gql from 'graphql-tag';

const GET_SINGLE_ITEM = gql`
  query GetWhiteListItem($id: ID!) {
    getWhiteListItem(id: $id) {
      id
      lisencePlate
      fromTime
      toTime
    }
  }
`;

export default GET_SINGLE_ITEM;
