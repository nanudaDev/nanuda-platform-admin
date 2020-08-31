import { BaseDto } from '@/core';
import { NOTICE_BOARD } from '@/services/shared';
import { AdminDto } from '../admin';
import { FileAttachmentDto } from '@/services/shared/file-upload';

export class NoticeBoardDto extends BaseDto<NoticeBoardDto> {
  no?: number;
  title: string;
  content: string;
  started?: Date;
  ended?: Date;
  url?: string;
  admin: AdminDto;
  noticeBoardType?: NOTICE_BOARD;
  attachments?: FileAttachmentDto[];
}
