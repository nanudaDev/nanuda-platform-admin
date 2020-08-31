import Vue from 'vue';
import { YN, INQUIRY } from '@/common';
import {
  GENDER,
  APPROVAL_STATUS,
  COMPANY_USER,
  NOTICE_BOARD,
  AMENITY,
} from '@/services/shared';
export const EnumPipeTransformer = () =>
  Vue.filter('enumTransformer', (value: string): string => {
    if (!value) {
      return;
    }
    if (value === YN.YES) {
      return 'Y';
    }
    if (value === YN.NO) {
      return 'N';
    }

    // 성별
    if (value === GENDER.M) {
      return '남성';
    }
    if (value === GENDER.W) {
      return '여성';
    }

    // 승인 상태
    if (value === APPROVAL_STATUS.APPROVAL) {
      return '승인';
    }
    if (value === APPROVAL_STATUS.NEED_APPROVAL) {
      return '등록 승인 필요';
    }
    if (value === APPROVAL_STATUS.REFUSED) {
      return '거절/반려';
    }
    if (value === APPROVAL_STATUS.UPDATE_APPROVAL) {
      return '수정 승인 필요';
    }
    if (value === APPROVAL_STATUS.RE_REQUEST) {
      return '재요청';
    }

    // 사용자 권한 등금
    if (value === COMPANY_USER.ADMIN_COMPANY_USER) {
      return '마스터';
    }
    if (value === COMPANY_USER.NORMAL_COMPANY_USER) {
      return '일반';
    }

    // 공지사항 알림
    if (value === NOTICE_BOARD.EVENT_NOTICE) {
      return '이벤트 알림';
    }
    if (value === NOTICE_BOARD.NORMAL_NOTICE) {
      return '일반 알림';
    }
    if (value === NOTICE_BOARD.TERMS_CHANGE_NOTICE) {
      return '이용약관 변경 안내';
    }

    // 문의 유형 타입
    if (value === INQUIRY.FOUNDER_CONSULT) {
      return '상담 신청 문의';
    }
    if (value === INQUIRY.SYSTEM) {
      return '사이트 기능 문의';
    }

    // 시설 타입

    if (value === AMENITY.COMMON_FACILITY) {
      return '공통 시설';
    }
    if (value === AMENITY.KITCHEN_FACILITY) {
      return '주방 시설';
    }
  });
