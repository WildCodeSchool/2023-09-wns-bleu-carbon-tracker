import {
  useGetSumByCategoryQuery,
  useGetSumByMonthQuery,
} from '@/graphql/generated/schema';
import ListBooks from '../example/Book';
import Title from '../example/Title';
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
    <div className='flex h-screen text-black'>
      <div className='w-7/12 h-full'>
        <div className='h-[44%]  p-3'>
          <div className='dashboardWidget h-full'>
            <h1 className='poppins-bold text-xl'>
              Bienvenue{' '}
              <span className='poppins-regular text-sm'>
                Voici la répartition de tes émissons de CO2 par catégories
              </span>
            </h1>

            <CategoryChart
              dataByCategory={sumsByCategories?.getSumByCategory ?? []}
              loading={loadingByCategory}
            />
            <ListBooks />
            <Title />
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
      <div className='w-5/12 p-3  h-full'>
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
