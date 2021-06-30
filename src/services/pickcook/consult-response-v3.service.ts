import { BaseService } from '@/core';
import {
  ConsultResponseV3CreateDto,
  ConsultResponseV3ListDto,
  ConsultResponseV3UpdateDto,
  ConsultResponseV3SendMessageDto,
  SalesRequestDto,
  SalesResponseDto,
  BaeminReportUpdateDto,
} from '@/dto';
import { BaeminReportCreateDto } from '@/dto/pickcook/consult-response-v3/baemin-report-create.dto';
import { ApiUrlType } from '../../../environments';
import { Pagination } from '../../common/interfaces/pagination.type';
import { ConsultResponseV3Dto } from '../../dto/pickcook/consult-response-v3/consult-response-v3.dto';

class ConsultResponseV3Service extends BaseService {
  constructor() {
    super();
  }

  /**
   * find all for admin
   * @param filter
   * @param pagination
   * @returns
   */
  findAll(filter: ConsultResponseV3ListDto, pagination: Pagination) {
    return super.paginate<ConsultResponseV3Dto>(
      'v3/admin/consult-response',
      filter,
      pagination,
      ApiUrlType.PICKCOOK,
    );
  }

  /**
   * find one for admin
   * @param id
   * @returns
   */
  findOne(id: number | string) {
    return super.get<ConsultResponseV3Dto>(
      `v3/admin/consult-response/${id}`,
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

  /**
   * assign own's self
   * @param consultResponseId
   */
  assignAdmin(consultResponseId) {
    return super.patch<any>(
      `v3/admin/consult-response/${consultResponseId}/assign-myself`,
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
  update(id: string, consultResponseUpdateDto: ConsultResponseV3UpdateDto) {
    return super.patch<ConsultResponseV3UpdateDto>(
      `v3/admin/consult-response/${id}`,
      consultResponseUpdateDto,
      ApiUrlType.PICKCOOK,
    );
  }

  /**
   *
   * @param consultResponseV3CreateDto
   * @returns
   */
  create(consultResponseV3CreateDto: ConsultResponseV3CreateDto) {
    return super.post<ConsultResponseV3CreateDto>(
      'v3/admin/consult-response',
      consultResponseV3CreateDto,
      ApiUrlType.PICKCOOK,
    );
  }

  /**
   *
   * @param id
   * @param consultResponseV3SendMessageDto
   * @returns
   */
  sendMessage(
    id: number,
    consultResponseV3SendMessageDto: ConsultResponseV3SendMessageDto,
  ) {
    return super.post<ConsultResponseV3SendMessageDto>(
      `v3/admin/consult-response/${id}/send-message`,
      consultResponseV3SendMessageDto,
      ApiUrlType.PICKCOOK,
    );
  }

  /**
   *
   * @param salesRequestDto
   * @returns
   */
  getSalesData(salesRequestDto: SalesRequestDto) {
    return super.get<SalesResponseDto>(
      'v3/admin/pickcook-sales',
      salesRequestDto,
      ApiUrlType.PICKCOOK,
    );
  }
  postBaeminReport(id: string, baeminReportCreateDto: BaeminReportCreateDto) {
    return super.post<BaeminReportCreateDto>(
      `v3/admin/consult-result/${id}/consult-baemin-report`,
      baeminReportCreateDto,
      ApiUrlType.PICKCOOK,
    );
  }

  getSmallCategoryInfo(code: string) {
    return super.get<any>(
      `v3/admin/pickcook-small-category-info`,
      { sSmallCategoryCode: code },
      ApiUrlType.PICKCOOK,
    );
  }

  updateBaeminReport(id, baeminReportPatchDto: BaeminReportUpdateDto) {
    return super.patch<BaeminReportUpdateDto>(
      `v3/admin/consult-baemin-report/${id}`,
      baeminReportPatchDto,
      ApiUrlType.PICKCOOK,
    );
  }
}
export default new ConsultResponseV3Service();
