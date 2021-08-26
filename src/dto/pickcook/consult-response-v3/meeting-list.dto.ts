import { BaseDto } from '@/core';

export class MeetingListDto extends BaseDto<MeetingListDto> {
  title: string;
  start: Date;
}
