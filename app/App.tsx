import { ReactElement } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { AppProvider } from '@gatsby-tv/components';
import '@gatsby-tv/components/dist/styles.css';
import '@gatsby-tv/components/dist/fonts.css';
import '@gatsby-tv/preview/dist/styles.css';
import '@gatsby-tv/content/dist/styles.css';

import {
  MessengerContext,
  useMessengerContext,
} from '@app/utilities/messenger';
import { SessionContext, useSessionContext } from '@app/services/session';

import Index from '@app/routes/index';
import SignIn from '@app/routes/signin';
import Studio from '@app/routes/studio';

export default function App(): ReactElement {
  const messenger = useMessengerContext();
  const session = useSessionContext();

  return (
    <AppProvider>
      <SessionContext.Provider value={session}>
        <MessengerContext.Provider value={messenger}>
          <Router>
            <Switch>
              <Route exact path="/" component={Index} />
              <Route path="/signin" component={SignIn} />
              <Route path="/studio" component={Studio} />
            </Switch>
          </Router>
        </MessengerContext.Provider>
      </SessionContext.Provider>
    </AppProvider>
  );
}
