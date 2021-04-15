import { RouteConfig } from 'vue-router';
import { CONST_ADMIN_USER } from '@/services/shared';

// 철자 순으로 컴퍼논트 나열한다.
const kioskComponentRouter: RouteConfig[] = [
  {
    path: '/kiosk-payment',
    name: '키오스크',
    component: () => import('../../modules/payment-list/PaymentList.vue'),
    children: [
      {
        path: '/kiosk-payment',
        name: 'PaymentListSearch',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/payment-list/components/PaymentListSearch.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '키오스크 매출',
        },
      },
      {
        path: '/kiosk-payment/:id([0-9]+)',
        name: 'PaymentListDetail',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/payment-list/components/PaymentListDetail.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          detailPage: true,
          title: '키오스크 매출',
        },
      },
    ],
  },
];

export default kioskComponentRouter;
