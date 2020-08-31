export enum ADMIN_USER {
  'CONSULT' = 'CONSULT',
  'NORMAL' = 'NORMAL',
  'SPACE' = 'SPACE',
  'SUPER' = 'SUPER',
}
export const CONST_ADMIN_USER = Object.values(ADMIN_USER);
export enum AMENITY {
  'COMMON_FACILITY' = 'COMMON_FACILITY',
  'KITCHEN_FACILITY' = 'KITCHEN_FACILITY',
}
export const CONST_AMENITY = Object.values(AMENITY);
export enum APPROVAL_STATUS {
  'APPROVAL' = 'APPROVAL',
  'NEED_APPROVAL' = 'NEED_APPROVAL',
  'RE_REQUEST' = 'RE_REQUEST',
  'REFUSED' = 'REFUSED',
  'UPDATE_APPROVAL' = 'UPDATE_APPROVAL',
}
export const CONST_APPROVAL_STATUS = Object.values(APPROVAL_STATUS);
export enum B2B_FOUNDER_CONSULT {
  'B2B_F_CANCELLED' = 'B2B_F_CANCELLED',
  'B2B_F_CONTRACT_COMPLETE' = 'B2B_F_CONTRACT_COMPLETE',
  'B2B_F_IN_PROGRESS' = 'B2B_F_IN_PROGRESS',
  'B2B_F_NEW_REG' = 'B2B_F_NEW_REG',
}
export const CONST_B2B_FOUNDER_CONSULT = Object.values(B2B_FOUNDER_CONSULT);
export enum CHANGUP_CONTRACT {
  'C_END' = 'C_END',
  'C_PROCEEDING' = 'C_PROCEEDING',
}
export const CONST_CHANGUP_CONTRACT = Object.values(CHANGUP_CONTRACT);
export enum COMPANY {
  'OTHER_COMPANY' = 'OTHER_COMPANY',
  'PRIMARY_COMPANY' = 'PRIMARY_COMPANY',
}
export const CONST_COMPANY = Object.values(COMPANY);
export enum COMPANY_USER {
  'ADMIN_COMPANY_USER' = 'ADMIN_COMPANY_USER',
  'NORMAL_COMPANY_USER' = 'NORMAL_COMPANY_USER',
}
export const CONST_COMPANY_USER = Object.values(COMPANY_USER);
export enum FOUNDER_CONSULT {
  'F_CANNOT_CONTACT' = 'F_CANNOT_CONTACT',
  'F_CONTACT_FIN' = 'F_CONTACT_FIN',
  'F_DIST_COMPLETE' = 'F_DIST_COMPLETE',
  'F_DROP' = 'F_DROP',
  'F_MEETING_FIN' = 'F_MEETING_FIN',
  'F_NEW_REG' = 'F_NEW_REG',
  'F_PROCEEDING' = 'F_PROCEEDING',
}
export const CONST_FOUNDER_CONSULT = Object.values(FOUNDER_CONSULT);
export enum GENDER {
  'M' = 'M',
  'W' = 'W',
}
export const CONST_GENDER = Object.values(GENDER);
export enum HOMEPAGE_MEDIA {
  'YOUTUBE' = 'YOUTUBE',
}
export const CONST_HOMEPAGE_MEDIA = Object.values(HOMEPAGE_MEDIA);
export enum INQUIRY {
  'FOUNDER_CONSULT' = 'FOUNDER_CONSULT',
  'SYSTEM' = 'SYSTEM',
}
export const CONST_INQUIRY = Object.values(INQUIRY);
export enum LINK_TYPE {
  'EXTERNAL' = 'EXTERNAL',
  'INTERNAL' = 'INTERNAL',
}
export const CONST_LINK_TYPE = Object.values(LINK_TYPE);
export enum NANUDA_USER {
  'NORMAL_USER' = 'NORMAL_USER',
}
export const CONST_NANUDA_USER = Object.values(NANUDA_USER);
export enum NOTICE_BOARD {
  'EVENT_NOTICE' = 'EVENT_NOTICE',
  'NORMAL_NOTICE' = 'NORMAL_NOTICE',
  'TERMS_CHANGE_NOTICE' = 'TERMS_CHANGE_NOTICE',
}
export const CONST_NOTICE_BOARD = Object.values(NOTICE_BOARD);
export enum POPUP {
  'IMAGE' = 'IMAGE',
  'NOTIFICATION' = 'NOTIFICATION',
}
export const CONST_POPUP = Object.values(POPUP);
export enum PRODUCT_CONSULT {
  'P_ADD_TOUR' = 'P_ADD_TOUR',
  'P_CANNOT_CONTACT' = 'P_CANNOT_CONTACT',
  'P_CONTACT_CANCEL' = 'P_CONTACT_CANCEL',
  'P_CONTACT_FIN' = 'P_CONTACT_FIN',
  'P_CONTACT_READY' = 'P_CONTACT_READY',
  'P_DROP' = 'P_DROP',
  'P_FIN_CONTRACT' = 'P_FIN_CONTRACT',
  'P_MEETING_FIN' = 'P_MEETING_FIN',
  'P_NEW_REG' = 'P_NEW_REG',
  'P_PROCEEDING' = 'P_PROCEEDING',
  'P_PROCEEDING_TOUR' = 'P_PROCEEDING_TOUR',
  'P_RECONTACT_REQUEST' = 'P_RECONTACT_REQUEST',
  'P_WATING_CONTRACT' = 'P_WATING_CONTRACT',
}
export const CONST_PRODUCT_CONSULT = Object.values(PRODUCT_CONSULT);
export enum PROMOTION {
  'PROMOTION_BRAND' = 'PROMOTION_BRAND',
  'PROMOTION_SPACE' = 'PROMOTION_SPACE',
}
export const CONST_PROMOTION = Object.values(PROMOTION);
export enum SPACE {
  'ALL' = 'ALL',
  'ANALYSIS_FIN' = 'ANALYSIS_FIN',
  'ANALYSIS_PROGRESS' = 'ANALYSIS_PROGRESS',
  'ANALYSIS_READY' = 'ANALYSIS_READY',
  'BRAND' = 'BRAND',
  'DAILY' = 'DAILY',
  'HH' = 'HH',
  'HL' = 'HL',
  'HM' = 'HM',
  'KITCHEN' = 'KITCHEN',
  'LH' = 'LH',
  'LL' = 'LL',
  'LM' = 'LM',
  'MATCH' = 'MATCH',
  'MH' = 'MH',
  'ML' = 'ML',
  'MM' = 'MM',
  'SPACE_CONDUCT_EXP' = 'SPACE_CONDUCT_EXP',
  'SPACE_DROP' = 'SPACE_DROP',
  'SPACE_FIN_CONTRACT' = 'SPACE_FIN_CONTRACT',
  'SPACE_FOR_ANALYSIS' = 'SPACE_FOR_ANALYSIS',
  'SPACE_IN_CONSUL' = 'SPACE_IN_CONSUL',
  'SPACE_NEW_REG' = 'SPACE_NEW_REG',
  'SPACE_RE_PHOTO' = 'SPACE_RE_PHOTO',
  'SPACE_REG_COM' = 'SPACE_REG_COM',
  'SPACE_WATING_TOUR' = 'SPACE_WATING_TOUR',
  'TIME' = 'TIME',
  'UNBRAND' = 'UNBRAND',
  'WEEKDAY' = 'WEEKDAY',
  'WEEKEND' = 'WEEKEND',
}
export const CONST_SPACE = Object.values(SPACE);
export enum SPACE_CONTRACT {
  'S_END' = 'S_END',
  'S_PROCEEDING' = 'S_PROCEEDING',
}
export const CONST_SPACE_CONTRACT = Object.values(SPACE_CONTRACT);
