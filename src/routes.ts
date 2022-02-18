import { IRouterConfig, lazy } from 'ice';
import Layout from '@/layout';

const Editor = lazy(() => import('@/pages/Editor'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        exact: true,
        component: Editor,
      },
      {
        component: NotFound,
      },
    ],
  },
];
export default routerConfig;
