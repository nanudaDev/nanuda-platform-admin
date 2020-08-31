import { BaseDto } from '@/core';
import { AdminDto } from '../admin';
import { FoodCategoryDto } from '../food-category';
import { FileAttachmentDto } from '@/services/shared/file-upload';
import { YN } from '@/common';

export class BrandDto extends BaseDto<BrandDto> {
  no?: number;
  nameKr?: string;
  nameEng?: string;
  desc?: string;
  adminNo?: number;
  categoryNo?: number;
  admin?: AdminDto;
  category?: FoodCategoryDto;
  logo?: FileAttachmentDto[];
  showYn?: YN;
}
