import { YN } from '@/common';
import { BaseDto } from '@/core';
import { ConsultResponseDto } from '../consult-response';

export class ReservationDto extends BaseDto<ReservationDto> {
  id: number;
  reservationCode: string;
  name: string;
  phone: string;
  consultId: number;
  reservationDate: Date;
  reservationTime: string;
  isCancelYn: YN;
  consultResult?: ConsultResponseDto;
}
