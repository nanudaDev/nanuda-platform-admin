import moment from 'moment';
import Vue from 'vue';

export const PhonePipeTransformer = () =>
  Vue.filter('phoneTransformer', (value: string): string => {
    if (!value) {
      return;
    }
    return value.replace(
      /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
      '$1-$2-$3',
    );
  });
