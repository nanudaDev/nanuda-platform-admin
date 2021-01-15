import { BaseService } from '@/core';
import { BrandDto, DeliverySpaceNndOpRecordDto } from '@/dto';

class DeliverySpaceNndOpRecordService extends BaseService {
  /**
   *
   * @param id
   */
  findforBrand(id) {
    return super.get<DeliverySpaceNndOpRecordDto[]>(
      `admin/delivery-space-nnd-op-record/${id}/brands`,
    );
  }

  /**
   *
   * @param id
   * @param brandId
   */
  update(id, brandId) {
    return super.patch<DeliverySpaceNndOpRecordDto>(
      `admin/delivery-space-nnd-op-record/${id}/brands/${brandId}`,
    );
  }
}

export default new DeliverySpaceNndOpRecordService();
