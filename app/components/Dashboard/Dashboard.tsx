import { ReactNode } from 'react';
import { useResolvedPath } from 'react-router-dom';

import {
  useDashboardContext,
  DashboardContext,
} from '@app/utilities/dashboard';

import { Menu, MenuProps } from './components/Menu';

export type { MenuProps as DashboardMenuProps };

export interface DashboardProps {
  children?: ReactNode;
  menu: ReactNode;
}

export function Dashboard(props: DashboardProps): JSX.Element {
  const { children, menu: element } = props;
  const { pathname: path } = useResolvedPath('.');
  const context = useDashboardContext({ element, path });

  return (
    <DashboardContext.Provider value={context}>
      {children}
    </DashboardContext.Provider>
  );
}

Dashboard.Menu = Menu;
