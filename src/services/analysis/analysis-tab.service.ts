import { BaseService } from '@/core';
import { AnalysisTabListDto } from '@/dto';

export class AnalysisTabService extends BaseService {
  findSummary(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>('analysis-tab/get-summary', analysisTabListdto, true);
  }
  findCategoryRatio(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/category-ratio',
      analysisTabListdto,
      true,
    );
  }

  findRevenueAnalysisGender(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/revenue-analysis-gender',
      analysisTabListdto,
      true,
    );
  }

  findRevenueAnalysisAgeGroup(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/revenue-analysis-age-group',
      analysisTabListdto,
      true,
    );
  }
  findRevenueAnalysisByDay(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/revenue-analysis-by-day',
      analysisTabListdto,
      true,
    );
  }

  findFoodCategorySummary(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/food-category-summary',
      analysisTabListdto,
      true,
    );
  }

  findSurvivalYears(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/survival-years',
      analysisTabListdto,
      true,
    );
  }

  findPopulationResidentCount(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/population/resident-count',
      analysisTabListdto,
      true,
    );
  }
  findPopulationGenderRatio(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/population/gender-ratio',
      analysisTabListdto,
      true,
    );
  }
  findAgeGroupRatio(analysisTabListdto) {
    return super.get<any>(
      'analysis-tab/population/age-group-ratio',
      analysisTabListdto,
      true,
    );
  }
  findPopulationResidentialRatio(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/population/residential-ratio',
      analysisTabListdto,
      true,
    );
  }

  findPopulationEmployeeCount(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/population/employee-count',
      analysisTabListdto,
      true,
    );
  }

  findMovingPopulationCount(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/population/moving-population-count',
      analysisTabListdto,
      true,
    );
  }

  findBestCatByLunch(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/revenue-analysis-by-lunch',
      analysisTabListdto,
      true,
    );
  }

  findBestCatByDinner(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/revenue-analysis-by-dinner',
      analysisTabListdto,
      true,
    );
  }

  findBestCatByLateNight(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/revenue-analysis-by-late-night',
      analysisTabListdto,
      true,
    );
  }

  findMovingPopulationGenderAndAgeRatio(
    analysisTabListdto: AnalysisTabListDto,
  ) {
    return super.get<any>(
      'analysis-tab/population/moving-population-gender-and-age-ratio',
      analysisTabListdto,
      true,
    );
  }
}

export default new AnalysisTabService();
