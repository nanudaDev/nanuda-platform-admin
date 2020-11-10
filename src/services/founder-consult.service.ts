import { BaseService } from '@/core';
import {
  FounderConsultDto,
  FounderConsultListDto,
  FounderConsultUpdateDto,
} from '@/dto/founder-consult';
import { Pagination } from '@/common';

class FounderConsultService extends BaseService {
  /**
   * find list for founder consult admin
   * @param filter
   * @param pagination
   */
  findAll(filter: FounderConsultListDto, pagination?: Pagination) {
    return super.paginate<FounderConsultDto>(
      'admin/founder-consult',
      filter,
      pagination,
    );
  }

  /**
   * find one for founer consult admin
   * @param founderConsultNo
   */
  findOne(founderConsultNo) {
    return super.get<FounderConsultDto>(
      `admin/founder-consult/${founderConsultNo}`,
    );
  }

  /**
   * update founder consult
   * @param founderConsultNo
   * @param founderConsultUpdateDto
   */
  update(founderConsultNo, founderConsultUpdateDto: FounderConsultUpdateDto) {
    return super.patch<FounderConsultDto>(
      `admin/founder-consult/${founderConsultNo}`,
      founderConsultUpdateDto,
    );
  }

  /**
   * find my consults
   * @param pagination
   */
  findMyConsults(pagination: Pagination) {
    return super.paginate<FounderConsultDto>(
      'admin/my-founder-consults',
      null,
      pagination,
    );
  }

  /**
   * reverse read status
   * @param founderConsultNo
   */
  reverseReadStatus(founderConsultNo: string) {
    return super.patch<FounderConsultDto>(
      `admin/founder-consult/${founderConsultNo}/reverse-read-status`,
    );
  }

  /**
   * assign own's self
   * @param founderConsultNo
   */
  assignAdmin(founderConsultNo) {
    return super.patch<any>(`admin/founder-consult/${founderConsultNo}/assign`);
  }
}

export default new FounderConsultService();
