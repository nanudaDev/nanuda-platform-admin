import { YN } from '@/common';
import { BaseDto } from '@/core';
import { ADMIN_USER, COMPANY_USER } from '@/services/shared';
import { DeliveryFounderConsultDto } from '../delivery-founder-consult/delivery-founder-consult.dto';

export class DeliveryFounderConsultReplyDto extends BaseDto<
  DeliveryFounderConsultReplyDto
> {
  no: number;
  deliveryFounderConsultNo: number;
  adminNo?: number;
  companyUserNo?: number;
  isUpdatedYn?: YN;
  title?: string;
  desc: string;
  companyUser?: COMPANY_USER;
  admin?: ADMIN_USER;
  deliveryFounderConsult?: DeliveryFounderConsultDto;
}
