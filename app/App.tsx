import { ReactElement } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { AppProvider } from '@gatsby-tv/components';
import '@gatsby-tv/components/dist/styles.css';
import '@gatsby-tv/components/dist/fonts.css';
import '@gatsby-tv/preview/dist/styles.css';
import '@gatsby-tv/content/dist/styles.css';

import { MessengerContext, useMessengerContext } from '@app/utilities/messenger';

import { Loading } from '@app/routes/Loading';
import { SignIn } from '@app/routes/SignIn';
import { Studio } from '@app/routes/Studio';

export default function App(): ReactElement {
  const messenger = useMessengerContext();

  return (
    <AppProvider>
      <MessengerContext.Provider value={messenger}>
        <Router>
          <Switch>
            <Route exact path="/" component={Loading} />
            <Route path="/signin" component={SignIn} />
            <Route path="/studio" component={Studio} />
          </Switch>
        </Router>
      </MessengerContext.Provider>
    </AppProvider>
  );
}
