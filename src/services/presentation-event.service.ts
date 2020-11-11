import { Pagination } from '@/common';
import { BaseService } from '@/core';
import { PresentationEventDto, PresentationEventListDto } from '@/dto';

class PresentationEventService extends BaseService {
  constructor() {
    super();
  }

  findAll(filter: PresentationEventListDto, pagination: Pagination) {
    return super.paginate<PresentationEventDto>(
      'admin/presentation-event',
      filter,
      pagination,
    );
  }

  findOne(id) {
    return super.get<PresentationEventDto>(`admin/presentation-event/${id}`);
  }

  update(id, body: PresentationEventDto) {
    return super.patch<PresentationEventDto>(
      `admin/presentation-event/${id}`,
      body,
    );
  }

  create(presentationEventCreateDto: PresentationEventDto) {
    return super.post<PresentationEventDto>(
      'admin/presentation-event',
      presentationEventCreateDto,
    );
  }

  deleteForAdmin(id) {
    return super.delete<any>(`admin/presentation-event/${id}`);
  }
}
export default new PresentationEventService();
