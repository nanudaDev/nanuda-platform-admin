import { BaseDto } from '@/core';

export class ConsultBetweenDatesRequestDto extends BaseDto<
  ConsultBetweenDatesRequestDto
> {
  startDate: string;
  endDate: string;
}
