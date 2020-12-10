import { BaseService } from '@/core';

export class AnalysisTabService extends BaseService {
  findSummary(params) {
    return super.get<any>('analysis-tab/get-summary', params, true);
  }
  findCategoryRatio(params) {
    return super.get<any>('analysis-tab/category-ratio', params, true);
  }

  findRevenueAnalysisGender(params) {
    return super.get<any>('analysis-tab/revenue-analysis-gender', params, true);
  }

  findRevenueAnalysisAgeGroup(params) {
    return super.get<any>(
      'analysis-tab/revenue-analysis-age-group',
      params,
      true,
    );
  }
  findRevenueAnalysisByDay(params) {
    return super.get<any>('analysis-tab/revenue-analysis-by-day', params, true);
  }

  findFoodCategorySummary(params) {
    return super.get<any>('analysis-tab/food-category-summary', params, true);
  }

  findSurvivalYears(params) {
    return super.get<any>('analysis-tab/survival-years', params, true);
  }

  findPopulationResidentCount(params) {
    return super.get<any>('analysis-tab/population/resident-count', params, true);
  }
  findPopulationGenderRatio(params) {
    return super.get<any>('analysis-tab/population/gender-ratio', params, true);
  }
  findAgeGroupRatio(params) {
    return super.get<any>('analysis-tab/population/age-group-ratio', params, true);
  }
  findPopulationRegidentialRatio(params) {
    return super.get<any>('analysis-tab/population/residential-ratio', params, true);
  }

  findPopulationEmployeeCount(params) {
    return super.get<any>('analysis-tab/population/employee-count', params, true)
  }

  findMovingPopulationCount(params) {
    return super.get<any>('analysis-tab/population/moving-population-count',params, true);
  }


}

export default new AnalysisTabService();
