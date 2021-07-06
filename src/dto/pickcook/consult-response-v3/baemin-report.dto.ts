import { BaseDto } from '@/core';
import { BAEMIN_CATEGORY_CODE, KB_MEDIUM_CATEGORY } from '@/services/shared';
import { ConsultResponseV3Dto } from './consult-response-v3.dto';

export class BaeminReportDto extends BaseDto<BaeminReportDto> {
  id: number;
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
  baeminCategoryCode: BAEMIN_CATEGORY_CODE;
}
