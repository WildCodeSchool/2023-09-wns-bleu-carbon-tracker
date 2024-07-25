/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-syntax */

import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import Layout from '@/components/layout';
import {
  useUpdateUserMutation,
  useChangePasswordMutation,
  useDeleteUserMutation,
} from '@/graphql/generated/schema';
import Button from '@/components/commons/buttons/Button';
import GenericFormModal from '@/components/modal/GenericFormModal';
import Typography from '@/components/commons/typography/Typography';
import uploadImage from '@/uploadImage';

export default function Profile() {
  const { user, setUser } = useUser();
  const [imageSrc, setImageSrc] = useState<string>(
    user?.picture != null ? user.picture : '/icons/avatar.svg',
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [updateUser] = useUpdateUserMutation();
  const [changePassword] = useChangePasswordMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const form = new FormData();
    const file = e.target.files?.[0];
    if (file) {
      form.append('file', file);
      try {
        const res = await uploadImage(file);
        let imageUrl = '';
        if (res) imageUrl = res.data.url;
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

  const handleNameUpdate = async () => {
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
  const handleDeleteAccount = async () => {
    try {
      await deleteUser({
        variables: {
          password: deletePassword,
        },
      });
      setUser(null);
      localStorage.removeItem('user');
      window.location.href = '/auth/login';
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
      <div className='w-full flex flex-col p-10 pb-0 max-[1710px]:p-2'>
        <div className='dashboardWidget h-[15vh] max-h-[128px] flex justify-between items-center mb-2'>
          <Typography customClass='text-4xl font-bold text-dark_green max-lg:text-3xl'>
            Mon profil
          </Typography>
        </div>
        <div className='flex flex-row'>
          <div className='dashboardWidget w-full'>
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
                  onChange={handleFileChange}
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

            <div className='text-center flex flex-col items-center'>
              {user?.name ? (
                <>
                  <p className='mt-3 font-poppins text-xl font-bold pb-2 text-black'>
                    {user.name}
                  </p>
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className='mt-2 bg-lime-700 w-2/5'
                  >
                    Modifier le nom
                  </Button>
                </>
              ) : (
                <>
                  <p>Veuillez saisir votre Nom</p>
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className='mt-2 bg-blue-500 w-2/5'
                  >
                    Ajouter un nom
                  </Button>
                </>
              )}
              <Button
                onClick={() => setIsPasswordModalOpen(true)}
                className='mt-2 bg-lime-700 w-2/5'
              >
                Modifier mon mot de passe
              </Button>
              <Button
                onClick={() => setIsDeleteModalOpen(true)}
                className='mt-2 bg-red-600 w-2/5'
              >
                Supprimer mon compte
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <GenericFormModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleNameUpdate}
          title='Modifier le nom'
        >
          <input
            type='text'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
          />
        </GenericFormModal>
      )}
      {isModalOpen && <div className='overlay'></div>}
      {isPasswordModalOpen && (
        <GenericFormModal
          onClose={() => setIsPasswordModalOpen(false)}
          onSubmit={handleChangePassword}
          title='Changer mon mot de passe'
        >
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
        </GenericFormModal>
      )}
      {isPasswordModalOpen && <div className='overlay'></div>}
      {isDeleteModalOpen && (
        <GenericFormModal
          onClose={() => setIsDeleteModalOpen(false)}
          onSubmit={handleDeleteAccount}
          title='Supprimer mon compte'
        >
          <label
            htmlFor='deletePassword'
            className='text-sm font-medium text-gray-700'
          >
            Mot de passe
          </label>
          <input
            type='password'
            id='deletePassword'
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
          />
          {error && <p className='mt-2 text-red-500'>{error}</p>}
        </GenericFormModal>
      )}
      {isDeleteModalOpen && <div className='overlay'></div>}
    </Layout>
  );
}
