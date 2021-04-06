import { BaseDto } from '@/core';

export class ReservationDeleteReasonDto extends BaseDto<
  ReservationDeleteReasonDto
> {
  deleteReason?: string;
}
