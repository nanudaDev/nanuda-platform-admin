import Vue from 'vue';

export const StringTruncatePipeTransformer = () => {
  Vue.filter(
    'stringTruncateTransformer',
    (value: string, length: number, clamp: string): string => {
      if (!value) {
        return;
      }

      return (
        value.slice(0, length) + (length < value.length ? clamp || '...' : '')
      );
    },
  );
};
