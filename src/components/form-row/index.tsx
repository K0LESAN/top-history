import type { PropsWithChildren } from 'react';
import styles from './index.module.css';

function FormRow({ children }: PropsWithChildren) {
  return <div className={styles.row}>{children}</div>;
}

export default FormRow;
