import { ReactNode } from 'react';
import { useFrame } from '@gatsby-tv/utilities';

import { Dashboard } from '@app/components/Dashboard';

import styles from './Layout.scss';

export interface LayoutProps {
  children?: ReactNode;
}

export function Layout(props: LayoutProps): JSX.Element {
  const { children } = props;
  const frame = useFrame();

  return (
    <div className={styles.Layout}>
      <div
        style={{ height: `calc(100vh - ${frame.offset.y}px)` }}
        className={styles.Menu}
      >
        <Dashboard.Menu />
      </div>
      <div className={styles.Content}>{children}</div>
    </div>
  );
}
