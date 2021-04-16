import { YN } from '@/common';
import { BaseDto } from '@/core';
import { RESERVATION_HOURS } from '@/services/shared';
import { ConsultResponseDto } from '../consult-response';

export class ReservationDto extends BaseDto<ReservationDto> {
  id: number;
  reservationCode: string;
  name: string;
  phone: string;
  consultId: number;
  reservationDate: Date;
  reservationTime: RESERVATION_HOURS;
  isCancelYn?: YN;
  consultResult?: ConsultResponseDto;
  formatReservationDate?: string;
}
