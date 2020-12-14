import { BaseService } from '@/core';

export class BaeminCategoryService extends BaseService {
  findAll(params) {
    return super.get<any>('baemin-category', params, true);
  }
}

export default new BaeminCategoryService();
