import { Pagination } from '@/common';
import { BaseService } from '@/core';
import { BannerDto } from '@/dto';

class BannerService extends BaseService {
  /**
   * find all for admin
   * @param filter
   * @param pagination
   */
  findAll(adminBannerListDto: BannerDto, pagination: Pagination) {
    return super.paginate<BannerDto>(
      'admin/banner',
      adminBannerListDto,
      pagination,
    );
  }

  /**
   * find one for admin
   * @param id
   */
  findOne(id) {
    return super.get<BannerDto>(`admin/banner/${id}`);
  }

  /**
   * create for admin
   * @param adminBannerCreateDto
   */
  create(adminBannerCreateDto: BannerDto) {
    return super.post<BannerDto>('admin/banner', adminBannerCreateDto);
  }

  /**
   *  update for banner
   * @param id
   * @param adminBannerUpdateDto
   */
  update(id, adminBannerUpdateDto: BannerDto) {
    return super.patch<BannerDto>(`admin/banner/${id}`, adminBannerUpdateDto);
  }

  /**
   * delete for banner
   * @param id
   */
  deleteOne(id) {
    return super.delete<BannerDto>(`admin/banner/${id}`);
  }
}

export default new BannerService();
