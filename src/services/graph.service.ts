import { BaseService } from '@/core';
import { GraphSelectionDto } from '@/dto';

class GraphService extends BaseService {
  constructor() {
    super();
  }
  getCities() {
    return super.get<any>('admin/dashboard/get-cities');
  }

  getDistrictsGraph(filter: GraphSelectionDto) {
    console.log(filter.spaceCity);
    return super.get<any>('admin/dashboard/founder-consult/by-cities', filter);
  }
}

export default new GraphService();
