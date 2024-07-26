import {
  useGetAllPostsQuery,
  useGetPaginatedPostsQuery,
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

  const { data: lastPosts, refetch: refetchLastPosts } =
    useGetPaginatedPostsQuery({ variables: { take: 5, skip: 0 } });

  const userHasName = user?.name != null;

  const copyToClipboard = () => {
    const userId = user?.id;
    navigator.clipboard.writeText(
      `https://develop.carbon-tracker.0923-bleu-1.wns.wilders.dev/profile/${userId}`,
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
            posts={lastPosts?.getPaginatedPosts ?? []}
            handleRefetchPosts={refetchLastPosts}
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
