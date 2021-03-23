import { Pagination } from '@/common';
import { BaseService } from '@/core';
import {
  CompanyDistrictPromotionDto,
  CompanyDistrictPromotionListDto,
} from '@/dto';

export class CompanyDistrictPromotionService extends BaseService {
  constructor() {
    super();
  }

  findAll(filter: CompanyDistrictPromotionListDto, pagination: Pagination) {
    return super.paginate<CompanyDistrictPromotionDto>(
      'admin/delivery-promotion',
      filter,
      pagination,
    );
  }

  findOne(id) {
    return super.get<CompanyDistrictPromotionDto>(
      `admin/delivery-promotion/${id}`,
    );
  }

  create(body: CompanyDistrictPromotionDto) {
    return super.post<CompanyDistrictPromotionDto>(
      `admin/delivery-promotion`,
      body,
    );
  }

  update(id, body: CompanyDistrictPromotionDto) {
    return super.patch<CompanyDistrictPromotionDto>(
      `admin/delivery-promotion/${id}`,
      body,
    );
  }

  deleteOne(id) {
    return super.delete<CompanyDistrictPromotionDto>(
      `admin/delivery-promotion/${id}`,
    );
  }
}

export default new CompanyDistrictPromotionService();
