import { ReactNode } from 'react';
import Image from 'next/image';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className='fixed top-0 left-0 flex w-screen h-screen px-20 py-32 text-black 2xl:px-60'>
      <div className='items-center justify-end hidden w-1/2 h-full pr-10 lg:flex'>
        <div>
          <Image
            src='/login-img.webp'
            alt='User on computer with carbon footprint tracking app'
            width={500}
            height={500}
            className='rounded-xl'
            style={{ width: '100%', height: 'auto' }}
            priority
          />
        </div>
      </div>
      <div className='flex items-center justify-center w-full h-full pl-10 lg:justify-start lg:w-1/2 lg:pb-10 xl:pb-16'>
        {children}
      </div>
    </main>
  );
}
