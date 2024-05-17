import { useState } from 'react';
import Typography from '../commons/typography/Typography';
import getDateFormated from '@/utils/dateFormater';
import InputCheckbox from '@/components/commons/inputs/InputCheckbox';
import ActivityEntryActionsModal from './ActivityEntryActionsModal';
import {
  useActivityEntriesQuery,
  useCreateActivityEntryMutation,
  useDeleteActivityEntryMutation,
} from '@/graphql/generated/schema';
import { EntryData } from '@/types';
import Highlight from '../commons/search/Highlight';

type Props = {
  entryData: EntryData;
  selected: boolean;
  searchedTerm: string;
  onCheckChange: () => void;
  onUpdate: (entry: EntryData) => void;
};

export default function ActivityEntry({
  entryData,
  selected,
  searchedTerm,
  onCheckChange,
  onUpdate,
}: Props) {
  const { refetch: refetchActivities } = useActivityEntriesQuery();
  const [showActionModal, setShowActionModal] = useState(false);
  const [deleteActivity] = useDeleteActivityEntryMutation();
  const [createActivity] = useCreateActivityEntryMutation();

  const handleModify = () => {
    onUpdate(entryData);
  };

  const handleDuplicate = async (entry: EntryData) => {
    try {
      await createActivity({
        variables: {
          data: {
            name: entry.name,
            input: entry.input,
            category: { id: entry.category.id },
            spendedAt: entry.spendedAt,
          },
        },
      });
      await refetchActivities();
    } catch (error) {
      // console.log(error);
    }
  };

  const handleDelete = async (entry: EntryData) => {
    try {
      await deleteActivity({ variables: { activityEntryId: entry.id } });
      await refetchActivities();
    } catch (error) {
      // console.log(error);
    }
  };

  const modalActions = [
    {
      label: 'Modifier',
      action: () => handleModify(),
    },
    {
      label: 'Dupliquer',
      action: () => handleDuplicate(entryData),
    },
    {
      label: 'Supprimer',
      action: () => handleDelete(entryData),
    },
  ];
  return (
    <div className='flex justify-between items-center p-4 mt-2 bg-white shadow-xl'>
      <div className='flex items-center w-2/12'>
        <div className='mr-7  p-2'>
          <InputCheckbox
            id={entryData.id.toString()}
            label=''
            checked={selected}
            onChange={onCheckChange}
          />
        </div>
        <img
          alt={entryData.category.name}
          src={`/${entryData.category.name.toLocaleLowerCase()}.svg`}
          width={35}
          height={35}
        />
        <div className='ml-5 text-medium_blue'>
          <Typography className='poppins-semiBold text-medium_blue text-left text-xl'>
            <Highlight search={searchedTerm ?? ''}>
              {entryData.category.name}
            </Highlight>
          </Typography>
        </div>
      </div>

      <div className='flex  w-4/12 items-center justify-between'>
        <div className='mr-5'>
          <Typography className='poppins-semiBold text-dark_green text-left text-xl'>
            <Highlight search={searchedTerm ?? ''}>{entryData?.name}</Highlight>
          </Typography>
        </div>
        <div>
          <Typography className='text-sm text-dark_green text-left'>
            <Highlight search={searchedTerm ?? ''}>
              {getDateFormated(entryData.spendedAt)}
            </Highlight>
          </Typography>
        </div>
      </div>

      <div className='flex items-center w-2/12 justify-end'>
        <Typography className='text-medium_blue poppins-bold text-xl'>
          <Highlight search={searchedTerm ?? ''}>
            {entryData?.input.toString()}
          </Highlight>
        </Typography>
        <Typography className='text-dark_green poppins-bold ml-2'>
          {' '}
          kgCO2
        </Typography>
        <div
          onClick={() => setShowActionModal((s) => !s)}
          className='ml-7 cursor-pointer p-2 relative'
        >
          <img src='/vertical-dots.svg' width={6} height={4} />
          <ActivityEntryActionsModal
            onClose={() => setShowActionModal(false)}
            isOpened={showActionModal}
            actions={modalActions}
            alignment='right'
          />
        </div>
      </div>
    </div>
  );
}
