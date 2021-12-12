import { ReactElement } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { SWRConfig } from 'swr';
import { AppProvider } from '@gatsby-tv/components';
import { IPFSContext, useIPFSContext } from '@gatsby-tv/utilities';
import '@gatsby-tv/components/dist/styles.css';
import '@gatsby-tv/components/dist/fonts.css';
import '@gatsby-tv/preview/dist/styles.css';
import '@gatsby-tv/layout/dist/styles.css';

import { fetcher } from '@app/utilities/fetcher';
import {
  MessengerContext,
  useMessengerContext,
} from '@app/utilities/messenger';
import { SessionContext, useSessionContext } from '@app/services/session';

import Index from '@app/routes';
import SignIn from '@app/routes/signin';
import Studio from '@app/routes/studio';

export default function App(): ReactElement {
  const messenger = useMessengerContext();
  const session = useSessionContext();
  const node = useIPFSContext();

  return (
    <AppProvider>
      <SWRConfig
        value={{
          fetcher: (url, ...args) =>
            fetcher(url, ...args, {}).then((resp) => resp.json()),
        }}
      >
        <IPFSContext.Provider value={node}>
          <SessionContext.Provider value={session}>
            <MessengerContext.Provider value={messenger}>
              <Router>
                <Routes>
                  <Route index element={<Index />} />
                  <Route path="/signin/*" element={<SignIn />} />
                  <Route path="/studio/*" element={<Studio />} />
                </Routes>
              </Router>
            </MessengerContext.Provider>
          </SessionContext.Provider>
        </IPFSContext.Provider>
      </SWRConfig>
    </AppProvider>
  );
}
