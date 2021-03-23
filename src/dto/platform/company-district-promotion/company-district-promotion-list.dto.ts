import { OrderByValue, YN } from '@/common';
import { BaseDto } from '@/core';
import { B2B_EVENT_TYPE } from '@/services/shared';
import { CompanyDistrictPromotionDto } from './company-district-promotion.dto';

export class CompanyDistrictPromotionListDto
  extends BaseDto<CompanyDistrictPromotionListDto>
  implements Partial<CompanyDistrictPromotionDto> {
  promotionType?: B2B_EVENT_TYPE;
  title?: string;
  displayTitle?: string;
  companyDistrictNo?: number;
  showYn?: YN;
  orderByNo?: OrderByValue;
}
