import { lazy, Suspense } from 'react';
import { useGetCategoriesQuery, useGetCountriesQuery } from './api';

const LineChart = lazy(() => import('./components/line-chart'));

function App() {
  useGetCountriesQuery();
  useGetCategoriesQuery();

  return (
    <Suspense>
      <LineChart />
    </Suspense>
  );
}

export default App;
