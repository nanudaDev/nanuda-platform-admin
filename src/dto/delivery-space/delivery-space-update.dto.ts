import { DeliverySpaceCreateDto } from './delivery-space-create.dto';
import { FileAttachmentDto } from '..';

export class DeliverySpaceUpdateDto extends DeliverySpaceCreateDto {
  newImages?: FileAttachmentDto[];
}
