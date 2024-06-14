import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import Typography from '@/components/commons/typography/Typography';
import AddActivityModal from '../modal/AddActivityModal';
import { LogoutQuery, LogoutQueryVariables } from '@/graphql/generated/schema';
import { LOGOUT } from '@/graphql/user/queries/auth.queries';

export default function navbar() {
  const router = useRouter();
  const [hoveredLink, setHoveredLink] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logout] = useLazyQuery<LogoutQuery, LogoutQueryVariables>(LOGOUT);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
    logout()
      .then((response) => {
        if (response.data) {
          router.push('/auth/login');
        }
      })
      .catch((err) => {
        console.error('Logout failed', err);
      });
  };

  const navLink = [
    {
      name: 'home',
      link: '/',
      img: '/icons/home-icon.png',
      imgHover: '/icons/home-icon-hover.png',
    },
    {
      name: 'activities',
      link: '/activity-entries/list',
      img: '/icons/co2-icon.png',
      imgHover: '/icons/co2-icon-hover.png',
    },
  ];

  return (
    <>
      <div className='flex items-center justify-center h-screen ml-5 mr-5'>
        <div className='flex flex-col h-[98vh] bg-black text-white w-36 rounded-3xl'>
          <div className='logo flex items-center justify-center relative mt-5'>
            <Link href='/'>
              <svg
                width='100'
                height='100'
                viewBox='0 0 100 100'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx='50' cy='50' r='45' fill='white' />
              </svg>
              <img
                src='/icons/logo.png'
                alt='Logo'
                className='logo-image absolute top-11 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-12'
              />
            </Link>
          </div>
          <div className='nav-links flex flex-col flex-grow items-center justify-around pl-6'>
            {navLink.map(({ link, name, img, imgHover }) => (
              <Link
                key={name}
                href={link}
                className={`${router.pathname === link ? 'bg-white rounded-s-full' : ''} nav-link flex justify-around w-full pt-2 pb-2 hover:bg-white hover:rounded-s-full`}
                onMouseEnter={() => setHoveredLink(name)}
                onMouseLeave={() => setHoveredLink('')}
              >
                <img
                  src={`${router.pathname === link || hoveredLink === name ? imgHover : img}`}
                  alt={name}
                  className='w-10 mr-5'
                />
              </Link>
            ))}

            <button
              className={`${isModalOpen ? 'bg-white rounded-s-full' : ''} nav-link flex justify-around w-full pt-2 pb-2 hover:bg-white hover:rounded-s-full`}
              onMouseEnter={() => setHoveredLink('new-activity')}
              onMouseLeave={() => setHoveredLink('')}
            >
              <img
                src={`${isModalOpen || hoveredLink === 'new-activity' ? '/icons/write-icon-hover.png' : '/icons/write-icon.png'}`}
                alt='new-activity'
                className='w-10 mr-5'
              />
            </button>
            <Link
              key='donation'
              href='/donation'
              className={`${router.pathname === '' ? 'bg-white rounded-s-full' : ''} nav-link flex justify-around w-full pt-2 pb-2 hover:bg-white hover:rounded-s-full`}
              onMouseEnter={() => setHoveredLink('donation')}
              onMouseLeave={() => setHoveredLink('')}
            >
              <img
                src={`${router.pathname === '' || hoveredLink === 'donation' ? '/icons/donation-icon-hover.png' : '/icons/donation-icon.png'}`}
                alt={'donation'}
                className='w-10 mr-5'
              />
            </Link>
            <button
              key='logout'
              onClick={handleLogout}
              className={`${router.pathname === '/auth/login' ? 'bg-white rounded-s-full' : ''} nav-link flex justify-around w-full pt-2 pb-2 hover:bg-white hover:rounded-s-full`}
              onMouseEnter={() => setHoveredLink('logout')}
              onMouseLeave={() => setHoveredLink('')}
            >
              <img
                src={`${router.pathname === '/auth/login' || hoveredLink === 'logout' ? '/icons/logout-icon-hover.png' : '/icons/logout-icon.png'}`}
                alt={'logout'}
                className='w-10 mr-5'
              />
            </button>

            <Link
              key={'profile'}
              href={'/profile'}
              className='nav-link flex justify-around'
            >
              <label
                tabIndex={0}
                className='btn btn-ghost btn-circle avatar w-full pr-5'
              >
                <div className='w-12 rounded-full'>
                  <img src='/icons/avatar.svg' alt='profil picture' />
                </div>
                <Typography variant='paragraph'>John Doe</Typography>
              </label>
            </Link>
          </div>
        </div>
      </div>
      {isModalOpen && <AddActivityModal onClose={toggleModal} />}
      {isModalOpen && <div className='overlay'></div>}
    </>
  );
}
