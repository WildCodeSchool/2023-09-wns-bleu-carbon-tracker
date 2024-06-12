import { defaults } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useActivityEntriesQuery } from '@/graphql/generated/schema';
import { EntryData } from '@/types';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.legend.display = false;
defaults.plugins.title.display = false;

export default function ByMonthChart() {
  const { data: entries } = useActivityEntriesQuery();
  const totalsByMonths = (entries?.activityEntries ?? [])
    .filter((entry) => {
      const entryDate = new Date(entry.spendedAt);
      const now = new Date();
      const oneYearOld = new Date(now.getFullYear(), now.getMonth() - 11, 1);
      return entryDate >= oneYearOld && entryDate <= now;
    })
    .reduce(
      (
        acc: {
          label: string;
          value: number;
          percentage?: number;
        }[],
        entry: EntryData,
      ) => {
        const date = new Date(entry.spendedAt);
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const monthYearLabel = `${month} ${year}`;
        const isMonthSet = acc.find((item) => item.label === monthYearLabel);
        if (isMonthSet) {
          isMonthSet.value += entry.input;
        } else {
          acc.push({
            label: monthYearLabel,
            value: entry.input ?? 0,
          });
        }
        return acc;
      },
      [],
    );

  const dataByMonth = {
    labels: totalsByMonths.map((month) => month.label),
    datasets: [
      {
        data: totalsByMonths.map((month) => month.value),
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
      <Line data={dataByMonth} options={options} />
    </div>
  );
}
