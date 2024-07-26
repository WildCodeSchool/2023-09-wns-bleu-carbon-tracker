import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POST } from '@/graphql/posts/queries/post.queries';
import { Post } from '@/graphql/generated/schema';
import Layout from '@/components/layout';
import {
  UPDATE_POST,
  DELETE_POST,
} from '@/graphql/posts/mutations/post.mutations';
import Button from '@/components/commons/buttons/Button';

const PostDetail = () => {
  const router = useRouter();
  const { postId } = router.query;

  const postIdFloat =
    typeof postId === 'string' ? parseFloat(postId) : undefined;

  const { loading, error, data } = useQuery<{ getPostById: Post }>(GET_POST, {
    variables: { postId: postIdFloat },
  });

  const [updatePost] = useMutation(UPDATE_POST);
  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_POST, variables: { postId: postIdFloat } }],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  React.useEffect(() => {
    if (data?.getPostById) {
      setTitle(data.getPostById.title);
      setContent(data.getPostById.content);
    }
  }, [data]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updatePost({
        variables: { postId: postIdFloat, title, content },
      });
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating post:', err);
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      try {
        await deletePost({
          variables: { postId: postIdFloat },
        });
        router.push('/posts/list');
      } catch (err) {
        console.error('Error deleting post:', err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const post = data?.getPostById;

  if (!post) return <p>Post not found</p>;

  return (
    <Layout title={post.title}>
      <div className='container mx-auto mt-8 w-3/4'>
        <h2 className='text-2xl font-bold pb-6 flex justify-center'>
          Bon plan
        </h2>
        <ul className='list-none'>
          <li
            className='bg-white shadow-md rounded-md p-6 mb-4 flex cursor-pointer hover:bg-gray-100 transition flex-col md:flex-row'
            key={post.id}
          >
            <div className='flex items-center mr-6 mb-4 md:mb-0 md:pr-6 md:w-1/4'>
              <img
                src={post?.user.picture ?? '/icons/avatar.svg'}
                alt='Profile picture'
                className='w-20 h-20 rounded-full object-cover mr-4'
              />
              <div className='flex flex-col'>
                <h4 className='text-lg font-bold'>
                  {post.user?.name ?? 'Anonyme'}
                </h4>
                <p className='text-gray-600 text-sm'>
                  Publié le{' '}
                  {new Date(post.createdAt).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>

            <div className='flex-grow ml-8 pl-0 md:pl-8'>
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className='mb-4'>
                    <input
                      id='title'
                      type='text'
                      value={title}
                      onChange={handleTitleChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded'
                      placeholder='Titre'
                      required
                    />
                  </div>
                  <div className='mb-4'>
                    <textarea
                      id='content'
                      value={content}
                      onChange={handleContentChange}
                      className='w-full h-60 px-3 py-2 border border-gray-300 rounded resize-none'
                      placeholder='Contenu'
                      required
                    />
                  </div>
                  <div className='flex justify-end'>
                    <Button
                      type='submit'
                      className='text-white px-4 py-2 rounded-md mr-2'
                    >
                      Sauvegarder
                    </Button>
                    <Button
                      type='button'
                      className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-600'
                      onClick={() => setIsEditing(false)}
                    >
                      Annuler
                    </Button>
                  </div>
                </form>
              ) : (
                <>
                  <h3 className='pb-2 text-lg'>{post.title}</h3>
                  <p>{post.content}</p>
                  <div className='flex justify-end mt-4'>
                    <Button
                      className='text-white px-4 py-2 rounded-md mr-2'
                      onClick={() => setIsEditing(true)}
                    >
                      Modifier
                    </Button>
                    <Button
                      className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-600'
                      onClick={handleDeleteClick}
                    >
                      Supprimer
                    </Button>
                  </div>
                </>
              )}
            </div>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default PostDetail;
