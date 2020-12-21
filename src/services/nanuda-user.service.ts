import { BaseService } from '@/core';
import { NanudaUserDto, NanudaUserListDto } from '@/dto';
import { Pagination } from '@/common';

export class NanudaUserService extends BaseService {
  /**
   *
   * @param body
   */
  create(body: NanudaUserDto) {
    return super.post<NanudaUserDto>('admin/nanuda-user', body);
  }

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

  /**
   *
   * @param id
   */
  findOne(id) {
    return super.get<NanudaUserDto>(`admin/nanuda-user/${id}`);
  }
}

export default new NanudaUserService();
