import { ChangeEvent, useState } from 'react';
import Button from '../commons/buttons/Button';
import InputCheckbox from '../commons/inputs/InputCheckbox';
import InputLabel from '../commons/inputs/InputLabel';
import Typography from '../commons/typography/Typography';

export default function DonationForm({
  handleSubmitNewDonation,
}: {
  handleSubmitNewDonation: (amount: number) => Promise<void>;
}) {
  const [amount, setAmount] = useState(0);

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handleButtonClick = async () => {
    await handleSubmitNewDonation(amount);
    setAmount(0);
  };

  return (
    <div>
      <div className='dashboardWidget h-[15vh] max-h-[128px] flex justify-between items-center mb-2'>
        <Typography customClass='text-4xl font-bold text-dark_green max-lg:text-3xl'>
          Faire un don
        </Typography>
      </div>

      <section className='dashboardWidget'>
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
        <Button className='mt-4' onClick={handleButtonClick}>
          Soumettre mon don
        </Button>
      </section>
    </div>
  );
}
