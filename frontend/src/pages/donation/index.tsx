import { ChangeEvent, useState } from 'react';
import Button from '@/components/commons/buttons/Button';
import InputCheckbox from '@/components/commons/inputs/InputCheckbox';
import InputLabel from '@/components/commons/inputs/InputLabel';
import Section from '@/components/commons/layouts/Section';
import Typography from '@/components/commons/typography/Typography';
import {
  useCreateDonationMutation,
  useGetCagnotteQuery,
} from '@/graphql/generated/schema';

export default function Donation() {
  const { data: cagnotteData, loading: cagnotteLoading } =
    useGetCagnotteQuery();

  const [
    createDonationMutation,
    { data: donationData, loading: donationLoading, error },
  ] = useCreateDonationMutation();

  const [amount, setAmount] = useState(0);

  const handleSubmitDonation = async () => {
    try {
      const { data } = await createDonationMutation({
        variables: {
          amount,
          userId: '2862cf5c-e0dd-426e-8bb4-18d68743ad5a',
        },
      });

      console.info(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  return (
    <main className='p-20'>
      <Section>
        <Typography variant='heading'>Faire un don</Typography>
        <Typography className='pt-4 w-2/3'>
          Le lorem ipsum est, en imprimerie, une suite de mots sans
          signification utilisée à titre provisoire pour calibrer une mise en
          page, le texte définitif venant remplacer le faux-texte dès qu&apos;il
          est prêt ou que la mise en page est achevée. Généralement, on utilise
          un texte en faux latin, le Lorem ipsum ou Lipsum.
        </Typography>
        <div className='flex pt-4 items-center'>
          <InputLabel
            name='Montant'
            label='montant'
            type='number'
            sizes='xl'
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </div>
        <InputCheckbox
          id='anonymous-donation'
          label='rendre mon don anonyme'
          className='pt-4'
        />
        <Button className='mt-4' onClick={handleSubmitDonation}>
          Soumettre mon don
        </Button>
      </Section>
      <div>
        {cagnotteLoading ? (
          <p>loading....</p>
        ) : (
          <Section className='mt-4'>
            <Typography variant='subheading'>Cagnotte Globale</Typography>
            <Typography variant='heading'>
              {cagnotteData?.getTotalDonations}€
            </Typography>
            <Typography variant='subheading'>derniers dons</Typography>
            <Typography>+10€ admirateur secret</Typography>
            <Typography>+10€ Denis Brogniard</Typography>
          </Section>
        )}
      </div>
    </main>
  );
}
