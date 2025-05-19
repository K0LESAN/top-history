import {
  useCallback,
  useEffect,
  useState,
  type MouseEventHandler,
} from 'react';
import { useAppSelector } from '../../store/hooks';
import {
  getCountries,
  getSelectedCountry,
} from '../../store/slices/root.slice';
import styles from './index.module.css';
import CountryOption from '../country-option';

function CountrySelect() {
  const selectedCountry = useAppSelector(getSelectedCountry);
  const countries = useAppSelector(getCountries);
  const [visibleList, setVisibleList] = useState(false);
  const visibleCountriesList = visibleList && Boolean(countries.length);

  const closeList = useCallback(() => {
    setVisibleList(false);
  }, []);

  const showListHandler: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.stopPropagation();
      setVisibleList(true);
    },
    []
  );

  const toggleListHandler: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.stopPropagation();
      setVisibleList((prev) => !prev);
    },
    []
  );

  const closeListOnPressEsc = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeList();
      }
    },
    [closeList]
  );

  useEffect(() => {
    document.addEventListener('click', closeList);
    document.addEventListener('keydown', closeListOnPressEsc);

    return () => {
      document.removeEventListener('click', closeList);
      document.removeEventListener('keydown', closeListOnPressEsc);
    };
  }, []);

  useEffect(() => {
    closeList();
  }, [selectedCountry]);

  return (
    <div className={styles.select} onClick={showListHandler}>
      {selectedCountry && (
        <div className={styles.option} onClick={toggleListHandler}>
          <img
            className={styles.icon}
            src={selectedCountry.icon}
            alt={selectedCountry.name}
          />
          <span>{selectedCountry.name}</span>
        </div>
      )}
      {visibleCountriesList && (
        <div className={styles.container}>
          {countries.map((country) => {
            if (country.id === selectedCountry?.id) {
              return null;
            }

            return <CountryOption key={country.id} country={country} />;
          })}
        </div>
      )}
    </div>
  );
}

export default CountrySelect;
