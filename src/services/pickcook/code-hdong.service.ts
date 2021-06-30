import { BaseService } from '@/core';
import { ApiUrlType } from '../../../environments';

export class CodeHdongService extends BaseService {
  getHdongCode(code: string) {
    return super.get<any>(`code-hdong/${code}`, null, ApiUrlType.PICKCOOK);
  }
}

export default new CodeHdongService();
