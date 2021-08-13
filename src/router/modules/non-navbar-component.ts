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
  {
    path: '/analysis',
    name: 'Analysis',
    component: () => import('../../modules/analysis/Analysis.vue'),
    meta: {
      authRequired: true,
      layout: 'AnalysisLayout',
      roles: [...CONST_ADMIN_USER],
      title: '상권분석',
    },
  },
  {
    path: '/pickcook/consult-response',
    name: '상담신청 V1',
    component: () =>
      import('../../modules/pickcook/consult-response/ConsultResponse.vue'),
    children: [
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
          title: '상담 신청 관리',
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
          title: '상담 신청',
        },
      },
    ],
  },
  {
    path: '/pickcook/consult-response-v2',
    name: '상담 신청 V2',
    component: () =>
      import(
        '../../modules/pickcook/consult-response-v2/ConsultResponseV2.vue'
      ),
    children: [
      {
        path: '/pickcook/consult-response-v2',
        name: 'ConsultResponseV2List',
        component: () =>
          import(
            '../../modules/pickcook/consult-response-v2/components/ConsultResponseV2List.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'PickcookLayout',
          roles: [...CONST_ADMIN_USER],
          title: '상담 신청 관리',
        },
      },
      {
        path: '/pickcook/consult-response-v2/:id([0-9]+)',
        name: 'ConsultResponseV2Detail',
        component: () =>
          import(
            '../../modules/pickcook/consult-response-v2/components/ConsultResponseV2Detail.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'PickcookLayout',
          roles: [...CONST_ADMIN_USER],
          detailPage: true,
          title: '상담 신청',
        },
      },
    ],
  },
  {
    path: '/pickcook/consult-response-v3/:id([0-9]+)/report',
    name: 'ConsultReportDetail',
    component: () =>
      import(
        '../../modules/pickcook/consult-report/components/ConsultReportDetail.vue'
      ),
    meta: {
      authRequired: true,
      layout: 'EmptyLayout',
      roles: [...CONST_ADMIN_USER],
      detailPage: true,
      title: '상권분석 리포트',
    },
  },
  {
    path: '/pickcook/consult-response-v3/:id([0-9]+)/report/print',
    name: 'ConsultReportV2Print',
    component: () =>
      import(
        '../../modules/pickcook/consult-report-v2/components/ConsultReportV2Print.vue'
      ),
    meta: {
      authRequired: true,
      layout: 'EmptyLayout',
      roles: [...CONST_ADMIN_USER],
      detailPage: true,
      title: '상권분석 리포트',
    },
  },
];

export default nonNavBarRouter;
