import { Routes, Route } from 'react-router-dom';

import { Playlist } from '@app/layout/Playlist';
import { Dashboard } from '@app/components/Dashboard';
import { Breadcrumb } from '@app/components/Breadcrumb';

import Index from './playlists';

export default function ChannelPlaylistsRoute(): JSX.Element {
  return (
    <Breadcrumb label="Playlists">
      <Dashboard menu={<Playlist.Menu />}>
        <Routes>
          <Route index element={<Index />} />
        </Routes>
      </Dashboard>
    </Breadcrumb>
  );
}
