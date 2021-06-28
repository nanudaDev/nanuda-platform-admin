import { BaseDto } from '@/core';
import { KB_MEDIUM_CATEGORY } from '@/services/shared';
import { ConsultResponseV3Dto } from './consult-response-v3.dto';

export class BaeminReportDto extends BaseDto<BaeminReportDto> {
  consultId: number;
  hdongCode: string | number;
  mediumCategoryCode: KB_MEDIUM_CATEGORY | string;
  averageScore: number;
  averageOrderRate: number;
  averageMonthlyOrderRate: number;
  minimumOrderPrice?: number;
  averageDeliveryTip: number;
  averageLikeRate: number;
  consult?: ConsultResponseV3Dto;
}
