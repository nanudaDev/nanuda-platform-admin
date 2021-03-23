import { extend } from 'vue/types/umd';
import { BaseDto } from '@/core';
import { AmenityDto } from './amenity.dto';
import { AMENITY } from '@/services/shared';

export class AmenityListDto extends BaseDto<AmenityListDto>
  implements Partial<AmenityDto> {
  amenityName?: string;
  amenityCode?: string;
  amenityType?: AMENITY;
}
