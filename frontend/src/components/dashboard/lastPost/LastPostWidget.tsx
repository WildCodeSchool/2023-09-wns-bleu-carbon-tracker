import { useEffect, useState } from 'react';
import Typography from '@/components/commons/typography/Typography';
import LastPostItem from './LastPostItem';
import AddPostModal from '@/components/modal/AddPostModal';
import { useUser } from '@/contexts/UserContext';
import { useGetAllPostsQuery } from '@/graphql/generated/schema';
import useWindowSize from '@/utils/useWindowSize';

type Props = {
  handleRefetch: () => void;
};

export default function LastPostsWidget({ handleRefetch }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();
  const { data } = useGetAllPostsQuery();
  const [postsToShow, setPostsToShow] = useState(1);
  const size = useWindowSize();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (size.width >= 1440) {
      setPostsToShow(3);
    } else if (size.width >= 1280) {
      setPostsToShow(2);
    } else {
      setPostsToShow(1);
    }
  }, [size]);

  const realPosts = data?.getAllPosts || [];
  const postsToDisplay = realPosts
    .slice(0, postsToShow)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  while (postsToDisplay.length < postsToShow) {
    postsToDisplay.push({
      id: -(postsToDisplay.length + 1),
      content: '',
      title: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return (
    <div className='h-full'>
      <Typography variant='heading'>Derniers posts</Typography>
      <div className='flex flex-row h-[88%] '>
        {postsToDisplay.map((post) => (
          <LastPostItem
            key={post.id}
            profilImg={
              user?.picture != null ? user.picture : '/icons/avatar.svg'
            }
            postContent={post.content}
          />
        ))}
        <div className='dashboardWidget flex flex-col w-full justify-center align-center mt-2'>
          <div className='flex justify-center m-5'>
            <button
              onClick={toggleModal}
              className='flex justify-center w-7/12'
            >
              <img src='/icons/cross.png' alt='new-post' />
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <AddPostModal
          onClose={toggleModal}
          refetchOnValidate={async () => {
            handleRefetch();
          }}
        />
      )}
      {isModalOpen && <div className='overlay'></div>}
    </div>
  );
}
