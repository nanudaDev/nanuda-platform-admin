import { YN } from '@/common';
import { BaseDto } from '@/core';
import { ADMIN_USER } from '@/services/shared';
import { FileAttachmentDto } from '@/services/shared/file-upload';

export class ArticleDto extends BaseDto<ArticleDto> {
  no: number;
  adminNo: number;
  mediaName?: string;
  title: string;
  desc?: string;
  url: string;
  image?: FileAttachmentDto[];
  showYn: YN;
  admin?: ADMIN_USER;
}
