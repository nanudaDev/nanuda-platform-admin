import { BaseDto } from '@/core';

export class ReservationCheckDto extends BaseDto<ReservationCheckDto> {
  id: number;
  reservationCode: string;
  phone: string;
}
