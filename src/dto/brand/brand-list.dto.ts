import { BrandDto } from './brand.dto';
import { YN, OrderByValue } from '@/common';

export class BrandListDto extends BrandDto {
  categoryName?: string;
  nameKr?: string;
  adminName?: string;
  delYn?: YN;
  showYn?: YN;
  orderByNo?: OrderByValue;
}
