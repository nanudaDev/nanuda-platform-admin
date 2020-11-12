import { Pagination } from '@/common';
import { BaseService } from '@/core';
import { AttendeesDto, AttendeesListDto } from '@/dto';

class AttendeesService extends BaseService {
  constructor() {
    super();
  }

  findAll(filter: AttendeesListDto, paginate?: Pagination) {
    return super.paginate<AttendeesDto>('admin/attendees', filter, paginate);
  }

  findOne(id) {
    return super.get<AttendeesDto>(`admin/attendees/${id}`);
  }

  update(id, body: AttendeesDto) {
    return super.patch<AttendeesDto>(`admin/attendees/${id}`, body);
  }

  create(body: AttendeesDto) {
    return super.post<AttendeesDto>('admin/attendees', body);
  }
}
export default new AttendeesService();
