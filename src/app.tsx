import { lazy, Suspense } from 'react';
import { useGetCategoriesQuery, useGetCountriesQuery } from './api';
import Container from './components/container';

const LineChart = lazy(() => import('./components/line-chart'));

function App() {
  useGetCountriesQuery();
  useGetCategoriesQuery();

  return (
    <Container>
      <Suspense>
        <LineChart />
      </Suspense>
    </Container>
  );
}

export default App;
