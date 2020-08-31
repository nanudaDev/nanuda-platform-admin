import { BaseDto } from '@/core';
import { CompanyUserDto } from '../company-user/company-user.dto';
import { COMPANY_USER, APPROVAL_STATUS, ADMIN_USER } from '@/services/shared';
import { CompanyUserUpdateRefusalReasonDto } from './company-user-update-refusal-reason.dto';

export class CompanyUserUpdateHistoryDto
  extends BaseDto<CompanyUserUpdateHistoryDto>
  implements Partial<CompanyUserDto> {
  no?: number;
  name?: string;
  email?: string;
  phone?: string;
  companyUserNo?: number;
  companyUserStatus?: APPROVAL_STATUS;
  authCode?: COMPANY_USER;
  refusalReasons?: CompanyUserUpdateRefusalReasonDto;
  refusalDesc?: string;
}
