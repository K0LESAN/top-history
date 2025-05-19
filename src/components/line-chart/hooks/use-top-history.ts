import { subCategories } from '../../../constants';
import { useAppSelector } from '../../../store/hooks';
import { getCategories, getTopHistory } from '../../../store/slices/root-slice';
import type { Datasets } from '../../../type';
import { createColorGenerator } from '../../../utils/create-color-generator';
import { useMemo } from 'react';

export const useTopHistory = () => {
  const categories = useAppSelector(getCategories);
  const topHistory = useAppSelector(getTopHistory);

  return useMemo(() => {
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

        for (const date in topHistory[categoryId][subCategoryId]) {
          const position = topHistory[categoryId][subCategoryId][date];

          positions.push(position);
          newLabels.add(date);
        }

        if (currentCategory) {
          const { name: categoryName } = currentCategory;

          newDatasets.push({
            label: `${categoryName} - ${subCategories[subCategoryId]}`,
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

    return {
      labels: formattedLabels,
      datasets: newDatasets,
    };
  }, [categories, topHistory]);
};
