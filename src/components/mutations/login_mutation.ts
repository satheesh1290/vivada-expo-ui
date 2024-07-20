// src/components/mutations/login_mutation.js
import { gql } from "@apollo/client";

// const LOGIN_MUTATION = gql`
//   mutation Login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       token
//       user {
//         id
//         email
//       }
//     }
//   }
// `;

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      success
      token
      refreshToken
      user {
        id
        googleLogin
        lastLogin
      }
      errors
    }
  }
`;

export default LOGIN_MUTATION;
