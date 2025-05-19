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
import { useState } from 'react';
import Container from '../container';
import ExportToCSV from '../export-to-csv';
import { useTopHistory } from './hooks/use-top-history';
import CountrySelect from '../country-select';
import ExportToPNG from '../export-to-png';
import DateSelector from '../date-selector';

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
  const [base64Image, setBase64Image] = useState('');
  const data = useTopHistory();

  return (
    <>
      <Container>
        <ExportToCSV {...data} />
        <ExportToPNG base64Image={base64Image} />
        <DateSelector />
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
