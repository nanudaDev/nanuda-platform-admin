import { OrderByValue } from '@/common';
import { BaseDto } from '@/core';
import {
  PRESENTATION_DISPLAY_TYPE,
  PRESENTATION_EVENT_TYPE,
} from '@/services/shared';
import { PresentationEventDto } from './presentation-event.dto';

export class PresentationEventListDto extends PresentationEventDto {
  title?: string;
  eventType?: PRESENTATION_EVENT_TYPE;
  displayType?: PRESENTATION_DISPLAY_TYPE;
  address?: string;
  attendeesName?: string;
  attendeesPhone?: string;
  orderByNo?: OrderByValue;
}
