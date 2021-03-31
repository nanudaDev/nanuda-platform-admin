import { FileAttachmentDto } from '@/services/shared/file-upload';
import { DeliverySpaceCreateDto } from './delivery-space-create.dto';

export class DeliverySpaceUpdateDto extends DeliverySpaceCreateDto {
  newImages?: FileAttachmentDto[];
}
