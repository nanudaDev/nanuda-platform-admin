import { Pagination } from '@/common';
import { BaseService } from '@/core';
import { ConsultResponseDto, ConsultResponseListDto } from '@/dto';
import { ApiUrlType } from '../../../environments';

class ConsultResponseService extends BaseService {
  constructor() {
    super();
  }

  /**
   *
   * @param filter
   * @param pagination
   * @returns
   */
  findAll(filter: ConsultResponseListDto, pagination?: Pagination) {
    return super.paginate<ConsultResponseDto>(
      'admin/consult-response',
      filter,
      pagination,
      ApiUrlType.PICKCOOK,
    );
  }

  /**
   *
   * @param consultNo
   * @returns
   */
  findOne(consultNo: string) {
    return super.get<ConsultResponseDto>(
      `admin/consult-response/${consultNo}`,
      ApiUrlType.PICKCOOK,
    );
  }
}

export default new ConsultResponseService();
