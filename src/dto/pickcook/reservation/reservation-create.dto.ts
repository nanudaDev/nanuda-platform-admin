import { BaseDto } from '@/core';
import { RESERVATION_HOURS } from '@/services/shared';

export class ReservationCreateDto extends BaseDto<ReservationCreateDto> {
  reservationDate: Date;
  reservationTime: RESERVATION_HOURS;
  reservationCode: string;
  consultId: number;
}
