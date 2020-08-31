import { BaseDto } from '@/core';
import { CompanyDistrictDto } from './company-district.dto';
import { OrderByValue } from '@/common';
import { APPROVAL_STATUS } from '@/services/shared';

export class CompanyDistrictListDto extends BaseDto<CompanyDistrictListDto>
  implements Partial<CompanyDistrictDto> {
  no: number;
  companyNo?: number;
  nameKr?: string;
  nameEng?: string;
  address?: string;
  companyDistrictStatus?: APPROVAL_STATUS;
  orderByNo?: OrderByValue;
}
