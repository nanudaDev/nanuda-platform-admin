import { BaseDto } from '@/core';
import { RESERVATION_HOURS } from '@/services/shared';

export class ReservationUpdateDto extends BaseDto<ReservationUpdateDto> {
  reservationDate: Date | string;
  reservationTime: RESERVATION_HOURS;
}
