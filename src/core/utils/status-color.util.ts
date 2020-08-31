import {
  APPROVAL_STATUS,
  FOUNDER_CONSULT,
  B2B_FOUNDER_CONSULT,
} from '@/services/shared';

export const getStatusColor = (status: string): string => {
  /**
   * 승인
   * */

  if (
    status === APPROVAL_STATUS.APPROVAL ||
    status === FOUNDER_CONSULT.F_CONTACT_FIN
  ) {
    return 'success';
  }
  /**
   * 승인 거절
   * 상담 신청 드랍
   * 계약 취소
   * */

  if (
    status === APPROVAL_STATUS.REFUSED ||
    status === FOUNDER_CONSULT.F_DROP ||
    status === B2B_FOUNDER_CONSULT.B2B_F_CANCELLED
  ) {
    return 'danger';
  }

  /**
   * 상담 신청 계약 완료
   * */

  if (
    status === FOUNDER_CONSULT.F_DIST_COMPLETE ||
    status === B2B_FOUNDER_CONSULT.B2B_F_CONTRACT_COMPLETE
  ) {
    return 'secondary';
  }

  /**
   * 상담 신청 신규 등록
   */

  if (
    status === FOUNDER_CONSULT.F_NEW_REG ||
    status === B2B_FOUNDER_CONSULT.B2B_F_NEW_REG
  ) {
    return 'primary';
  }

  /** 그 외 진행상태 */
  return 'warning';
};
