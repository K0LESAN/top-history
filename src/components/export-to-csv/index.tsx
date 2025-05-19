import { useAppSelector } from '../../store/hooks';
import { getSelectedCountry } from '../../store/slices/root.slice';
import type { ExportToCSVProps } from './type';
import { convertChartDataToCSV } from './utils/convert-chart-data-to-csv';
import { useMemo } from 'react';

function ExportToCSV({ datasets, labels }: ExportToCSVProps) {
  const selectedCountry = useAppSelector(getSelectedCountry);
  const filename = `${selectedCountry?.name}.csv`;
  const href = useMemo(() => {
    const csvData = datasets.map((dataset) =>
      convertChartDataToCSV(dataset, labels)
    );
    const csv = ['data:text/csv;charset=utf-8,'].concat(csvData).join(',');

    return encodeURI(csv);
  }, [datasets, labels]);

  return (
    <a href={href} download={filename}>
      CSV
    </a>
  );
}

export default ExportToCSV;
