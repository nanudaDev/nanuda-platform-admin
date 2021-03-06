import { BaseDto } from '@/core';
import { APPROVAL_STATUS } from '@/services/shared';
import { AmenityDto } from '../amenity';
import { CompanyUserDto } from '../company-user';
import { CodeManagementDto } from '@/services/init/dto';
import { DeliverySpaceDto } from '../delivery-space/delivery-space.dto';
import { FileAttachmentDto } from '@/services/shared/file-upload';

export class CompanyDistrictDto extends BaseDto<CompanyDistrictDto> {
  no?: number;
  companyNo?: number;
  companyNameKr?: string;
  companyNameEng?: string;
  nameKr?: string;
  nameEng?: string;
  address?: string;
  companyDistrictStatus?: APPROVAL_STATUS;
  amenities?: AmenityDto[];
  codeManagement?: CodeManagementDto[];
  deliverySpaceDto?: DeliverySpaceDto[];
  lat?: string;
  lon?: string;
  image?: FileAttachmentDto[];
  deliverySpaces?: DeliverySpaceDto[];
  region1DepthName?: string;
  region2DepthName?: string;
  region3DepthName?: string;
  hCode?: string;
  bCode?: string;
}
