import { YN } from '@/common';
import { BaseDto } from '@/core';
import { LINK_TYPE, POPUP } from '@/services/shared';
import { FileAttachmentDto } from '@/services/shared/file-upload';

export class PopupDto extends BaseDto<PopupDto> {
  no?: number;
  title?: string;
  subTitle?: string;
  content?: string;
  started?: Date;
  ended?: Date;
  link?: string;
  linkType?: LINK_TYPE;
  images?: FileAttachmentDto[];
  popupType?: POPUP;
  showYn?: YN;
  delYn?: YN;
}
