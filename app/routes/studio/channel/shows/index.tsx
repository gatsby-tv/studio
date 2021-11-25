import { Routes, Route } from 'react-router-dom';

import { Show } from '@app/layout/Show';
import { Dashboard } from '@app/components/Dashboard';
import { Breadcrumb } from '@app/components/Breadcrumb';

import Index from './shows';

export default function ChannelShowsRoute(): JSX.Element {
  return (
    <Breadcrumb label="Shows">
      <Dashboard menu={<Show.Menu />}>
        <Routes>
          <Route index element={<Index />} />
        </Routes>
      </Dashboard>
    </Breadcrumb>
  );
}
