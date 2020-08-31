import {
  FOUNDER_CONSULT,
  B2B_FOUNDER_CONSULT,
  ADMIN_USER,
} from '@/services/shared';
import { AVAILABLE_TIME, YN } from '@/common';
import { CodeManagementDto } from '@/services/init/dto';
import { DeliverySpaceDto } from '../delivery-space';
import { BaseDto } from '@/core';
import { NanudaUserDto } from '../nanuda-user';
import { CompanyUserDto } from '..';
import { AdminDto } from '../admin';

export class DeliveryFounderConsultDto extends BaseDto<
  DeliveryFounderConsultDto
> {
  no: number;
  deliverySpaceNo: number;
  nanudaUserNo: number;
  spaceConsultManager?: number;
  status: FOUNDER_CONSULT;
  hopeDate?: Date;
  hopeTime: AVAILABLE_TIME;
  purposeUse: YN;
  changUpExpYn: YN;
  spaceOwnYn: YN;
  spaceConsultEtc?: string;
  confirmDate?: Date;
  viewCount?: YN;
  hopeFoodCategory?: string;
  companyDecisionStatus?: B2B_FOUNDER_CONSULT;
  companyUserNo?: number;
  createdAt?: Date;
  deliveredAt?: Date;
  openedAt?: Date;
  admin?: AdminDto;
  deliverySpaces?: DeliverySpaceDto[];
  codeManagement?: CodeManagementDto;
  companyDecisionStatusCode?: CodeManagementDto;
  availableTime?: CodeManagementDto;
  nanudaUser?: NanudaUserDto;
  companyUser?: CompanyUserDto;
}
