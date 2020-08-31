import { NanudaUserDto } from './nanuda-user.dto';
import { YN, OrderByValue } from '@/common';
import { GENDER } from '@/services/shared';
import { BaseDto } from '@/core';

export class NanudaUserListDto extends BaseDto<NanudaUserDto> {
  name?: string;
  phone?: string;
  gender?: GENDER;
  orderByNo?: OrderByValue;
}
