import { YN } from '@/common';
import { BaseDto } from '@/core';
import { B2B_EVENT_TYPE } from '@/services/shared';
import { CompanyDistrictDto } from '../company-district/company-district.dto';

export class CompanyDistrictPromotionDto extends BaseDto<
  CompanyDistrictPromotionDto
> {
  title: string;
  desc?: string;
  displayTitle?: string;
  promotionType?: B2B_EVENT_TYPE;
  started?: Date;
  ended?: Date;
  showYn?: YN;
  companyDistrictIds?: number[];
  companyDistricts?: CompanyDistrictDto[];
}
