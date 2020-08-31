import { BaseDto } from '@/core';
import { DeliverySpaceDto } from '../delivery-space';
import { NanudaUserDto } from '../nanuda-user';

export class DeliveryFounderConsultContractDto extends BaseDto<
  DeliveryFounderConsultContractDto
> {
  no?: number;
  companyNo?: number;
  nanudaUserNo?: number;
  deliverySpaceNo?: number;
  companyDistrictNo?: number;
  deliveryFounderConsultNo?: number;
  deliverySpace?: DeliverySpaceDto;
  nanudaUser?: NanudaUserDto;
}
