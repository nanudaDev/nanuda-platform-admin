import { YN } from '@/common';
import { BaseDto } from '@/core';
import { CodeManagementDto } from '@/services/init/dto';
import { GENDER } from '@/services/shared';

export class AttendeesDto extends BaseDto<AttendeesDto> {
  no?: number;
  name?: string;
  phone?: string;
  eventNo?: number;
  isContracted?: YN;
  isContractedDate?: Date;
  isAttended?: YN;
  gender?: GENDER;
  genderInfo?: CodeManagementDto;
}
