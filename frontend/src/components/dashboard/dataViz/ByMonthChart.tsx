import { defaults } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useGetSumByMonthQuery } from '@/graphql/generated/schema';

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.legend.display = false;
defaults.plugins.title.display = false;

export default function ByMonthChart({ userId }: { userId?: string }) {
  const {
    data,
    loading,
    refetch: refetchTotals,
  } = useGetSumByMonthQuery({
    variables: { userId },
  });
  refetchTotals();
  const dataByMonth = {
    labels: data?.getSumByMonth.map((item) => item.month),
    datasets: [
      {
        data: data?.getSumByMonth.map((item) => item.sumKgCO2),
        borderColor: '#31a531',
        borderRadius: 5,
        pointRadius: 6,
        hoverRadius: 10,
      },
    ],
  };
  const options = {
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          label(ctx: any) {
            const value = ctx.raw || 0;
            return `${value} kgCO2`;
          },
        },
      },
    },
  };
  return (
    <div className='w-full pt-3'>
      {loading ? (
        'chargement...'
      ) : (
        <>
          {data?.getSumByMonth.length === 0 ? (
            'Aucune données'
          ) : (
            <Line data={dataByMonth} options={options} />
          )}
        </>
      )}
    </div>
  );
}
