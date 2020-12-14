<template>
  <div class="article-content">
    <section class="section">
      <header class="section-header">
        <h3>주거인구</h3>
      </header>
      <div class="section-content">
        <template v-if="!dataLoading">
          <b-row>
            <b-col cols="4">
              <DashboardBarChart
                v-if="genderRatioData"
                :chartData="genderRatioData"
                :options="barOptions"
              />
            </b-col>
            <b-col cols="8">
              <DashboardBarChart
                v-if="ageGroupRatioData"
                :chartData="ageGroupRatioData"
                :options="barOptions"
              />
            </b-col>
          </b-row>
          <div class="mt-4">
            <table
              class="table table-sm"
              v-if="genderCountData && ageGroupCountData && residentCount"
            >
              <thead>
                <tr>
                  <th scope="col" rowspan="2">구분</th>
                  <th scope="col" rowspan="2">총 인구</th>
                  <th scope="colgroup" colspan="2">성별</th>
                  <th scope="colgroup" colspan="4">연령별</th>
                </tr>
                <tr>
                  <th scope="col">남성</th>
                  <th scope="col">여성</th>
                  <th scope="col">10대</th>
                  <th scope="col">20대</th>
                  <th scope="col">30대</th>
                  <th scope="col">40대</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">명</th>
                  <td rowspan="2">{{ residentCount | numberTransformer }}</td>
                  <td>{{ genderCountData['남성'] | numberTransformer }}</td>
                  <td>{{ genderCountData['여성'] | numberTransformer }}</td>
                  <td>{{ ageGroupCountData.A10 | numberTransformer }}</td>
                  <td>{{ ageGroupCountData.A20 | numberTransformer }}</td>
                  <td>{{ ageGroupCountData.A30 | numberTransformer }}</td>
                  <td>{{ ageGroupCountData.A40 | numberTransformer }}</td>
                </tr>
                <tr>
                  <th scope="row">비율</th>
                  <td>
                    {{
                      (genderCountData['남성'] / residentCount).toFixed(2) *
                        100
                    }}%
                  </td>
                  <td>
                    {{
                      (genderCountData['여성'] / residentCount).toFixed(2) *
                        100
                    }}%
                  </td>
                  <td>
                    {{
                      (ageGroupCountData.A10 / residentCount).toFixed(2) * 100
                    }}%
                  </td>
                  <td>
                    {{
                      (ageGroupCountData.A20 / residentCount).toFixed(2) * 100
                    }}%
                  </td>
                  <td>
                    {{
                      (ageGroupCountData.A30 / residentCount).toFixed(2) * 100
                    }}%
                  </td>
                  <td>
                    {{
                      (ageGroupCountData.A40 / residentCount).toFixed(2) * 100
                    }}%
                  </td>
                </tr>
              </tbody>
            </table>
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
    <section class="section">
      <header class="section-header">
        <h3>가구수</h3>
      </header>
      <div class="section-content">
        <template
          v-if="!dataLoading && regidentialCountData && regidentialRatioData"
        >
          <DashboardBarChart
            v-if="regidentialRatioData"
            :chartData="regidentialRatioData"
            :options="barOptions"
          />
          <div class="mt-4">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th scope="col">구분</th>
                  <th scope="col">총 가구수</th>
                  <th scope="col">1인</th>
                  <th scope="col">2인</th>
                  <th scope="col">3인</th>
                  <th scope="col">4인</th>
                  <th scope="col">5인</th>
                  <th scope="col">6인 이상</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">세대</th>
                  <td rowspan="2">
                    {{
                      regidentialTotalCountData.totalCount | numberTransformer
                    }}
                  </td>
                  <td
                    v-for="(data, index) in regidentialCountData"
                    :key="index"
                  >
                    {{ data | numberTransformer }}
                  </td>
                </tr>
                <tr>
                  <th scope="row">비율</th>
                  <td
                    v-for="(data, index) in regidentialCountData"
                    :key="index"
                  >
                    {{
                      (data / regidentialTotalCountData.totalCount).toFixed(2) *
                        100
                    }}%
                  </td>
                </tr>
              </tbody>
            </table>
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
    <section class="section">
      <header class="section-header">
        <h3>직장인 수</h3>
      </header>
      <div class="section-content">
        <template v-if="!dataLoading">
          <div class="text-center">
            <p>
              <strong style="font-family: fantasy;" class="display-4">{{
                employeeCountData | numberTransformer
              }}</strong>
              <span>명</span>
            </p>
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
    <!-- <section class="section">
      <header class="section-header">
        <h3>유동인구</h3>
      </header>
      <div class="section-content">
        <template v-if="!dataLoading">
          <b-row>
            <b-col cols="6">
              <div class="bg-light" style="width:100%; height:250px"></div>
            </b-col>
            <b-col cols="6">
              <div class="bg-light" style="width:100%; height:250px"></div>
            </b-col>
          </b-row>
          <div class="mt-4">
            <table class="table table-sm" v-if="moviingPopulationCountData">
              <thead>
                <tr>
                  <th scope="col" rowspan="2">구분</th>
                  <th scope="col" rowspan="2">총 인구</th>
                  <th scope="colgroup" colspan="2">성별</th>
                  <th scope="colgroup" colspan="4">연령별</th>
                </tr>
                <tr>
                  <th scope="col">남성</th>
                  <th scope="col">여성</th>
                  <th scope="col">10대</th>
                  <th scope="col">20대</th>
                  <th scope="col">30대</th>
                  <th scope="col">40대</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">명</th>
                  <td rowspan="2">
                    {{ moviingPopulationCountData | numberTransformer }}
                  </td>
                  <td></td>
                  <td>58,000</td>
                  <td>13,293</td>
                  <td>38,522</td>
                  <td>35,265</td>
                  <td>11,021</td>
                </tr>
                <tr>
                  <th scope="row">비율</th>
                  <td>59%</td>
                  <td>41%</td>
                  <td>13%</td>
                  <td>26%</td>
                  <td>24%</td>
                  <td>11%</td>
                </tr>
              </tbody>
            </table>
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
    </section> -->
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { AnalysisTabListDto } from '@/dto';
import AnalysisTabService from '@/services/analysis/analysis-tab.service';
import DashboardPieChart from '../../dashboard/add-on/DashboardPieChart.vue';
import DashboardBarChart from '../../dashboard/add-on/DashboardBarChart.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ReverseQueryParamMapper } from '@/core';
@Component({
  name: 'AnalysisPopulation',
  components: {
    DashboardPieChart,
    DashboardBarChart,
  },
})
export default class AnalysisPopulation extends BaseComponent {
  @Prop() bdongCode!: string;
  private analysisTabSearchDto = new AnalysisTabListDto();
  private residentCount = null;
  private genderCountData = null;
  private genderRatioData = null;
  private ageGroupCountData = null;
  private ageGroupRatioData = null;
  private regidentialTotalCountData = null;
  private regidentialCountData = null;
  private regidentialRatioData = null;
  private employeeCountData = null;
  private moviingPopulationCountData = null;
  private dataLoading = true;
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

