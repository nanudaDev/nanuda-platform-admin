import { Pagination } from '@/common';
import { BaseService } from '@/core';
import {
  ConsultResponseV2Dto,
  ConsultResponseV2ListDto,
  ConsultResponseV2UpdateDto,
} from '@/dto';
import { ApiUrlType } from '../../../environments';

class ConsultResponseV2Service extends BaseService {
  constructor() {
    super();
  }

  /**
   *
   * @param filter
   * @param pagination
   * @returns
   */
  findAll(filter: ConsultResponseV2ListDto, pagination?: Pagination) {
    return super.paginate<ConsultResponseV2Dto>(
      'v2/admin/consult-response',
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
  findOne(id: string) {
    return super.get<ConsultResponseV2Dto>(
      `v2/admin/consult-response/${id}`,
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
  update(id: string, consultResponseUpdateDto: ConsultResponseV2UpdateDto) {
    return super.patch<ConsultResponseV2UpdateDto>(
      `v2/admin/consult-response/${id}`,
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
      `v2/admin/consult-response/${consultResponseId}/assign-myself`,
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

export default new ConsultResponseV2Service();
