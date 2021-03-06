import { BaseService } from '@/core';
import { BrandDto, BrandListDto, BrandUpdateDto } from '@/dto';
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

  findNanudaBrand() {
    return super.get<BrandDto[]>('admin/brand/recommended');
  }
}

export default new BrandService();
