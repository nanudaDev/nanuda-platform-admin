import { BaseService } from '@/core';

export class CodeBdongService extends BaseService {
  findAll(params) {
    return super.get('code-bdong', params, true);
  }
}

export default new CodeBdongService();
