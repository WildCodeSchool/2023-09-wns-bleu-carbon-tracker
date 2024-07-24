import {
  useGetAllPostsQuery,
  useGetSumByCategoryQuery,
  useGetSumByMonthQuery,
} from '@/graphql/generated/schema';
import ByMonthChart from './dataViz/ByMonthChart';
import CategoryChart from './dataViz/CategoryChart';
import LastActivitiesListWidget from './lastActivitiesList/LastActivitiesListWidget';
import LastPostWidget from './lastPost/LastPostWidget';
import Button from '../commons/buttons/Button';
import { useUser } from '@/contexts/UserContext';
import { useAlert } from '@/contexts/AlertContext';

export default function DashboardLayout() {
  const { showAlert } = useAlert();
  const { user } = useUser();

  const {
    data: sumsByCategories,
    loading: loadingByCategory,
    refetch: refetchTotalsByCategories,
  } = useGetSumByCategoryQuery();

  const {
    data: sumsByMonth,
    loading: loadingByMonth,
    refetch: refetchTotalsByMonth,
  } = useGetSumByMonthQuery();
  refetchTotalsByMonth();
  refetchTotalsByCategories();

  const { data, refetch: handleRefetchPosts } = useGetAllPostsQuery();

  const userHasName = user?.name != null;

  const copyToClipboard = () => {
    const userName = user?.name?.replace(/\s+/g, '-');
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_APP_URL}/profile/${userName}`,
    );
    showAlert('Copier dans le presse-papier !', 'success');
  };

  return (
    <div className='flex h-full text-black max-[960px]:flex-col'>
      <div className='w-7/12 h-full min-h-fit max-[960px]:w-full'>
        <div className='h-[44%] p-3 max-[960px]: min-h-fit'>
          <div className='h-full dashboardWidget min-h-fit'>
            <div className='flex items-center justify-between'>
              <h1 className='text-xl poppins-bold'>
                Bienvenue{' '}
                <span className='text-sm poppins-regular'>
                  Répartition d&apos;émissons par catégories
                </span>
              </h1>
              {userHasName ? (
                <Button onClick={copyToClipboard}>Partager mon profil</Button>
              ) : null}
            </div>

            <CategoryChart
              dataByCategory={sumsByCategories?.getSumByCategory ?? []}
              loading={loadingByCategory}
            />
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
        <div className='h-[28%]  p-3'>
          <LastPostWidget
            posts={data?.getAllPosts ?? []}
            handleRefetchPosts={handleRefetchPosts}
          />
        </div>
      </div>
      <div className='w-5/12 p-3  h-full max-[960px]:w-full'>
        <LastActivitiesListWidget
          handleRefetch={() => {
            refetchTotalsByCategories();
            refetchTotalsByMonth();
          }}
        />
      </div>
    </div>
  );
}
