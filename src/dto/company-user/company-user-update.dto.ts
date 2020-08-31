import { COMPANY_USER, APPROVAL_STATUS } from '@/services/shared';
import { CompanyUserDto } from './company-user.dto';
import { BaseDto } from '@/core';
export class CompanyUserUpdateDto extends BaseDto<CompanyUserUpdateDto>
  implements Partial<CompanyUserDto> {
  authCode?: COMPANY_USER;
  companyUserStatus: APPROVAL_STATUS;
}
