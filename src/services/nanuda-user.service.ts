import { BaseService } from '@/core';
import { NanudaUserDto, NanudaUserListDto } from '@/dto';
import { Pagination } from '@/common';

export class NanudaUserService extends BaseService {
  /**
   *
   * @param filter
   * @param pagination
   */
  findAll(filter: NanudaUserListDto, pagination?: Pagination) {
    return super.paginate<NanudaUserDto>(
      'admin/nanuda-user',
      filter,
      pagination,
    );
  }
}

export default new NanudaUserService();
