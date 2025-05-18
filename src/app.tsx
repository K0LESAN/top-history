import { Suspense } from 'react';
import {
  useGetCategoriesQuery,
  useGetCountriesQuery,
  useGetTopHistoryQuery,
} from './api';
import LineChart from './components/line-chart';

function App() {
  const { data: countryData, isFetching, isSuccess } = useGetCountriesQuery();
  const { data: categoryData } = useGetCategoriesQuery();
  const { data: topHistoryData } = useGetTopHistoryQuery(
    {
      countryId: countryData?.data?.[20]?.id ?? 0,
      dateFrom: '2025-04-19',
      dateTo: '2025-05-17',
    },
    {
      skip: isFetching || !isSuccess,
      refetchOnMountOrArgChange: true,
    }
  );

  if (!countryData || !categoryData || !topHistoryData) {
    return null;
  }

  const countries = countryData.data;
  const categories = categoryData.data;
  const topHistory = topHistoryData.data;

  return (
    <Suspense>
      <LineChart
        countries={countries}
        categories={categories}
        topHistory={topHistory}
      />
    </Suspense>
  );
}

export default App;
