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
import type { Category, Country, TopHistory } from '../../type';
import { useEffect, useState } from 'react';
import { createColorGenerator } from '../../utils/create-color-generator';

type LineProps = Parameters<typeof Line>[0];

type Datasets = LineProps['data']['datasets'];

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  countries: Country[];
  categories: Category[];
  topHistory: TopHistory;
}

function LineChart({ countries, categories, topHistory }: LineChartProps) {
  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<Datasets>([]);

  useEffect(() => {
    const newLabels: Set<string> = new Set();
    const newDatasets: Datasets = [];

    for (const categoryId in topHistory) {
      const convertedCategoryId = Number(categoryId);
      const currentCategory = categories.find(
        ({ id }) => id === convertedCategoryId
      );

      for (const subCategoryId in topHistory[categoryId]) {
        const colorGenerator = createColorGenerator();
        const positions: number[] = [];
        const convertedSubCategoryId = Number(subCategoryId);
        const currentSubCategory = currentCategory?.categories?.find(
          ({ id }) => id === convertedSubCategoryId
        );

        for (const date in topHistory[categoryId][subCategoryId]) {
          const position = topHistory[categoryId][subCategoryId][date];

          positions.push(position);
          newLabels.add(date);
        }

        if (currentCategory && currentSubCategory) {
          const { name: categoryName } = currentCategory;
          const { name } = currentSubCategory;

          newDatasets.push({
            label: `${categoryName} - ${name}`,
            data: positions,
            borderColor: colorGenerator(),
            backgroundColor: colorGenerator(0.5),
          });
        }
      }
    }

    setLabels(
      [...newLabels].sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
      )
    );
    setDatasets(newDatasets);
  }, [countries, categories, topHistory]);

  return (
    <Line
      datasetIdKey={'top-topHistory-line-chart'}
      options={{
        locale: countries[20].locale,
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
      data={{
        labels,
        datasets,
      }}
    />
  );
}

export default LineChart;
