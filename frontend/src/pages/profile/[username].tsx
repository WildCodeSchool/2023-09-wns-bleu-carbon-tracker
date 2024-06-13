import { useRouter } from 'next/router';
import { useGetUserByNameQuery } from '@/graphql/generated/schema';
import Layout from '@/components/layout';

export default function Profile() {
  const router = useRouter();
  const { username } = router.query;

  const formatUsername = (
    usernameParams: string | string[] | undefined,
  ): string => {
    if (Array.isArray(usernameParams)) {
      return usernameParams.map((name) => name.replace('-', ' ')).join(' ');
    }
    return usernameParams ? usernameParams.replace('-', ' ') : '';
  };

  const formattedUsername = formatUsername(username);

  const { data, loading, error } = useGetUserByNameQuery({
    variables: {
      name: formattedUsername,
    },
  });

  if (loading) return null;

  return (
    <Layout title='Liste des activités'>
      <p>
        {formattedUsername} {username}
      </p>
    </Layout>
  );
}
