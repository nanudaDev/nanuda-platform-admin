import { BaseService } from '@/core';
import { AttendeesDto } from '@/dto';

class AttendeesService extends BaseService {
  constructor() {
    super();
  }

  findOne(attendeesNo) {
    return super.get<AttendeesDto>(`admin/attendees/${attendeesNo}`);
  }

  update(attendeesNo, attendeesUpdateDto: AttendeesDto) {
    return super.patch<AttendeesDto>(
      `admin/attendees/${attendeesNo}`,
      attendeesUpdateDto,
    );
  }
}
export default new AttendeesService();
