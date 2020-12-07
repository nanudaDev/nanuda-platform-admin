import { CONST_ADMIN_USER } from '@/services/shared';
import { RouteConfig } from 'vue-router';

const analysisComponentRouter: RouteConfig[] = [
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
];

export default analysisComponentRouter;
