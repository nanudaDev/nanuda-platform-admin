import { BaseDto } from '@/core';
import { FounderConsultManagementDto } from './founder-consult-management.dto';
import { CompanyUserDto } from '..';
import { OrderByValue } from '@/common';

export class FounderConsultManagementListDto
  extends BaseDto<FounderConsultManagementListDto>
  implements Partial<FounderConsultManagementDto> {
  no: number;
  memo: string;
  founderConsultNo: number;
  companyUserNo: number;
  companyUser: CompanyUserDto;
  orderByNo: OrderByValue;
}
