import { BaseDto } from '@/core';

export class ProformaCalculatorDto extends BaseDto<ProformaCalculatorDto> {
  id: string;
  name: string;
  unit: string;
  price: number;
  qty?: number;
  totalPrice?: number;
  type?: string;
}

export class ProformaExtraServiceDto extends BaseDto<ProformaExtraServiceDto> {
  title: string;
  name: string;
  items: {
    id: string;
    name: string;
    unit: string;
    price: number;
    qty: number;
    totalPrice: number;
  }[];
}
