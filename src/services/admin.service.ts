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

  updateSelf(id, body: AdminDto) {
    return super.patch<AdminDto>(`admin/self-update/${id}`, body);
  }

  create(body: AdminDto) {
    return super.post<AdminDto>('admin', body);
  }

  update(id, body: AdminDto) {
    return super.patch<AdminDto>(`admin/update/${id}`, body);
  }

  hardDelete(id) {
    return super.delete<any>(`admin/hard-delete/${id}`);
  }
}

export default new AdminService();
