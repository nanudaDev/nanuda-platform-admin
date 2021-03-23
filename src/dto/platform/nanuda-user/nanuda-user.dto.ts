import { BaseDto } from '@/core';
import { BaseUser } from '@/services/shared/auth';
import { YN } from '@/common';
import { GENDER } from '@/services/shared';

export class NanudaUserDto extends BaseUser {
  lastLoginAt?: Date;
  marketYn?: YN;
  infoYn?: YN;
  serviceYn?: YN;
  gender?: GENDER;
  remainVisitCount?: number;
}
