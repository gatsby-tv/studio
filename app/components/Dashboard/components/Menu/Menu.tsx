import { CSSProperties, ReactNode } from 'react';
import { Scroll } from '@gatsby-tv/components';
import { Class } from '@gatsby-tv/utilities';

import { useDashboard } from '@app/utilities/dashboard';
import { useFlicker } from '@app/utilities/use-flicker';

import styles from './Menu.scss';

export interface MenuProps {
  children?: ReactNode;
}

export function Menu(): JSX.Element {
  const [{ current, ...dashboard }, dispatch] = useDashboard();

  const { next, prev, active } = useFlicker(dashboard, [current?.path]);

  const stage = Class(styles.Stage, active && styles.Active);

  const left: CSSProperties = {
    left: prev ? '0%' : '-100%',
  };

  const center: CSSProperties = {
    left: prev ? '100%' : next ? '-100%' : '0%',
  };

  const right: CSSProperties = {
    left: next ? '0%' : '100%',
  };

  return (
    <div className={styles.Menu}>
      <div style={left} className={stage}>
        <Scroll className={styles.Scroll} hide>
          {prev?.element}
        </Scroll>
      </div>
      <div
        style={center}
        className={stage}
        onTransitionEnd={() => dispatch({ type: 'sync' })}
      >
        <Scroll className={styles.Scroll} hide>
          {current?.element}
        </Scroll>
      </div>
      <div style={right} className={stage}>
        <Scroll className={styles.Scroll} hide>
          {next?.element}
        </Scroll>
      </div>
    </div>
  );
}
