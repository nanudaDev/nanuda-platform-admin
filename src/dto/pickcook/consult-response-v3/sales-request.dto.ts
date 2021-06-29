import { BaseDto } from '@/core';
import { KB_MEDIUM_CATEGORY, STORE_TYPE } from '@/services/shared';

export class SalesRequestDto extends BaseDto<SalesRequestDto> {
  hdongCode: string | number;
  mediumCategoryCode: KB_MEDIUM_CATEGORY | string;
  storeType?: STORE_TYPE;
}
