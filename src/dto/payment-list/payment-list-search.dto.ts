// payment-list 같은 경우는 list단어로 마치기 때문에 search로 대신 맞춤

import { PaymentListDto } from './payment-list.dto';
import { OrderByValue } from '@/common';

// payment-list는 데이터베이스 테이블명이기 때문에 최대한 alias를 거기에 맞춘다
export class PaymentListSearchDto extends PaymentListDto {
  nanudaKitchenMasterName?: string;
  nanudaKitchenMenuName?: string;
  orderByPaymentListNo?: OrderByValue;
  started?: Date;
}
