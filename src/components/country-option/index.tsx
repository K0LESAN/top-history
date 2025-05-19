import { useCallback, type MouseEventHandler } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setSelectedCountry } from '../../store/slices/root.slice';
import type { Country } from '../../type';
import styles from './index.module.css';

interface CountryOptionProps {
  country: Country;
}

function CountryOption({ country }: CountryOptionProps) {
  const { name, icon } = country;
  const dispatch = useAppDispatch();

  const selectCountry: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.stopPropagation();
      dispatch(setSelectedCountry(country));
    },
    []
  );

  return (
    <div className={styles.option} onClick={selectCountry}>
      <img className={styles.icon} src={icon} alt={name} />
      <span>{name}</span>
    </div>
  );
}

export default CountryOption;
