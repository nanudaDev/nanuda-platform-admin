import { BaseDto } from '@/core';
import { KB_MEDIUM_CATEGORY } from '@/services/shared';

export class BaeminReportCreateDto extends BaseDto<BaeminReportCreateDto> {
  averageScore: number;
  averageDeliveryTip: number;
  averageLikeRate: number;
  averageMonthlyOrderRate: number;
  minimumOrderPrice: number;
  averageOrderRate: number;
  hdongCode: number;
  mediumCategoryCode: KB_MEDIUM_CATEGORY;
}
