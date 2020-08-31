import { BaseDto } from '@/core';
import {
  FOUNDER_CONSULT,
  GENDER,
  B2B_FOUNDER_CONSULT,
} from '@/services/shared';
import { AVAILABLE_TIME, YN } from '@/common';
import { DeliveryFounderConsultDto } from './delivery-founder-consult.dto';

export class DeliveryFounderConsultListDto
  extends BaseDto<DeliveryFounderConsultListDto>
  implements Partial<DeliveryFounderConsultDto> {
  deliverySpaceNo?: number;
  phone?: string;
  status?: FOUNDER_CONSULT;
  hopeTime?: AVAILABLE_TIME;
  purposeYn?: YN;
  changUpExpYn?: YN;
  spaceOwnYn?: YN;
  companyNo?: number;
  companyDistrictNameKr?: string;
  companyDistrictNameEng?: string;
  nanudaUserName?: string;
  adminUserName?: string;
  address?: string;
  confirmDate?: Date;
  hopeDate?: Date;
  gender?: GENDER;
  companyDecisionStatus?: B2B_FOUNDER_CONSULT;
  viewCount?: YN;
  companyUserNo?: number;
  startDate?: Date;
  endDate?: Date;
}
