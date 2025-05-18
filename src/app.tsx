import { Suspense } from 'react';
import LineChart from './components/line-chart';
import CountrySelector from './components/country-select';
import { useGetCategoriesQuery, useGetCountriesQuery } from './api';

function App() {
  useGetCountriesQuery();
  useGetCategoriesQuery();

  return (
    <>
      <CountrySelector />
      <Suspense>
        <LineChart />
      </Suspense>
    </>
  );
}

export default App;
