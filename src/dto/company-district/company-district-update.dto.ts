import { BaseDto } from '@/core';
import { APPROVAL_STATUS } from '@/services/shared';
import { AmenityDto } from '../amenity/amenity.dto';
import { CompanyDistrictDto } from './company-district.dto';
import { FileAttachmentDto } from '@/services/shared/file-upload';

export class CompanyDistrictUpdateDto extends BaseDto<CompanyDistrictUpdateDto>
  implements Partial<CompanyDistrictDto> {
  no?: number;
  companyDistrictStatus?: APPROVAL_STATUS;
  companyNo?: number;
  nameKr?: string;
  nameEng?: string;
  address?: string;
  amenities?: AmenityDto[];
  amenityIds?: number[];
  lat?: string;
  lon?: string;
  image?: FileAttachmentDto[];
}
