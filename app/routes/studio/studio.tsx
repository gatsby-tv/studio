import { ReactElement } from 'react';

import { Breadcrumb } from '@app/components/Breadcrumb';

export default function StudioHomeRoute(): ReactElement {
  return (
    <Breadcrumb label="Home">
      <p>/studio</p>
    </Breadcrumb>
  );
}
