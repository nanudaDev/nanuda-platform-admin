import { BaseService } from '@/core';
import {
  DeliveryFounderConsultManagementDto,
  DeliveryFounderConsultManagementListDto,
} from '../dto';
import { Pagination } from '@/common';

class FounderConsultManagementService extends BaseService {
  /**
   *
   * @param foundConslutNo
   * @param filter
   * @param pagination
   */
  findAll(
    foundConslutNo,
    filter: DeliveryFounderConsultManagementListDto,
    pagination?: Pagination,
  ) {
    return super.paginate<DeliveryFounderConsultManagementDto>(
      `admin/delivery-founder-consult/${foundConslutNo}/founder-consult-management/history`,
      filter,
      pagination,
    );
  }
  /**
   *
   * @param founderConsultNo
   */
  findForManagement(founderConsultNo: string) {
    return super.get<DeliveryFounderConsultManagementDto[]>(
      `admin/delivery-founder-consult/${founderConsultNo}/founder-consult-management`,
    );
  }
}

export default new FounderConsultManagementService();
