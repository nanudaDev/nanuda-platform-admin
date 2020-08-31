import { BaseService } from '@/core';
import { Pagination } from '@/common';
import { CodeManagementDto } from './dto';

class CodeManagementService extends BaseService {
  public getCommonCode(filter: Pagination) {
    return this.paginate<CodeManagementDto>('common-code', filter);
  }
}
export default new CodeManagementService();
