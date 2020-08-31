import { BaseDto } from '@/core';
import { AMENITY } from '@/services/shared';
import { SpaceDto } from '../space';

export class AmenityDto extends BaseDto<AmenityDto> {
  no?: number;
  amenityName?: string;
  amenityCode?: string;
  amenityType?: AMENITY;
  spaces?: SpaceDto[];
}
