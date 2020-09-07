import Vue from 'vue';
import { YN } from '@/common';
export const StringInquiryPipeTransformer = () =>
  Vue.filter('stringInquiryTransformer', (value: string): string => {
    if (!value) {
      return;
    }
    if (value === YN.YES) {
      return '답변완료';
    }
    if (value === YN.NO) {
      return '답변대기';
    }
  });
