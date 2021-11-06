import { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Studio } from '@app/layout/Studio';
import { useChannelContext, ChannelContext } from '@app/utilities/channel';

import Index from './studio';
import Channel from './channel';

export default function StudioRoute(): ReactElement {
  const channel = useChannelContext();

  return (
    <ChannelContext.Provider value={channel}>
      <Studio.Layout>
        <Routes>
          <Route index element={<Index />} />
          <Route path=":channel/*" element={<Channel />} />
        </Routes>
      </Studio.Layout>
    </ChannelContext.Provider>
  );
}
