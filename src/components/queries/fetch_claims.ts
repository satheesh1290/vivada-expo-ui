import { gql } from "@apollo/client";

const FETCH_CLAIMS = gql`
  query claims(
    $author: ID
    $searchField: String
    $sortBy: String
    $sortOrder: String
    $offset: Int
    $limit: Int
  ) {
    claims(
      author: $author
      searchField: $searchField
      sortBy: $sortBy
      sortOrder: $sortOrder
      offset: $offset
      limit: $limit
    ) {
      id
      thesis
      author {
        id
        avatar
        firstname
        username
      }
      circle {
        id
        title
      }
      topic {
        id
        title
      }
      createdAt
    }
  }
`;

export default FETCH_CLAIMS;
