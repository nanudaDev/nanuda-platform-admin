import { SPACE_TYPE } from '@/services/shared';
import { BaseUser } from '@/services/shared/auth';
import { BrandDto } from '../brand/brand.dto';
import { SpaceTypeDto } from '../space-type';

export class AdminDto extends BaseUser {
  no: number;
  name: string;
  phone: string;
  password: string;
  passwordConfirm: string;
  brands?: BrandDto[];
  spaceTypeNo?: SPACE_TYPE;
  spaceType?: SpaceTypeDto;
}
