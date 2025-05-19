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
import { useState } from 'react';
import Container from '../container';
import ExportToCSV from '../export-to-csv';
import { useTopHistory } from './hooks/use-top-history';
import CountrySelect from '../country-select';
import ExportToPNG from '../export-to-png';

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
  const [base64Image, setBase64Image] = useState('');

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
    <>
      <Container>
        {ref.current && (
          <>
            <ExportToCSV
              // @ts-expect-error correct type
              datasets={data.datasets}
              labels={data.labels}
            />
            <ExportToPNG base64Image={base64Image} />
          </>
        )}
        <CountrySelect />
      </Container>
      <Line
        options={{
          animation: {
            onComplete: ({ chart }) => {
              setBase64Image(chart.toBase64Image('image/png', 1));
            },
          },
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
    </>
  );
}

export default LineChart;
