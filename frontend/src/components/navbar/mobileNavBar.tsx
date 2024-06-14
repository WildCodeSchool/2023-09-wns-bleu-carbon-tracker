import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Typography from '@/components/commons/typography/Typography';
import { LogoutQuery, LogoutQueryVariables } from '@/graphql/generated/schema';
import { LOGOUT } from '@/graphql/user/queries/auth.queries';

const Links = () => {
  const router = useRouter();
  const [logout] = useLazyQuery<LogoutQuery, LogoutQueryVariables>(LOGOUT);

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

  return (
    <div className='w-full mt-5'>
      <Link href='/' className='block p-2 max-w-fit'>
        <Typography variant='paragraph'>Home</Typography>
      </Link>
      <Link href='/activity-entries/list' className='block p-2 max-w-fit'>
        <Typography variant='paragraph'>Liste des dépenses</Typography>
      </Link>
      <Link href='/' className='block p-2 max-w-fit'>
        <Typography variant='paragraph'>Ecrire un post</Typography>
      </Link>
      <Link href='/donation' className='block p-2 max-w-fit'>
        <Typography variant='paragraph'>Faire un don</Typography>
      </Link>
      <Link href='/' className='block p-2 max-w-fit'>
        <Typography variant='paragraph'>Profil</Typography>
      </Link>
      <button className='block p-2 max-w-fit' onClick={handleLogout}>
        <Typography variant='paragraph'>Déconnexion</Typography>
      </button>
    </div>
  );
};

const NavLinks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navRef]);

  return (
    <>
      <nav className='flex w-full justify-end'>
        <div className='hidden w-full md:flex justify-between'>
          <Links />
        </div>
        <div className='md:hidden'>
          <button className='absolute right-5 z-50' onClick={toggleNavbar}>
            {isOpen ? <X className='text-white' /> : <Menu />}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div
          ref={navRef}
          className='absolute top-0 left-0 w-full bg-black z-30'
        >
          <div className='logo-mobile w-52 absolute top-1.5 p-5'>
            <img src='/icons/mobile-logo.png' alt='Mobile Logo' />
          </div>
          <div className='flex flex-col items-start w-full p-5 mt-12 text-white'>
            <Links />
          </div>
        </div>
      )}
    </>
  );
};

const MobileNavBar = () => {
  return (
    <header className='flex sticky top-0 z-20 text-black mx-auto flex-wrap w-full items-center justify-between p-5'>
      <NavLinks />
    </header>
  );
};

export default MobileNavBar;
