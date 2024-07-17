import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_POST } from '@/graphql/posts/queries/queries';
import { Post } from '@/graphql/generated/schema';
import Layout from '@/components/layout';

const PostDetail = () => {
  const router = useRouter();
  const { postId } = router.query;

  const postIdFloat = parseFloat(postId as string);

  const { loading, error, data } = useQuery<{ getPostById: Post }>(GET_POST, {
    variables: { postId: postIdFloat },
  });

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
            className='bg-white shadow-md rounded-md p-6 mb-4 flex cursor-pointer hover:bg-gray-100 transition'
            key={post.id}
          >
            <div className='flex items-center w-1/4'>
              <img
                src='https://picsum.photos/50'
                alt='Profile picture'
                className='w-14 rounded-full mr-2'
              />
              <div className='flex flex-col'>
                <h4 className='text-lg font-bold'>John Doe</h4>{' '}
                <p className='text-gray-600 text-sm'>
                  Publié le
                  {new Date(post.createdAt).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
            <div className='flex-grow pl-4'>
              <h3 className='pb-2 text-lg'>{post.title}</h3>
              <p>{post.content}</p>
            </div>
            <div className='flex items-center mt-4'>
              <button className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600'>
                Modifier
              </button>
              <button className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'>
                Supprimer
              </button>
            </div>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default PostDetail;
