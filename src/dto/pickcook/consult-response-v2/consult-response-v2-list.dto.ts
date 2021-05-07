import { OrderByValue } from '@/common';
import { BaseDto } from '@/core';
import { ConsultResponseV2Dto } from '@/dto';
import {
  AGE_GROUP,
  BRAND_CONSULT,
  FNB_OWNER,
  KB_MEDIUM_CATEGORY,
  OPERATION_TIME,
  REVENUE_RANGE,
  TENTATIVE_OPEN_OPTION,
} from '@/services/shared';

export class ConsultResponseV2ListDto extends BaseDto<ConsultResponseV2ListDto>
  implements Partial<ConsultResponseV2Dto> {
  name?: string;
  phone?: string;
  consultStatus?: BRAND_CONSULT;
  fnbOwnerStatus?: FNB_OWNER;
  orderById?: OrderByValue;
}
