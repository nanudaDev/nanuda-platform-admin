import { CONST_ADMIN_USER } from '@/services/shared';
import { RouteConfig } from 'vue-router';

const pickcookComponentRouter: RouteConfig[] = [
  {
    path: '/pickcook/consult-response-v3',
    name: '상담 신청 V3',
    component: () =>
      import(
        '../../modules/pickcook/consult-response-v3/ConsultResponseV3.vue'
      ),
    children: [
      {
        path: '/pickcook/consult-response-v3',
        name: 'ConsultResponseV3List',
        component: () =>
          import(
            '../../modules/pickcook/consult-response-v3/components/ConsultResponseV3List.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'PickcookLayout',
          roles: [...CONST_ADMIN_USER],
          title: '상담 신청 관리',
        },
      },
      {
        path: '/pickcook/consult-response-v3/:id([0-9]+)',
        name: 'ConsultResponseV3Detail',
        component: () =>
          import(
            '../../modules/pickcook/consult-response-v3/components/ConsultResponseV3Detail.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'PickcookLayout',
          roles: [...CONST_ADMIN_USER],
          detailPage: true,
          title: '상담신청',
        },
      },
    ],
  },
];

export default pickcookComponentRouter;
