import { Pagination } from '@/common';
import { BaseService } from '@/core';
import { ArticleDto, ArticleListDto } from '@/dto';
import { ArticleUpdateDto } from '@/dto/article/article-update.dto';

export class ArticleService extends BaseService {
  findAll(filter: ArticleListDto, pagination?: Pagination) {
    return super.paginate<ArticleDto>('admin/article', filter, pagination);
  }

  findOne(articleNo) {
    return super.get<ArticleDto>(`admin/article/${articleNo}`);
  }

  create(articleDto: ArticleDto) {
    return super.post<ArticleDto>('admin/article', articleDto);
  }

  update(articleNo, articleUpdateDto: ArticleUpdateDto) {
    return super.patch<ArticleDto>(
      `admin/article/${articleNo}`,
      articleUpdateDto,
    );
  }

  deleteOne(articleNo) {
    return super.delete<ArticleDto>(`admin/article/${articleNo}`);
  }
}

export default new ArticleService();
