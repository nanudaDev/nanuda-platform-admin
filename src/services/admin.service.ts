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

  findOne(id) {
    return super.get<AdminDto>(`admin/${id}`);
  }

  create(adminCreateDto: AdminDto) {
    return super.post<AdminDto>('admin', adminCreateDto);
  }

  update(adminNo, adminUpdateDto: AdminDto) {
    return super.patch<AdminDto>(`admin/update/${adminNo}`, adminUpdateDto);
  }
}

export default new AdminService();
