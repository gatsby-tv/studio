import { Routes, Route } from 'react-router-dom';

import { Channel } from '@app/layout/Channel';
import { Dashboard } from '@app/components/Dashboard';
import { Breadcrumb } from '@app/components/Breadcrumb';

import Index from './channel';
import Metrics from './metrics';
import Projects from './projects';
import Videos from './videos';
import Playlists from './playlists';
import Shows from './shows';

export default function StudioChannelRoute(): JSX.Element {
  return (
    <Channel.Layout>
      <Breadcrumb label="home">
        <Dashboard menu={<Channel.Menu />}>
          <Routes>
            <Route index element={<Index />} />
            <Route path="metrics/*" element={<Metrics />} />
            <Route path="projects/*" element={<Projects />} />
            <Route path="videos/*" element={<Videos />} />
            <Route path="playlists/*" element={<Playlists />} />
            <Route path="shows/*" element={<Shows />} />
          </Routes>
        </Dashboard>
      </Breadcrumb>
    </Channel.Layout>
  );
}
