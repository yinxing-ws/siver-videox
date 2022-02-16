import { IRouterConfig, lazy } from 'ice';
import Layout from '@/layout';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        exact: true,
        component: Dashboard,
      },
      {
        component: NotFound,
      },
    ],
  },
];
export default routerConfig;
