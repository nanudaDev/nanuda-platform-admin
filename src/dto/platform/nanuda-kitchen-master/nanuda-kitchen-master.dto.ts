import { BaseDto } from '@/core';
import { PaymentListDto } from '../payment-list';
import { NanudaKitchenMenuDto } from '../nanuda-kitchen-menu/nanuda-kitchen-menu.dto';

export class NanudaKitchenMasterDto extends BaseDto<NanudaKitchenMasterDto> {
  nanudaNo: number;
  nanudaName: string;
  paymentLists?: PaymentListDto[];
  menus?: NanudaKitchenMenuDto[];
}
