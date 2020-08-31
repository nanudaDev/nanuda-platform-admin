import { DeliverySpaceDto } from './delivery-space.dto';

export class DeliverySpaceListDto extends DeliverySpaceDto {
  typeName: string;
  companyDistrictName?: string;
  companyName?: string;
  companyNo?: number;
  brandName?: string;
}
