import { BaseService } from '@/core';
import {
  ReservationUpdateDto,
  ReservationDto,
  ReservationCreateDto,
  ReservationDeleteReasonDto,
  ReservationCheckTimeDto,
} from '@/dto';
import { ApiUrlType } from '../../../environments';

export class ReservationService extends BaseService {
  constructor() {
    super();
  }

  /**
   *
   * @param id
   * @param reservationCreateDto
   * @returns
   */
  create(reservationCreateDto: ReservationCreateDto) {
    return super.post<ReservationCreateDto>(
      `admin/reservation`,
      reservationCreateDto,
      ApiUrlType.PICKCOOK,
    );
  }

  /**
   *
   * @param id
   * @param reservationUpdateDto
   * @returns
   */
  update(id, reservationUpdateDto: ReservationUpdateDto) {
    return super.patch<ReservationUpdateDto>(
      `admin/reservation/${id}`,
      reservationUpdateDto,
      ApiUrlType.PICKCOOK,
    );
  }

  /**
   *
   * @param id
   * @returns
   */
  deleteOne(id, reservationDeleteReasonDto: ReservationDeleteReasonDto) {
    return super.delete<ReservationDeleteReasonDto>(
      `admin/reservation/${id}`,
      reservationDeleteReasonDto,
      ApiUrlType.PICKCOOK,
    );
  }

  /**
   *
   * @param reservationCheckTimeDto
   * @returns
   */
  getAvailableTimes(reservationCheckTimeDto: ReservationCheckTimeDto) {
    return super.get<ReservationCheckTimeDto[]>(
      'reservation/check-available-times',
      reservationCheckTimeDto,
      ApiUrlType.PICKCOOK,
    );
  }
}

export default new ReservationService();
