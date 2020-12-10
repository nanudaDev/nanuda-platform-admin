<template>
  <div class="article-content">
    <section class="section">
      <header class="section-header">
        <h3>상권 요약</h3>
      </header>
      <div class="section-content">
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
              <td>{{ summary.storeCount }}</td>
              <th scope="row">주거인구(명)</th>
              <td>{{ summary.resPopulationCount }}</td>
            </tr>
            <tr>
              <th scope="row">총세대수(세대)</th>
              <td>{{ summary.houseCount }}</td>
              <th scope="row">직장인구(명)</th>
              <td>{{ summary.employeeCount }}</td>
            </tr>
            <tr>
              <th scope="row">평균 영업기간(년)</th>
              <td>{{ summary.averageSurvivalYears }}</td>
              <th scope="row">유동인구(명)</th>
              <td>{{ summary.movingPopulationCount }}</td>
            </tr>
            <tr>
              <th scope="row">주요 연령대</th>
              <td>{{ summary.importantAgeGroup }}</td>
              <th scope="row"></th>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div class="bg-light p-4 mt-4">
          <p>카테고리별 매출 비중 (배달의민족 카테고리 기준)</p>
          <!-- <div class="mt-3">
            <img
              src="@/assets/images/general/analysis/saleschart_01.png"
              alt=""
            />
          </div> -->
          <div class="d-flex align-items-start mt-4">
            <div
              v-for="(category, index) in categories"
              :key="category.id"
              :style="
                `width : ${(category.w_total_amt_avg_ratio * 100).toFixed(2)}%`
              "
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
        <div class="mt-3">
          <b-row>
            <b-col cols="4">
              <div
                style="width:150px; height:150px; border-radius:50%;"
                class="bg-primary d-flex align-items-center justify-content-center"
              >
                <p class="text-center text-white" style="font-size:16px">
                  추천 1<br />
                  <strong style="font-size:30px">분식</strong>
                </p>
              </div>
            </b-col>
            <b-col cols="4">
              <div
                style="width:150px; height:150px; border-radius:50%;"
                class="bg-success d-flex align-items-center justify-content-center"
              >
                <p class="text-center text-white" style="font-size:16px">
                  추천 2<br />
                  <strong style="font-size:30px">한식</strong>
                </p>
              </div>
            </b-col>
            <b-col cols="4">
              <div
                style="width:150px; height:150px; border-radius:50%;"
                class="bg-warning d-flex align-items-center justify-content-center"
              >
                <p class="text-center text-white" style="font-size:16px">
                  추천 3<br />
                  <strong style="font-size:30px">일식</strong>
                </p>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import AnalysisTabService from '@/services/analysis/analysis-tab.service';

@Component({
  name: 'AnalysisSummary',
})
export default class AnalysisSummary extends BaseComponent {
  private summary = {};

  private categories = [
    {
      baeminCategoryName: '패스트푸드',
      w_total_cnt_avg: 20881.055555555555,
      w_total_amt_avg: 303099539.0555556,
      w_total_cnt_avg_ratio: 0.3494,
      w_total_amt_avg_ratio: 0.3042,
    },
    {
      baeminCategoryName: '치킨',
      w_total_cnt_avg: 12528.633333333331,
      w_total_amt_avg: 181859723.4333333,
      w_total_cnt_avg_ratio: 0.2097,
      w_total_amt_avg_ratio: 0.1825,
    },
    {
      baeminCategoryName: '피자',
      w_total_cnt_avg: 8352.422222222223,
      w_total_amt_avg: 121239815.62222224,
      w_total_cnt_avg_ratio: 0.1398,
      w_total_amt_avg_ratio: 0.1217,
    },
    {
      baeminCategoryName: '한식',
      w_total_cnt_avg: 4120.006666666666,
      w_total_amt_avg: 97874821.89333335,
      w_total_cnt_avg_ratio: 0.0689,
      w_total_amt_avg_ratio: 0.0982,
    },
    {
      baeminCategoryName: '족발/보쌈',
      w_total_cnt_avg: 3530.3666666666663,
      w_total_amt_avg: 83626760.91666667,
      w_total_cnt_avg_ratio: 0.0591,
      w_total_amt_avg_ratio: 0.0839,
    },
    {
      baeminCategoryName: '찜/탕',
      w_total_cnt_avg: 2918.8,
      w_total_amt_avg: 69982080.775,
      w_total_cnt_avg_ratio: 0.0488,
      w_total_amt_avg_ratio: 0.0702,
    },
    {
      baeminCategoryName: '야식',
      w_total_cnt_avg: 2095.8,
      w_total_amt_avg: 48253377.2,
      w_total_cnt_avg_ratio: 0.0351,
      w_total_amt_avg_ratio: 0.0484,
    },
    {
      baeminCategoryName: '카페/디저트',
      w_total_cnt_avg: 2855.962962962963,
      w_total_amt_avg: 38183891.777777776,
      w_total_cnt_avg_ratio: 0.0478,
      w_total_amt_avg_ratio: 0.0383,
    },
    {
      baeminCategoryName: '돈까스/회/일식',
      w_total_cnt_avg: 752.7926829268292,
      w_total_amt_avg: 17412075.88292683,
      w_total_cnt_avg_ratio: 0.0126,
      w_total_amt_avg_ratio: 0.0175,
    },
    {
      baeminCategoryName: '분식',
      w_total_cnt_avg: 739.6296296296297,
      w_total_amt_avg: 14426816.703703703,
      w_total_cnt_avg_ratio: 0.0124,
      w_total_amt_avg_ratio: 0.0145,
    },
    {
      baeminCategoryName: '중국집',
      w_total_cnt_avg: 707.5185185185187,
      w_total_amt_avg: 14159564.185185183,
      w_total_cnt_avg_ratio: 0.0118,
      w_total_amt_avg_ratio: 0.0142,
    },
    {
      baeminCategoryName: '아시안/양식',
      w_total_cnt_avg: 276.14166666666665,
      w_total_amt_avg: 6280047.777777778,
      w_total_cnt_avg_ratio: 0.0046,
      w_total_amt_avg_ratio: 0.0063,
    },
  ];

  findSummary() {
    AnalysisTabService.findSummary(null).subscribe(res => {
      if (res) {
        this.summary = res.data;
      }
    });
  }
  created() {
    this.findSummary();
  }
}
</script>
