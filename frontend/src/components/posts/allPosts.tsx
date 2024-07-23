import React, { useEffect } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '@/graphql/posts/queries/post.queries';
import { Post } from '@/graphql/generated/schema';

const Posts = () => {
  const { loading, error, data, refetch } = useQuery<{ getAllPosts: Post[] }>(
    GET_ALL_POSTS,
  );

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     refetch();
  //   });

  //   return () => clearInterval(interval);
  // }, [refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='container mx-auto mt-8 w-3/4'>
      <h2 className='flex justify-center text-2xl font-bold pb-6'>
        Publications des usagers
      </h2>
      <ul className='list-none'>
        {data?.getAllPosts.map((post) => (
          <Link legacyBehavior href={`/posts/${post.id}`} key={post.id}>
            <a className='block'>
              <li className='bg-white shadow-md rounded-md p-6 mb-4 flex flex-col md:flex-row cursor-pointer hover:bg-gray-100 transition'>
                <div className='flex items-center mb-4 mr-8 md:mb-0 md:w-1/4 md:pr-6'>
                  <img
                    src='https://picsum.photos/50'
                    alt='Profile picture'
                    className='w-14 rounded-full mr-4'
                  />
                  <div className='flex flex-col'>
                    <h4 className='text-lg font-bold'>John Doe</h4>
                    <p className='text-gray-600 text-sm'>
                      Publié le{' '}
                      {new Date(post.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className='flex-grow pl-0 md:pl-6'>
                  <h3 className='pb-2 text-lg'>{post.title}</h3>
                  <p>{post.content}</p>
                </div>
              </li>
            </a>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
