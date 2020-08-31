import Vue from 'vue';
import { YN } from '@/common';

export const ViewPipeTransformer = () => {
  Vue.filter('viewTransformer', (value: string): string => {
    if (!value) {
      return;
    }
    if (value === YN.YES) {
      return '열람';
    }
    if (value === YN.NO) {
      return '미열람';
    }
  });
};
