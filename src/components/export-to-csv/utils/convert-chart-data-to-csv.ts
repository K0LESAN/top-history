import type { ChartData } from 'chart.js';

type Data = ChartData<'line', string>;

export function convertChartDataToCSV(
  dataset: Data['datasets'][number],
  labels: Data['labels'] = []
) {
  const { data, label } = dataset;
  const joinedLabels = labels.join(',');
  const result: string[] = [`${joinedLabels}\n${label}`];

  for (const dataItem of data) {
    result.push(dataItem);
  }

  return `${result.join(',')}\n`;
}