  findPopulationResidentCount() {
    AnalysisTabService.findPopulationResidentCount(
      this.analysisTabSearchDto,
    ).subscribe(res => {
      if (res) {
        this.residentCount = res.data.residentialPopulationCount;
      }
    });
  }

  findPopulationGenderRatio() {
    AnalysisTabService.findPopulationGenderRatio(
      this.analysisTabSearchDto,
    ).subscribe(res => {
      if (res) {
        this.genderCountData = res.data[0];
        this.genderRatioData = res.data[1];
      }
    });
  }

  findAgeGroupRatio() {
    this.dataLoading = true;
    AnalysisTabService.findAgeGroupRatio(this.analysisTabSearchDto).subscribe(
      res => {
        if (res) {
          this.dataLoading = false;
          this.ageGroupCountData = res.data[0];
          this.ageGroupRatioData = res.data[1];
        }
      },
    );
  }

  findPopulationRegidentialRatio() {
    AnalysisTabService.findPopulationRegidentialRatio(
      this.analysisTabSearchDto,
    ).subscribe(res => {
      if (res) {
        this.regidentialTotalCountData = res.data[0];
        this.regidentialCountData = res.data[1].datasets[0].data;
        this.regidentialRatioData = res.data[1];
        console.log(this.regidentialRatioData);
      }
    });
  }

  findPopulationEmployeeCount() {
    AnalysisTabService.findPopulationEmployeeCount(
      this.analysisTabSearchDto,
    ).subscribe(res => {
      if (res) {
        this.employeeCountData = res.data.totalCount;
      }
    });
  }
  findMovingPopulationCount() {
    AnalysisTabService.findMovingPopulationCount(
      this.analysisTabSearchDto,
    ).subscribe(res => {
      if (res) {
        this.moviingPopulationCountData = res.data.totalCount;
      }
    });
  }

  findAnalysisPopulation() {
    this.dataLoading = true;
    this.findPopulationResidentCount();
    this.findPopulationGenderRatio();
    this.findAgeGroupRatio();
    this.findPopulationRegidentialRatio();
    this.findPopulationEmployeeCount();
    this.findMovingPopulationCount();
  }

  created() {
    setTimeout(() => {
      this.analysisTabSearchDto.bdongCode = this.bdongCode;
      this.findAnalysisPopulation();
    }, 1000);
  }
}
</script>
