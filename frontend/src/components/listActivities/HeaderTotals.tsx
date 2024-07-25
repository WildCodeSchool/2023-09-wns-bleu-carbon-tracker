import Typography from '../commons/typography/Typography';

type Props = {
  totalEmissions: number | undefined;
};
export default function HeaderTotals({ totalEmissions }: Props) {
  const RECOMMENDED_CO2_EMISSION = 2300;

  const percentOfRecommendedEmissions = Math.round(
    ((totalEmissions ?? 0) / RECOMMENDED_CO2_EMISSION) * 100,
  );
  return (
    <div className='dashboardWidget h-[15vh] max-h-[128px] flex justify-between items-center mb-2'>
      <Typography customClass='text-4xl font-bold text-dark_green max-lg:text-3xl'>
        Mes dépenses
      </Typography>
      <div className='flex flex-col items-end'>
        <div className='flex items-end'>
          <Typography customClass='text-4xl font-bold mr-1 text-medium_orange max-lg:text-3xl'>
            {totalEmissions}
          </Typography>
          <Typography customClass='text-lg lg:text-xl xl:text-3xl font-bold text-dark_green'>
            kgCO2
          </Typography>
        </div>
        <div>
          <Typography customClass='text-md text-right font-bold text-medium_green max-lg:text-sm'>
            {percentOfRecommendedEmissions} % du total annuel recommandé
          </Typography>
        </div>
      </div>
    </div>
  );
}
