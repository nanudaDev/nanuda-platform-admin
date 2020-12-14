<template>
  <div class="article-content">
    <section class="section">
      <header class="section-header">
        <h3>업종별 경쟁률 현황상세</h3>
      </header>
      <div class="section-content">
        <template v-if="!dataLoadingFoodCategory">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">카테고리</th>
                <th scope="col">점포수</th>
                <th scope="col">점포비율</th>
                <th scope="col">매출비율</th>
                <th scope="col">차이</th>
                <!-- <th scope="col">경쟁도</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="category in categories" :key="category.id">
                <th scope="row">
                  {{ category.baeminCategoryName }}
                </th>
                <td>{{ category.storeCnt }}</td>
                <td style="position:relative;">
                  <div
                    class="bg-primary"
                    style="position:absolute; left:0; top:0; height:100%;"
                    :style="
                      `width: ${(category.storeCntRatio / maxCntRatio) * 100}%`
                    "
                  ></div>
                  <span
                    style="position:relative; z-index:2;"
                    :class="{
                      'text-white': category.storeCntRatio > 60,
                    }"
                  >
                    {{ category.storeCntRatio.toFixed(2) }}%
                  </span>
                </td>
                <td style="position:relative;">
                  <div
                    class="bg-warning"
                    style="position:absolute; left:0; top:0; height:100%;"
                    :style="
                      `width: ${(category.w_total_amt_avg_ratio / maxAvgRatio) *
                        100}%`
                    "
                  ></div>
                  <span
                    style="position:relative; z-index:2;"
                    :class="{
                      'text-white':
                        category.w_total_amt_avg_ratio / maxAvgRatio > 60,
                    }"
                  >
                    {{ category.w_total_amt_avg_ratio.toFixed(2) }}%
                  </span>
                </td>
                <td style="position:relative;">
                  <template v-if="category.gapPer > 0">
                    <div
                      class="bg-success"
                      style="position:absolute; left:50%; top:0; height:100%;"
                      :style="`width: ${(category.gapPer / maxGapPer) * 50}%`"
                    ></div>
                    <span
                      style="position:relative; z-index:2; padding-left:50%; text-align:left;"
                    >
                      {{ category.gapPer.toFixed(2) }}%
                    </span>
                  </template>
                  <template v-else>
                    <div
                      class="bg-danger"
                      style="position:absolute; right:50%; top:0; height:100%;"
                      :style="`width: ${(-category.gapPer / maxGapPer) * 50}%`"
                    ></div>
                    <span
                      style="position:relative; z-index:2; padding-left:50%; text-align:left;"
                    >
                      {{ category.gapPer.toFixed(2) }}%
                    </span>
                  </template>
                </td>
                <!-- <td>1.62</td> -->
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
      </div>
    </section>
    <section class="section">
      <header class="section-header">
        <h3>평균영업기간</h3>
      </header>
      <div class="section-content">
        <template v-if="!dataLoadingSurvivalYears">
          <table class="table" v-if="survivalYears.length > 0">
            <thead>
              <tr>
                <th></th>
                <th scope="col">카테고리</th>
                <th scope="col">평균영업기간</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(years, index) in survivalYears" :key="index">
                <th scope="row">
                  {{ index + 1 }}
                </th>
                <td>
                  {{ years.baeminCategoryName }}
                </td>
                <td>{{ years.survivalYearsAvg }}년</td>
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
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { AnalysisTabListDto } from '@/dto';
import AnalysisTabService from '@/services/analysis/analysis-tab.service';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ReverseQueryParamMapper } from '@/core';

@Component({
  name: 'AnalysisCategory',
})
export default class AnalysisCategory extends BaseComponent {
  @Prop() bdongCode!: string;
  private analysisTabSearchDto = new AnalysisTabListDto();
  private categories = [];
  private survivalYears = [];
  private dataLoading = true;
  private dataLoadingFoodCategory = true;
  private dataLoadingSurvivalYears = false;
  private maxCntRatio = null;
  private maxAvgRatio = null;
  private maxGapPer = null;

  findFoodCategorySummary() {
    this.dataLoadingFoodCategory = true;
    AnalysisTabService.findFoodCategorySummary(
      this.analysisTabSearchDto,
    ).subscribe(res => {
      if (res) {
        this.dataLoadingFoodCategory = false;
        this.categories = res.data;
        const maxCntRatioArr = this.categories.map(data => {
          return data.storeCntRatio;
        });
        this.maxCntRatio = Math.max(...maxCntRatioArr);
        const maxAvgRatioArr = this.categories.map(data => {
          return data.w_total_amt_avg_ratio;
        });
        this.maxAvgRatio = Math.max(...maxAvgRatioArr);
        const maxGapPerArr = this.categories.map(data => {
          return data.gapPer;
        });
        this.maxGapPer = Math.max(...maxGapPerArr);
      }
    });
  }

  findSurvivalYears() {
    this.dataLoadingSurvivalYears = true;
    AnalysisTabService.findSurvivalYears(this.analysisTabSearchDto).subscribe(
      res => {
        if (res) {
          this.dataLoadingSurvivalYears = false;
          this.survivalYears = res.data;
        }
      },
    );
  }

  findAnalysisCategory() {
    this.findFoodCategorySummary();
    this.findSurvivalYears();
  }

  // created() {
  //   const query = ReverseQueryParamMapper(location.search);
  //   if (query) {
  //     this.analysisTabSearchDto = query;
  //     this.findAnalysisCategory();
  //   }
  // }

  created() {
    setTimeout(() => {
      this.analysisTabSearchDto.bdongCode = this.bdongCode;
      this.findAnalysisCategory();
    }, 1000);
  }
}
</script>
