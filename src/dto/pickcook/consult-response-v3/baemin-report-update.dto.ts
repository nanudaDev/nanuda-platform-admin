import { BaseDto } from '@/core';
import { BAEMIN_CATEGORY_CODE, KB_MEDIUM_CATEGORY } from '@/services/shared';
import { BaeminReportDto } from './baemin-report.dto';

export class BaeminReportUpdateDto extends BaseDto<BaeminReportUpdateDto>
  implements Partial<BaeminReportDto> {
  averageScore?: number;
  averageDeliveryTip?: number;
  averageLikeRate?: number;
  averageMonthlyOrderRate?: number;
  minimumOrderPrice?: number;
  averageOrderRate?: number;
  mediumCategoryCode?: KB_MEDIUM_CATEGORY | string;
  baeminCategoryCode?: BAEMIN_CATEGORY_CODE | string;
}
