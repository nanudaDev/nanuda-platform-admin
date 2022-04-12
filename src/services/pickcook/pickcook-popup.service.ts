import { Pagination } from '@/common';
import { BaseService } from '@/core';
import { PickcookPopupDto } from '@/dto';
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
    return super.paginate<PickcookPopupDto>(
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
    return super.get<PickcookPopupDto>(
      `admin/popup/${id}`,
      null,
      ApiUrlType.PICKCOOK,
    );
  }

  /**
   * create for admin
   * @param adminPickcookPopupCreateDto
   */
  create(adminPickcookPopupCreateDto: PickcookPopupDto) {
    return super.post<PickcookPopupDto>(
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
  update(id, adminPickcookPopupUpdateDto: PickcookPopupDto) {
    return super.patch<PickcookPopupDto>(
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
    return super.delete<PickcookPopupDto>(
      `admin/popup/${id}`,
      null,
      ApiUrlType.PICKCOOK,
    );
  }
}

export default new PickcookPopupService();
