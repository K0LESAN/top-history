import { Suspense } from 'react';
import { useGetCategoriesQuery, useGetCountriesQuery } from './api';
import LineChart from './components/line-chart';

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
