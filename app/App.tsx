import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppProvider } from '@gatsby-tv/components';
import '@gatsby-tv/components/dist/styles.css';
import '@gatsby-tv/components/dist/fonts.css';
import '@gatsby-tv/preview/dist/styles.css';
import '@gatsby-tv/content/dist/styles.css';

import { Home } from '@app/routes';

export default function App() {
  return (
    <Router>
      <AppProvider>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </AppProvider>
    </Router>
  );
}
