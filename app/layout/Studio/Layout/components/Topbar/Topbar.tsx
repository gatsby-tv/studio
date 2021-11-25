import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@gatsby-tv/components';
import { useBreadcrumbs } from '@gatsby-tv/utilities';

import styles from './Topbar.scss';

export function Topbar(): ReactElement {
  const breadcrumbs = useBreadcrumbs();

  const crumbs = breadcrumbs.map(({ label, path }) => ({
    label,
    $link: { to: path },
  }));

  return (
    <div className={styles.Topbar}>
      <Breadcrumbs className={styles.Breadcrumbs} crumbs={crumbs} link={Link} />
    </div>
  );
}
