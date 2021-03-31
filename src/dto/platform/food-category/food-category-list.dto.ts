import { BaseDto } from '@/core';
import { FoodCategoryDto } from './food-category.dto';
import { OrderByValue } from '@/common';

export class FoodCategoryListDto extends BaseDto<FoodCategoryListDto>
  implements Partial<FoodCategoryDto> {
  no?: number;
  nameKr?: string;
  code?: string;
  orderByNo?: OrderByValue;
}
