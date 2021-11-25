import { Routes, Route } from 'react-router-dom';

import { Project } from '@app/layout/Project';
import { Dashboard } from '@app/components/Dashboard';
import { Breadcrumb } from '@app/components/Breadcrumb';

import Index from './projects';

export default function ChannelProjectRoute(): JSX.Element {
  return (
    <Breadcrumb label="Projects">
      <Dashboard menu={<Project.Menu />}>
        <Routes>
          <Route index element={<Index />} />
        </Routes>
      </Dashboard>
    </Breadcrumb>
  );
}
