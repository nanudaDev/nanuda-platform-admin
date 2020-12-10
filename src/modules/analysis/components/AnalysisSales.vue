<template>
  <div class="article-content">
    <section class="section">
      <header class="section-header">
        <h3>매출분석</h3>
      </header>
      <div class="section-content">
        <div class="bg-light p-4 mt-4">
          <p>카테고리별 매출 비중 (배달의민족 카테고리 기준)</p>
          <div class="d-flex align-items-start mt-4">
            <div
              v-for="(category, index) in revenueCategories"
              :key="category.id"
              :style="`width : ${category.w_total_amt_avg_ratio * 100}%`"
            >
              <div
                class="bg-info"
                style="height:20px;"
                :style="`opacity:${1 / (index + 1)} `"
              ></div>
              <div class="text-center mt-2">
                <p
                  style="white-space:nowrap; font-size:20px; font-weight:bold;"
                >
                  {{ Math.round(category.w_total_amt_avg_ratio * 100) }}%
                </p>
                <span style="font-size:"
                  >{{ category.baeminCategoryName }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <b-button
            :variant="
              category.categoryNameKr === '한식'
                ? 'secondary'
                : 'outline-secondary'
            "
            v-for="category in categories"
            :key="category.id"
            class="ml-0 mr-2 mb-2"
            @click="findRevenueAnalysis(category.categoryNameKr)"
          >
            {{ category.categoryNameKr }}
          </b-button>
        </div>
        <div class="mt-4 pt-4 border-top">
          <div class="title-box text-center">
            <h4>
              <b>한식</b>
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
                    <p class="text-center mb-2"><b>매출 건수 비율</b></p>
                    <DashboardPieChart
                      :chartData="genderCountData"
                      :options="genderOptions"
                    />
                  </b-col>
                  <b-col cols="6">
                    <p class="text-center mb-2"><b>매출 금액 비율</b></p>
                    <DashboardPieChart
                      :chartData="genderRevenueData"
                      :options="genderOptions"
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
                <img
                  src="@/assets/images/general/analysis/saleschart_04.png"
                  alt=""
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
                    <p class="text-center mb-2"><b>매출 건수 비율</b></p>
                    <img
                      src="@/assets/images/general/analysis/saleschart_05.png"
                      alt=""
                    />
                    <div class="mt-4">
                      <img
                        src="@/assets/images/general/analysis/saleschart_05_1.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="mt-4">
                    <p class="text-center mb-2"><b>매출 금액 비율</b></p>
                    <img
                      src="@/assets/images/general/analysis/saleschart_06.png"
                      alt=""
                    />
                    <div class="mt-4">
                      <img
                        src="@/assets/images/general/analysis/saleschart_05_1.png"
                        alt=""
                      />
                    </div>
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
      </div>
    </section>
    <section class="section">
      <header class="section-header">
        <h3>시간대별 업종 매출 순위</h3>
      </header>
      <div class="section-content">
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
            <tr>
              <th scope="row" rowspan="3">점심<br />11 ~ 14시</th>
              <td>1</td>
              <td>한식</td>
              <td>남</td>
              <td>30대</td>
            </tr>
            <tr>
              <td>2</td>
              <td>도시락</td>
              <td>여</td>
              <td>40대</td>
            </tr>
            <tr>
              <td>3</td>
              <td>도시락</td>
              <td>여</td>
              <td>40대</td>
            </tr>
            <tr>
              <th scope="row" rowspan="3">저녁<br />17 ~ 21시</th>
              <td>1</td>
              <td>분식</td>
              <td>남</td>
              <td>20대</td>
            </tr>
            <tr>
              <td>2</td>
              <td>족발</td>
              <td>여</td>
              <td>30대</td>
            </tr>
            <tr>
              <td>3</td>
              <td>일식</td>
              <td>남</td>
              <td>40대</td>
            </tr>
            <tr>
              <th scope="row" rowspan="3">야식<br />21 ~ 06시</th>
              <td>1</td>
              <td>야식</td>
              <td>남</td>
              <td>30대</td>
            </tr>
            <tr>
              <td>2</td>
              <td>한식</td>
              <td>여</td>
              <td>40대</td>
            </tr>
            <tr>
              <td>3</td>
              <td>치킨</td>
              <td>남</td>
              <td>20대</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import AnalysisTabService from '@/services/analysis/analysis-tab.service';
import BaeminCategoryService from '@/services/analysis/baemin-category.service';
import {
  BaeminCategoryCode,
  CONST_BAEMIN_CATEGORY_CODE,
} from '@/services/shared';
import DashboardPieChart from '../../dashboard/add-on/DashboardPieChart.vue';

@Component({
  name: 'AnalysisSales',
  components: {
    DashboardPieChart,
  },
})
export default class AnalysisSales extends BaseComponent {
  private categories = [];
  private revenueCategories = [];
  private genderCountData = null;
  private genderRevenueData = null;
  private genderOptions = null;

  private parmas = {
    bdongCode: '1168010100',
    baeminCategoryName: '한식',
  };

  findRevenueAnalysis(categoryName) {
    this.findBaeminCateogry();
    this.findRevenueAnalysisGender();
    this.findRevenueAnalysisAgeGroup();
  }

  findBaeminCateogry() {
    BaeminCategoryService.findAll(null).subscribe(res => {
      if (res) {
        this.categories = res.data.items;
      }
    });
  }

  findCategoryRatio() {
    AnalysisTabService.findCategoryRatio(this.parmas).subscribe(res => {
      if (res) {
        this.revenueCategories = res.data;
      }
    });
  }

  findRevenueAnalysisGender() {
    AnalysisTabService.findRevenueAnalysisGender(this.parmas).subscribe(res => {
      if (res) {
        this.genderCountData = res.data[0].countData;
        this.genderRevenueData = res.data[1];
        this.genderOptions = { responsive: true, maintainAspectRatio: false };
      }
    });
  }

  findRevenueAnalysisAgeGroup() {
    AnalysisTabService.findRevenueAnalysisAgeGroup(this.parmas).subscribe(
      res => {
        if (res) {
          console.log(res);
        }
      },
    );
  }

  created() {
    this.findCategoryRatio();
    this.findRevenueAnalysis(this.parmas);
  }
}
</script>
