import { BaseDto } from '@/core';
import { KB_MEDIUM_CATEGORY, STORE_TYPE } from '@/services/shared';

export class SalesRequestDto extends BaseDto<SalesRequestDto> {
  hdongCode: number;
  mediumCategoryCode: KB_MEDIUM_CATEGORY;
  storeType: STORE_TYPE;
}
