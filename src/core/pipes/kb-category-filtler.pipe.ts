import Vue from 'vue';

export const KbCategoryPipeTransformer = () =>
  Vue.filter('kbCategoryTransformer', (value: string) => {
    switch (value) {
      case 'F01':
        return '주점';
      case 'F12':
        return '중식';
      case 'F14':
        return '커피/음료';
      case 'F15':
        return '패스트푸드';
      case 'F10':
        return '일식';
      case 'F16':
        return '한식';
      case 'F04':
        return '분식';
      case 'F07':
        return '양식';
    }
  });
