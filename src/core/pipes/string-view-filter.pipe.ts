import Vue from 'vue';
import { YN } from '@/common';

export const StringViewPipeTransformer = () => {
  Vue.filter('stringViewTransformer', (value: string): string => {
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
