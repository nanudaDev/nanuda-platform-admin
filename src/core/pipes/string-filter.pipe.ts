import Vue from 'vue';
export const StringPipeTransformer = () =>
  Vue.filter('stringTransformer', (value: string): string => {
    if (!value) {
      return;
    }
    if (value === 'businessNo') {
      return '사업자번호';
    }
    if (value === 'name') {
      return '이름';
    }
    if (value === 'companyNo') {
      return '업체 ID';
    }
    if (value === 'nameKr') {
      return '업체명';
    }
    if (value === 'nameEng') {
      return '업체명(영문)';
    }
    if (value === 'ceoKr') {
      return '대표명';
    }
    if (value === 'ceoEng') {
      return '대표명(영문)';
    }
    if (value === 'phone') {
      return '전화번호';
    }
    if (value === 'email') {
      return '이메일';
    }
    if (value === 'fax') {
      return '팩스';
    }
    if (value === 'address') {
      return '주소';
    }
    if (value === 'website') {
      return '웹사이트';
    }
    if (value === 'population') {
      return '인원';
    }
    if (value === 'refusalReasons') {
      return '거절 항목';
    }
    if (value === 'refusalDesc') {
      return '거절 사유';
    }
    if (value === 'logo') {
      return '업체 로고';
    }
  });
