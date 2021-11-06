import { ReactNode, ReactElement } from 'react';
import { Frame } from '@gatsby-tv/components';

import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';

import styles from './Layout.scss';

export interface LayoutProps {
  children?: ReactNode;
}

export function Layout(props: LayoutProps): ReactElement {
  const { children } = props;

  return (
    <Frame
      className={styles.Frame}
      topbar={<Topbar />}
      sidebar={<Sidebar />}
      flipped
    >
      {children}
    </Frame>
  );
}
