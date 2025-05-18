import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useAppSelector } from '../../store/hooks';
import { getSelectedCountry } from '../../store/slices/root-slice';
import { useGetTopHistoryQuery } from '../../api';
import { useTopHistory } from './hooks/use-top-history';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart() {
  const selectedCountry = useAppSelector(getSelectedCountry);
  const data = useTopHistory();

  useGetTopHistoryQuery(
    {
      countryId: selectedCountry?.id ?? 0,
      dateFrom: '2025-04-19',
      dateTo: '2025-05-17',
    },
    {
      skip: !selectedCountry,
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <Line
      datasetIdKey={'top-history-line-chart'}
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Top History',
            align: 'start',
            position: 'top',
            font: {
              size: 28,
            },
          },
        },
      }}
      data={data}
    />
  );
}

export default LineChart;
