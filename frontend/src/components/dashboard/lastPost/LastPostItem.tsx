import React from 'react';
import useWindowSize from '@/utils/useWindowSize';

interface LastPostItemProps {
  profilImg: string;
  postContent: string;
}

const LastPostItem: React.FC<LastPostItemProps> = ({
  profilImg,
  postContent,
}) => {
  const { width, height } = useWindowSize();

  let lineClamp = 2;
  if (width >= 1440 && height >= 850) {
    lineClamp = 4;
  } else if (width >= 800 && height >= 750) {
    lineClamp = 3;
  } else if (width <= 767) {
    lineClamp = 4;
  } else {
    lineClamp = 2;
  }
  return (
    <div className='dashboardWidget flex flex-col w-full mt-2 mr-5'>
      <div className='flex flex-col justify-between align-center'>
        <div className='w-12 rounded-full mb-1'>
          <img src={profilImg} alt='profil picture' />
        </div>
        <div className='truncate-container w-full overflow-hidden'>
          <p
            className={`text-ellipsis overflow-hidden whitespace-normal line-clamp-${lineClamp}`}
          >
            {postContent.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LastPostItem;
