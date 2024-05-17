import { useState, FormEvent, useEffect } from 'react';

import Layout from '@/components/layout';

interface ProfileProps {
  email: string;
  password: string;
  newPassword: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileProps>({
    email: 'example@gmail.com',
    password: '',
    newPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Logique de mise à jour du profil
  };

  // useEffect(() => {
  //   console.log('oui');
  //   const userId = '0d9b89a7-7dd7-462b-8adf-3bd07119f764';
  //   getUserData({
  //     variables: {
  //       userByIdId: userId,
  //     },
  //     onCompleted(result) {
  //       // eslint-disable-next-line no-restricted-syntax
  //       console.log('result', result);
  //     },
  //   });
  // }, []);

  return (
    <Layout title='Profile'>
      <div className='container max-w-md p-4'>
        <h1 className='mb-5 poppins-bold'>Mon profile</h1>
        <p className='mb-10'>editer, modifier mon profile</p>
        <div className='dashboardWidget mb-3'>
          <h2 className='mb-5 '>Changer ma photo de profile</h2>
          <div className='flex'>
            <div className='w-20 rounded-full'>
              <img src='/icons/avatar.svg' alt='profil picture' />
            </div>
            <button>Télécharger</button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='flex flex-col dashboardWidget'>
            <h2 className='mb-5'>Changer mon mot de passe</h2>
            <label
              htmlFor='password'
              className='text-sm font-medium text-gray-700'
            >
              Ancien mot de passe
            </label>
            <input
              type='password'
              name='password'
              value={profile.password}
              onChange={handleInputChange}
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
                value={profile.newPassword}
                onChange={handleInputChange}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
          </div>

          <button
            type='submit'
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Sauvegarder
          </button>
        </form>
      </div>
    </Layout>
  );
}
