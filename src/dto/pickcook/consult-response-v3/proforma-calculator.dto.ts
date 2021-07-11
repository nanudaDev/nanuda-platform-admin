import { BaseDto } from '@/core';

export class ProformaCalculatorDto extends BaseDto<ProformaCalculatorDto> {
  id: string;
  name: string;
  type?: string;
  price: number;
  totalPrice?: number;
  checked: boolean;
}
