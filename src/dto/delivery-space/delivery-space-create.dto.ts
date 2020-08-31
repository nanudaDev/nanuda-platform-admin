import { DeliverySpaceDto } from './delivery-space.dto';

export class DeliverySpaceCreateDto extends DeliverySpaceDto {
  amenityIds?: number[];
  brandIds?: number[];
  deliverySpaceOptionIds?: number[];
}
