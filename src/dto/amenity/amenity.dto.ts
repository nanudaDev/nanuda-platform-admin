import { BaseDto } from '@/core';
import { AMENITY, SPACE_TYPE } from '@/services/shared';
import { FileAttachmentDto } from '@/services/shared/file-upload';
import { SpaceDto } from '../space';

export class AmenityDto extends BaseDto<AmenityDto> {
  no?: number;
  amenityName?: string;
  amenityCode?: string;
  amenityType?: AMENITY;
  spaces?: SpaceDto[];
  spaceTypeNo?: SPACE_TYPE;
  image: FileAttachmentDto[];
}
