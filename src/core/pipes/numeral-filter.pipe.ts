import Vue from 'vue';

export const NumeralPipeTransformer = () =>
  Vue.filter('numeralTransformer', (value: number) => {
    if (!value) return 0;
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  });
