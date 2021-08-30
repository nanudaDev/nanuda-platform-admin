import { BaseService } from '@/core';
import {
  BrandDto,
  BrandListDto,
  BrandUpdateDto,
  DeliverySpaceDto,
} from '@/dto';
import { Pagination } from '@/common';

class BrandService extends BaseService {
  constructor() {
    super();
  }

  findAll(filter: BrandListDto, pagination?: Pagination) {
    return super.paginate<BrandDto>('admin/brand', filter, pagination);
  }

  findOne(brandNo) {
    return super.get<BrandDto>(`admin/brand/${brandNo}`);
  }

  create(brandDto: BrandDto) {
    return super.post<BrandDto>('admin/brand', brandDto);
  }

  update(brandNo, brandUpdateDto: BrandUpdateDto) {
    return super.patch<BrandDto>(`admin/brand/${brandNo}`, brandUpdateDto);
  }

  findForSelect() {
    return super.get<BrandDto[]>('admin/brand/select-option');
  }

  deleteOne(brandNo) {
    return super.delete<BrandDto>(`admin/brand/${brandNo}`);
  }

  deleteBrandEveryDistrict(brandNo) {
    return super.delete<BrandDto>(`admin/brand/every-district/${brandNo}`);
  }

  addBrandEveryDistrict(brandNo) {
    return super.post<BrandDto>(`admin/brand/every-district/${brandNo}`);
  }

  findNanudaBrand() {
    return super.get<BrandDto[]>('admin/brand/recommended');
  }
  findRelatedSpaceTypes(brandNo, pagination?: Pagination) {
    return super.paginate<DeliverySpaceDto>(
      `admin/brand/${brandNo}/types`,
      null,
      pagination,
    );
  }
}

export default new BrandService();
