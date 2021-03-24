import { CONST_ADMIN_USER } from '@/services/shared';
import { RouteConfig } from 'vue-router';

const pickcookComponentRouter: RouteConfig[] = [
  {
    path: '/pickcook/consult-response',
    name: 'ConsultResponseList',
    component: () =>
      import(
        '../../modules/pickcook/consult-response/components/ConsultResponseList.vue'
      ),
    meta: {
      authRequired: true,
      layout: 'PickcookLayout',
      roles: [...CONST_ADMIN_USER],
      title: '상담신청 관리',
    },
  },
  {
    path: '/pickcook/consult-response/:id([0-9]+)',
    name: 'ConsultResponseDetail',
    component: () =>
      import(
        '../../modules/pickcook/consult-response/components/ConsultResponseDetail.vue'
      ),
    meta: {
      authRequired: true,
      layout: 'PickcookLayout',
      roles: [...CONST_ADMIN_USER],
      detailPage: true,
      title: '상담신청',
    },
  },
];

export default pickcookComponentRouter;
