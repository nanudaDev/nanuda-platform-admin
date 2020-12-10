import Vue from 'vue';

export const NumberPipeTransformer = () =>
  Vue.filter('numberTransfomer', (value: string): string => {
    if (!value) {
      return;
    }
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  });
