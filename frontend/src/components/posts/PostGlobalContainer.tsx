import { useEffect, useState } from 'react';

import PostsList from './PostsList';
import { useGetPaginatedPostsQuery } from '@/graphql/generated/schema';
import { useUser } from '@/contexts/UserContext';
import CreatePost from './CreatePost';

export default function PostGlobalContainer() {
  const { user } = useUser();
  const [skip, setSkip] = useState(0);
  const [currentUserPosts, setCurrentUserPosts] = useState(false);
  const take = 15;
  const { data, loading, fetchMore, refetch, error } =
    useGetPaginatedPostsQuery({
      variables: {
        skip,
        take,
        userId: currentUserPosts === true ? user?.id : undefined,
      },
      fetchPolicy: 'network-only',
    });

  const [paginatedPosts, setPaginatedPosts] = useState(data?.getPaginatedPosts);

  useEffect(() => {
    if (data?.getPaginatedPosts) {
      if (skip === 0) {
        setPaginatedPosts(data.getPaginatedPosts);
      } else {
        setPaginatedPosts((prev) => [
          ...(prev ?? []),
          ...data.getPaginatedPosts,
        ]);
      }
    }
  }, [data?.getPaginatedPosts]);

  useEffect(() => {
    setPaginatedPosts([]);
    setSkip(0);
    refetch();
  }, [currentUserPosts]);
  const handleLoadMore = () => {
    if (!loading) {
      const newSkip = skip + take;
      fetchMore({
        variables: {
          skip: newSkip,
          take,
        },
      });
      setSkip(newSkip);
      setPaginatedPosts(data?.getPaginatedPosts ?? []);
    }
  };
  const hideLoadMoreButton =
    data?.getPaginatedPosts.length !== undefined &&
    data?.getPaginatedPosts.length < take;
  return (
    <div>
      <CreatePost
        handleRefetch={async () => {
          await refetch();
        }}
      />
      <PostsList
        currentUserPosts={currentUserPosts}
        handleLoadMore={() => handleLoadMore()}
        handleToggleCurrentUserPosts={(value) => setCurrentUserPosts(value)}
        hideLoadMoreButton={hideLoadMoreButton}
        paginatedPosts={paginatedPosts ?? []}
      />
    </div>
  );
}
