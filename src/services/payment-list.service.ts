import { BaseService } from '@/core';
import { PaymentListSearchDto } from '@/dto/payment-list/payment-list-search.dto';
import { Pagination } from '@/common';
import { PaymentListDto } from '@/dto';

class PaymentListService extends BaseService {
  constructor() {
    super();
  }

  /**
   * find all
   * @param paymentListSearchDto
   * @param pagination
   */
  findAll(paymentListSearchDto: PaymentListSearchDto, pagination: Pagination) {
    return super.paginate<PaymentListDto>(
      'admin/payment-list',
      paymentListSearchDto,
      pagination,
    );
  }

  /**
   * find one
   * @param paymentListNo
   */
  findOne(paymentListNo: string) {
    return super.get<PaymentListDto>(`admin/payment-list/${paymentListNo}`);
  }
}

export default new PaymentListService();
