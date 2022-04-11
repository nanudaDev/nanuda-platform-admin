import { Pagination } from '@/common';
import { BaseService } from '@/core';
import { PickcookPopupDto } from '@/dto';
import { PopupDto } from '@/dto/platform';
import { ApiUrlType } from '../../../environments';

export class PickcookPopupService extends BaseService {
  constructor() {
    super();
  }

  /**
   *
   * @param filter
   * @param pagination
   * @returns
   */
  findAll(adminPickcookPopupListDto: PickcookPopupDto, pagination: Pagination) {
    return super.paginate<PopupDto>(
      'admin/popup',
      adminPickcookPopupListDto,
      pagination,
      ApiUrlType.PICKCOOK,
    );
  }

  /**
   *
   * @param id
   * @returns
   */
  findOne(id) {
    return super.get<PopupDto>(`admin/popup/${id}`, ApiUrlType.PICKCOOK);
  }

  /**
   * create for admin
   * @param adminPickcookPopupCreateDto
   */
  create(adminPickcookPopupCreateDto: PopupDto) {
    return super.post<PopupDto>(
      'admin/popup',
      adminPickcookPopupCreateDto,
      ApiUrlType.PICKCOOK,
    );
  }

  /**
   *
   * @param id
   * @param adminPickcookPopupUpdateDto
   * @returns
   */
  update(id, adminPickcookPopupUpdateDto: PopupDto) {
    return super.patch<PopupDto>(
      `admin/popup/${id}`,
      adminPickcookPopupUpdateDto,
      ApiUrlType.PICKCOOK,
    );
  }

  /**
   *
   * @param id
   * @returns
   */
  deleteOne(id) {
    return super.delete<PopupDto>(`admin/popup/${id}`, ApiUrlType.PICKCOOK);
  }
}

export default new PickcookPopupService();
