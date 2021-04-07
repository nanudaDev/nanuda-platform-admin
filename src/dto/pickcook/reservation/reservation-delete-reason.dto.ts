import { BaseDto } from '@/core';
import { RESERVATION_DELETE_REASON } from '@/services/shared';

export class ReservationDeleteReasonDto extends BaseDto<
  ReservationDeleteReasonDto
> {
  deleteReason?: RESERVATION_DELETE_REASON;
  deleteReasonEtc?: string;
}
