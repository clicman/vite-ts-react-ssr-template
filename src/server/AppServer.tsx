import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider } from 'mobx-react';
import React from 'react';

import { buildServerRoutes } from '@server/routesServer';
import Header from '@client/components/header/Header';
import { ServerRouter } from '@server/serverRouter';
import { RootStore } from '@client/stores/rootStore';
import { Footer } from '@client/components/Footer';
import { Seo } from '@client/components/Seo';

interface AppServerProps {
  store: RootStore;
  helmetContext: { helmet?: Helmet };
  url: string;
  context: any;
}

const AppServer = async ({ store, helmetContext, url, context }: AppServerProps) => {
  const header = <Header />;
  const afterContent = <Footer />;
  const serverRoutes = await buildServerRoutes();
  const router = (
    <ServerRouter
      url={url}
      beforeContent={header}
      context={context}
      afterContent={afterContent}
      routes={serverRoutes}
    />
  );
  return (
    <div id="app-content">
      <HelmetProvider context={helmetContext}>
        <Provider store={store}>
          <Seo />
          {router}
        </Provider>
      </HelmetProvider>
    </div>
  );
};

export default AppServer;
