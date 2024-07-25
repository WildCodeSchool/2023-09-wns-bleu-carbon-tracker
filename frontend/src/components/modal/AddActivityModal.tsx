import React, { FormEvent } from 'react';
import {
  useActivityEntriesQuery,
  useCategoriesQuery,
  useCreateActivityEntryMutation,
  useGetSumByCategoryQuery,
} from '@/graphql/generated/schema';
import InputLabel from '@/components/commons/inputs/InputLabel';
import GenericModal from '@/components/modal/GenericFormModal';

type Props = {
  onClose: () => void;
  refetchOnValidate?: () => void;
};

export default function AddActivityModal({ onClose }: Props) {
  const { data } = useCategoriesQuery();
  const { refetch: refetchActivities } = useActivityEntriesQuery();
  const { refetch: refetchTotals } = useGetSumByCategoryQuery();
  const [createActivityEntry] = useCreateActivityEntryMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    formJSON.input = parseFloat(formJSON.input);
    formJSON.category = { id: parseInt(formJSON.category, 10) };

    try {
      await createActivityEntry({
        variables: { data: { ...formJSON } },
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
    <GenericModal
      title='Ajouter une dépense carbone'
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className='pb-5'>
        <label
          htmlFor='category'
          className='block text-sm font-medium leading-6 text-gray-900 pb-2'
        >
          Catégorie
        </label>
        <select
          className='select select-bordered block w-full rounded-xl px-2 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'
          id='category'
          name='category'
          required
          defaultValue=''
        >
          <option value='' disabled>
            --Sélectionner une catégorie--
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
          id='name'
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
            id='input'
            name='input'
            label='Dépense carbone (en kg/CO2e)'
            placeholder='10'
            type='number'
            sizes='xl'
            autoComplete='input'
            min={0}
            step={0.01}
            required
          />
        </div>
        <div className='pb-5 w-4/12'>
          <InputLabel
            id='spendedAt'
            name='spendedAt'
            label='Date de la dépense'
            type='date'
            sizes='xl'
            required
          />
        </div>
      </div>
    </GenericModal>
  );
}
