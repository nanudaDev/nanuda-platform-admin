import { BaseDto } from '@/core';
import { CompanyDistrictUpdateHistoryDto } from './company-district-update-history.dto';
import { CompanyDistrictUpdateRefusalReasonDto } from './company-district-update-refusal-reason.dto';

export class CompanyDistrictUpdateRefusalDto
  extends BaseDto<CompanyDistrictUpdateRefusalDto>
  implements Partial<CompanyDistrictUpdateHistoryDto> {
  refusalDesc?: string;
  refusalReasons?: CompanyDistrictUpdateRefusalReasonDto;
}
