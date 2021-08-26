import { ReactNode, ReactElement } from 'react';
import { Frame } from '@gatsby-tv/components';

export interface LayoutProps {
  children?: ReactNode;
}

export function Layout(props: LayoutProps): ReactElement {
  const { children } = props;

  return <Frame>{children}</Frame>;
}
