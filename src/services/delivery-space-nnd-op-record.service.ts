import { BaseService } from '@/core';
import { DeliverySpaceNndOpRecordDto } from '@/dto';

class DeliverySpaceNndOpRecordService extends BaseService {
  /**
   *
   * @param id
   */
  findAll(id) {
    return super.get<DeliverySpaceNndOpRecordDto>(
      `/admin/delivery-space-nnd-op-record/${id}/brands`,
    );
  }
}
