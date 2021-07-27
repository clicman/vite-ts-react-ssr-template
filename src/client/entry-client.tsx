import { Helmet } from 'react-helmet-async';
import ReactDOM from 'react-dom';
import React from 'react';
import 'reflect-metadata';
import 'lazysizes';

import { rehydrate } from '@client/util/hydrate';
import { setSsr } from '@client/util/ssrUtils';
import AppClient from '@client/AppClient';

import '@client/styles/index.scss';

// Disable SSR for client
setSsr(false);

const helmetContext: { helmet?: Helmet } = {};

// Rehydrate stores from server side on client
const store = rehydrate();

const appProps = {
  store,
  helmetContext,
};

(async () => {
  const app = await AppClient(appProps);
  const toRender = <React.StrictMode>{app}</React.StrictMode>;

  ReactDOM.hydrate(<React.StrictMode>{toRender}</React.StrictMode>, document.getElementById('app'));
})();
