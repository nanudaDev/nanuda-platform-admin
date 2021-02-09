import Vue from 'vue';
import { YN } from '@/common';

export const StringShowPipeTransformer = () => {
  Vue.filter('stringShowTransformer', (value: string): string => {
    if (!value) {
      return;
    }
    if (value === YN.YES) {
      return '노출';
    }
    if (value === YN.NO) {
      return '미노출';
    }
  });
};
