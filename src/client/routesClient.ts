import React from 'react';

import { RouteProp } from '@client/components/routers/routerPorps';

async function buildClientRoutes(): Promise<RouteProp[]> {
  return [
    {
      path: '/',
      exact: true,
      component: React.lazy(() => import('@client/pages/Main')), // Client routes are lazy
    },
  ];
}

export default buildClientRoutes;
