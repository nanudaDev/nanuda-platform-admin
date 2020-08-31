import { BaseDto } from '@/core';

export class SpaceTypeDto extends BaseDto<SpaceTypeDto> {
  no?: number;
  code?: string;
  name?: string;
  displayName?: string;
  desc?: string;
  showYn?: string;
}
