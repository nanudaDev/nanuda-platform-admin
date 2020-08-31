import { BaseDto } from '@/core';
import { YN } from '@/common';

export class DeliverySpaceOptionDto extends BaseDto<DeliverySpaceOptionDto> {
  no?: number;
  adminNo?: number;
  deliverySpaceOptionName?: string;
  deliverySpaceOptionCode?: string;
  desc?: string;
  showYn?: YN;
}
