import { BaseDto } from '@/core';

export class ConsultMonthlyRequestDto extends BaseDto<
  ConsultMonthlyRequestDto
> {
  year: number;
  month: number;
}
