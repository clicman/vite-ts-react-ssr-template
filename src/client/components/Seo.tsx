import { Helmet } from 'react-helmet-async';
import React from 'react';

export const Seo = () => (
  <Helmet>
    <html lang="en" />
    <title>Some page</title>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
    <link rel="icon" href="/favicon.png" type="image/x-icon" />
    <meta name="description" content="Meta description" />
    <meta property="og:description" content="OG descrioption" />
    <meta property="og:title" content="OG title" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://github.com/clicman" />
    <meta property="og:site_name" content="clicman" />
    <meta property="og:locale" content="en" />
  </Helmet>
);
