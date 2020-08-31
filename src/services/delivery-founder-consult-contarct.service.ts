import { BaseService } from '@/core';
import {
  DeliveryFounderConsultContractDto,
  DeliveryFounderConsultContractListDto,
} from '@/dto';
import { Pagination } from '@/common';

class DeliveryFounderConsultContractService extends BaseService {
  findForContract() {
    return super.get<DeliveryFounderConsultContractDto[]>(
      'admin/delivery-founder-consult-contract',
    );
  }

  /**
   *
   * @param filter
   * @param pagination
   */
  findAll(
    filter: DeliveryFounderConsultContractListDto,
    paginate?: Pagination,
  ) {
    return super.paginate<DeliveryFounderConsultContractDto>(
      'admin/delivery-founder-consult-contract',
      filter,
      paginate,
    );
  }

  /**
   *
   * @param contractNo
   */
  findOne(contractNo) {
    return super.get<DeliveryFounderConsultContractDto>(
      `admin/delivery-founder-consult-contract/${contractNo}`,
    );
  }

  /**
   *
   * @param contarctNo
   */
  deleteContract(contarctNo) {
    return super.delete<DeliveryFounderConsultContractDto>(
      `admin/delivery-founder-consult-contract/${contarctNo}`,
    );
  }
}

export default new DeliveryFounderConsultContractService();
