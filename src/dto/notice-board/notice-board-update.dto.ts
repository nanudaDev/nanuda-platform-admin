import { NoticeBoardDto } from './notice-board.dto';
import { FileAttachmentDto } from '@/services/shared/file-upload';

export class NoticeBoardUpdateDto extends NoticeBoardDto {
  editMode?: boolean;
}
