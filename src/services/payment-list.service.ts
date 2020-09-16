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
   * find revenue
   * @param paymentListSearchDto
   */
  findRevenue(paymentListSearchDto: PaymentListSearchDto) {
    return super.get<any>(
      'admin/payment-list/total-revenue',
      paymentListSearchDto,
    );
  }

  /**
   * find one
   * @param paymentListNo
   */
  findOne(paymentListNo: string) {
    return super.get<PaymentListDto>(`admin/payment-list/${paymentListNo}`);
  }

  /**
   * find revenue
   * @param nanudaNo
   */
  findRevenueForBrand(nanudaNo) {
    return super.get<any>(`admin/payment-list/brand/${nanudaNo}`);
  }
}

export default new PaymentListService();
