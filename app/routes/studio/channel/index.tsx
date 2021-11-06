import { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Channel } from '@app/layout/Channel';
import { Breadcrumb } from '@app/components/Breadcrumb';

import Index from './channel';

export default function StudioChannelRoute(): ReactElement {
  return (
    <Channel.Layout>
      <Breadcrumb label="Channel">
        <Routes>
          <Route index element={<Index />} />
        </Routes>
      </Breadcrumb>
    </Channel.Layout>
  );
}
