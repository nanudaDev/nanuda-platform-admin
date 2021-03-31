import { BaseDto } from '@/core';
import { DeliverySpaceDto } from '../delivery-space';

export class DeliveryFounderConsultRecordDto extends BaseDto<
  DeliveryFounderConsultRecordDto
> {
  no?: number;
  prevDeliverySpaceNo?: number;
  newDeliverySpaceNo?: number;
  adminNo?: number;
  deliveryFounderConsultNo?: number;
  prevDeliverySpace?: DeliverySpaceDto;
  newDeliverySpace?: DeliverySpaceDto;
}
