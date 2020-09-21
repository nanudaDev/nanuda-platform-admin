import { BaseDto } from '@/core';
import { FileAttachmentDto } from '../file-upload';
import { YN } from '@/common';
import { CompanyDistrictDto } from '../company-district';
import { AmenityDto } from '../amenity';
import { DeliverySpaceOptionDto } from '../delivery-space-option';
import { DeliveryFounderConsultContractDto } from '../delivery-founder-consult-contract';
import { BrandDto } from '../brand';

export class DeliverySpaceDto extends BaseDto<DeliverySpaceDto> {
  no?: number;
  typeName?: string;
  buildingName?: string;
  companyDistrictNo?: number;
  size?: number;
  images?: FileAttachmentDto[];
  deposit?: number;
  monthlyRentFee?: number;
  quantity?: number;
  showYn?: YN;
  delYn?: YN;
  monthlyUtilityFee?: number;
  companyDistrict?: CompanyDistrictDto;
  remainingCount?: number;
  desc?: string;
  brands?: BrandDto[];
  amenities?: AmenityDto[];
  deliverySpaceOptions?: DeliverySpaceOptionDto[];
  contracts?: DeliveryFounderConsultContractDto[];
}
