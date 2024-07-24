import { useState } from 'react';
import Typography from '@/components/commons/typography/Typography';
import LastPostItem from './LastPostItem';
import AddPostModal from '@/components/modal/AddPostModal';
import { useUser } from '@/contexts/UserContext';

type PartialPost = {
  id: number;
  title: string;
  content: string;
  createdAt: any;
  user: {
    id: string;
    name?: string | null;
    picture?: string | null;
  };
  likers?: any;
  updatedAt?: any;
  viewOnPost?: number;
};

type Props = {
  posts: PartialPost[];
  handleRefetchPosts: () => void;
  readOnly?: boolean;
};

export default function LastPostsWidget({
  posts,
  handleRefetchPosts,
  readOnly,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Trier les posts par date de création (du plus récent au plus ancien)
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  // Obtenir les trois derniers posts
  const lastPosts = sortedPosts.slice(0, 3);

  return (
    <div className='h-full'>
      <Typography variant='heading'>Derniers posts</Typography>
      <div className='flex flex-row h-[88%] '>
        {lastPosts.map((post) => (
          <LastPostItem
            key={post.id}
            profilImg={
              user?.picture != null ? user.picture : '/icons/avatar.svg'
            }
            postContent={post.content}
          />
        ))}
        {!readOnly ? (
          <div className='flex flex-col justify-center w-[200px] mt-2 dashboardWidget align-center'>
            <div className='flex justify-center m-5'>
              <button
                onClick={toggleModal}
                className='flex justify-center w-7/12'
              >
                <img src='/icons/cross.png' alt='new-post' />
              </button>
            </div>
          </div>
        ) : null}
      </div>
      {isModalOpen && (
        <AddPostModal
          onClose={toggleModal}
          refetchOnValidate={handleRefetchPosts}
        />
      )}
      {isModalOpen && <div className='overlay'></div>}
    </div>
  );
}
