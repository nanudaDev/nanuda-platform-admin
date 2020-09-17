import { BaseDto } from '@/core';
import { FounderConsultDto } from '.';
import { FOUNDER_CONSULT, GENDER, SPACE_TYPE } from '@/services/shared';
import { AVAILABLE_TIME, YN, OrderByValue } from '@/common';

export class FounderConsultListDto extends BaseDto<FounderConsultListDto>
  implements Partial<FounderConsultDto> {
  spaceNo?: number;
  phone?: string;
  status?: FOUNDER_CONSULT;
  hopeTime?: AVAILABLE_TIME;
  purposeUse?: YN;
  changUpExpYn?: YN;
  spaceOwnYn?: YN;
  companyNo?: number;
  companyDistrictNameKr?: string;
  companyDistrictNameEng?: string;
  companyUserNo?: number;
  spaceTypeNo?: SPACE_TYPE;
  nanudaUserName?: string;
  gender?: GENDER;
  adminUserName?: string;
  confirmDate?: Date;
  hopeDate?: Date;
  address?: string;
  viewCount?: YN;
  companyDecisionStatus?: FOUNDER_CONSULT;
  started?: Date;
  ended?: Date;
  openedAt?: Date;
  orderByNo?: OrderByValue;
}
