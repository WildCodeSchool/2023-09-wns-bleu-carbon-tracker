import {
  useGetSumByCategoryQuery,
  useGetSumByMonthQuery,
} from '@/graphql/generated/schema';
import ByMonthChart from './dataViz/ByMonthChart';
import CategoryChart from './dataViz/CategoryChart';
import LastActivitiesListWidget from './lastActivitiesList/LastActivitiesListWidget';
import LastPostWidget from './lastPost/LastPostWidget';

export default function DashboardLayout() {
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
  return (
    <div className='flex h-full text-black max-[960px]:flex-col'>
      <div className='w-7/12 h-full min-h-fit max-[960px]:w-full'>
        <div className='h-[44%] p-3 max-[960px]: min-h-fit'>
          <div className='dashboardWidget h-full min-h-fit'>
            <h1 className='poppins-bold text-xl'>
              Bienvenue{' '}
              <span className='poppins-regular text-sm'>
                Répartition d&apos;émissons par catégories
              </span>
            </h1>

            <CategoryChart
              dataByCategory={sumsByCategories?.getSumByCategory ?? []}
              loading={loadingByCategory}
            />
          </div>
        </div>
        <div className='h-[28%]  p-3'>
          <div className='dashboardWidget h-full'>
            <div className='poppins-bold text-xl'>Dépenses annuelles</div>
            <ByMonthChart
              dataByMonth={sumsByMonth?.getSumByMonth ?? []}
              loading={loadingByMonth}
            />
          </div>
        </div>
        <div className='h-[28%]  p-3'>
          <LastPostWidget />
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
