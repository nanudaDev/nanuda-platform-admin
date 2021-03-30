import { BaseService } from '@/core';
import { Pagination } from '@/common';
import { ApiUrlType } from '../../../environments';
import { PickcookCodeManagementDto } from '../init/dto';

class CommonCodeService extends BaseService {
  findAll(filter: PickcookCodeManagementDto, pagination: Pagination) {
    return this.paginate<PickcookCodeManagementDto>(
      'admin/common-code',
      filter,
      pagination,
      ApiUrlType.PICKCOOK,
    );
  }
}
export default new CommonCodeService();
