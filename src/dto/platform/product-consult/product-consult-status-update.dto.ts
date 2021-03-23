import { BaseDto } from '@/core';
import { ProductConsultDto } from './product-consult.dto';

export class ProductConsultStatusUpdateDto extends ProductConsultDto {
  productConsultNos?: number[];
}
