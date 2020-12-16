<template>
  <div class="article-content">
    <section class="section">
      <header class="section-header">
        <h3>매출분석</h3>
      </header>
      <div class="section-content">
        <template v-if="!dataLoadingRevenueCategory && revenueCategories">
          <div class="bg-light p-4">
            <p>카테고리별 매출 비중 (배달의민족 카테고리 기준)</p>
            <div class="mt-4">
              <div
                v-for="(category, index) in revenueCategories"
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
        <div class="mt-4">
          <b-button
            :variant="
              analysisTabSearchDto.baeminCategoryName === category
                ? 'secondary'
                : 'outline-secondary'
            "
            v-for="category in baeminCategories"
            :key="category"
            class="ml-0 mr-2 mb-2"
            @click="findRevenueAnalysis(category)"
          >
            {{ category }}
          </b-button>
        </div>
        <template v-if="clickedCategory">
          <template v-if="!dataLoading">
            <div class="mt-4 pt-4 border-top">
              <div class="title-box text-center">
                <h4>
                  <b> {{ analysisTabSearchDto.baeminCategoryName }}</b>
                </h4>
              </div>
              <div class="content-box">
                <div class="mt-4">
                  <h5>
                    1) 성별
                    <b-icon
                      icon="question-circle"
                      variant="secondary"
                      v-b-tooltip.hover.right="
                        '남성은 자잘자잘하게 많이시키지만, 여성은 한번 시킬 때 매출액이 크다 등의 정보를 설명하게 됩니다.'
                      "
                    ></b-icon>
                  </h5>
                  <div class="mt-4">
                    <b-row>
                      <b-col cols="6">
                        <p class="text-center mb-2">
                          <b class="graph-label">매출 건수 비율</b>
                        </p>
                        <DashboardPieChart
                          v-if="genderCountData"
                          :chartData="genderCountData"
                          :options="pieOptions"
                        />
                      </b-col>
                      <b-col cols="6">
                        <p class="text-center mb-2">
                          <b class="graph-label">매출 금액 비율</b>
                        </p>
                        <DashboardPieChart
                          v-if="genderRevenueData"
                          :chartData="genderRevenueData"
                          :options="pieOptions"
                        />
                      </b-col>
                    </b-row>
                  </div>
                </div>
                <div class="mt-4">
                  <h5>
                    2) 연령별
                    <b-icon
                      icon="question-circle"
                      variant="secondary"
                      v-b-tooltip.hover.right="
                        '해당 동에서 배달음식을 주문시키는 사람의 주요 연령대를 나타내며, 지역의 소비력이 강한 연령대를 설명합니다.'
                      "
                    ></b-icon>
                  </h5>
                  <div class=" mt-4">
                    <DashboardBarChart
                      v-if="ageRevenueData"
                      :chartData="ageRevenueData"
                      :options="barOptions"
                      :styles="{ height: '400px' }"
                    />
                  </div>
                </div>
                <div class="mt-4">
                  <h5>
                    3) 요일별
                    <b-icon
                      icon="question-circle"
                      variant="secondary"
                      v-b-tooltip.hover.right="
                        '요일별 15% 기준으로, 매출액의 평균추이를 설명하며, 평일이 주요한 타겟이지만, 토요일에는 풀타임 근무를 통해서 매출액을 증가시켜야 하는 부분을 강조하여 설명합니다.'
                      "
                    ></b-icon>
                  </h5>
                  <div class="mt-4">
                    <div>
                      <div class="mt-4">
                        <p class="text-center mb-2">
                          <b class="graph-label">매출 건수 비율</b>
                        </p>
                        <DashboardBarChart
                          v-if="dayCountData"
                          :chartData="dayCountData"
                          :options="barOptions"
                          :styles="{ height: '400px' }"
                        />
                      </div>
                      <div class="mt-4">
                        <p class="text-center mb-2">
                          <b class="graph-label">매출 금액 비율</b>
                        </p>
                        <DashboardBarChart
                          v-if="dayRevenueData"
                          :chartData="dayRevenueData"
                          :options="barOptions"
                          :styles="{ height: '400px' }"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div class="mt-4">
              <h5>
                4) 객단가
                <b-icon
                  icon="question-circle"
                  variant="secondary"
                  v-b-tooltip.hover.right="
                    '해당 카테고리의 소비층은 2개로 나뉘는데, 1.5만원, 2.8만원 기준의 세트메뉴를 기본적으로 만들어야 함을 설명합니다.'
                  "
                ></b-icon>
              </h5>
              <div class="bg-light mt-2" style="height:150px"></div>
            </div> -->
              </div>
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
        </template>
        <template v-else>
          <div class="bg-light">
            <div class="text-center" style="padding:140px 0">
              <p>
                카테고리를 선택해주세요
              </p>
            </div>
          </div>
        </template>
      </div>
    </section>
    <section class="section">
      <header class="section-header">
        <h3>시간대별 업종 매출 순위</h3>
      </header>
      <div class="section-content">
        <template v-if="!dataLoadingByTime">
          <table class="table table-sm">
            <thead>
              <tr>
                <th></th>
                <th scope="col">순위</th>
                <th scope="col">업종</th>
                <th scope="col">성별</th>
                <th scope="col">연령대</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="lunchData">
                <tr
                  v-for="(data, index) in lunchData"
                  :key="`${index + 'lunchData'}`"
                >
                  <th
                    scope="row"
                    :rowspan="lunchData.length"
                    v-if="index === 0"
                  >
                    점심<br />11 ~ 14시
                  </th>
                  <td>{{ index + 1 }}</td>
                  <td>{{ data.rank_1_bm }}</td>
                  <td>{{ data.gender }}</td>
                  <td>{{ data.age }}</td>
                </tr>
              </template>
              <template v-if="dinnerData">
                <tr
                  v-for="(data, index) in dinnerData"
                  :key="`${index + 'dinnerData'}`"
                >
                  <th scope="row" rowspan="3" v-if="index === 0">
                    저녁<br />17 ~ 21시
                  </th>
                  <td>{{ index + 1 }}</td>
                  <td>{{ data.rank_1_bm }}</td>
                  <td>{{ data.gender }}</td>
                  <td>{{ data.age }}</td>
                </tr>
              </template>
              <template v-if="lateNightData">
                <tr
                  v-for="(data, index) in lateNightData"
                  :key="`${index + 'lateNightData'}`"
                >
                  <th scope="row" rowspan="3" v-if="index === 0">
                    야식<br />21 ~ 06시
                  </th>
                  <td>{{ index + 1 }}</td>
                  <td>{{ data.rank_1_bm }}</td>
                  <td>{{ data.gender }}</td>
                  <td>{{ data.age }}</td>
                </tr>
              </template>
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
import { Component, Vue, Prop } from 'vue-property-decorator';
import AnalysisTabService from '@/services/analysis/analysis-tab.service';
import BaeminCategoryService from '@/services/analysis/baemin-category.service';
import {
  BaeminCategoryCode,
  CONST_BAEMIN_CATEGORY_CODE,
} from '@/services/shared';
import DashboardPieChart from '../../dashboard/add-on/DashboardPieChart.vue';
import DashboardBarChart from '../../dashboard/add-on/DashboardBarChart.vue';
import { AnalysisTabListDto } from '@/dto';
import { ReverseQueryParamMapper } from '@/core';
import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'AnalysisSales',
  components: {
    DashboardPieChart,
    DashboardBarChart,
  },
})
export default class AnalysisSales extends BaseComponent {
  @Prop() bdongCode!: string;
  private analysisTabSearchDto = new AnalysisTabListDto();
  private baeminCategories: BaeminCategoryCode[] = [
    ...CONST_BAEMIN_CATEGORY_CODE,
  ];
  private revenueCategories = [];
  private genderCountData = null;
  private genderRevenueData = null;
  private ageRevenueData = null;
  private dayCountData = null;
  private dayRevenueData = null;
  private dataLoading = false;
  private dataLoadingRevenueCategory = false;
  private dataLoadingByTime = false;
  private clickedCategory = false;
  private lunchData = [];
  private dinnerData = [];
  private lateNightData = [];

