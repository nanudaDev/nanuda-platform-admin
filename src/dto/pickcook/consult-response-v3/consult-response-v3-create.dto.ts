import { BaseDto } from '@/core';
import { FNB_OWNER } from '@/services/shared';
import { ConsultResponseV3Dto } from './consult-response-v3.dto';

export class ConsultResponseV3CreateDto
  extends BaseDto<ConsultResponseV3CreateDto>
  implements Partial<ConsultResponseV3Dto> {
  name: string;
  phone: string;
  fnbOwnerStatus: FNB_OWNER;
  description?: string;
  ipAddress: string;
}
