import { YN } from '@/common';
import { BaseDto } from '@/core';
import { LINK_TYPE, POPUP } from '@/services/shared';
import { FileAttachmentDto } from '@/services/shared/file-upload';
import { InquiryUpdateClosedDto } from './../../platform/inquiry/inquiry-update-closed.dto';

export class PickcookPopupDto extends BaseDto<PickcookPopupDto> {
  id?: number;
  title?: string;
  desscription?: string;
  started?: Date;
  ended?: Date;
  link?: string;
  linkType?: LINK_TYPE;
  images?: FileAttachmentDto[];
  popupType?: POPUP;
  InquiryUpdateClosedDto?: YN;
  delYn?: YN;
}
