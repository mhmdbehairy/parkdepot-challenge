import gql from 'graphql-tag';

const CREATE_ITEM = gql`
  mutation CreateItem(
    $lisencePlate: String!
    $fromTime: String
    $toTime: String
  ) {
    createItem(
      lisencePlate: $lisencePlate
      fromTime: $fromTime
      toTime: $toTime
    ) {
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

export default CREATE_ITEM;
