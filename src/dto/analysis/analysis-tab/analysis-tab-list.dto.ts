import { BaseDto } from '@/core';
import { BAEMIN_CATEGORY_CODE } from '@/services/shared';

export class AnalysisTabListDto extends BaseDto<AnalysisTabListDto> {
  bdongCode?: string;
  baeminCategoryName?: BAEMIN_CATEGORY_CODE;
}
