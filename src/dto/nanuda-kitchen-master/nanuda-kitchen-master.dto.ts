import { BaseDto } from '@/core';
import { PaymentListDto } from '../payment-list';

export class NanudaKitchenMasterDto extends BaseDto<NanudaKitchenMasterDto> {
  nanudaNo: number;
  nanudaName: string;
  paymentLists?: PaymentListDto[];
}
