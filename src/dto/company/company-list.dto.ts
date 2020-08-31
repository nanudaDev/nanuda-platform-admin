import { BaseDto } from '@/core';
import { CompanyDto } from './company.dto';
import { APPROVAL_STATUS } from '@/services/shared';
import { OrderByValue } from '@/common';

export class CompanyListDto extends BaseDto<CompanyListDto>
  implements Partial<CompanyDto> {
  no?: number;
  adminNo?: number;
  nameKr?: string;
  nameEng?: string;
  ceoKr?: string;
  ceoEng?: string;
  population?: string;
  address?: string;
  website?: string;
  email?: string;
  fax?: string;
  phone?: string;
  companyStatus?: APPROVAL_STATUS;
  companyDistrictNameKr?: string;
  orderByNo?: OrderByValue;
}
