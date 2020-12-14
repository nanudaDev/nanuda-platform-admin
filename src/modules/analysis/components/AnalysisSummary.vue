<template>
  <div class="article-content">
    <section class="section">
      <header class="section-header">
        <h3>상권 요약</h3>
      </header>
      <div class="section-content">
        <template v-if="!dataLoading && summary">
          <table class="table">
            <colgroup>
              <col width="25%" />
              <col width="*" />
              <col width="25%" />
              <col width="*%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">음식점수(개)</th>
                <td>{{ summary.storeCount | numberTransformer }}</td>
                <th scope="row">주거인구(명)</th>
                <td>{{ summary.resPopulationCount }}</td>
              </tr>
              <tr>
                <th scope="row">총세대수(세대)</th>
                <td>{{ summary.houseCount | numberTransformer }}</td>
                <th scope="row">직장인구(명)</th>
                <td>{{ summary.employeeCount | numberTransformer }}</td>
              </tr>
              <tr>
                <th scope="row">평균 영업기간(년)</th>
                <td>{{ summary.averageSurvivalYears | numberTransformer }}</td>
                <th scope="row">유동인구(명)</th>
                <td>{{ summary.movingPopulationCount | numberTransformer }}</td>
              </tr>
              <tr>
                <th scope="row">주요 연령대</th>
                <td>{{ summary.importantAgeGroup }}</td>
                <th scope="row"></th>
                <td></td>
              </tr>
            </tbody>
          </table>
        </template>
        <template v-else>
          <div class="loader">
            <div>
              <img
                src="@/assets/images/general/analysis/loading.gif"
                alt="분석중"
              />
              <p>잠시만 기다려주세요 상권 분석 중입니다</p>
            </div>
          </div>
        </template>
        <template v-if="!dataLoadingCategory && categories.length > 0">
          <div class="bg-light p-4 mt-4">
            <p>카테고리별 매출 비중 (배달의민족 카테고리 기준)</p>
            <div class="mt-4">
              <div
                v-for="(category, index) in categories"
                :key="category.id"
                class="d-flex align-items-center"
              >
                <div
                  class="bg-info"
                  style="height:20px;"
                  :style="
                    `width : ${(category.w_total_amt_avg_ratio * 100).toFixed(
                      2,
                    )}%; opacity:${1 / (index + 1)}`
                  "
                ></div>
                <div class="d-flex align-items-center ml-3">
                  <p
                    style="white-space:nowrap; font-size:16px; font-weight:bold; margin-right:8px;"
                  >
                    {{ Math.round(category.w_total_amt_avg_ratio * 100) }}%
                  </p>
                  <span style="font-size:12px"
                    >{{ category.baeminCategoryName }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-3">
            <b-row no-gutters>
              <b-col
                cols="4"
                v-for="(category, index) in recomeendCategory"
                :key="category.id"
              >
                <div
                  style="width:150px; height:150px; border-radius:50%; margin:0 auto;"
                  class="d-flex align-items-center justify-content-center"
                  :class="recommendCategoryBgColor(index)"
                >
                  <p class="text-center text-white" style="font-size:14px">
                    추천 {{ index + 1 }}<br />
                    <strong style="font-size:20px">{{
                      category.baeminCategoryName
                    }}</strong>
                  </p>
                </div>
              </b-col>
            </b-row>
          </div>
        </template>
        <template v-else>
          <div class="loader">
            <div>
              <img
                src="@/assets/images/general/analysis/loading.gif"
                alt="분석중"
              />
              <p>잠시만 기다려주세요 상권 분석 중입니다</p>
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue, Prop } from 'vue-property-decorator';
import AnalysisTabService from '@/services/analysis/analysis-tab.service';
import { AnalysisTabListDto } from '@/dto';
import { ReverseQueryParamMapper } from '@/core';

@Component({
  name: 'AnalysisSummary',
})
export default class AnalysisSummary extends BaseComponent {
  @Prop() bdongCode!: string;
  private analysisTabSearchDto = new AnalysisTabListDto();
  private summary = {};
  private dataLoading = true;
  private dataLoadingCategory = true;
  private categories = [];
  private recomeendCategory = [];
  private parmas = null;

  recommendCategoryBgColor(idx) {
    if (idx === 0) return 'bg-primary';
    if (idx === 1) return 'bg-warning';
    if (idx === 2) return 'bg-success';
  }

  async findSummary() {
    this.summary = {};
    this.dataLoading = true;
    await AnalysisTabService.findSummary(this.analysisTabSearchDto).subscribe(
      res => {
        this.dataLoading = false;
        this.summary = res.data;
      },
    );
  }

  async findCategoryRatio() {
    this.dataLoadingCategory = true;
    await AnalysisTabService.findCategoryRatio(
      this.analysisTabSearchDto,
    ).subscribe(res => {
      if (res) {
        this.dataLoadingCategory = false;
        this.categories = res.data;
        this.recomeendCategory = this.categories.slice(0, 3);
      }
    });
  }

  async findAnalysisSummary() {
    await this.findCategoryRatio();
    await this.findSummary();
  }
  // created() {
  //   setTimeout(() => this.findAnalysisSummary(), 2000);
  // }
  created() {
    this.analysisTabSearchDto.bdongCode = this.bdongCode;
    setTimeout(() => this.findAnalysisSummary(), 1000);
  }
}
</script>
