import { Routes, Route } from 'react-router-dom';

import { Metrics } from '@app/layout/Metrics';
import { Dashboard } from '@app/components/Dashboard';
import { Breadcrumb } from '@app/components/Breadcrumb';

import Index from './metrics';

export default function ChannelMetricsRoute(): JSX.Element {
  return (
    <Breadcrumb label="Metrics">
      <Dashboard menu={<Metrics.Menu />}>
        <Routes>
          <Route index element={<Index />} />
        </Routes>
      </Dashboard>
    </Breadcrumb>
  );
}
