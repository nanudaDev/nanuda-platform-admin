import { BaseDto } from '@/core';
import { BAEMIN_CATEGORY_CODE, KB_MEDIUM_CATEGORY } from '@/services/shared';

export class BaeminReportCreateDto extends BaseDto<BaeminReportCreateDto> {
  averageScore: number;
  averageDeliveryTip: number;
  averageLikeRate: number;
  averageMonthlyOrderRate: number;
  minimumOrderPrice: number;
  averageOrderRate: number;
  hdongCode: number;
  mediumCategoryCode: KB_MEDIUM_CATEGORY;
  baeminCategoryCode?: BAEMIN_CATEGORY_CODE | string;
}
