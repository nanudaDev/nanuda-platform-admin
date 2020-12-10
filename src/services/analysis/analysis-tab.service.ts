import { BaseService } from '@/core';

export class AnalysisTabService extends BaseService {
  findSummary(params) {
    return super.get<any>('analysis-tab/get-summary', params, true);
  }
  findCategoryRatio(parmas) {
    return super.get<any>('analysis-tab/category-ratio', parmas, true);
  }

  findRevenueAnalysisGender(parmas) {
    return super.get<any>('analysis-tab/revenue-analysis-gender', parmas, true);
  }

  findRevenueAnalysisAgeGroup(parmas) {
    return super.get<any>(
      'analysis-tab/revenue-analysis-age-group',
      parmas,
      true,
    );
  }
}

export default new AnalysisTabService();
