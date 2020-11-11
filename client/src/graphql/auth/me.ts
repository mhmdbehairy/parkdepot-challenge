import gql from 'graphql-tag';

const ME_QUERY = gql`
  query me {
    me {
      id
      email
      firstName
      lastName
      permissions
      role
    }
  }
`;

export default ME_QUERY;
