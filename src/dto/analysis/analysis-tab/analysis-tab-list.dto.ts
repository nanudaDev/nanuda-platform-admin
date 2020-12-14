import { BaseDto } from '@/core';
import { BaeminCategoryCode } from '@/services/shared';

export class AnalysisTabListDto extends BaseDto<AnalysisTabListDto> {
  bdongCode?: string;
  baeminCategoryName?: BaeminCategoryCode;
}
