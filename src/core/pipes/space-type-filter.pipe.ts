import { SPACE_TYPE } from '@/services/shared';
import Vue from 'vue';

export const SpaceTypePipeTransformer = () =>
  Vue.filter('spaceTypeTransformer', (value: number) => {
    if (value === SPACE_TYPE.SPACE_SHARE) {
      return '식당형';
    }
    if (value === SPACE_TYPE.ONLY_DELIVERY) {
      return '배달형';
    }
  });
