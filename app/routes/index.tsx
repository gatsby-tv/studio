import { useEffect, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { Page } from '@app/layout/Page';
import { useSession } from '@app/services/session';

export default function IndexRoute(): ReactElement {
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session.loading) return;
    navigate(session.valid ? '/studio' : '/signin');
  }, [session.loading, session.valid]);

  return (
    <>
      <Page.Loading />
    </>
  );
}
