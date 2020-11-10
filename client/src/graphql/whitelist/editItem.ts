import gql from 'graphql-tag';

const EDIT_ITEM = gql`
  mutation UpdateItem(
    $id: ID!
    $lisencePlate: String!
    $fromTime: String!
    $toTime: String!
  ) {
    updateItem(
      id: $id
      lisencePlate: $lisencePlate
      fromTime: $fromTime
      toTime: $toTime
    ) {
      status
      message
    }
  }
`;

export default EDIT_ITEM;
