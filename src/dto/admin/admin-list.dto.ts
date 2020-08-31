import { BaseDto } from '@/core';
import { AdminDto } from './admin.dto';
import { OrderByValue } from '@/common';

export class AdminListDto extends BaseDto<AdminDto> {
  no: number;
  name?: string;
  phone?: string;
  orderByNo?: OrderByValue;
}
