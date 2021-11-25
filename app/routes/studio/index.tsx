import { Routes, Route } from 'react-router-dom';

import { Studio } from '@app/layout/Studio';
import { useChannelContext, ChannelContext } from '@app/utilities/channel';
import {
  DashboardContext,
  useDashboardContext,
} from '@app/utilities/dashboard';

import Index from './studio';
import Channel from './channel';

export default function StudioRoute(): JSX.Element {
  const channel = useChannelContext();
  const dashboard = useDashboardContext();

  return (
    <DashboardContext.Provider value={dashboard}>
      <ChannelContext.Provider value={channel}>
        <Studio.Layout>
          <Routes>
            <Route index element={<Index />} />
            <Route path=":channel/*" element={<Channel />} />
          </Routes>
        </Studio.Layout>
      </ChannelContext.Provider>
    </DashboardContext.Provider>
  );
}
