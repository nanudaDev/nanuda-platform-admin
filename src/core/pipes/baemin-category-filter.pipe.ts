import Vue from 'vue';

export const BaeminCategoryPipeTransformer = () =>
  Vue.filter('baeminCategoryTransformer', (value: string) => {
    switch (value) {
      case 'VEGETARIAN':
        return '채식';
      case 'FAST_FOOD':
        return '패스트푸드';
      case 'BENTO':
        return '도시락';
      case 'SOUP':
        return '찜/탕';
      case 'LATE_NIGHT':
        return '야식';
      case 'PORK_BOSSAM':
        return '족발/보쌈';
      case 'CHINESE':
        return '중국집';
      case 'ASIAN_WESTERN':
        return '아시안/양식';
      case 'CHICKEN':
        return '치킨';
      case 'KATSU_SASHIMI_JAPANESE':
        return '돈까스/회/일식';
      case 'CAFE_DESSERT':
        return '카페/디저트';
      case 'SNACK_MEAL':
        return '분식';
      case 'KOREAN':
        return '한식';
    }
  });
