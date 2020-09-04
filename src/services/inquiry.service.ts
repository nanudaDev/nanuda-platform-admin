import { BaseService } from '@/core';
import {
  InquiryListDto,
  InquiryDto,
  InquiryReplyListDto,
  InquiryUpdateClosedDto,
} from '@/dto';
import { Pagination } from '@/common';

class InquiryService extends BaseService {
  /**
   *
   * @param filter
   * @param pagination
   */
  findAll(filter: InquiryListDto, pagination?: Pagination) {
    return super.paginate<InquiryDto>('admin/inquiry', filter, pagination);
  }

  /**
   *
   * @param inquiryNo
   */
  findOne(inquiryNo) {
    return super.get<InquiryDto>(`admin/inquiry/${inquiryNo}`);
  }

  /**
   *
   * @param inquiryNo
   */
  update(inquiryNo) {
    return super.patch<InquiryDto>(`admin/inquiry/${inquiryNo}`);
  }

  /**
   *
   * @param inquiryNo
   */
  updateClosed(inquiryNo, inquiryUpdateClosedDto: InquiryUpdateClosedDto) {
    return super.patch<InquiryUpdateClosedDto>(
      `admin/inquiry/${inquiryNo}/close`,
      inquiryUpdateClosedDto,
    );
  }

  /**
   *
   * @param inquiryNo
   * @param pagination
   */
  findForReply(
    inquiryNo: string,
    filter: InquiryListDto,
    pagination?: Pagination,
  ) {
    return super.paginate<InquiryDto>(
      `admin/inquiry/${inquiryNo}/reply`,
      filter,
      pagination,
    );
  }

  /**
   *
   * @param inquiryNo
   * @param inquiryReply
   */
  createReply(inquiryNo: string, inquiryReply: InquiryDto) {
    return super.post<InquiryDto>(
      `admin/inquiry/${inquiryNo}/reply`,
      inquiryReply,
    );
  }

  /**
   *
   * @param inquiryNo
   * @param replyId
   * @param inquiryReply
   */
  updateReply(inquiryNo, replyId: string, inquiryReply: InquiryReplyListDto) {
    return super.patch<InquiryReplyListDto>(
      `admin/inquiry/${inquiryNo}/reply/${replyId}`,
      inquiryReply,
    );
  }
}

export default new InquiryService();
