import gql from 'graphql-tag';

const DELETE_ITEM = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {
      status
      message
      whitelistItem {
        id
        lisencePlate
        fromTime
        toTime
      }
    }
  }
`;

export default DELETE_ITEM;
