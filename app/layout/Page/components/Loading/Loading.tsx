import { Injection, Icon } from '@gatsby-tv/components';
import { Spinner } from '@gatsby-tv/icons';

import styles from './Loading.scss';

export function Loading(): JSX.Element {
  return (
    <Injection target="$foreground">
      <div className={styles.Loading}>
        <Icon className={styles.Spinner} src={Spinner} />
      </div>
    </Injection>
  );
}
