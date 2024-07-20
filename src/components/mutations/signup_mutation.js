// src/components/mutations/signup_mutation.js
import { gql } from "@apollo/client";

const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!, $username: String!) {
    signup(email: $email, password: $password, username: $username) {
      token
      user {
        id
        email
        username
      }
    }
  }
`;

export default SIGNUP_MUTATION;
