/* eslint-disable no-param-reassign */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { defaults } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { useActivityEntriesQuery } from '@/graphql/generated/schema';
import { EntryData } from '@/types';
import CAT_COLOR_MAP from '@/utils/categoryColors';

// defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.legend.display = false;
defaults.plugins.title.display = false;

export default function CategoryChart() {
  const { data: entries } = useActivityEntriesQuery();

  const totalsByCategories = (entries?.activityEntries ?? []).reduce(
    (
      acc: {
        label: string;
        value: number;
        color: string;
        percentage?: number;
      }[],
      entry: EntryData,
    ) => {
      const isCategorySetted = acc.find(
        (item) => item.label === entry.category.name,
      );
      if (isCategorySetted) {
        isCategorySetted.value += entry.input;
      } else {
        acc.push({
          label: entry.category.name,
          value: entry.input ?? 0,
          color: CAT_COLOR_MAP[entry.category.name.toLowerCase()],
        });
      }
      return acc;
    },
    [],
  );
  const totalCO2 = totalsByCategories.reduce((sum, cat) => sum + cat.value, 0);
  totalsByCategories.forEach((cat) => {
    cat.percentage = (cat.value / totalCO2) * 100;
  });

  const dataByCat = {
    labels: totalsByCategories.map((cat) => cat.label),
    datasets: [
      {
        data: totalsByCategories.map((cat) => cat.percentage),
        backgroundColor: totalsByCategories.map((cat) => cat.color),
        borderRadius: 5,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          label(ctx: any) {
            const percentage = ctx.raw || 0;
            return `${percentage.toFixed(1)}%`;
          },
        },
      },
    },
  };
  return (
    <div className='flex w-full h-full justify-between pb-3 pt-3'>
      <div className='w-[70%] flex justify-center'>
        <Doughnut data={dataByCat} options={options} />
      </div>
      <div className='w-[20%] flex flex-col justify-around'>
        {totalsByCategories.map((cat) => {
          return (
            <div className='flex items-center gap-2' key={cat.label}>
              <div>
                <img
                  src={`${cat.label.toLocaleLowerCase()}.svg`}
                  alt={cat.label}
                  width={35}
                  height={35}
                />
              </div>
              <div className='text-medium_blue poppins-semiBold text-lg'>
                {cat.value} <span>kgCO2</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
