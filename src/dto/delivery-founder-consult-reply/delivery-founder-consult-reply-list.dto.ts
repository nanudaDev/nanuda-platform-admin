import { OrderByValue, YN } from '@/common';
import { BaseDto } from '@/core';
import { ADMIN_USER, COMPANY_USER } from '@/services/shared';
import { DeliveryFounderConsultReplyDto } from '.';
import { DeliveryFounderConsultDto } from '..';

export class DeliveryFounderConsultReplyListDto
  extends BaseDto<DeliveryFounderConsultReplyListDto>
  implements Partial<DeliveryFounderConsultReplyDto> {
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
  orderbyNo?: OrderByValue;
}
