import { useRouter } from 'next/router';
import {
  useGetSumByCategoryQuery,
  useGetSumByMonthQuery,
  useGetUserByNameQuery,
} from '@/graphql/generated/schema';
import Layout from '@/components/layout';
import CategoryChart from '@/components/dashboard/dataViz/CategoryChart';
import ByMonthChart from '@/components/dashboard/dataViz/ByMonthChart';
import LastPostWidget from '@/components/dashboard/lastPost/LastPostWidget';
import HeaderTotals from '@/components/listActivities/HeaderTotals';
import Typography from '@/components/commons/typography/Typography';

const ProfileStats = ({ userId }: { userId: string }) => {
  const { data: sumsByCategories, loading: loadingByCategory } =
    useGetSumByCategoryQuery({
      variables: { userId },
    });

  const { data: sumsByMonth, loading: loadingByMonth } = useGetSumByMonthQuery({
    variables: { userId },
  });

  const totalCO2 =
    sumsByCategories?.getSumByCategory.reduce((total, category) => {
      return total + category.sumKgCO2;
    }, 0) || 0;

  const RECOMMENDED_CO2_EMISSION = 2300;

  const percentOfRecommendedEmissions = Math.round(
    ((totalCO2 ?? 0) / RECOMMENDED_CO2_EMISSION) * 100,
  );

  return (
    <div className='w-full h-full'>
      <div className='w-full h-[35%] p-3 flex gap-4 items-center'>
        <div className='w-3/4 h-full dashboardWidget'>
          <h1 className='text-xl poppins-bold'>
            Répartition des émissons de CO2 par catégories
          </h1>

          <CategoryChart
            dataByCategory={sumsByCategories?.getSumByCategory ?? []}
            loading={loadingByCategory}
          />
        </div>
        <div className='flex flex-col items-center justify-center w-1/4 h-full dashboardWidget'>
          <div className='flex items-end'>
            <Typography customClass='text-4xl lg:text-3xl xl:text-5xl font-bold mr-1 text-medium_orange'>
              {totalCO2}
            </Typography>
            <Typography customClass='text-lg lg:text-xl xl:text-3xl font-bold text-dark_green'>
              kgCO2
            </Typography>
          </div>
          <div>
            <Typography customClass='text-md  font-bold text-medium_green'>
              {percentOfRecommendedEmissions} % du total annuel recommandé
            </Typography>
          </div>
        </div>
      </div>

      <div className='h-[28%]  p-3'>
        <div className='h-full dashboardWidget'>
          <div className='text-xl poppins-bold'>Dépenses annuelles</div>
          <ByMonthChart
            dataByMonth={sumsByMonth?.getSumByMonth ?? []}
            loading={loadingByMonth}
          />
        </div>
      </div>
      <div className='h-[28%]  p-3'>{<LastPostWidget readOnly />}</div>
    </div>
  );
};

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

  const { data, loading } = useGetUserByNameQuery({
    variables: {
      name: formattedUsername,
    },
  });

  return (
    <Layout title='Liste des activités'>
      <p className='p-4 text-2xl font-bold'>Profil de {formattedUsername}</p>
      <div className='flex h-screen text-black'>
        {!loading && data?.userByName && (
          <ProfileStats userId={data.userByName?.id} />
        )}
      </div>
    </Layout>
  );
}
