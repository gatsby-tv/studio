import { ReactElement } from 'react';
import { Redirect } from 'react-router-dom';

import { Page } from '@app/layout/Page';
import { useSession } from '@app/services/session';

export default function IndexRoute(): ReactElement {
  const { session } = useSession();

  const RedirectMarkup = session.loading ? null : session.valid ? (
    <Redirect to="/studio" />
  ) : (
    <Redirect to="/signin" />
  );

  return (
    <>
      <Page.Loading />
      {RedirectMarkup}
    </>
  );
}
