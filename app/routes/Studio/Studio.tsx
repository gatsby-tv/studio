import { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Frame } from '@gatsby-tv/components';

import styles from './Studio.scss';

export function Studio(): ReactElement {
  return (
    <Frame>
      <Switch>
        <Route exact path="/studio" />
        <Route path="/studio/:channel" />
      </Switch>
    </Frame>
  );
}
