import LastActivitiesListWidget from './lastActivitiesList/LastActivitiesListWidget';
import LastPostWidget from './lastPost/LastPostWidget';
import Typography from '@/components/commons/typography/Typography';

export default function DashboardLayout() {
  return (
    <div className='flex h-screen text-black'>
      <div className='w-7/12 h-full'>
        <div className='h-[44%]  p-3'>
          <div className='dashboardWidget h-full'>
            <Typography variant='heading'>Dépenses du mois</Typography>
          </div>
        </div>
        <div className='h-[28%]  p-3'>
          <div className='dashboardWidget h-full'>
            <Typography variant='heading'>Dépenses annuelles</Typography>
          </div>
        </div>
        <div className='h-[28%]  p-3'>
          <LastPostWidget />
        </div>
      </div>
      <div className='w-5/12 p-3  h-full'>
        <LastActivitiesListWidget />
      </div>
    </div>
  );
}
