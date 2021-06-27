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
import { BaeminReportCreateDto } from './baemin-report-create.dto';

export class ConsultResponseV3Dto extends BaseDto<ConsultResponseV3Dto> {
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
  adminId?: number;
  fnbOwnerCodeStatus?: PickcookCodeManagementDto;
  proformaConsultResult?: any;
  consultCodeStatus?: PickcookCodeManagementDto;
  admin?: AdminDto;
  consultBaeminReport: Partial<
    BaeminReportCreateDto
  > = new BaeminReportCreateDto();
}
