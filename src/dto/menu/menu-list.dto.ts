import { MenuDto } from './menu.dto';
import { OrderByValue } from '@/common';

export class MenuListDto extends MenuDto {
  brandName?: string;
  orderByNo?: OrderByValue;
}
