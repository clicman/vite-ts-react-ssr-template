import { Route, StaticRouter, Switch } from 'react-router-dom';
import React from 'react';

import { RouterProps } from '@client/components/routers/routerPorps';

export const ServerRouter: React.FC<RouterProps> = ({
  beforeContent,
  url,
  context,
  afterContent,
  routes,
}: RouterProps) => (
  <StaticRouter location={url} context={context}>
    {beforeContent}
    <Switch>
      {routes.map((route, key) => (
        <Route path={route.path} exact={route.exact || false} key={key}>
          <route.component />
        </Route>
      ))}
    </Switch>
    {afterContent}
  </StaticRouter>
);