  private pieOptions = { responsive: true };
  private barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  resetData() {
    this.genderCountData = null;
    this.genderRevenueData = null;
    this.ageRevenueData = null;
    this.dayCountData = null;
    this.dayRevenueData = null;
  }
  async findRevenueAnalysis(categoryName?: BaeminCategoryCode) {
    if (!this.bdongCode) {
      return;
    }
    this.resetData();
    this.clickedCategory = true;
    this.analysisTabSearchDto.bdongCode = this.bdongCode;

    this.analysisTabSearchDto.baeminCategoryName = categoryName;
    if (!categoryName) {
      this.analysisTabSearchDto.baeminCategoryName = BaeminCategoryCode.KOREAN;
    }

    await Promise.all([
      await this.findRevenueAnalysisGender(),
      await this.findRevenueAnalysisAgeGroup(),
      await this.findRevenueAnalysisByDay(),
    ]);
  }

  findCategoryRatio() {
    this.dataLoadingRevenueCategory = true;
    AnalysisTabService.findCategoryRatio(this.analysisTabSearchDto).subscribe(
      res => {
        if (res) {
          this.dataLoadingRevenueCategory = false;
          this.revenueCategories = res.data;
        }
      },
    );
  }

  findRevenueAnalysisGender() {
    this.dataLoading = true;
    AnalysisTabService.findRevenueAnalysisGender(
      this.analysisTabSearchDto,
    ).subscribe(res => {
      if (res) {
        this.dataLoading = false;
        this.genderCountData = res.data[0].countData;
        this.genderRevenueData = res.data[1].revenueData;
      }
    });
  }

  findRevenueAnalysisAgeGroup() {
    AnalysisTabService.findRevenueAnalysisAgeGroup(
      this.analysisTabSearchDto,
    ).subscribe(res => {
      if (res) {
        this.ageRevenueData = res.data[1].revenueData;
      }
    });
  }

  findRevenueAnalysisByDay() {
    AnalysisTabService.findRevenueAnalysisByDay(
      this.analysisTabSearchDto,
    ).subscribe(res => {
      if (res) {
        this.dayCountData = res.data[0].countData;
        this.dayRevenueData = res.data[1].revenueData;
      }
    });
  }

  async findRevenueAnalysisByTime() {
    if (!this.bdongCode) {
      return;
    }
    this.analysisTabSearchDto.bdongCode = this.bdongCode;

    await Promise.all([
      await this.findBestByDinner(),
      await this.findBestByLunch(),
      await this.findBestByLateNight(),
    ]);
  }

  findBestByLunch() {
    AnalysisTabService.findBestCatByLunch(this.analysisTabSearchDto).subscribe(
      res => {
        this.lunchData = res.data;
      },
    );
  }

  findBestByDinner() {
    AnalysisTabService.findBestCatByDinner(this.analysisTabSearchDto).subscribe(
      res => {
        this.dinnerData = res.data;
      },
    );
  }

  findBestByLateNight() {
    this.dataLoadingByTime = true;
    AnalysisTabService.findBestCatByLateNight(
      this.analysisTabSearchDto,
    ).subscribe(res => {
      this.dataLoadingByTime = false;
      this.lateNightData = res.data;
    });
  }
  created() {
    this.findCategoryRatio();
    this.findRevenueAnalysisByTime();
  }
}
</script>
