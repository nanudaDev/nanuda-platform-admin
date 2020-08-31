import { BaseDto } from '@/core';
import { CompanyUserDto } from '../company-user';

export class FounderConsultManagementDto extends BaseDto<
  FounderConsultManagementDto
> {
  no: number;
  memo: string;
  founderConsultNo: number;
  companyUserNo: number;
  companyUser: CompanyUserDto;
}
