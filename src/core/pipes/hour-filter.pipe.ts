import { OPERATION_TIME } from '@/services/shared';
import Vue from 'vue';

export const HourPipeTransformer = () =>
  Vue.filter('hourTransformer', (value: OPERATION_TIME) => {
    switch (value) {
      case OPERATION_TIME.LUNCH:
        return '점심';
      case OPERATION_TIME.DINNER:
        return '저녁';
      case OPERATION_TIME.BREAKFAST:
        return '아침';
      case OPERATION_TIME.LATE_NIGHT:
        return '심야';
    }
  });
