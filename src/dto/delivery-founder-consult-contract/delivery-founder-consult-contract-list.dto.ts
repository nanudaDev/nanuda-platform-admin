import { BaseDto } from '@/core';
import { DeliverySpaceDto } from '../delivery-space';
import { NanudaUserDto } from '../nanuda-user';
import { DeliveryFounderConsultContractDto } from '.';
import { OrderByValue } from '@/common';

export class DeliveryFounderConsultContractListDto
  extends BaseDto<DeliveryFounderConsultContractListDto>
  implements Partial<DeliveryFounderConsultContractDto> {
  no?: number;
  companyNo?: number;
  nanudaUserNo?: number;
  deliverySpaceNo?: number;
  companyDistrictNo?: number;
  deliveryFounderConsultNo?: number;
  deliverySpace?: DeliverySpaceDto;
  nanudaUser?: NanudaUserDto;
  orderByNo?: OrderByValue;
}
