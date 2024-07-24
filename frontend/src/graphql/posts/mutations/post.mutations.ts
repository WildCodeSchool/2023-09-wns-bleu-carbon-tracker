import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($data: InputCreatePost!) {
    createPost(data: $data) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($postId: Float!, $title: String!, $content: String!) {
    updatePost(postId: $postId, title: $title, content: $content) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($postId: Float!) {
    deletePost(postId: $postId)
  }
`;
