import { BaseDto } from '@/core';
import { CompanyUpdateHistoryDto } from './company-update-history.dto';
import { CompanyUpdateRefusalReasonDto } from './company-update-refusal-reason.dto';

export class CompanyUpdateRefusalDto extends BaseDto<CompanyUpdateRefusalDto>
  implements Partial<CompanyUpdateHistoryDto> {
  refusalDesc?: string;
  refusalReasons?: CompanyUpdateRefusalReasonDto;
}
