import React from 'react';

export interface RouterProps {
  beforeContent?: React.ReactElement;
  afterContent?: React.ReactElement;
  url?: string;
  baseName?: string;
  context?: any;
  routes: any[];
}

export interface RouteProp {
  path: string;
  exact: boolean;
  component: React.FC;
}

export interface Route {
  path: string;
  exact: boolean;
  component: string;
}