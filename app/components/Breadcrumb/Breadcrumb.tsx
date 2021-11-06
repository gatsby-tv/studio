import { ReactNode, ReactElement } from 'react';
import { useResolvedPath } from 'react-router-dom';
import {
  useBreadcrumbsContext,
  BreadcrumbsContext,
} from '@gatsby-tv/utilities';

export interface BreadcrumbProps {
  children?: ReactNode;
  label: string;
}

export function Breadcrumb(props: BreadcrumbProps): ReactElement {
  const { children, label } = props;
  const resolved = useResolvedPath('.');

  const context = useBreadcrumbsContext({
    label,
    path: resolved.pathname,
  });

  return (
    <BreadcrumbsContext.Provider value={context}>
      {children}
    </BreadcrumbsContext.Provider>
  );
}
