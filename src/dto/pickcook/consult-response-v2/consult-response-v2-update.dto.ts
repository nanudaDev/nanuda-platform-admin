import { BaseDto } from '@/core';
import { BRAND_CONSULT } from '@/services/shared';

export class ConsultResponseV2UpdateDto extends BaseDto<
  ConsultResponseV2UpdateDto
> {
  consultStatus?: BRAND_CONSULT;
  name?: string;
  phone?: string;
  description?: string;
  adminId?: number;
}
