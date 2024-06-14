/* eslint-disable no-param-reassign */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { defaults } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { useGetSumByCategoryQuery } from '@/graphql/generated/schema';
import CAT_COLOR_MAP from '@/utils/categoryColors';

// defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.legend.display = false;
defaults.plugins.title.display = false;

export default function CategoryChart() {
  const { data, loading, refetch: refetchTotals } = useGetSumByCategoryQuery();
  refetchTotals();

  const totalCO2 = (data?.getSumByCategory ?? []).reduce(
    (sum, cat) => sum + cat.sumKgCO2,
    0,
  );

  const dataByCat = {
    labels: data?.getSumByCategory.map((cat) => cat.categoryName),
    datasets: [
      {
        data: data?.getSumByCategory.map(
          (cat) => (cat.sumKgCO2 / totalCO2) * 100,
        ),
        backgroundColor: data?.getSumByCategory.map(
          (cat) => CAT_COLOR_MAP[cat.categoryName.toLocaleLowerCase()],
        ),
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
    <>
      {loading ? (
        'Chargement'
      ) : (
        <div className='flex w-full h-full justify-between pb-3 pt-3'>
          <div className='w-[70%] flex justify-center'>
            {data?.getSumByCategory.length === 0 ? (
              'Aucune données enregistrés'
            ) : (
              <Doughnut data={dataByCat} options={options} />
            )}
          </div>
          <div className='w-[20%] flex flex-col justify-around'>
            {data?.getSumByCategory.map((cat) => {
              return (
                <div className='flex items-center gap-2' key={cat.categoryName}>
                  <div>
                    <img
                      src={`${cat.categoryName.toLocaleLowerCase()}.svg`}
                      alt={cat.categoryName}
                      width={35}
                      height={35}
                    />
                  </div>
                  <div className='text-medium_blue poppins-semiBold text-lg'>
                    {cat.sumKgCO2} <span>kgCO2</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
