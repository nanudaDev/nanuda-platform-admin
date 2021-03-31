import { OrderByValue, YN } from '@/common';
import { BaseDto } from '@/core';
import { GENDER } from '@/services/shared';
import { AttendeesDto } from './attendees.dto';

export class AttendeesListDto extends BaseDto<AttendeesDto> {
  name?: string;
  phone?: string;
  gender?: GENDER;
  eventNo?: number;
  isAttended?: YN;
  isContracted?: YN;
  orderByNo: OrderByValue;
}
