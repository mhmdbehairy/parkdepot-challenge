import gql from 'graphql-tag';

const DELETE_ITEM = gql`
  mutation DeleteItem($id: Int!) {
    deleteItem(id: $id) {
      status
      message
    }
  }
`;

export default DELETE_ITEM;
