import { createContext, ReactNode, Dispatch } from 'react';

export type DashboardMenu = {
  path: string;
  element: ReactNode;
};

export type DashboardState = {
  current?: DashboardMenu;
  next?: DashboardMenu;
  prev?: DashboardMenu;
  target?: { next?: DashboardMenu; prev?: DashboardMenu };
  active: boolean;
};

export type DashboardAction =
  | { type: 'next'; menu: DashboardMenu }
  | { type: 'prev'; menu: DashboardMenu }
  | { type: 'sync' }
  | { type: 'reset' };

export type DashboardContextType = {
  menu?: DashboardMenu;
  state: DashboardState;
  dispatch: Dispatch<DashboardAction>;
};

export const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);
