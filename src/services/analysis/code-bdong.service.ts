import { BaseService } from '@/core';
import { ApiUrlType } from '../../../environments';

export class CodeBdongService extends BaseService {
  findAll(params) {
    console.log(params);
    return super.get<any>('code-bdong', params, ApiUrlType.ANALYSIS);
  }
}

export default new CodeBdongService();
