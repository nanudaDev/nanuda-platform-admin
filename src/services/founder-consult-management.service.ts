import { BaseService } from '@/core';
import {
  FounderConsultManagementDto,
  FounderConsultManagementListDto,
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
    filter: FounderConsultManagementListDto,
    pagination?: Pagination,
  ) {
    return super.paginate<FounderConsultManagementDto>(
      `admin/founder-consult/${foundConslutNo}/founder-consult-management/history`,
      filter,
      pagination,
    );
  }
  /**
   *
   * @param founderConsultNo
   */
  findForManagement(founderConsultNo: string) {
    return super.get<FounderConsultManagementDto[]>(
      `admin/founder-consult/${founderConsultNo}/founder-consult-management`,
    );
  }
}

export default new FounderConsultManagementService();
