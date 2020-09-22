import { ProductConsultDto } from './product-consult.dto';
import { OrderByValue } from '@/common';

export class ProductConsultListDto extends ProductConsultDto {
  adminName?: string;
  nanudaUserPhone?: string;
  orderByNo?: OrderByValue;
}
