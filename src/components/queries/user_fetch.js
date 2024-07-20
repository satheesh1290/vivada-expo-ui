// graphql/queries.js
import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      username
      email
      firstname
      lastname
      avatar
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $username: String!
    $email: String!
    $firstname: String!
    $lastname: String!
    $avatar: String!
    $password: String!
  ) {
    updateUser(
      id: $id
      username: $username
      email: $email
      firstname: $firstname
      lastname: $lastname
      avatar: $avatar
      password: $password
    ) {
      id
      username
      email
      firstname
      lastname
      avatar
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
