/* eslint-disable no-restricted-syntax */

import axios from 'axios';
import { useState } from 'react';
import { useUser } from '../contexts/UserContext';

import Layout from '@/components/layout';
import { useUpdateUserMutation } from '@/graphql/generated/schema';

export default function Profile() {
  const { user, setUser } = useUser();
  const [imageSrc, setImageSrc] = useState<string>(
    user?.picture != null ? user.picture : '/icons/avatar.svg',
  );
  const [updateUser] = useUpdateUserMutation();

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const form = new FormData();
    const file = e.target.files?.[0];
    if (file) {
      form.append('file', file);
      try {
        const res = await axios.post('http://localhost:8000/uploads', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const imageUrl: string = res.data.url;
        console.log(imageUrl);

        const updatedUser = await updateUser({
          variables: {
            picture: imageUrl,
          },
        });
        if (updatedUser?.data?.updateUser && user != null)
          setUser({
            ...user,
            picture: updatedUser?.data?.updateUser.picture ?? null,
          });
        console.log('User picture updated:', updatedUser);
        setImageSrc(updatedUser?.data?.updateUser.picture ?? '');
      } catch (error) {
        console.error('Error uploading file or updating user picture:', error);
      }
    }
  };

  return (
    <Layout title='Profile'>
      <div className='container max-w-md p-4'>
        <h1 className='mt-3 font-poppins text-xl font-bold pb-2 text-black'>
          Mon profil
        </h1>
        <p className='mb-5 text-sm font-medium leading-6 text-gray-900'>
          editer, modifier mon profile
        </p>

        <div className='dashboardWidget mb-3'>
          <div className='flex-col mb-5'>
            <div className='relative '>
              <img
                src={imageSrc}
                alt='profile picture'
                className='object-cover w-40 h-40 rounded-full mb-5'
              />
              <input
                type='file'
                id='file-input'
                className='hidden'
                onChange={handleChangeFile}
              />
              <label
                htmlFor='file-input'
                className='absolute bottom-0 left-0 bg-lime-700 rounded-full p-2 cursor-pointer shadow-md hover:bg-black'
              >
                <img
                  src='/icons/modify.png'
                  alt='Edit icon'
                  className='w-6 h-6'
                />
              </label>
            </div>
          </div>

          {user?.name ? (
            <p>{user.name}</p>
          ) : (
            <div>
              <p>Veuillez saisir votre Nom</p>
              <input
                type='name'
                name='name'
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
          )}
        </div>
        <form className='space-y-6'>
          <div className='flex flex-col dashboardWidget'>
            <h2 className='mb-5 font-poppins font-semibold text-sm'>
              Changer mon mot de passe
            </h2>
            <label
              htmlFor='password'
              className='text-sm font-medium text-gray-700'
            >
              Ancien mot de passe
            </label>
            <input
              type='password'
              name='password'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
            />

            <div className='flex flex-col mb-3'>
              <label
                htmlFor='newPassword'
                className='text-sm font-medium text-gray-700'
              >
                Nouveau mot de passe
              </label>
              <input
                type='password'
                name='newPassword'
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
