import { FormEvent } from 'react';
import { EntryData } from '@/types';
import InputLabel from '../commons/inputs/InputLabel';
import Button from '../commons/buttons/Button';
import {
  useActivityEntriesQuery,
  useCategoriesQuery,
  useGetSumByCategoryQuery,
  useUpdateActivityEntryMutation,
} from '@/graphql/generated/schema';
import Typography from '../commons/typography/Typography';
import isoToDate from '@/utils/isoToDate';

type Props = {
  onClose: () => void;
  entryData: EntryData;
};

export default function UpdateActivityModal({ entryData, onClose }: Props) {
  const { data } = useCategoriesQuery();
  const { refetch: refetchActivities } = useActivityEntriesQuery();
  const { refetch: refetchTotals } = useGetSumByCategoryQuery();

  const [undateActivity] = useUpdateActivityEntryMutation();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    formJSON.input = parseFloat(formJSON.input);
    formJSON.category = {
      id: parseInt(formJSON.category, 10),
    };
    try {
      await undateActivity({
        variables: { data: { ...formJSON }, activityEntryId: entryData.id },
        onCompleted: async () => {
          await refetchActivities();
          await refetchTotals();
          onClose();
        },
      });
    } catch (error) {
      console.error('Une erreur est survenue:', error);
    }
  };
  return (
    <div className='modal-box w-11/12 max-w-5xl absolute z-50 top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <Typography variant='heading' className='pb-2 text-black'>
        Modifier une dépense carbone
      </Typography>
      <form method='dialog' onSubmit={handleSubmit} className='m-4'>
        <button
          type='button'
          className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black hover:bg-[#204660] hover:text-white text-lg font-light'
          onClick={onClose}
        >
          ✕
        </button>
        <div className='pb-5'>
          <label className='block text-sm font-medium leading-6 text-gray-900 pb-2'>
            Catégorie
          </label>
          <select
            className='select select-bordered block w-full rounded-xl px-2 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'
            id='category'
            name='category'
            required
            defaultValue={entryData.category.id}
          >
            <option value='' disabled>
              Selectionner une catégorie
            </option>
            {(data?.categories ?? []).map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className='pb-5'>
          <InputLabel
            defaultValue={entryData.name}
            name='name'
            label="Nom de l'activité"
            placeholder='Mon trajet en voiture pour me rendre au travail'
            type='text'
            sizes='xl'
            autoComplete='name'
            required
          />
        </div>
        <div className='flex flex-row justify-start'>
          <div className='pb-5 w-4/12 mr-5'>
            <InputLabel
              defaultValue={entryData.input}
              name='input'
              label='Dépense carbone (en kg/CO2e)'
              placeholder='10'
              type='text'
              sizes='xl'
              autoComplete='input'
              required
            />
          </div>
          <div className='pb-5 w-4/12'>
            <InputLabel
              defaultValue={isoToDate(entryData.spendedAt)}
              name='spendedAt'
              label='Date de la dépense'
              type='date'
              sizes='xl'
            />
          </div>
        </div>

        <div className='text-right'>
          <Button className='mt-2' size='xl' type='submit' data-testid='submit'>
            Enregistrer
          </Button>
        </div>
      </form>
    </div>
  );
}
