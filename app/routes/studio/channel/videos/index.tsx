import { Routes, Route } from 'react-router-dom';

import { Video } from '@app/layout/Video';
import { Dashboard } from '@app/components/Dashboard';
import { Breadcrumb } from '@app/components/Breadcrumb';

import Index from './videos';

export default function ChannelVideosRoute(): JSX.Element {
  return (
    <Breadcrumb label="Videos">
      <Dashboard menu={<Video.Menu />}>
        <Routes>
          <Route index element={<Index />} />
        </Routes>
      </Dashboard>
    </Breadcrumb>
  );
}
