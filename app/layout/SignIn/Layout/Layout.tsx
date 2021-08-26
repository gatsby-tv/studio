import { ReactNode, ReactElement } from 'react';
import { Stars } from '@gatsby-tv/components';

import styles from './Layout.scss';

export interface LayoutProps {
  children?: ReactNode;
}

export function Layout(props: LayoutProps): ReactElement {
  const { children } = props;

  return (
    <>
      <div className={styles.Layout}>{children}</div>
      <Stars background />
    </>
  );
}
