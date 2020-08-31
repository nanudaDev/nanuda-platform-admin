import { BaseDto } from '@/core';
import { CompanyUserUpdateHistoryDto } from './company-user-update-history.dto';
import { CompanyUserUpdateRefusalReasonDto } from './company-user-update-refusal-reason.dto';

export class CompanyUserUpdateRefusalDto
  extends BaseDto<CompanyUserUpdateRefusalDto>
  implements Partial<CompanyUserUpdateHistoryDto> {
  refusalDesc?: string;
  refusalReasons?: CompanyUserUpdateRefusalReasonDto;
}
