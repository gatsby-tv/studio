import { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Studio } from '@app/layout/Studio';
import Index from '@app/routes/studio/index';
import Channel from '@app/routes/studio/channel';

export default function StudioRoute(): ReactElement {
  return (
    <Studio.Layout>
      <Switch>
        <Route exact path="/studio" component={Index} />
        <Route path="/studio/:channel" component={Channel} />
      </Switch>
    </Studio.Layout>
  );
}
