import { BaseService } from '@/core';
import { BrandListDto } from '@/dto/brand/brand-list.dto';
import { Pagination } from '@/common';
import { BrandDto, BrandUpdateDto } from '@/dto';

class BrandService extends BaseService {
  constructor() {
    super();
  }

  findAll(filter: BrandListDto, pagination: Pagination) {
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

  deleteBrand(brandNo) {
    return super.delete<BrandDto>(`admin/brand/${brandNo}`);
  }
}

export default new BrandService();
