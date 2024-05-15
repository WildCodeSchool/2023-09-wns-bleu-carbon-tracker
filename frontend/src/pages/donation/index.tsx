import Button from '@/components/commons/buttons/Button';
import InputCheckbox from '@/components/commons/inputs/InputCheckbox';
import InputLabel from '@/components/commons/inputs/InputLabel';
import Section from '@/components/commons/layouts/Section';
import Typography from '@/components/commons/typography/Typography';

export default function Donation() {
  return (
    <main className='p-20'>
      <Section>
        <Typography variant='heading'>Faire un don</Typography>
        <Typography className='pt-4'>
          Le lorem ipsum est, en imprimerie, une suite de mots sans
          signification utilisée à titre provisoire pour calibrer une mise en
          page, le texte définitif venant remplacer le faux-texte dès qu&apos;il
          est prêt ou que la mise en page est achevée. Généralement, on utilise
          un texte en faux latin, le Lorem ipsum ou Lipsum.
        </Typography>
        <div className='flex pt-4 gap-6 items-center'>
          <InputLabel name='Nom' label='nom' type='text' sizes='xl' required />
          <InputLabel
            name='Montant'
            label='montant'
            type='text'
            sizes='xl'
            required
          />
          <InputCheckbox
            id='anonymous-donation'
            label='rendre mon don anonyme'
          />
        </div>
        <Button className='mt-4'>Soumettre mon don</Button>
      </Section>
      <div>
        <Section className='mt-4'>
          <Typography variant='subheading'>Cagnotte Globale</Typography>
          <Typography variant='heading'>900000€</Typography>
          <Typography variant='subheading'>derniers dons</Typography>
          <Typography>+10€ admirateur secret</Typography>
          <Typography>+10€ Denis Brogniard</Typography>
        </Section>
      </div>
    </main>
  );
}
