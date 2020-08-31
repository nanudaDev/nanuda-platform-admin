import { BaseDto } from '@/core';
import { DeliveryFounderConsultDto } from './delivery-founder-consult.dto';
import { AVAILABLE_TIME, YN } from '@/common';
import { FOUNDER_CONSULT, GENDER } from '@/services/shared';

export class DeliveryFounderConsultUpdateDto
  extends BaseDto<DeliveryFounderConsultUpdateDto>
  implements Partial<DeliveryFounderConsultDto> {
  spaceConsultManager?: number;
  purposeYn?: YN;
  changUpExpYn?: YN;
  status?: FOUNDER_CONSULT;
  gender?: GENDER;
  spaceOwnYn?: YN;
  confirmDate?: Date;
  hopeDate?: Date;
  hopeTime?: AVAILABLE_TIME;
  hopeFoodCategory?: string;
}
