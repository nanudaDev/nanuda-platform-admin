import { BaseService } from '@/core';
import {
  DeliverySpaceDto,
  DeliverySpaceListDto,
  DeliverySpaceOptionDto,
  DeliverySpaceUpdateDto,
} from '@/dto';
import { Pagination } from '@/common';

class DeliverySpaceService extends BaseService {
  /**
   *
   * @param filter
   * @param pagination
   */
  findAll(filter: DeliverySpaceListDto, pagination?: Pagination) {
    return super.paginate<DeliverySpaceDto>(
      'admin/delivery-space',
      filter,
      pagination,
    );
  }
  /**
   *
   * @param spaceNo
   */
  findOne(spaceNo) {
    return super.get<DeliverySpaceDto>(`admin/delivery-space/${spaceNo}`);
  }

  /**
   *
   * @param deliverySpaceDto
   */
  create(deliverySpaceDto: DeliverySpaceDto) {
    return super.post<DeliverySpaceDto>(
      'admin/delivery-space',
      deliverySpaceDto,
    );
  }

  /**
   *
   * @param deliverySpaceNo
   * @param deliverySpaceUpdateDto
   */
  update(deliverySpaceNo, deliverySpaceUpdateDto: DeliverySpaceUpdateDto) {
    return super.patch<DeliverySpaceDto>(
      `admin/delivery-space/${deliverySpaceNo}`,
      deliverySpaceUpdateDto,
    );
  }

  findSpaceOption() {
    return super.get<DeliverySpaceOptionDto[]>('admin/delivery-space-option');
  }

  /**
   *
   * @param deliverySpaceDto
   */
  findForSelect(deliverySpaceDto: DeliverySpaceDto) {
    return super.get<DeliverySpaceDto[]>(
      'admin/delivery-space',
      deliverySpaceDto,
    );
  }
}

export default new DeliverySpaceService();
