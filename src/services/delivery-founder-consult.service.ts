import { BaseService } from '@/core';
import {
  DeliveryFounderConsultListDto,
  DeliveryFounderConsultDto,
  DeliveryFounderConsultUpdateDto,
  DeliveryFounderConsultRecordDto,
  EditedMessageDto,
} from '@/dto';
import { Pagination } from '@/common';

class DeliveryFounderConsultService extends BaseService {
  /**
   * find list for founder consult admin
   * @param filter
   * @param pagination
   */
  findAll(filter: DeliveryFounderConsultListDto, pagination?: Pagination) {
    return super.paginate<DeliveryFounderConsultDto>(
      'admin/delivery-founder-consult',
      filter,
      pagination,
    );
  }

  /**
   * find one for founer consult admin
   * @param deliveryFounderConsultNo
   */
  findOne(deliveryFounderConsultNo) {
    return super.get<DeliveryFounderConsultDto>(
      `admin/delivery-founder-consult/${deliveryFounderConsultNo}`,
    );
  }

  /**
   *
   * @param deliveryFounderConsult
   */
  create(deliveryFounderConsult: DeliveryFounderConsultDto) {
    return super.post<DeliveryFounderConsultDto>(
      'admin/delivery-founder-consult',
      deliveryFounderConsult,
    );
  }

  /**
   *
   * @param deliveryfounderConsultNo
   * @param deliveryFounderConsultUpdateDto
   */
  update(
    deliveryfounderConsultNo,
    deliveryFounderConsultUpdateDto: DeliveryFounderConsultUpdateDto,
  ) {
    return super.patch<DeliveryFounderConsultDto>(
      `admin/delivery-founder-consult/${deliveryfounderConsultNo}`,
      deliveryFounderConsultUpdateDto,
    );
  }

  /**
   * reverse read status
   * @param founderConsultNo
   */
  reverseReadStatus(deliveryFounderConsultNo: string) {
    return super.patch<DeliveryFounderConsultDto>(
      `admin/delivery-founder-consult/${deliveryFounderConsultNo}/reverse-read-status`,
    );
  }

  /**
   * assign own's self
   * @param deliveryFounderConsultNo
   */
  assignAdmin(deliveryFounderConsultNo) {
    return super.patch<any>(
      `admin/delivery-founder-consult/${deliveryFounderConsultNo}/assign`,
    );
  }

  /**
   *
   * @param pagination
   */
  findMyConsults(pagination: Pagination) {
    return super.paginate<DeliveryFounderConsultDto>(
      `admin/my-delivery-founder-consults`,
      null,
      pagination,
    );
  }

  changeDeliverySpace(deliveryFounderCOnsultNo, newDeliverySpaceNo) {
    return super.patch<DeliveryFounderConsultDto>(
      `admin/delivery-founder-consult/${deliveryFounderCOnsultNo}/new-delivery-space/${newDeliverySpaceNo}`,
    );
  }

  findSpaceChangeRecords(deliveryFounderConsultNo) {
    return super.get<DeliveryFounderConsultRecordDto[]>(
      `admin/delivery-founder-consult-record/delivery-founder-consult/${deliveryFounderConsultNo}`,
    );
  }

  /**
   * 상권분석 관련 문자 발송
   * @param deliveryFounerConsultNo
   */
  sendMessageAndPlaceInIndex(deliveryFounerConsultNo) {
    return super.get<any>(
      `admin/message-delivery-space/${deliveryFounerConsultNo}`,
    );
  }

  sendVicinityMessage(nanudaUserNo, body: EditedMessageDto) {
    return super.post<any>(`admin/send-message/${nanudaUserNo}`, body);
  }
}

export default new DeliveryFounderConsultService();
