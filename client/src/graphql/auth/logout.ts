import gql from 'graphql-tag';

const LOGOUT_MUTATION = gql`
  mutation logout {
    logout {
      status
      message
    }
  }
`;

export default LOGOUT_MUTATION;
