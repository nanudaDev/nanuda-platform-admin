import Vue from 'vue';

export const GenderNumberPipeTransformer = () =>
  Vue.filter('genderNumberTransformer', (value: number | string) => {
    switch (value) {
      case 1 || '1':
        return '남성';
      case 2 || '2':
        return '여성';
    }
  });
