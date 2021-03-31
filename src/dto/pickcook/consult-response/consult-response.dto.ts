import { BaseDto } from '@/core';
import {
  ADMIN_USER,
  AGE_GROUP,
  BRAND_CONSULT,
  FNB_OWNER,
  KB_MEDIUM_CATEGORY,
  OPERATION_TIME,
  REVENUE_RANGE,
  TENTATIVE_OPEN_OPTION,
} from '@/services/shared';

export class ConsultResponseDto extends BaseDto<ConsultResponseDto> {
  id: number;
  name: string;
  phone: string;
  proformaConsultResultId: number;
  aggregateResponseId: number;
  fnbOwnerStatus: FNB_OWNER;
  ageGroupGrade: number;
  ageGroupCode: AGE_GROUP;
  revenueRangeCode: REVENUE_RANGE;
  revenueRangeGrade: number;
  isReadyCode: TENTATIVE_OPEN_OPTION;
  isReadyGrade: number;
  selectedKbMediumCategory: KB_MEDIUM_CATEGORY;
  operationTimes?: OPERATION_TIME[];
  operationTimesResult?: any[];
  deliveryRatioGrade: number;
  consultStatus: BRAND_CONSULT;
  operationSentenceId: number;
  reservationCode: string;
  description: string;
  fnbOwnerCodeStatus?: string;
  revenueRangeCodeStatus?: string;
  ageGroupCodeStatus?: string;
  consultCodeStatus?: BRAND_CONSULT;
  operationSentenceResponse?: any;
  proforma?: any;
  adminId?: number;
  admin?: ADMIN_USER;
}
