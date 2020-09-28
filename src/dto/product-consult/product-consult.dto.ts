import { BaseDto } from '@/core';
import { CodeManagementDto } from '@/services/init/dto';
import { AdminDto } from '../admin';
import { NanudaUserDto } from '../nanuda-user';
import { SPACE_TYPE, PRODUCT_CONSULT, GENDER } from '@/services/shared';
import { YN, AVAILABLE_TIME } from '@/common';

export class ProductConsultDto extends BaseDto<ProductConsultDto> {
  no?: number;
  nanudaUserNo?: number;
  gender?: GENDER;
  status?: PRODUCT_CONSULT;
  pConsultManager?: number;
  productId?: number;
  confirmDate?: Date;
  hopeDate?: Date;
  hopeTime?: AVAILABLE_TIME;
  changUpExpYn?: YN;
  pConsultEtc?: string;
  spaceTypeNo?: SPACE_TYPE;
  nanudaUser?: NanudaUserDto;
  admin?: AdminDto;
  codeManagement?: CodeManagementDto;
}
