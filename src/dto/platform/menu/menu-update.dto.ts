import { FileAttachmentDto } from '@/services/shared/file-upload';
import { MenuDto } from './menu.dto';

export class MenuUpdateDto extends MenuDto {
  newImages?: FileAttachmentDto[];
}
