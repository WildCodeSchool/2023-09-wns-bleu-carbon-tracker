import { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '@/graphql/posts/mutations/post.mutations';
import { GET_PAGINATED_POSTS } from '@/graphql/posts/queries/post.queries';
import Button from '../commons/buttons/Button';
import { useUser } from '@/contexts/UserContext';

type Props = {
  handleRefetch: () => void;
};
const CreateNewPost = ({ handleRefetch }: Props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useUser();
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_PAGINATED_POSTS }],
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createPost({ variables: { data: { title, content } } });
      setTitle('');
      setContent('');
      handleRefetch();
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
    <form onSubmit={handleSubmit} className='w-full mx-auto'>
      <div className='bg-gray-100 shadow-md rounded-lg p-6'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-col items-center'>
              <img
                src={user?.picture != null ? user.picture : '/icons/avatar.svg'}
                alt='Profile picture'
                className='w-2/4 rounded-full'
              />
              <div className='flex flex-col'>
                <h4 className='text-lg font-bold'>
                  {user?.name || 'Anonymous'}
                </h4>
              </div>
            </div>
            <div className='w-11/12'>
              <div className='flex flex-col p-1'>
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
              <div className='flex flex-col p-1'>
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
              <div className='flex justify-end p-1'>
                <Button
                  className='mt-2'
                  size='xl'
                  type='submit'
                  data-testid='submit'
                >
                  Publier
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateNewPost;
