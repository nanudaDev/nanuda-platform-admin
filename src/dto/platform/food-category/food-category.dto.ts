import { BaseDto } from '@/core';

export class FoodCategoryDto extends BaseDto<FoodCategoryDto> {
  no: number;
  nameKr: string;
  code: string;
}
