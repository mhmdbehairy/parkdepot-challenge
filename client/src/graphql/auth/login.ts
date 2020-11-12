import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      status
      message
      redirectionURL
      accessToken
      user {
        id
        email
        firstName
        lastName
        permissions
      }
    }
  }
`;

export default LOGIN_MUTATION;
