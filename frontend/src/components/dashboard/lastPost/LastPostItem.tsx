import React from 'react';

interface LastPostItemProps {
  profilImg: string;
  postContent: string;
}

const LastPostItem: React.FC<LastPostItemProps> = ({
  profilImg,
  postContent,
}) => {
  return (
    <div className='dashboardWidget flex flex-col w-full mt-2 mr-5'>
      <div className='flex flex-col justify-between align-center'>
        <div className='w-12 rounded-full mb-1'>
          <img src={profilImg} alt='profil picture' />
        </div>
        <div className='truncate-container w-full overflow-hidden'>
          <p className='text-ellipsis overflow-hidden whitespace-normal line-clamp-4'>
            {postContent}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LastPostItem;
