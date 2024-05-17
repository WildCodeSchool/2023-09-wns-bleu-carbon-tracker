import Typography from '../commons/typography/Typography';
import ListBooks from '../example/Book';
import Title from '../example/Title';
import LastActivitiesListWidget from './lastActivitiesList/LastActivitiesListWidget';
import LastPostWidget from './lastPost/LastPostWidget';

export default function DashboardLayout() {
  return (
    <div className='flex h-screen text-black'>
      <div className='w-7/12 h-full'>
        <div className='h-[44%]  p-3'>
          <div className='dashboardWidget h-full'>
            <Typography variant='heading'>Mes dépenses du mois</Typography>
            <h1>Bienvenuey</h1>
            Voici un résumé de vos dépenses mensuelles
            <ListBooks />
            <Title />
          </div>
        </div>
        <div className='h-[28%]  p-3'>
          <div className='dashboardWidget h-full'>
            <Typography variant='heading'>Dépenses anuelles</Typography>
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
