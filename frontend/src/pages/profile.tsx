// import { useState } from 'react'
import axios from 'axios';
import { useUser } from '../contexts/UserContext';

import Layout from '@/components/layout';
// import {
//   GetUserbyIdQuery,
//   useGetUserbyIdQuery,
// } from '@/graphql/generated/schema';

export default function Profile() {
  // const [userData, setUserData] = useState<GetUserbyIdQuery['userById'] | null>(
  //   null,
  // );
  const { user } = useUser();
  // const fetchData = async () => {
  //   try {
  //     const { data } = await useGetUserbyIdQuery({
  //       variables: {
  //         userByIdId: '0d9b89a7-7dd7-462b-8adf-3bd07119f764',
  //       },
  //     });
  //     if (data) {
  //       setUserData(data.userById);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // fetchData();
  // eslint-disable-next-line no-restricted-syntax
  console.log(user);

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
          <h2 className='mb-5 font-poppins font-semibold text-sm'>
            Changer ma photo de profi
          </h2>
          <div className='flex mb-5'>
            <div className='w-20 rounded-full mr-3'>
              <img
                src={user?.picture ? user.picture : '/icons/avatar.svg'}
                alt='profil picture'
              />
            </div>
            <div className='flex items-end'>
              <input
                type='file'
                onChange={(e) => {
                  const form = new FormData();
                  const file = e.target.files?.[0];
                  if (file) {
                    form.append('file', file);
                    axios
                      .post('http://localhost:8000/uploads', file)
                      .then((res) => {
                        // eslint-disable-next-line no-restricted-syntax
                        console.log(res.data);
                      })
                      .catch(console.error);
                  }
                }}
              />
              <button className='rounded-xl bg-medium_green text-sm font-semibold cursor-pointer text-white shadow-sm transition-colors duration-300 ease-in-out p-2 hover:bg-light_green'>
                Télécharger
              </button>
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
          <button
            type='submit'
            className='rounded-xl bg-medium_green text-sm font-semibold cursor-pointer text-white shadow-sm transition-colors duration-300 ease-in-out hover:bg-light_green px-4 py-2.5 mt-2'
          >
            {user?.email}
          </button>
        </form>
      </div>
    </Layout>
  );
}
