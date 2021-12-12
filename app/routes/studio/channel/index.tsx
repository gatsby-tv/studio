import { useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { Channel as ChannelType } from '@gatsby-tv/types';
import useSWR from 'swr';

import { Channel } from '@app/layout/Channel';
import { Dashboard } from '@app/components/Dashboard';
import { Breadcrumb } from '@app/components/Breadcrumb';
import { useChannel } from '@app/utilities/channel';

import Index from './channel';
import Metrics from './metrics';
import Projects from './projects';
import Videos from './videos';
import Playlists from './playlists';
import Shows from './shows';

export default function StudioChannelRoute(): JSX.Element {
  const { channel: id } = useParams();
  const { data: channel } = useSWR<ChannelType>(`/channel/${id}`);
  const [, setChannel] = useChannel();

  useEffect(() => setChannel(channel), []);

  return (
    <Channel.Layout>
      <Breadcrumb label={channel?.handle ?? ''}>
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
