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
   * @param spaceNo
   */
  findOnePrevious(spaceNo) {
    return super.get<DeliverySpaceDto>(
      `admin/delivery-space/${spaceNo}/previous`,
    );
  }

  /**
   *
   * @param spaceNo
   */
  findOneNext(spaceNo) {
    return super.get<DeliverySpaceDto>(`admin/delivery-space/${spaceNo}/next`);
  }

  /**
   *
   * @param spaceNo
   */
  findModalPrevious(spaceNo) {
    return super.get<DeliverySpaceDto>(
      `admin/company-district/delivery-space/${spaceNo}/previous`,
    );
  }

  /**
   *
   * @param spaceNo
   */
  findModalNext(spaceNo) {
    return super.get<DeliverySpaceDto>(
      `admin/company-district/delivery-space/${spaceNo}/next`,
    );
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
      'admin/delivery-space/find-for-select',
      deliverySpaceDto,
    );
  }

  /**
   * hard delete
   * @param id
   */
  hardDelete(id) {
    return super.delete<any>(`admin/delivery-space/${id}/hard-delete`);
  }
}

export default new DeliverySpaceService();
