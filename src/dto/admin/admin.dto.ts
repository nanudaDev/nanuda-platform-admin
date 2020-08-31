import { BaseUser } from '@/services/shared/auth';
import { BrandDto } from '../brand/brand.dto';

export class AdminDto extends BaseUser {
  no: number;
  name: string;
  phone: string;
  brands?: BrandDto[];
}
