import {
  useCreateDonationMutation,
  useGetLastDonationsQuery,
  useGetPotQuery,
} from '@/graphql/generated/schema';
import DonationForm from '@/components/donation/DonationForm';
import DonationSummary from '@/components/donation/DonationSummary';

export default function DonationSection() {
  const {
    data: pot,
    loading: isPotLoading,
    refetch: refetchPot,
  } = useGetPotQuery();

  const {
    data: lastDonations,
    loading: isLastDonationsLoading,
    refetch: refetchDonations,
  } = useGetLastDonationsQuery();

  const [createDonationMutation] = useCreateDonationMutation();

  const handleSubmitNewDonation = async (amount: number) => {
    try {
      const { data } = await createDonationMutation({
        variables: {
          amount,
        },
      });

      if (data) {
        refetchPot();
        refetchDonations();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className='p-20'>
      <DonationForm handleSubmitNewDonation={handleSubmitNewDonation} />
      <DonationSummary
        pot={pot}
        isPotLoading={isPotLoading}
        lastDonations={lastDonations}
        isLastDonationsLoading={isLastDonationsLoading}
      />
    </main>
  );
}
