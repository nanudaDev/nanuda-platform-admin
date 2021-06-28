import { BaseDto } from '@/core';
import { KB_MEDIUM_CATEGORY } from '@/services/shared';

export class BaeminReportPatchDto extends BaseDto<BaeminReportPatchDto> {
  averageScore: number = null;
  averageDeliveryTip: number = null;
  averageLikeRate: number = null;
  averageMonthlyOrderRate: number = null;
  minimumOrderPrice: number = null;
  averageOrderRate: number = null;
  mediumCategoryCode: KB_MEDIUM_CATEGORY = null;
}
