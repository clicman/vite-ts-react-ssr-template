import { RouteProp } from '@client/components/routers/routerPorps';
import Main from '@client/pages/Main';

export async function buildServerRoutes(): Promise<RouteProp[]> {
  return [
    {
      path: '/',
      exact: true,
      component: Main,
    },
  ];
}
