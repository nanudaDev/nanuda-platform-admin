import Vue from 'vue';

export const CurrencyPipeTransformer = () => {
  Vue.filter('currencyTransformer', function(value: number) {
    if (!value) {
      return;
    }
    const formatter = new Intl.NumberFormat('ko', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
    });
    return formatter.format(value);
  });
};
