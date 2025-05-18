import type { Line } from 'react-chartjs-2';
import { useAppSelector } from '../../../store/hooks';
import { getCategories, getTopHistory } from '../../../store/slices/root-slice';
import { createColorGenerator } from '../../../utils/create-color-generator';
import { useEffect, useState } from 'react';

type LineProps = Parameters<typeof Line>[0];

type Data = LineProps['data'];
type Datasets = Data['datasets'];

export const useTopHistory = () => {
  const [data, setData] = useState<Data>({ datasets: [] });
  const categories = useAppSelector(getCategories);
  const topHistory = useAppSelector(getTopHistory);

  useEffect(() => {
    const newLabels: Set<string> = new Set();
    const newDatasets: Datasets = [];

    for (const categoryId in topHistory) {
      const formattedCategoryId = Number(categoryId);
      const currentCategory = categories.find(
        ({ id }) => id === formattedCategoryId
      );

      for (const subCategoryId in topHistory[categoryId]) {
        const colorGenerator = createColorGenerator();
        const positions: number[] = [];
        const formattedSubCategoryId = Number(subCategoryId);
        const currentSubCategory = currentCategory?.categories?.find(
          ({ id }) => id === formattedSubCategoryId
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

    const formattedLabels = [...newLabels].sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    setData({
      labels: formattedLabels,
      datasets: newDatasets,
    });
  }, [categories, topHistory]);

  return data;
};
