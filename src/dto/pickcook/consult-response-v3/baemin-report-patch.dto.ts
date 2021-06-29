import { BaseDto } from '@/core';
import { KB_MEDIUM_CATEGORY } from '@/services/shared';
import { BaeminReportDto } from './baemin-report.dto';

export class BaeminReportPatchDto extends BaseDto<BaeminReportPatchDto>  implements Partial<BaeminReportDto>{
  averageScore?: number;
  averageDeliveryTip?: number;
  averageLikeRate?: number;
  averageMonthlyOrderRate?: number;
  minimumOrderPrice?: number;
  averageOrderRate?: number;
  mediumCategoryCode?: KB_MEDIUM_CATEGORY | string;
}
