import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';

import { RouterProps } from '@client/components/routers/routerPorps';

export const ClientRouter: React.FC<RouterProps> = ({ baseName, beforeContent, afterContent, routes }: RouterProps) => (
  <React.Suspense fallback={<span style={{ display: 'none' }}>Loading...</span>}>
    <BrowserRouter basename={baseName}>
      {beforeContent}
      <Switch>
        {routes.map((route, key) => (
          <Route path={route.path} exact={route.exact || false} key={key}>
            <route.component />
          </Route>
        ))}
      </Switch>
      {afterContent}
    </BrowserRouter>
  </React.Suspense>
);
