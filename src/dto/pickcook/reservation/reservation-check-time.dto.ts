import { BaseDto } from '@/core';

export class ReservationCheckTimeDto extends BaseDto<ReservationCheckTimeDto> {
  reservationDate: string;
}
