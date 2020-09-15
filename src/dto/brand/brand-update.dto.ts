import { BrandDto } from './brand.dto';
import { SPACE_TYPE } from '@/services/shared';

export class BrandUpdateDto extends BrandDto {
  spaceTypeNo?: SPACE_TYPE;
}
