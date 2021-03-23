import { BaseService } from '@/core';
import { AnalysisTabListDto } from '@/dto';
import { ApiUrlType } from '../../../environments';

export class AnalysisTabService extends BaseService {
  findSummary(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/get-summary',
      analysisTabListdto,
      ApiUrlType.ANALYSIS,
    );
  }
  findCategoryRatio(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/category-ratio',
      analysisTabListdto,
      ApiUrlType.ANALYSIS,
    );
  }

  findRevenueAnalysisGender(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/revenue-analysis-gender',
      analysisTabListdto,
      ApiUrlType.ANALYSIS,
    );
  }

  findRevenueAnalysisAgeGroup(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/revenue-analysis-age-group',
      analysisTabListdto,
      ApiUrlType.ANALYSIS,
    );
  }
  findRevenueAnalysisByDay(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/revenue-analysis-by-day',
      analysisTabListdto,
      ApiUrlType.ANALYSIS,
    );
  }

  findFoodCategorySummary(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/food-category-summary',
      analysisTabListdto,
      ApiUrlType.ANALYSIS,
    );
  }

  findSurvivalYears(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/survival-years',
      analysisTabListdto,
      ApiUrlType.ANALYSIS,
    );
  }

  findPopulationResidentCount(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/population/resident-count',
      analysisTabListdto,
      ApiUrlType.ANALYSIS,
    );
  }
  findPopulationGenderRatio(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/population/gender-ratio',
      analysisTabListdto,
      ApiUrlType.ANALYSIS,
    );
  }
  findAgeGroupRatio(analysisTabListdto) {
    return super.get<any>(
      'analysis-tab/population/age-group-ratio',
      analysisTabListdto,
      ApiUrlType.ANALYSIS,
    );
  }
  findPopulationResidentialRatio(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/population/residential-ratio',
      analysisTabListdto,
      ApiUrlType.ANALYSIS,
    );
  }

  findPopulationEmployeeCount(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/population/employee-count',
      analysisTabListdto,
      ApiUrlType.ANALYSIS,
    );
  }

  findMovingPopulationCount(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/population/moving-population-count',
      analysisTabListdto,
      ApiUrlType.ANALYSIS,
    );
  }

  findBestCatByLunch(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/revenue-analysis-by-lunch',
      analysisTabListdto,
      ApiUrlType.ANALYSIS,
    );
  }

  findBestCatByDinner(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/revenue-analysis-by-dinner',
      analysisTabListdto,
      ApiUrlType.ANALYSIS,
    );
  }

  findBestCatByLateNight(analysisTabListdto: AnalysisTabListDto) {
    return super.get<any>(
      'analysis-tab/revenue-analysis-by-late-night',
      analysisTabListdto,
      ApiUrlType.ANALYSIS,
    );
  }

  findMovingPopulationGenderAndAgeRatio(
    analysisTabListdto: AnalysisTabListDto,
  ) {
    return super.get<any>(
      'analysis-tab/population/moving-population-gender-and-age-ratio',
      analysisTabListdto,
      ApiUrlType.ANALYSIS,
    );
  }
}

export default new AnalysisTabService();
