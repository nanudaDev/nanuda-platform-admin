import { OrderByValue, YN } from '@/common';
import { BaseDto } from '@/core';
import { ADMIN_USER } from '@/services/shared';
import { ArticleDto } from './article.dto';

export class ArticleListDto extends BaseDto<ArticleListDto>
  implements Partial<ArticleDto> {
  title?: string;
  mediaName?: string;
  url?: string;
  adminName?: string;
  showYn?: YN;
  orderByNo?: OrderByValue;
}
