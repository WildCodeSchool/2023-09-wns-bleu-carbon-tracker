import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

export const GET_POST = gql`
  query GetPostById($postId: Float!) {
    getPostById(postId: $postId) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;
