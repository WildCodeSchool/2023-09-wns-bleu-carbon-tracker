/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-syntax */

import axios from 'axios';
import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import Layout from '@/components/layout';
import {
  useUpdateUserMutation,
  useChangePasswordMutation,
} from '@/graphql/generated/schema';

export default function Profile() {
  const { user, setUser } = useUser();
  const [imageSrc, setImageSrc] = useState<string>(
    user?.picture != null ? user.picture : '/icons/avatar.svg',
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [updateUser] = useUpdateUserMutation();
  const [changePassword] = useChangePasswordMutation();
  const [error, setError] = useState<string | null>(null);

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
        const updatedUser = await updateUser({
          variables: {
            picture: imageUrl,
          },
        });
        if (updatedUser?.data?.updateUser && user != null) {
          setUser({
            ...user,
            picture: updatedUser?.data?.updateUser.picture ?? null,
          });
        }
        setImageSrc(updatedUser?.data?.updateUser.picture ?? '');
      } catch (error) {
        console.error('Error uploading file or updating user picture:', error);
      }
    }
  };

  const handleUpdateName = async () => {
    try {
      const updatedUser = await updateUser({
        variables: {
          name: newName,
        },
      });
      if (updatedUser?.data?.updateUser && user != null) {
        setUser({
          ...user,
          name: updatedUser?.data?.updateUser.name ?? null,
        });
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...user,
            name: updatedUser?.data?.updateUser.name ?? null,
          }),
        );
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating user name:', error);
    }
  };

  const handleChangePassword = async () => {
    try {
      await changePassword({
        variables: {
          oldPassword,
          newPassword,
        },
      });
      setOldPassword('');
      setNewPassword('');
      setError(null);
      setIsPasswordModalOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
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
          <div className='flex justify-center'>
            <div className='relative inline-block'>
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
                className='absolute bottom-0 right-0 bg-lime-700 rounded-full p-2 cursor-pointer shadow-md hover:bg-black'
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
            <div className='text-center flex-col'>
              <p className='mt-3 font-poppins text-xl font-bold pb-2 text-black'>
                {user.name}
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className='mt-2 px-4 py-2 bg-lime-700 text-white rounded-md'
              >
                Modifier le nom
              </button>
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className='mt-2 px-4 py-2  bg-lime-700 text-white rounded-md'
              >
                Modifier mon mot de passe
              </button>
            </div>
          ) : (
            <div className='text-center'>
              <p>Veuillez saisir votre Nom</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-md'
              >
                Ajouter un nom
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modale pour modifier le nom */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-md'>
            <h2 className='mb-4 text-lg font-bold'>Modifier le nom</h2>
            <input
              type='text'
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
            />
            <div className='mt-4 flex justify-end'>
              <button
                onClick={() => setIsModalOpen(false)}
                className='mr-2 px-4 py-2 bg-gray-500 text-white rounded-md'
              >
                Annuler
              </button>
              <button
                onClick={handleUpdateName}
                className='px-4 py-2 bg-lime-700 text-white rounded-md'
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modale pour modifier le mot de passe */}
      {isPasswordModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-md'>
            <h2 className='mb-4 text-lg font-bold'>Changer mon mot de passe</h2>
            <label
              htmlFor='oldPassword'
              className='text-sm font-medium text-gray-700'
            >
              Ancien mot de passe
            </label>
            <input
              type='password'
              id='oldPassword'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
            />
            <label
              htmlFor='newPassword'
              className='text-sm font-medium text-gray-700 mt-4'
            >
              Nouveau mot de passe
            </label>
            <input
              type='password'
              id='newPassword'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md'
            />
            {error && <p className='mt-2 text-red-500'>{error}</p>}
            <div className='mt-4 flex justify-end'>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className='mr-2 px-4 py-2 bg-gray-500 text-white rounded-md'
              >
                Annuler
              </button>
              <button
                onClick={handleChangePassword}
                className='px-4 py-2 bg-lime-700 text-white rounded-md'
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
