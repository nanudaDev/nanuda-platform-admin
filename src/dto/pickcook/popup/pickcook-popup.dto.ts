import { YN } from '@/common';
import { BaseDto } from '@/core';
import { AdminDto } from '@/dto/platform';
import { LINK_TYPE, PICKCOOK_POPUP, POPUP } from '@/services/shared';
import { FileAttachmentDto } from '@/services/shared/file-upload';
export class PickcookPopupDto extends BaseDto<PickcookPopupDto> {
  id?: number;
  title?: string;
  description?: string;
  started?: Date;
  ended?: Date;
  link?: string;
  linkType?: LINK_TYPE;
  images?: FileAttachmentDto[];
  popupType?: PICKCOOK_POPUP;
  inUse?: YN;
}
