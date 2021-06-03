import { Pagination } from '@/common';
import { BaseService } from '@/core';
import {
  ConsultResponseDto,
  ConsultResponseListDto,
  ConsultResponseUpdateDto,
} from '@/dto';
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
  findOne(id: number | string) {
    return super.get<ConsultResponseDto>(
      `admin/consult-response/${id}`,
      null,
      ApiUrlType.PICKCOOK,
    );
  }

  /**
   *
   * @param consultNo
   * @param consultResponseUpdateDto
   * @returns
   */
  update(
    id: number | string,
    consultResponseUpdateDto: ConsultResponseUpdateDto,
  ) {
    return super.patch<ConsultResponseUpdateDto>(
      `admin/consult-response/${id}`,
      consultResponseUpdateDto,
      ApiUrlType.PICKCOOK,
    );
  }

  /**
   * assign own's self
   * @param consultResponseId
   */
  assignAdmin(consultResponseId) {
    return super.patch<any>(
      `admin/consult-response/${consultResponseId}/assign-myself`,
      null,
      ApiUrlType.PICKCOOK,
    );
  }

  /**
   *
   * @param hdongCode
   * @returns
   */
  getLocationInfoDetail(hdongCode: string) {
    return super.get(
      `location-analysis/location-info-detail`,
      {
        hdongCode: hdongCode,
      },
      ApiUrlType.PICKCOOK,
    );
  }
}

export default new ConsultResponseService();
