import { RouteConfig } from 'vue-router';
import { CONST_ADMIN_USER } from '@/services/shared';

// 철자 순으로 컴퍼논트 나열한다.
const nonNavBarRouter: RouteConfig[] = [
  {
    path: '/graph-by-cities',
    name: 'GraphByCity',
    component: () => import('../../modules/graph-playground/GraphByCity.vue'),
    meta: {
      authRequired: true,
      layout: 'MainLayout',
      roles: [...CONST_ADMIN_USER],
      title: '상담 신청 추이 그래프',
    },
    children: [
      {
        path: '/graph-by-cities',
        name: 'GraphByCitySelect',
        component: () =>
          import(
            '../../modules/graph-playground/components/GraphByCitySelect.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '상담 신청 추이 그래프',
        },
      },
    ],
  },
  {
    path: '/my-page',
    name: 'MyPageDetail',
    component: () =>
      import('../../modules/my-page/components/MyPageDetail.vue'),
    meta: {
      authRequired: true,
      layout: 'MainLayout',
      roles: [...CONST_ADMIN_USER],
      title: '마이 페이지',
    },
  },
];

export default nonNavBarRouter;
