import { Pagination } from '@/common';
import { BaseService } from '@/core';
import {
  DeliveryFounderConsultReplyDto,
  DeliveryFounderConsultReplyListDto,
} from '@/dto';

export class DeliveryFounderConsultReplyService extends BaseService {
  findAll(
    id,
    filter: DeliveryFounderConsultReplyListDto,
    paginate: Pagination,
  ) {
    return super.paginate<DeliveryFounderConsultReplyDto>(
      `admin/delivery-founder-consult/${id}/delivery-founder-consult-reply`,
      filter,
      paginate,
    );
  }

  findOne(id) {
    return super.get<DeliveryFounderConsultReplyDto>(
      `admin/delivery-founder-consult/${id}/delivery-founder-consult-reply`,
    );
  }

  create(id, body: DeliveryFounderConsultReplyDto) {
    return super.post<DeliveryFounderConsultReplyDto>(
      `admin/delivery-founder-consult/${id}/delivery-founder-consult-reply`,
      body,
    );
  }
}

export default new DeliveryFounderConsultReplyService();
