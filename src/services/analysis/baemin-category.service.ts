import { BaseService } from '@/core';
import { ApiUrlType } from '../../../environments';

export class BaeminCategoryService extends BaseService {
  findAll(params) {
    return super.get<any>('baemin-category', params, ApiUrlType.ANALYSIS);
  }
}

export default new BaeminCategoryService();
