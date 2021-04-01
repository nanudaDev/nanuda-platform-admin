import { BaseService } from '@/core';
import { ReservationCheckDto, ReservationDto } from '@/dto';
import { ApiUrlType } from '../../../environments';

export class ReservationService extends BaseService {
  constructor() {
    super();
  }

  /**
   *
   * @param id
   * @returns
   */
  deleteOne(id, reservationCheckDto: ReservationCheckDto) {
    return super.delete<ReservationDto>(
      `reservation/${id}`,
      reservationCheckDto,
      ApiUrlType.PICKCOOK,
    );
  }
}

export default new ReservationService();
