import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider } from 'mobx-react';
import React from 'react';

import { ClientRouter } from '@client/components/routers/clientRouter';
import Header from '@client/components/header/Header';
import { RootStore } from '@client/stores/rootStore';
import buildClientRoutes from '@client/routesClient';
import { Footer } from '@client/components/Footer';
import { Seo } from '@client/components/Seo';

interface AppClientProps {
  store: RootStore;
  helmetContext: { helmet?: Helmet };
}

const AppClient = async ({ store, helmetContext }: AppClientProps) => {
  const header = <Header />;
  const afterContent = <Footer />;
  const clientRoutes = await buildClientRoutes();
  const router = <ClientRouter baseName="/" beforeContent={header} afterContent={afterContent} routes={clientRoutes} />;
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

export default AppClient;
