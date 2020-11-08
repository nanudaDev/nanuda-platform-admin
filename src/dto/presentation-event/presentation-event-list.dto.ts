import { OrderByValue } from '@/common';
import { BaseDto } from '@/core';
import { PresentationEventDto } from './presentation-event.dto';

export class PresentationEventListDto extends PresentationEventDto {
  orderByNo?: OrderByValue;
}
