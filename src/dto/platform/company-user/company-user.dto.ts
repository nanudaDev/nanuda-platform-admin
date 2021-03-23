import { BaseUser } from '@/services/shared/auth';
import { APPROVAL_STATUS, COMPANY_USER } from '@/services/shared';
export class CompanyUserDto extends BaseUser {
  name?: string;
  email?: string;
  phone?: string;
  companyNo?: number;
  authCode?: COMPANY_USER;
  companyUserStatus?: APPROVAL_STATUS;
}
