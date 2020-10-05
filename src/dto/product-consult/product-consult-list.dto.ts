import { ProductConsultDto } from './product-consult.dto';
import { OrderByValue, YN } from '@/common';
import { GENDER } from '@/services/shared';

export class ProductConsultListDto extends ProductConsultDto {
  gender?: GENDER;
  changUpExpYn?: YN;
  adminName?: string;
  nanudaUserPhone?: string;
  orderByNo?: OrderByValue;
}
