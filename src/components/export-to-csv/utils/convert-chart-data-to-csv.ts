import type { Datasets, Labels } from '../../../type';

export function convertChartDataToCSV(
  dataset: Datasets[number],
  labels: Labels = []
) {
  const { data, label } = dataset;
  const joinedLabels = labels.join(',');
  const result: (string | number)[] = [`${joinedLabels}\n${label}`];

  for (const dataItem of data) {
    result.push(dataItem);
  }

  return `${result.join(',')}\n`;
}
