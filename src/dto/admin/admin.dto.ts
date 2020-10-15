import { BaseUser } from '@/services/shared/auth';
import { BrandDto } from '../brand/brand.dto';
import { FounderConsultDto } from '../founder-consult';

export class AdminDto extends BaseUser {
  no: number;
  name: string;
  phone: string;
  password: string;
  passwordConfirm: string;
  brands?: BrandDto[];
}
