import { BaseDto } from '@/core';
import { CompanyUserDto } from '../company-user';

export class DeliveryFounderConsultManagementDto extends BaseDto<
  DeliveryFounderConsultManagementDto
> {
  no: number;
  memo: string;
  founderConsultNo: number;
  companyUserNo: number;
  companyUser: CompanyUserDto;
}
