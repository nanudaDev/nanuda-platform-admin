import { YN } from '@/common';
import { BaseDto } from '@/core';
import { DeliverySpaceNndBrandOpRecordDto } from '../delivery-space-nnd-brand-op-record';

export class DeliverySpaceNndOpRecordDto extends BaseDto<
  DeliverySpaceNndOpRecordDto
> {
  isOperatedYn?: YN;
  operatingStartDate?: Date;
  operatingEndDate?: Date;
  deliverySpaceNndBrandOpRecords?: DeliverySpaceNndBrandOpRecordDto[];
}
