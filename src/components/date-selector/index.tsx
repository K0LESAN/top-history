import { useCallback, useState, type ChangeEventHandler } from 'react';
import { useGetTopHistoryQuery } from '../../api';
import { useAppSelector } from '../../store/hooks';
import { getSelectedCountry } from '../../store/slices/root-slice';

const formatDate = (date: Date) => date.toISOString().replace(/T.*/, '');

function DateSelector() {
  const selectedCountry = useAppSelector(getSelectedCountry);
  const [dateFrom, setDateFrom] = useState(() =>
    formatDate(new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 14))
  );
  const [dateTo, setDateTo] = useState(() => formatDate(new Date()));

  const changeDateFromHandler: ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      setDateFrom(event.target.value);
    }, []);

  const changeDateToHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setDateTo(event.target.value);
    },
    []
  );

  useGetTopHistoryQuery(
    {
      countryId: selectedCountry?.id ?? 0,
      dateFrom,
      dateTo,
    },
    {
      skip: !selectedCountry,
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <>
      <input type='date' value={dateFrom} onChange={changeDateFromHandler} />
      <input type='date' value={dateTo} onChange={changeDateToHandler} />
    </>
  );
}

export default DateSelector;
