import { OrderByValue } from '@/common';
import { BaseDto } from '@/core';
import { ConsultResponseDto } from '@/dto';
import {
  AGE_GROUP,
  BRAND_CONSULT,
  FNB_OWNER,
  KB_MEDIUM_CATEGORY,
  OPERATION_TIME,
  REVENUE_RANGE,
  TENTATIVE_OPEN_OPTION,
} from '@/services/shared';

export class ConsultResponseListDto extends BaseDto<ConsultResponseListDto>
  implements Partial<ConsultResponseDto> {
  name?: string;
  phone?: string;
  proformaConsultResultId?: number;
  aggregateResponseId?: number;
  fnbOwnerStatus?: FNB_OWNER;
  ageGroupCode?: AGE_GROUP;
  ageGroupGrade?: number;
  revenueRangeCode?: REVENUE_RANGE;
  revenueRangeGrade?: number;
  isReadyCode?: TENTATIVE_OPEN_OPTION;
  isReadyGrade?: number;
  deliveryRatioGrade?: number;
  orderById?: OrderByValue;
}
