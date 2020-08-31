import { UPLOAD_TYPE } from '../../services/shared/file-upload/file-upload.service';

export class FileAttachmentDto {
  uploadType?: UPLOAD_TYPE;
  originFilename?: string;
  source?: string;
  key?: string;
  endpoint?: string;
  mimetype?: string;
}
