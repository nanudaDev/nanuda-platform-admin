import { BaseDto } from '@/core';
import { BRAND_CONSULT } from '@/services/shared';

export class ConsultResponseUpdateDto extends BaseDto<
  ConsultResponseUpdateDto
> {
  consultStatus?: BRAND_CONSULT;
  name?: string;
  phone?: string;
  description?: string;
  adminId?: number;
}
