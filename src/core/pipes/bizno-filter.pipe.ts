import Vue from 'vue';

export const BizNoPipeTransformer = () =>
  Vue.filter('bizNoTransformer', (value: string): string => {
    if (!value) {
      return;
    }
    return value.replace(/([0-9]{3})([0-9]{2})([0-9]{5})/, '$1-$2-$3');
  });
