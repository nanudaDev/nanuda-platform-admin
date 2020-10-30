import { BaseService } from '@/core';
import {
  ProductConsultListDto,
  ProductConsultDto,
  ProductConsultUpdateDto,
  ProductConsultStatusUpdateDto,
} from '@/dto/product-consult';
import { Pagination } from '@/common';

class ProductConsultService extends BaseService {
  constructor() {
    super();
  }

  /**
   * find all for admin
   * @param filter
   * @param pagination
   */
  findAll(filter: ProductConsultListDto, pagination: Pagination) {
    return super.paginate<ProductConsultDto>(
      'admin/product-consult',
      filter,
      pagination,
    );
  }

  /**
   * find one for admin
   * @param id
   */
  findOne(id) {
    return super.get<ProductConsultDto>(`admin/product-consult/${id}`);
  }

  /**
   * update consult
   * @param id
   * @param productConsultUpdateDto
   */
  update(id, productConsultUpdateDto: ProductConsultUpdateDto) {
    return super.patch<ProductConsultDto>(
      `admin/product-consult/${id}`,
      productConsultUpdateDto,
    );
  }

  /**
   * bulk update statuses
   * @param productConsulstUpdateStatusDto
   */
  updateStatus(productConsulstUpdateStatusDto: ProductConsultStatusUpdateDto) {
    return super.patch<any>(
      'admin/product-consult/update-statuses',
      productConsulstUpdateStatusDto,
    );
  }

  /**
   * assign own's self
   * @param productConsultNo
   */
  assignAdmin(productConsultNo) {
    return super.patch<any>(`admin/product-consult/${productConsultNo}/assign`);
  }
}

export default new ProductConsultService();
