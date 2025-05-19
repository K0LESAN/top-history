import type { PropsWithChildren } from 'react';
import styles from './index.module.css';

function AdaptiveWrapper({ children }: PropsWithChildren) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default AdaptiveWrapper;
