import { BaseDto } from '@/core';
import { YN } from '@/common';

export class CodeManagementDto extends BaseDto<CodeManagementDto> {
  constructor(partial?: any) {
    super(partial);
  }
  no: number;
  key: string;
  value: string;
  category_1: string;
  category_2: string;
  createdAt: Date;
  updatedAt: Date;
  delYn: YN;
}
