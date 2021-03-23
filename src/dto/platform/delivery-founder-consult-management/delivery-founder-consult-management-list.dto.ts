import { BaseDto } from '@/core';
import { DeliveryFounderConsultManagementDto } from './delivery-founder-consult-management.dto';
import { CompanyUserDto } from '..';
import { OrderByValue } from '@/common';

export class DeliveryFounderConsultManagementListDto
  extends BaseDto<DeliveryFounderConsultManagementListDto>
  implements Partial<DeliveryFounderConsultManagementDto> {
  no: number;
  memo: string;
  founderConsultNo: number;
  companyUserNo: number;
  companyUser: CompanyUserDto;
  orderByNo: OrderByValue;
}
