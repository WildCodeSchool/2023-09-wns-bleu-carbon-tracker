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
            <h1>Bienvenuey</h1>
            Voici un résumé de vos dépenses mensuelles
            <ListBooks />
            <Title />
          </div>
        </div>
        <div className='h-[28%]  p-3'>
          <div className='dashboardWidget h-full'>Dépenses annuelles</div>
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
