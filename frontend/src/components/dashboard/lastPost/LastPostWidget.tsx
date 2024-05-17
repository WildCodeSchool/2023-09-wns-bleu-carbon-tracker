import Link from 'next/link';
import Typography from '@/components/commons/typography/Typography';
import LastPostItem from './LastPostItem';

export default function LastActivitiesListWidget() {
  return (
    <div className='h-full'>
      <Typography variant='heading'>Derniers posts</Typography>
      <div className='flex flex-row h-[88%]'>
        <LastPostItem
          profilImg='/icons/avatar.svg'
          postContent=' Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                aut, accusantium nemo facilis omnis perspiciatis incidunt
                dolores aliquam nesciunt dolore, et culpa laboriosam porro
                eligendi totam minima vitae non voluptas?'
        />
        <LastPostItem
          profilImg='/icons/avatar.svg'
          postContent=' Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                aut, accusantium nemo facilis omnis perspiciatis incidunt
                dolores aliquam nesciunt dolore, et culpa laboriosam porro
                eligendi totam minima vitae non voluptas?'
        />
        <div className='dashboardWidget flex flex-col w-full justify-center align-center mt-2'>
          <div className='flex justify-center m-5'>
            <Link href='/' className='flex justify-center w-7/12'>
              <img src='/icons/cross.png' alt='new-post' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
