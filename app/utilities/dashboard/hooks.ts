import { useReducer, useEffect, useMemo, useContext, Dispatch } from 'react';
import { useLocation } from 'react-router-dom';
import { useComponentDidMount, ContextError } from '@gatsby-tv/utilities';

import {
  DashboardContext,
  DashboardContextType,
  DashboardMenu,
  DashboardState,
  DashboardAction,
} from './context';

export function useDashboardContext(
  menu?: DashboardMenu
): DashboardContextType {
  const parent = useContext(DashboardContext);
  const mounted = useComponentDidMount();
  const { pathname } = useLocation();

  const [state, reducer] = useReducer(
    (state: DashboardState, action: DashboardAction) => {
      switch (action.type) {
        case 'next':
          return state.active
            ? { ...state, target: { next: action.menu } }
            : state.current
            ? {
                ...state,
                next: action.menu,
                target: { next: action.menu },
                active: true,
              }
            : {
                ...state,
                current: action.menu,
              };

        case 'prev':
          return state.active
            ? { ...state, target: { prev: action.menu } }
            : {
                ...state,
                prev: action.menu,
                target: { prev: action.menu },
                active: true,
              };

        case 'sync':
          const current = state.next ?? state.prev;
          const target = state.target?.next ?? state.target?.prev;
          return target?.path === current?.path
            ? {
                ...state,
                current,
                next: undefined,
                prev: undefined,
                target: undefined,
                active: false,
              }
            : {
                ...state,
                current,
                [state.target?.next ? 'next' : 'prev']: target,
                [state.target?.next ? 'prev' : 'next']: undefined,
              };

        case 'reset':
          return {
            current: undefined,
            next: undefined,
            prev: undefined,
            target: undefined,
            active: false,
          };
      }
    },
    {
      current: undefined,
      next: undefined,
      prev: undefined,
      target: undefined,
      active: false,
    }
  );

  const dispatch = parent?.dispatch ?? reducer;

  useEffect(() => {
    if (parent?.menu) return;
    return () => dispatch({ type: 'reset' });
  }, []);

  useEffect(() => {
    if (menu?.path !== pathname || mounted.current) return;
    dispatch({ type: 'next', menu });
  }, [menu?.path, pathname]);

  useEffect(() => {
    if (menu?.path !== pathname || !mounted.current) return;
    dispatch({ type: 'prev', menu });
  }, [menu?.path, pathname]);

  return useMemo(() => ({ menu, state, dispatch }), [menu?.path, state]);
}

export function useDashboard(): [DashboardState, Dispatch<DashboardAction>] {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new ContextError('Dashboard');
  }

  return [context.state, context.dispatch];
}
