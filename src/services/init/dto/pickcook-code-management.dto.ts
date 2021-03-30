import { BaseDto } from '@/core';
import { YN } from '@/common';

export class PickcookCodeManagementDto extends BaseDto<
  PickcookCodeManagementDto
> {
  constructor(partial?: any) {
    super(partial);
  }
  no: number;
  key: string;
  value: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  delYn: YN;
}
