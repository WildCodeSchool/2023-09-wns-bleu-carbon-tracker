import { useState } from 'react';
import Typography from '@/components/commons/typography/Typography';
import ActivityEntryWidgetSample from './ActivityEntryWidgetSample';
import { useFilteredActivityEntriesQuery } from '@/graphql/generated/schema';
import AddActivityModal from '@/components/modal/AddActivityModal';

type Props = {
  handleRefetch: () => void;
};
export default function LastActivitiesListWidget({ handleRefetch }: Props) {
  const { data, loading, refetch } = useFilteredActivityEntriesQuery({
    variables: { skip: 0, take: 15 },
  });

  refetch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className='dashboardWidget flex flex-col  h-full'>
      <div className='mb-6 flex justify-between align-center'>
        <Typography variant='heading'>Dernières dépenses</Typography>
        <button onClick={toggleModal}>
          <img src='/button-plus.svg' alt='add an activity entry' />
        </button>
      </div>
      {loading ? (
        'Chargement'
      ) : (
        <div className='flex flex-col overflow-auto'>
          {(data?.filteredActivityEntries ?? []).map((entry) => {
            return (
              <ActivityEntryWidgetSample key={entry.id} entryData={entry} />
            );
          })}
        </div>
      )}

      {isModalOpen && (
        <AddActivityModal
          onClose={toggleModal}
          refetchOnValidate={async () => {
            await refetch();
            handleRefetch();
          }}
        />
      )}
      {isModalOpen && <div className='overlay'></div>}
    </div>
  );
}
