import { BaseDto } from '../../../core/base.dto';
import { ConsultResponseV3Dto } from './consult-response-v3.dto';
import { BRAND_CONSULT } from '../../../services/shared/pickcook-common-code.type';
export class ConsultResponseV3UpdateDto
  extends BaseDto<ConsultResponseV3UpdateDto>
  implements Partial<ConsultResponseV3Dto> {
  description?: string;
  consultStatus?: BRAND_CONSULT;
  adminId?: number;
  meetingDate?: Date;
  meetingTime?: string;
}
