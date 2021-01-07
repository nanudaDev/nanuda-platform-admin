import { Pagination } from '@/common';
import { BaseService } from '@/core';
import { DeliveryFounderConsultDto } from '@/dto';
import { DeliveryFounderConsultReplyDto } from '@/dto/delivery-founder-consult-reply';

class DeliveryFounderConsultService extends BaseService {
  constructor() {
    super();
  }

  /**
   * find replies
   * @param deliveryFounderConsultNo
   * @param deliveryFounderConsultReplyDto
   * @param pagination
   */
  findAllForConsult(
    deliveryFounderConsultNo,
    deliveryFounderConsultReplyDto: DeliveryFounderConsultReplyDto,
    pagination: Pagination,
  ) {
    return super.paginate<DeliveryFounderConsultDto>(
      `admin/delivery-founder-consult/${deliveryFounderConsultNo}/delivery-founder-consult-reply`,
      deliveryFounderConsultReplyDto,
      pagination,
    );
  }

  /**
   * create for admin
   * @param deliveryFounderConsultNo
   * @param deliveryFounderConsultReplyDto
   */
  createForAdmin(
    deliveryFounderConsultNo,
    deliveryFounderConsultReplyDto: DeliveryFounderConsultReplyDto,
  ) {
    return super.paginate<DeliveryFounderConsultReplyDto>(
      `admin/delivery-founder-consult/${deliveryFounderConsultNo}/delivery-founder-consult-reply`,
      deliveryFounderConsultReplyDto,
    );
  }

  /**
   * update for admin
   * @param deliveryFounderConsultNo
   * @param deliveryFounderConsultReplyNo
   * @param deliveryFounderConsultReplyDto
   */
  updateForAdmin(
    deliveryFounderConsultNo,
    deliveryFounderConsultReplyNo,
    deliveryFounderConsultReplyDto: DeliveryFounderConsultReplyDto,
  ) {
    return super.patch<DeliveryFounderConsultReplyDto>(
      `admin/delivery-founder-consult/${deliveryFounderConsultNo}/delivery-founder-consult-reply/${deliveryFounderConsultReplyNo}`,
      deliveryFounderConsultReplyDto,
    );
  }
}

export default new DeliveryFounderConsultService();
