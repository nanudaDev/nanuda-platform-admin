import { BaseDto } from '@/core';
import { NanudaKitchenMasterDto } from '../nanuda-kitchen-master';
import { YN } from '@/common';

export class NanudaKitchenMenuDto extends BaseDto<NanudaKitchenMenuDto> {
  menuNo: number;
  nanudaNo: number;
  menuCode?: string;
  menuName?: string;
  menuDesc?: string;
  menuType?: string;
  menuViewType?: string;
  menuPrice?: number;
  kioskUse?: YN;
  soldOut?: YN;
  createdAt?: Date;
  nanudaKitchenMaster?: NanudaKitchenMasterDto;
}
