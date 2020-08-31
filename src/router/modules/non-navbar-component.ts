import { RouteConfig } from 'vue-router';
import { CONST_ADMIN_USER } from '@/services/shared';

// 철자 순으로 컴퍼논트 나열한다.
const nonNavBarRouter: RouteConfig[] = [
  {
    path: '/graph-by-cities',
    name: '상담 신청 추이',
    component: () => import('../../modules/graph-playground/GraphByCity.vue'),
    meta: {
      authRequired: true,
      layout: 'MainLayout',
      roles: [...CONST_ADMIN_USER],
      title: '업체 사용자 관리',
    },
    children: [
      {
        path: '/graph-by-cities',
        name: '상담 신청 추이',
        component: () =>
          import(
            '../../modules/graph-playground/components/GraphByCitySelect.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '업체 관리',
        },
      },
    ],
  },
];

export default nonNavBarRouter;
