import Vue from 'vue';

export const WeekDayPipeTransformer = () =>
  Vue.filter('weekDayTransformer', (value: string) => {
    switch (value) {
      case '1':
        return '월요일';
      case '2':
        return '화요일';
      case '3':
        return '수요일';
      case '4':
        return '목요일';
      case '5':
        return '금요일';
      case '6':
        return '토요일';
      case '7':
        return '일요일';
    }
  });
