import { YN } from '@/common';
import { BrandDto } from '../brand';

export class DeliverySpaceNndBrandOpRecordDto {
  brandNo: number;
  isOperatedYn: YN;
  brand?: BrandDto;
}
