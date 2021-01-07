import { BaseDto } from '@/core';
import { AdminDto } from '../admin';
import { CompanyUserDto } from '../company-user';
import { DeliveryFounderConsultDto } from '../delivery-founder-consult/delivery-founder-consult.dto';

export class DeliveryFounderConsultReply extends BaseDto<
  DeliveryFounderConsultReply
> {
  no?: number;
  deliveryFounderConsultNo?: number;
  adminNo?: number;
  desc?: string;
  companyUserNo?: number;
  admin?: AdminDto;
  companyUser?: CompanyUserDto;
  deliveryFounderConsult?: DeliveryFounderConsultDto;
}
