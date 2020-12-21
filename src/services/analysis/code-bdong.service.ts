import { BaseService } from '@/core';

export class CodeBdongService extends BaseService {
  findAll(params) {
    console.log(params);
    return super.get<any>('code-bdong', params, true);
  }
}

export default new CodeBdongService();
