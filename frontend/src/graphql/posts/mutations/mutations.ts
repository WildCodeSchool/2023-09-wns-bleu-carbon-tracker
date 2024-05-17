import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($data: InputCreatePost!) {
    createPost(data: $data) {
      id
      title
      content
      createdAt
      updatedAt
      user {
        id
        email
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($postId: Int!, $title: String!, $content: String!) {
    updatePost(postId: $postId, title: $title, content: $content) {
      id
      title
      content
      createdAt
      updatedAt
      user {
        id
        email
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($postId: Int!) {
    deletePost(postId: $postId)
  }
`;
