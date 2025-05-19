import type { PropsWithChildren } from 'react';
import styles from './index.module.css';

function Container({ children }: PropsWithChildren) {
  return <div className={styles.container}>{children}</div>;
}

export default Container;
