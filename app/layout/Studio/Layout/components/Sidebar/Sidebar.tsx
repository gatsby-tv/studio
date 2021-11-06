import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@gatsby-tv/components';

import styles from './Sidebar.scss';

export function Sidebar(): ReactElement {
  return (
    <div className={styles.Sidebar}>
      <Link to="/studio">
        <Avatar />
      </Link>
      <Link to="/studio/123">
        <Avatar />
      </Link>
    </div>
  );
}
