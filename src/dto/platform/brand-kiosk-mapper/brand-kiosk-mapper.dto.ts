import { BaseDto } from '@/core';

export class BrandKioskMapperDto extends BaseDto<BrandKioskMapperDto> {
  no?: number;
  brandNo?: number;
  kioskNo?: number;
  createdAt?: number;
  nanudaNo?: number;
  nanudaName?: string;
  sum?: number;
  started?: Date;
  ended?: Date;
}
