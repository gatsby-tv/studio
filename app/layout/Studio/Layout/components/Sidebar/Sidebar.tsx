import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { Avatar } from '@gatsby-tv/components';
import { GetUserChannelsResponse } from '@gatsby-tv/types';

import { useSession } from '@app/services/session';

import styles from './Sidebar.scss';

export function Sidebar(): ReactElement {
  const {
    session: { user },
  } = useSession();

  const { data: channels } = useSWR<GetUserChannelsResponse>(
    user ? `/user/${user._id}/channels` : null
  );

  const AvatarMarkup = channels?.map((channel) => (
    <Link key={channel._id} to={`/studio/${channel._id}`}>
      <Avatar src={channel.avatar} />
    </Link>
  ));

  return <div className={styles.Sidebar}>{AvatarMarkup}</div>;
}
