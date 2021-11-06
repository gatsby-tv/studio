import { ReactNode, ReactElement } from 'react';

export interface LayoutProps {
  children?: ReactNode;
}

export function Layout(props: LayoutProps): ReactElement {
  const { children } = props;
  return <>{children}</>;
}
