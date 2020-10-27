import { YN } from '@/common';
import { BaseDto } from '@/core';
import { BANNER_TYPE, LINK_TYPE } from '@/services/shared';
import { FileAttachmentDto } from '@/services/shared/file-upload';
import { AdminDto } from '../admin';

export class BannerDto extends BaseDto<BannerDto> {
  no?: number;
  adminNo?: number;
  admin?: AdminDto;
  title?: string;
  bannerType?: BANNER_TYPE;
  url?: string;
  linkType?: LINK_TYPE;
  image?: FileAttachmentDto[];
  mobileImage?: FileAttachmentDto[];
  showYn?: YN;
  delYn?: YN;
  started?: Date;
  ended?: Date;
}
