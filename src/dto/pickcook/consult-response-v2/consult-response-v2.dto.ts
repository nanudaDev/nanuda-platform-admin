import { BaseDto } from '@/core';
import { AdminDto } from '@/dto/platform';
import { PickcookCodeManagementDto } from '@/services/init/dto';
import {
  ADMIN_USER,
  AGE_GROUP,
  BRAND_CONSULT,
  FNB_OWNER,
  KB_MEDIUM_CATEGORY,
  OPERATION_TIME,
  REVENUE_RANGE,
  TENTATIVE_OPEN_OPTION,
} from '@/services/shared';
import { ReservationDto } from '../reservation';

export class ConsultResponseV2Dto extends BaseDto<ConsultResponseV2Dto> {
  id: number;
  proformaConsultResultId: number;
  name: string;
  phone: string;
  description: string;
  consultStatus: BRAND_CONSULT;
  consultCompleteDate: Date;
  consultDropDate: Date;
  fnbOwnerStatus: FNB_OWNER;
  reservationCode: string;
  responseData?: any;
  adminId?: number;
  fnbOwnerCodeStatus?: PickcookCodeManagementDto;
  proformaConsultResult?: any;
  consultCodeStatus?: PickcookCodeManagementDto;
  admin?: AdminDto;
}
