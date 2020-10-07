import { BaseService } from '@/core';
import { BrandKioskMapperDto } from '@/dto';

class BrandKioskMapperService extends BaseService {
  constructor() {
    super();
  }

  /**
   * get revenue with DTO for brand
   * @param filter
   */
  getRevenueForBrand(filter: BrandKioskMapperDto) {
    return super.get<any>('admin/brand-revenue', filter);
  }
}

export default new BrandKioskMapperService();
