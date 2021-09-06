import { Pagination } from '@/common';
import { BaseService } from '@/core';
import { PopupDto } from '@/dto/platform';

export class PopupService extends BaseService {
  constructor() {
    super();
  }

  /**
   *
   * @param filter
   * @param pagination
   * @returns
   */
  findAll(adminPopupListDto: PopupDto, pagination: Pagination) {
    return super.paginate<PopupDto>(
      'admin/popup',
      adminPopupListDto,
      pagination,
    );
  }

  /**
   *
   * @param id
   * @returns
   */
  findOne(id) {
    return super.get<PopupDto>(`admin/popup/${id}`);
  }

  /**
   * create for admin
   * @param adminPopupCreateDto
   */
  create(adminPopupCreateDto: PopupDto) {
    return super.post<PopupDto>('admin/popup', adminPopupCreateDto);
  }

  /**
   *
   * @param id
   * @param adminPopupUpdateDto
   * @returns
   */
  update(id, adminPopupUpdateDto: PopupDto) {
    return super.patch<PopupDto>(`admin/popup/${id}`, adminPopupUpdateDto);
  }

  /**
   *
   * @param id
   * @returns
   */
  deleteOne(id) {
    return super.delete<PopupDto>(`admin/popup/${id}`);
  }
}

export default new PopupService();
