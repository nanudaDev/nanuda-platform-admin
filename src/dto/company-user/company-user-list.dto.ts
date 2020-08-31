import { BaseDto } from '@/core';
import { APPROVAL_STATUS, COMPANY_USER } from '@/services/shared';
import { CompanyUserDto } from './company-user.dto';
import { OrderByValue } from '@/common';

export class CompanyUserListDto extends BaseDto<CompanyUserListDto>
  implements Partial<CompanyUserDto> {
  no: number;
  name?: string;
  email?: string;
  phone?: string;
  companyUserStatus?: APPROVAL_STATUS;
  authCode?: COMPANY_USER;
  companyNo?: number;
  orderByNo?: OrderByValue;
}
