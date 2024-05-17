import React, { useState, ChangeEvent, FormEvent } from 'react'; // Importez ChangeEvent et FormEvent pour le typage
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '@/graphql/posts/mutations/mutations';
import { GET_ALL_POSTS } from '@/graphql/posts/queries/queries';

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
      console.error(err);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col items-center'>
        <div className='rounded-xl bg-gray-100 shadow-md w-3/4 py-4 px-28 mb-4'>
          <div className='flex flex-col mb-2'>
            <div className='flex items-center pb-4'>
              <img
                src='https://picsum.photos/200'
                alt='Profile picture'
                className='w-14 rounded-full mr-2'
              />
              <div className='flex-grow'>
                <h3 className='text-lg font-bold'>John Doe</h3>
              </div>
            </div>
            <div className='flex'>
              <label className='font-bold mr-2' htmlFor='title'>
                Title:
              </label>
              <input
                id='title'
                type='text'
                placeholder='Quoi de neuf ?'
                value={title}
                onChange={handleTitleChange}
                className='flex-grow focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50'
              />
            </div>
            <div>
              <label className='font-bold mb-2' htmlFor='content'>
                Content:
              </label>
              <textarea
                id='content'
                value={content}
                placeholder='Postez ici vos bons plans...'
                onChange={handleContentChange}
                className='w-full h-24 resize-none focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50'
              />
            </div>
          </div>
          <div className='flex justify-end mt-4'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50'
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
