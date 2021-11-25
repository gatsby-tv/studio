import { ReactNode } from 'react';
import { useResolvedPath } from 'react-router-dom';
import {
  useBreadcrumbsContext,
  BreadcrumbsContext,
} from '@gatsby-tv/utilities';

export interface BreadcrumbProps {
  children?: ReactNode;
  label: string;
}

export function Breadcrumb(props: BreadcrumbProps): JSX.Element {
  const { children, label } = props;
  const { pathname: path } = useResolvedPath('.');

  const context = useBreadcrumbsContext({
    label,
    path,
  });

  return (
    <BreadcrumbsContext.Provider value={context}>
      {children}
    </BreadcrumbsContext.Provider>
  );
}
