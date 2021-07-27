import { HelmetData } from 'react-helmet-async';
import serveStatic from 'serve-static';
import compression from 'compression';
import express from 'express';
import 'reflect-metadata';
import path from 'path';
import fs from 'fs';
import 'lazysizes';

import { buildTemplate } from '@server/template';
import serverConfig from '@server/serverConfig';
import { cache } from '@server/cache';

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;

const createServer = async (root = process.cwd(), isProd = process.env.NODE_ENV === 'production') => {
  const resolve = (p: string) => path.resolve(__dirname, p);
  const indexProd = isProd ? fs.readFileSync(resolve('../../client/index.html'), 'utf-8') : '';
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  let vite: any;

  if (!isProd) {
    // Require vite only if it isn't production
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    const { createServer: createViteServer } = require('vite');

    vite = await createViteServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: 'ssr',
        watch: {
          // During tests we edit the files too ft and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
      },
    });
    // use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    app.use(compression());
    app.use(
      serveStatic(resolve('../../client'), {
        index: false,
      }),
    );
  }

  app.get('/', async ({ originalUrl }, res) => {
    try {
      const url = originalUrl;

      if (isProd && cache.has(url)) {
        res.status(200).set({ 'Content-Type': 'text/html' }).end(cache.get(url));
        return;
      }
      let template;
      let render: (page: string, context: any) => { appHtml: string; state: string; seo: HelmetData };
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('../../index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('./src/server/entry-server.tsx')).render;
      } else {
        template = indexProd;
        // eslint-disable-next-line global-require,import/extensions,import/no-unresolved
        const entryServer = require('../../server/entry-server.js');
        render = entryServer.render;
      }
      const context: any = {};

      const { appHtml, seo, state } = await render('/', context);

      if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        res.redirect(301, context.url);
        return;
      }
      try {
        const html = buildTemplate(template, appHtml, seo, state);

        cache.set(url, html);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e) {
        res.redirect(301, '/'); // TODO: parse url properly
      }
    } catch (e) {
      if (!isProd) {
        vite.ssrFixStacktrace(e);
      }
      // eslint-disable-next-line no-console
      console.error(e.stack);
      res.status(500).end(e.stack);
    }
  });

  app.get('*', async (req, res) => {
    res.redirect(301, '/'); // TODO: create 404
  });

  return { app, vite };
};

createServer().then(({ app }) => {
  const port = serverConfig.serverPort;
  const host = serverConfig.serverHost;
  app.listen(Number(port), host, () => {
    // eslint-disable-next-line no-console
    console.log(`App is running on  http://${host}:${port}`);
  });
});

// for test use
export { createServer };
