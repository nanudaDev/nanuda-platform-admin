import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import {
  Environment,
  DevelopmentEnvironment,
  EnvironmentType,
  ProductionEnvironment,
} from '../../environments';
import { CONST_ADMIN_USER } from '@/services/shared';
import componentsRouter from './modules/component';
import nonNavBarRouter from './modules/non-navbar-component';

let env = new Environment();
if (process.env.NODE_ENV === EnvironmentType.development) {
  env = DevelopmentEnvironment;
}
if (process.env.NODE_ENV === EnvironmentType.production) {
  env = ProductionEnvironment;
}
// 뷰에서 라이터를 사용할 것을 파람으로 받아 다른 라우터 기능을 억제한다.
Vue.use(Router);

export const constantRoutes: RouteConfig[] = [
  {
    path: '',
    component: () =>
      import('../modules/_layouts/Layout/LoginLayout.layout.vue'),
    name: 'Home',
    meta: { authRequired: false, layout: 'NonMainLayout', title: 'Login' },
  },
  {
    path: '/login',
    component: () =>
      import('../modules/_layouts/Layout/LoginLayout.layout.vue'),
    name: 'Login',
    meta: { authRequired: false, layout: 'NonMainLayout', title: 'Login' },
  },
  {
    path: '/dashboard',
    component: () => import('../modules/dashboard/Dashboard.vue'),
    name: 'Dashboard',
    meta: {
      authRequired: true,
      layout: 'MainLayout',
      roles: [...CONST_ADMIN_USER],
      title: 'Dashboard',
    },
  },
  // component routers
  // 가독성 위해서 분리
  ...componentsRouter,
  ...nonNavBarRouter,
];

const createRouter = () =>
  new Router({
    mode: 'history',
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher; // reset router
}

export default router;
