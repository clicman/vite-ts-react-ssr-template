import { enableStaticRendering } from 'mobx-react';
import { StaticRouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { classToPlain } from 'class-transformer';
import { Helmet } from 'react-helmet-async';
import React from 'react';

import { RootStore } from '@client/stores/rootStore';
import { setSsr } from '@client/util/ssrUtils';
import AppServer from '@server/AppServer';

import '@client/styles/index.scss';

export async function render(locale: string, page: string, context: StaticRouterContext) {
  const store = new RootStore();

  // We are using SSR here
  enableStaticRendering(true);
  // Enable SSR for client
  setSsr(true);

  const helmetContext: { helmet?: Helmet } = {};
  const appProps = {
    store,
    url: page,
    context,
    helmetContext,
  };
  const app = await AppServer(appProps);
  const toRender = <React.StrictMode>{app}</React.StrictMode>;

  // Initiate all async operations in components
  renderToString(toRender);

  // Wait until all async operations in components will resolved
  await Promise.all(store.getAllPromises());
  // Flush promises
  store.clearPromises();

  // Render to string with data
  const appHtml = renderToString(toRender);
  const seo = helmetContext.helmet;

  return { state: classToPlain(store), appHtml, seo };
}
