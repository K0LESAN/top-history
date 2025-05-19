import type { ChartData } from 'chart.js';

type Data = ChartData<'line', string>;
type Datasets = Data['datasets'];
type Labels = Data['labels'];

interface ExportToCSVProps {
  datasets: Datasets;
  labels: Labels;
}

export type { Data, Datasets, Labels, ExportToCSVProps };
