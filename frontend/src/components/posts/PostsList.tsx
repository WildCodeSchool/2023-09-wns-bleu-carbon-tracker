import React from 'react';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';
import Button from '../commons/buttons/Button';
import InputCheckbox from '../commons/inputs/InputCheckbox';
import { Post } from '@/types';

type Props = {
  handleToggleCurrentUserPosts: (value: boolean) => void;
  handleLoadMore: () => void;
  currentUserPosts: boolean;
  paginatedPosts: Post[];
  hideLoadMoreButton: boolean;
};
const PostsList = ({
  currentUserPosts,
  paginatedPosts,
  hideLoadMoreButton,
  handleToggleCurrentUserPosts,
  handleLoadMore,
}: Props) => {
  const { user } = useUser();

  return (
    <div className='container mx-auto mt-8 w-3/4'>
      <h2 className='flex justify-center text-2xl font-bold pb-6'>
        Publications des usagers
      </h2>
      <div>
        <InputCheckbox
          label='Afficher uniquement mes posts'
          id='togglePost'
          checked={currentUserPosts}
          onChange={() => handleToggleCurrentUserPosts(!currentUserPosts)}
        />
      </div>
      <ul className='list-none max-h-96 overflow-y-auto'>
        {(paginatedPosts ?? []).map((post) => (
          <>
            <a className='block'>
              <li className='bg-white shadow-md rounded-md p-6 mb-4 flex flex-col md:flex-row cursor-pointer hover:bg-gray-100 transition'>
                <div className='flex-shrink-0 mb-4 mr-8 md:mb-0 md:w-1/4 md:pr-6'>
                  <img
                    src={post?.user.picture ?? '/icons/avatar.svg'}
                    alt='Profile picture'
                    className='w-14 h-14 rounded-full object-cover mr-4'
                  />
                  <div className='flex flex-col'>
                    <h4 className='text-lg font-bold'>
                      {post.user.name ?? 'Anonyme'}
                    </h4>
                    <p className='text-gray-600 text-sm'>
                      Publié le{' '}
                      {new Date(post.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className='flex-grow flex flex-col'>
                  <h3 className='pb-2 text-lg'>{post.title}</h3>
                  <p className='text-gray-800 flex-grow'>
                    {post.content.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                  {user?.id === post.user.id && (
                    <div className='flex justify-end mt-4'>
                      <Link
                        legacyBehavior
                        href={`/posts/${post.id}`}
                        key={post.id}
                      >
                        <Button className='w-1/5'>Modifier</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </li>
            </a>
          </>
        ))}
        {!hideLoadMoreButton && (
          <div className='m-2 flex justify-center'>
            <Button onClick={() => handleLoadMore()}>Voir plus</Button>
          </div>
        )}
      </ul>
    </div>
  );
};

export default PostsList;
