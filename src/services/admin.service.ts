import { BaseService } from '@/core';
import { AdminDto, AdminListDto } from '@/dto';
import { Pagination } from '@/common';

class AdminService extends BaseService {
  findMe() {
    return super.get<AdminDto>('admin/find-me');
  }

  findAll(filter: AdminListDto, pagination?: Pagination) {
    return super.paginate<AdminDto>('admin', filter, pagination);
  }

  findForSelect() {
    return super.get<AdminDto[]>('admin');
  }
}

export default new AdminService();
