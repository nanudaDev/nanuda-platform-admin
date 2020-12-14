import { BaseService } from '@/core';
import { AnalysisTabListDto } from '@/dto';

export class AnalysisTabService extends BaseService {
  findSummary(params: AnalysisTabListDto) {
    return super.get<any>('analysis-tab/get-summary', params, true);
  }
  findCategoryRatio(params: AnalysisTabListDto) {
    return super.get<any>('analysis-tab/category-ratio', params, true);
  }

  findRevenueAnalysisGender(params: AnalysisTabListDto) {
    return super.get<any>('analysis-tab/revenue-analysis-gender', params, true);
  }

  findRevenueAnalysisAgeGroup(params: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/revenue-analysis-age-group',
      params,
      true,
    );
  }
  findRevenueAnalysisByDay(params: AnalysisTabListDto) {
    return super.get<any>('analysis-tab/revenue-analysis-by-day', params, true);
  }

  findFoodCategorySummary(params: AnalysisTabListDto) {
    return super.get<any>('analysis-tab/food-category-summary', params, true);
  }

  findSurvivalYears(params: AnalysisTabListDto) {
    return super.get<any>('analysis-tab/survival-years', params, true);
  }

  findPopulationResidentCount(params: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/population/resident-count',
      params,
      true,
    );
  }
  findPopulationGenderRatio(params: AnalysisTabListDto) {
    return super.get<any>('analysis-tab/population/gender-ratio', params, true);
  }
  findAgeGroupRatio(params) {
    return super.get<any>(
      'analysis-tab/population/age-group-ratio',
      params,
      true,
    );
  }
  findPopulationRegidentialRatio(params: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/population/residential-ratio',
      params,
      true,
    );
  }

  findPopulationEmployeeCount(params: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/population/employee-count',
      params,
      true,
    );
  }

  findMovingPopulationCount(params: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/population/moving-population-count',
      params,
      true,
    );
  }

  findBestCatByLunch(params: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/revenue-analysis-by-lunch',
      params,
      true,
    );
  }

  findBestCatByDinner(params: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/revenue-analysis-by-dinner',
      params,
      true,
    );
  }

  findBestCatByLateNight(params: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/revenue-analysis-by-late-night',
      params,
      true,
    );
  }
}

export default new AnalysisTabService();
