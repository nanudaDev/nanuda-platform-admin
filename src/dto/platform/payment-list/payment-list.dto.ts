import { BaseDto } from '@/core';
import { NanudaKitchenMasterDto } from '..';

export class PaymentListDto extends BaseDto<PaymentListDto> {
  paymentListNo?: number;
  nanudaNo?: number;
  resultVal?: string;
  tranNo?: string;
  tmpTranNo?: string;
  tranUnique?: string;
  cardNo?: string;
  issuerName?: string;
  acquirerName?: string;
  shopName?: string;
  tranType?: string;
  catId?: string;
  businessNo?: string;
  dongleType?: string;
  totalAmount?: string | number;
  amount?: string;
  surTax?: string;
  installment?: string;
  merchantNo?: string;
  msg?: string;
  approvalNo?: string;
  approvalDate?: string;
  cashId?: string;
  cashType?: string;
  prtMsg?: string;
  cardCancelFl?: string;
  createdAt?: Date;
  nanudaKitchenMaster?: NanudaKitchenMasterDto;
}
