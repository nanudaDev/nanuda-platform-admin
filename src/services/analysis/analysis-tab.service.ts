import { BaseService } from '@/core';

export class AnalysisTabService extends BaseService {
  findSummary(params) {
    return super.get<any>('analysis-tab/get-summary', params, true);
  }
}

export default new AnalysisTabService();
