import { BaseDto } from '@/core';
import { AdminDto } from '../admin';
import { FoodCategoryDto } from '../food-category';
import { FileAttachmentDto } from '@/services/shared/file-upload';
import { YN } from '@/common';
import { MenuDto } from '../menu';
import { BRAND, BRAND_TYPE, DIFFICULTY, STORE_COUNT } from '@/services/shared';
import { CodeManagementDto } from '@/services/init/dto';

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
  mainBanner?: FileAttachmentDto[];
  sideBanner?: FileAttachmentDto[];
  mobileSideBanner?: FileAttachmentDto[];
  mainMenuImage?: FileAttachmentDto[];
  showYn?: YN;
  menus?: MenuDto[];
  cost?: BRAND;
  difficulty?: DIFFICULTY;
  storeCount?: STORE_COUNT;
  storeCountValue?: CodeManagementDto;
  difficultyValue?: CodeManagementDto;
  costValue?: CodeManagementDto;
  isRecommendedYn?: YN;
  urlPath?: string;
  kioskNo?: number;
  brandType?: BRAND_TYPE;
  isOperatedYn?: YN;
}
