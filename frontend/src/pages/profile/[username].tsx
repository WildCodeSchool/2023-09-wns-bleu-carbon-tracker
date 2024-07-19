import { useRouter } from 'next/router';
import { useGetUserByNameQuery } from '@/graphql/generated/schema';
import Layout from '@/components/layout';
import CategoryChart from '@/components/dashboard/dataViz/CategoryChart';
import ByMonthChart from '@/components/dashboard/dataViz/ByMonthChart';
import LastPostWidget from '@/components/dashboard/lastPost/LastPostWidget';

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
      <p className='p-4 text-2xl font-bold'>Profil de {formattedUsername}</p>
      <div className='flex h-screen text-black'>
        <div className='w-full h-full'>
          <div className='w-full h-[35%] p-3 flex gap-4 items-center'>
            <div className='w-3/4 h-full dashboardWidget'>
              <h1 className='text-xl poppins-bold'>
                Répartition des émissons de CO2 par catégories
              </h1>

              <CategoryChart userId={data?.userByName?.id} />
            </div>
            <div className='w-1/4 h-full dashboardWidget'></div>
          </div>

          <div className='h-[28%]  p-3'>
            <div className='h-full dashboardWidget'>
              <div className='text-xl poppins-bold'>Dépenses annuelles</div>
              <ByMonthChart userId={data?.userByName?.id} />
            </div>
          </div>
          <div className='h-[28%]  p-3'>{<LastPostWidget readOnly />}</div>
        </div>
      </div>
    </Layout>
  );
}
