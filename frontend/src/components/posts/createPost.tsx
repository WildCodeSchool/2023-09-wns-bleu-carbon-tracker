import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '@/graphql/posts/mutations/post.mutations';
import { GET_ALL_POSTS } from '@/graphql/posts/queries/post.queries';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_ALL_POSTS }],
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createPost({ variables: { data: { title, content } } });
      setTitle('');
      setContent('');
    } catch (err) {
      console.error('Erreur lors de la création du post:', err);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-md mx-auto p-4'>
      <div className='bg-gray-100 shadow-md rounded-lg p-6'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col'>
            <input
              id='title'
              type='text'
              placeholder='Quoi de neuf ?'
              value={title}
              onChange={handleTitleChange}
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
              required
            />
          </div>
          <div className='flex flex-col'>
            <textarea
              id='content'
              value={content}
              placeholder='Postez ici vos bons plans...'
              onChange={handleContentChange}
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
              rows={4}
              required
            />
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
            >
              Publier
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
