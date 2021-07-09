import { BaseDto } from '@/core';

export class MeetingListRequestDto extends BaseDto<MeetingListRequestDto> {
  year: number;
  month: number;
}
