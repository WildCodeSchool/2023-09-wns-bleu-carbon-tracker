import Link from 'next/link';
import { useState } from 'react';
import Typography from '@/components/commons/typography/Typography';
// import { useRouter } from 'next/router';

export default function navbar() {
  // const router = useRouter();

  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const handleMouseEnter = (image: string) => {
    setHoveredImage(image);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  return (
    <>
      <div className='flex items-center justify-center h-screen'>
        <div className='flex flex-col h-[95vh] bg-black text-white w-36 rounded-3xl'>
          <div className='logo flex items-center justify-center relative mt-5'>
            <Link href='/' className='logo'>
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
            <Link
              href='/'
              className='nav-link flex justify-around hover:bg-white hover:rounded-s-full w-full pt-2 pb-2'
              onMouseEnter={() =>
                handleMouseEnter('/icons/home-icon-hover.png')
              }
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={
                  hoveredImage === '/icons/home-icon-hover.png'
                    ? hoveredImage
                    : '/icons/home-icon.png'
                }
                alt='Home'
                className='w-10 mr-5'
              />
            </Link>
            <Link
              href='/'
              className='nav-link flex justify-around hover:bg-white hover:rounded-s-full w-full pt-2 pb-2'
              onMouseEnter={() => handleMouseEnter('/icons/co2-icon-hover.png')}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={
                  hoveredImage === '/icons/co2-icon-hover.png'
                    ? hoveredImage
                    : '/icons/co2-icon.png'
                }
                alt='Activities'
                className='w-10 mr-5'
              />
            </Link>
            <Link
              href='/'
              className='nav-link flex justify-around hover:bg-white hover:rounded-s-full w-full pt-2 pb-2'
              onMouseEnter={() =>
                handleMouseEnter('/icons/write-icon-hover.png')
              }
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={
                  hoveredImage === '/icons/write-icon-hover.png'
                    ? hoveredImage
                    : '/icons/write-icon.png'
                }
                alt='Add activity'
                className='w-10 mr-5'
              />
            </Link>
            <Link
              href='/'
              className='nav-link flex justify-around hover:bg-white hover:rounded-s-full w-full pt-2 pb-2'
              onMouseEnter={() =>
                handleMouseEnter('/icons/donation-icon-hover.png')
              }
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={
                  hoveredImage === '/icons/donation-icon-hover.png'
                    ? hoveredImage
                    : '/icons/donation-icon.png'
                }
                alt='Donation'
                className='w-10 mr-5'
              />
            </Link>
            <Link
              href='/'
              className='nav-link flex justify-around hover:bg-white hover:rounded-s-full w-full pt-2 pb-2'
              onMouseEnter={() =>
                handleMouseEnter('/icons/logout-icon-hover.png')
              }
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={
                  hoveredImage === '/icons/logout-icon-hover.png'
                    ? hoveredImage
                    : '/icons/logout-icon.png'
                }
                alt='Logout'
                className='w-10 mr-5'
              />
            </Link>
            <Link href='/' className='nav-link flex justify-around'>
              <label
                tabIndex={0}
                className='btn btn-ghost btn-circle avatar w-full mr-5'
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
    </>
  );
}
