import gql from 'graphql-tag';

const LOGOUT_MUTATION = gql`
  mutation logout {
    logout
  }
`;

export default LOGOUT_MUTATION;
