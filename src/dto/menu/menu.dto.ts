import { BaseDto } from '@/core';
import { FileAttachmentDto } from '@/services/shared/file-upload';
import { YN } from '@/common';

export class MenuDto extends BaseDto<MenuDto> {
  nameKr?: string;
  nameEng?: string;
  desc?: string;
  brandNo?: any;
  images?: FileAttachmentDto[];
  delYn?: YN;
  mainYn?: YN;
  showYn?: YN;
}
