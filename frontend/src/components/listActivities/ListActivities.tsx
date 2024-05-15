/* eslint-disable @typescript-eslint/no-unused-expressions */

import { useEffect, useState } from 'react';
import {
  useActivityEntriesQuery,
  useCreateActivityEntryMutation,
  useDeleteActivityEntryMutation,
} from '@/graphql/generated/schema';
import Typography from '../commons/typography/Typography';
import ActivityEntry from './ActivityEntry';
import InputCheckbox from '../commons/inputs/InputCheckbox';
import Button from '../commons/buttons/Button';
import InputLabel from '@/components/commons/inputs/InputLabel';
import ActiveFilterBagde from './ActiveFilterBadge';
import ActivityEntryActionsModal from './ActivityEntryActionsModal';
import { Category, EntryData } from '@/types';
import FilterModal from './FilterModal';
import getDateFormated from '@/utils/dateFormater';

export default function ListActivities() {
  const { data, loading } = useActivityEntriesQuery();

  const { refetch: refetchActivities } = useActivityEntriesQuery();
  const [createActivity] = useCreateActivityEntryMutation();
  const [deleteActivity] = useDeleteActivityEntryMutation();
  const [selectedEntries, setSelectedEntries] = useState<EntryData[]>([]);
  const [searchedTerm, setSearchedTerm] = useState('');
  const [activityEntries, setActivityEntries] = useState(data?.activityEntries);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>();
  const [selectedDate, setSelectedDate] = useState<{
    from: string;
    to: string;
  }>({ from: '', to: '' });

  const showActiveFiltersBar =
    (selectedCategories ?? []).length > 0 ||
    (selectedDate.from !== '' && selectedDate.to !== '');

  const totalCo2Sum = data?.activityEntries.reduce((acc, entry) => {
    return acc + Number(entry.input);
  }, 0);
  const percentOfRecommendedEmissions = Math.round(
    ((totalCo2Sum ?? 0) / 2000) * 100,
  );

  const toggleSelect = (activity: EntryData): void => {
    const isSelected = selectedEntries.some((a) => a.id === activity.id);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !isSelected
      ? setSelectedEntries((prev) => [...prev, activity])
      : setSelectedEntries((prev) => prev.filter((a) => a.id !== activity.id));
  };
  const partiallyChecked = selectedEntries.length > 0;

  useEffect(() => {
    if (data?.activityEntries) {
      const filteredEntriesByCategories = data.activityEntries.filter(
        (entry) => {
          return (selectedCategories ?? []).some(
            (category) => category.id === entry.category.id,
          );
        },
      );
      const relevantEntriesToSearchIn =
        (selectedCategories ?? []).length === 0
          ? data.activityEntries
          : filteredEntriesByCategories;

      const filteredEntriesBySearchTerm = relevantEntriesToSearchIn.filter(
        (entry) =>
          entry.name.toLowerCase().includes(searchedTerm.toLowerCase()) ||
          entry.input
            .toString()
            .toLowerCase()
            .includes(searchedTerm.toLowerCase()) ||
          entry.createdAt.toLowerCase().includes(searchedTerm.toLowerCase()) ||
          entry.category.name
            .toLowerCase()
            .includes(searchedTerm.toLowerCase()),
      );

      // Filter by selected date range
      const filteredEntriesByDate = filteredEntriesBySearchTerm.filter(
        (entry) => {
          if (selectedDate.from && selectedDate.to) {
            const entryDate = new Date(entry.createdAt);
            const fromDate = new Date(selectedDate.from);
            const toDate = new Date(selectedDate.to);
            // Include the entire day for 'to' date by setting to end of the day
            toDate.setHours(23, 59, 59, 999);
            return entryDate >= fromDate && entryDate <= toDate;
          }
          return true; // If no date filter is set, include all entries
        },
      );
      setActivityEntries(filteredEntriesByDate);
    }
  }, [data?.activityEntries, searchedTerm, selectedCategories, selectedDate]);

  const handleDuplicateSelection = async () => {
    try {
      await Promise.all(
        selectedEntries.map(async (activity) => {
          try {
            await createActivity({
              variables: {
                data: {
                  name: activity.name,
                  input: activity.input,
                  category: { id: activity.category.id },
                },
              },
            });
          } catch (err) {
            // console.log(err);
          }
        }),
      );
      await refetchActivities();
      setSelectedEntries([]);
    } catch (err) {
      // console.log(err);
    }
  };

  const handleDeleteSelection = async () => {
    try {
      await Promise.all(
        selectedEntries.map(async (activity) => {
          try {
            await deleteActivity({
              variables: { activityEntryId: activity.id },
            });
          } catch (error) {
            console.error(error);
          }
        }),
      );
      await refetchActivities();
      setSelectedEntries([]);
    } catch (error) {
      // console.log(error);
    }
  };
  const modalActions = [
    {
      label: 'Dupliquer',
      action: () => handleDuplicateSelection(),
    },
    {
      label: 'Supprimer',
      action: () => handleDeleteSelection(),
    },
  ];

  const handleToggleCatSelection = (category: Category) => {
    const isSelected = (selectedCategories ?? []).some(
      (cat) => cat.id === category.id,
    );
    !isSelected
      ? setSelectedCategories((prev) => [...(prev ?? []), category])
      : setSelectedCategories((prev) =>
          (prev ?? []).filter((cat) => cat.id !== category.id),
        );
  };

  const handleDateSelection = (date: { from: string; to: string }) => {
    setSelectedDate(date);
  };
  if (loading) return 'Chargement';

  return (
    <div className='flex  h-screen text-black bg-very_light_grey'>
      <div className=' w-full flex flex-col p-10'>
        <div className='dashboardWidget h-[15vh] max-h-[128px] flex justify-between items-center'>
          <Typography customClass='text-4xl lg:text-3xl xl:text-5xl font-bold text-dark_green'>
            Mes dépenses
          </Typography>
          <div className='flex flex-col items-end'>
            <div className='flex items-end'>
              <Typography customClass='text-4xl lg:text-3xl xl:text-5xl font-bold mr-1 text-medium_orange'>
                {totalCo2Sum}
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
        <div
          className='flex items-center justify-between bg-white border-b-2 p-5 shadow-xl rounded-t-xl
        '
        >
          <div className='flex items-center'>
            <div className=''>
              <InputCheckbox
                id={'selectBarBox'}
                label=''
                checked={activityEntries?.length === selectedEntries.length}
                partiallyChecked={
                  partiallyChecked &&
                  activityEntries?.length !== selectedEntries.length
                }
                onChange={() =>
                  partiallyChecked
                    ? setSelectedEntries([])
                    : setSelectedEntries(activityEntries ?? [])
                }
              />
            </div>
            <div
              className='cursor-pointer p-2 relative'
              onClick={() => setShowActionModal(true)}
            >
              <img src='/vertical-dots.svg' width={6} height={4} />
              <ActivityEntryActionsModal
                actions={modalActions}
                isOpened={showActionModal}
                onClose={() => setShowActionModal(false)}
                alignment='left'
              />
            </div>
            <div className='ml-10'>
              <Button
                size='lg'
                className='text-lg bg-medium_blue hover:bg-light_blue flex items-center'
              >
                <img src={'/plus-icon.svg'} />{' '}
                <span className='ml-2'>Ajouter une dépense</span>
              </Button>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='w-[300px]'>
              <InputLabel
                label=''
                placeholder='Rechercher'
                type='text'
                sizes='lg'
                value={searchedTerm}
                onChange={(e) => setSearchedTerm(e.target.value)}
              />
            </div>
            <div className='ml-5 relative'>
              <Button
                size='lg'
                className='text-lg bg-medium_blue hover:bg-light_blue flex items-center '
                onClick={() => setShowFilterModal((s) => !s)}
              >
                <img src={'/filter-icon.svg'} />
                <span className='ml-2'>Filtrer</span>
              </Button>
              <FilterModal
                selectedCategories={selectedCategories ?? []}
                toggleCatSelection={(category) =>
                  handleToggleCatSelection(category)
                }
                setDateFilter={(date) => handleDateSelection(date)}
                selectedDate={selectedDate}
                isOpened={showFilterModal}
                onClose={() => setShowFilterModal(false)}
                alignment='right'
              />
            </div>
          </div>
        </div>

        {showActiveFiltersBar && (
          <div className='flex items-center justify-between bg-white p-5 shadow-xl mb-2'>
            <div className='flex flex-wrap'>
              {(selectedCategories ?? []).map((cat) => {
                return (
                  <ActiveFilterBagde
                    key={cat.id}
                    content={cat.name}
                    onRemoveClick={() => handleToggleCatSelection(cat)}
                  />
                );
              })}
              {selectedDate.from !== '' && selectedDate.to !== '' && (
                <ActiveFilterBagde
                  key={'dateFilterBadge'}
                  content={`Du ${getDateFormated(selectedDate.from)} au ${getDateFormated(selectedDate.to)}`}
                  onRemoveClick={() => setSelectedDate({ from: '', to: '' })}
                />
              )}
            </div>
            <div>
              <Button
                size='lg'
                className='text-lg bg-medium_blue hover:bg-light_blue flex items-center'
                onClick={() => setSelectedCategories([])}
              >
                <img src={'/trash-icon.svg'} />
                <span className='ml-2'>Supprimer les filtres</span>
              </Button>
            </div>
          </div>
        )}
        <div className='overflow-auto h-max'>
          {activityEntries?.map((activity) => (
            <ActivityEntry
              selected={selectedEntries.some((a) => a.id === activity.id)}
              entryData={activity}
              key={activity.id}
              onCheckChange={() => toggleSelect(activity)}
              searchedTerm={searchedTerm}
            />
          ))}
          {activityEntries?.length === 0 && (
            <div className='w-full flex justify-center mt-10'>
              <Typography customClass='text-md  font-bold text-medium_green'>
                Aucune activité ne correspond à vos filtres et recherche
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
