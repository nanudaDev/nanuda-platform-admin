import { BaseDto } from '@/core';
import { APPROVAL_STATUS } from '@/services/shared';
import { CompanyDistrictUpdateRefusalReasonDto } from './company-district-update-refusal-reason.dto';
import { CompanyDistrictDto } from '../company-district/company-district.dto';

export class CompanyDistrictUpdateHistoryDto
  extends BaseDto<CompanyDistrictUpdateHistoryDto>
  implements Partial<CompanyDistrictDto> {
  no?: number;
  companyNo?: number;
  nameKr?: string;
  nameEng?: string;
  address?: string;
  companyDistrictStatus?: APPROVAL_STATUS;
  refusalReasons?: CompanyDistrictUpdateRefusalReasonDto;
  refusalDesc?: string;
}
