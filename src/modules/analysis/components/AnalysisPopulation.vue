<template>
  <div class="article-content">
    <section class="section">
      <header class="section-header">
        <h3>주거인구</h3>
      </header>
      <div class="section-content">
        <template v-if="!dataLoadingResident && residentGenderCountData">
          <div class="mt-4">
            <div class="horizontal-stacked-bars">
              <div
                class="horizontal-stacked-bar bar-gender-male"
                :style="
                  `width:${(residentGenderCountData['남성'] /
                    residentTotalCount) *
                    100}%`
                "
              >
                <p>
                  {{
                    (
                      (residentGenderCountData['남성'] / residentTotalCount) *
                      100
                    ).toFixed(2)
                  }}%
                </p>
                <span>남성</span>
              </div>
              <div
                class="horizontal-stacked-bar bar-gender-female"
                :style="
                  `width:${(residentGenderCountData['여성'] /
                    residentTotalCount) *
                    100}%`
                "
              >
                <p>
                  {{
                    (
                      (residentGenderCountData['여성'] / residentTotalCount) *
                      100
                    ).toFixed(2)
                  }}%
                </p>
                <span>여성</span>
              </div>
              <div
                class="horizontal-stacked-bar bar-gender-etc"
                :style="
                  `width:${((residentTotalCount -
                    (+residentGenderCountData['남성'] +
                      +residentGenderCountData['여성'])) /
                    residentTotalCount) *
                    100}%`
                "
              ></div>
            </div>

            <div class="mt-4">
              <table
                class="table table-sm"
                v-if="residentGenderRatioData && residentTotalCount"
              >
                <thead>
                  <tr>
                    <th scope="col" rowspan="2">구분</th>
                    <th scope="col" rowspan="2">총 인구</th>
                    <th
                      scope="colgroup"
                      :colspan="residentGenderRatioData.labels.length"
                    >
                      성별
                    </th>
                  </tr>
                  <tr>
                    <th
                      scope="col"
                      v-for="(label, index) in residentGenderRatioData.labels"
                      :key="index"
                    >
                      {{ label }}
                    </th>
                  </tr>
                </thead>
                <tbody v-if="residentGenderRatioData.datasets[0]">
                  <tr>
                    <th scope="row">명</th>
                    <td rowspan="2">
                      {{ residentTotalCount | numberTransformer }}
                    </td>
                    <td
                      v-for="(data, index) in residentGenderRatioData
                        .datasets[0].data"
                      :key="index"
                    >
                      {{ data | numberTransformer }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">비율</th>
                    <td
                      v-for="(data, index) in residentGenderRatioData
                        .datasets[0].data"
                      :key="index"
                    >
                      {{ ((data / residentTotalCount) * 100).toFixed(2) }}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="mt-4">
            <DashboardBarChart
              v-if="residentAgeGroupRatioData"
              :chartData="residentAgeGroupRatioData"
              :options="barOptions"
            />
            <div class="mt-4">
              <table
                class="table table-sm"
                v-if="residentAgeGroupCountData && residentTotalCount"
              >
                <thead>
                  <tr>
                    <th scope="col" rowspan="2">구분</th>
                    <th scope="col" rowspan="2">총 인구</th>
                    <th
                      scope="colgroup"
                      :colspan="residentAgeGroupRatioData.labels.length"
                    >
                      연령별
                    </th>
                  </tr>
                  <tr>
                    <th
                      scope="col"
                      v-for="(label, index) in residentAgeGroupRatioData.labels"
                      :key="index"
                    >
                      {{ label }}
                    </th>
                  </tr>
                </thead>
                <tbody v-if="residentAgeGroupRatioData.datasets[0]">
                  <tr>
                    <th scope="row">명</th>
                    <td rowspan="2">
                      {{ residentTotalCount | numberTransformer }}
                    </td>
                    <td
                      v-for="(data, index) in residentAgeGroupRatioData
                        .datasets[0].data"
                      :key="index"
                    >
                      {{ data | numberTransformer }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">비율</th>
                    <td
                      v-for="(data, index) in residentAgeGroupRatioData
                        .datasets[0].data"
                      :key="index"
                    >
                      {{ ((data / residentTotalCount) * 100).toFixed(2) }}%
                    </td>
                  </tr>
                </tbody>
              </table>
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
      </div>
    </section>
    <section class="section">
      <header class="section-header">
        <h3>가구수</h3>
      </header>
      <div class="section-content">
        <template
          v-if="
            !dataLoadingResidential &&
              residentialCountData &&
              residentialRatioData
          "
        >
          <DashboardBarChart
            v-if="residentialRatioData"
            :chartData="residentialRatioData"
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
                      residentialTotalCountData.totalCount | numberTransformer
                    }}
                  </td>
                  <td
                    v-for="(data, index) in residentialCountData"
                    :key="index"
                  >
                    {{ data | numberTransformer }}
                  </td>
                </tr>
                <tr>
                  <th scope="row">비율</th>
                  <td
                    v-for="(data, index) in residentialCountData"
                    :key="index"
                  >
                    {{
                      (
                        (data / residentialTotalCountData.totalCount) *
                        100
                      ).toFixed(2)
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
        <template v-if="!dataLoadingEmplyee">
          <div class="text-center">
            <p>
              <strong style="font-family: fantasy;" class="display-4">{{
                employeeTotalCount | numberTransformer
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
    <section class="section">
      <header class="section-header">
        <h3>유동인구</h3>
      </header>
      <div class="section-content">
        <template
          v-if="!dataLoadingMovingPopulation && movingPopulationGenderData"
        >
          <div
            class="mt-4"
            v-if="
              movingPopulationGenderData['남성'] &&
                movingPopulationGenderData['여성']
            "
          >
            <h5>
              1) 성별
            </h5>
            <div class="mt-4">
              <div>
                <div class="horizontal-stacked-bars">
                  <div
                    class="horizontal-stacked-bar bar-gender-male"
                    :style="
                      `width:${(movingPopulationGenderData['남성'] /
                        movingPopulationTotalCount) *
                        100}%`
                    "
                  >
                    <p>
                      {{
                        (
                          (movingPopulationGenderData['남성'] /
                            movingPopulationTotalCount) *
                          100
                        ).toFixed(2)
                      }}%
                    </p>
                    <span>남성</span>
                  </div>
                  <div
                    class="horizontal-stacked-bar bar-gender-female"
                    :style="
                      `width:${(movingPopulationGenderData['여성'] /
                        movingPopulationTotalCount) *
                        100}%`
                    "
                  >
                    <p>
                      {{
                        (
                          (movingPopulationGenderData['여성'] /
                            movingPopulationTotalCount) *
                          100
                        ).toFixed(2)
                      }}%
                    </p>
                    <span>여성</span>
                  </div>
                  <div
                    class="horizontal-stacked-bar bar-gender-etc"
                    :style="
                      `width:${((movingPopulationTotalCount -
                        (+movingPopulationGenderData['남성'] +
                          +movingPopulationGenderData['여성'])) /
                        movingPopulationTotalCount) *
                        100}%`
                    "
                  ></div>
                </div>
              </div>
              <div class="mt-4">
                <table class="table table-sm" v-if="movingPopulationTotalCount">
                  <thead>
                    <tr>
                      <th scope="col" rowspan="2">구분</th>
                      <th scope="col" rowspan="2">총 인구</th>
                      <th scope="colgroup" colspan="2">
                        셩별
                      </th>
                    </tr>
                    <tr>
                      <th
                        scope="col"
                        v-for="(label, index) in Object.keys(
                          movingPopulationGenderData,
                        )"
                        :key="index"
                      >
                        {{ label }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">명</th>
                      <td rowspan="2">
                        {{ movingPopulationTotalCount | numberTransformer }}
                      </td>
                      <template v-if="movingPopulationAgeData.datasets[0]">
                        <td
                          v-for="(data, index) in Object.values(
                            movingPopulationGenderData,
                          )"
                          :key="index"
                        >
                          {{ data | numberTransformer }}
                        </td>
                      </template>
                    </tr>
                    <tr>
                      <th scope="row">비율</th>
                      <template v-if="movingPopulationAgeData.datasets[0]">
                        <td
                          v-for="(data, index) in Object.values(
                            movingPopulationGenderData,
                          )"
                          :key="index"
                        >
                          {{
                            ((data / movingPopulationTotalCount) * 100).toFixed(
                              2,
                            )
                          }}%
                        </td>
                      </template>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <h5>
              2) 연령별
            </h5>
            <div class="mt-4">
              <DashboardBarChart
                v-if="movingPopulationAgeData"
                :chartData="movingPopulationAgeData"
                :options="barOptions"
              />
              <div class="mt-4">
                <table class="table table-sm" v-if="movingPopulationTotalCount">
                  <thead>
                    <tr>
                      <th scope="col" rowspan="2">구분</th>
                      <th scope="col" rowspan="2">총 인구</th>
                      <th
                        scope="colgroup"
                        :colspan="movingPopulationAgeData.labels.length"
                      >
                        연령별
                      </th>
                    </tr>
                    <tr>
                      <th
                        scope="col"
                        v-for="(label, index) in movingPopulationAgeData.labels"
                        :key="index"
                      >
                        {{ label }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">명</th>
                      <td rowspan="2">
                        {{ movingPopulationTotalCount | numberTransformer }}
                      </td>
                      <template v-if="movingPopulationAgeData.datasets[0]">
                        <td
                          v-for="(data, index) in movingPopulationAgeData
                            .datasets[0].data"
                          :key="index"
                        >
                          {{ data | numberTransformer }}
                        </td>
                      </template>
                    </tr>
                    <tr>
                      <th scope="row">비율</th>
                      <template v-if="movingPopulationAgeData.datasets[0]">
                        <td
                          v-for="(data, index) in movingPopulationAgeData
                            .datasets[0].data"
                          :key="index"
                        >
                          {{
                            ((data / movingPopulationTotalCount) * 100).toFixed(
                              2,
                            )
                          }}%
                        </td>
                      </template>
                    </tr>
                  </tbody>
                </table>
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
      </div>
    </section>
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
  private residentTotalCount = null;
  private residentGenderCountData = null;
  private residentGenderRatioData = null;
  private residentAgeGroupCountData = null;
  private residentAgeGroupRatioData = null;
  private residentialTotalCountData = null;
  private residentialCountData = null;
  private residentialRatioData = null;
  private employeeTotalCount = null;
  private movingPopulationTotalCount = null;
  private movingPopulationGenderData = null;
  private movingPopulationAgeData = null;
  private dataLoadingResident = true;
  private dataLoadingResidential = true;
  private dataLoadingEmplyee = true;
  private dataLoadingMovingPopulation = true;
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
        this.residentTotalCount = res.data.residentialPopulationCount;
      }
    });
  }

  findPopulationGenderRatio() {
    AnalysisTabService.findPopulationGenderRatio(
      this.analysisTabSearchDto,
    ).subscribe(res => {
      if (res) {
        this.residentGenderCountData = res.data[0];
        this.residentGenderRatioData = res.data[1];
      }
    });
  }

  findAgeGroupRatio() {
    this.dataLoadingResident = true;
    AnalysisTabService.findAgeGroupRatio(this.analysisTabSearchDto).subscribe(
      res => {
        if (res) {
          this.dataLoadingResident = false;
          this.residentAgeGroupCountData = res.data[0];
          this.residentAgeGroupRatioData = res.data[1];
        }
      },
    );
  }

  findPopulationResidentialRatio() {
    this.dataLoadingResidential = true;
    AnalysisTabService.findPopulationResidentialRatio(
      this.analysisTabSearchDto,
    ).subscribe(res => {
      if (res) {
        this.dataLoadingResidential = false;
        this.residentialTotalCountData = res.data[0];
        this.residentialCountData = res.data[1].datasets[0].data;
        this.residentialRatioData = res.data[1];
      }
    });
  }

  findPopulationEmployeeCount() {
    this.dataLoadingEmplyee = true;
    AnalysisTabService.findPopulationEmployeeCount(
      this.analysisTabSearchDto,
    ).subscribe(res => {
      if (res) {
        this.dataLoadingEmplyee = false;
        this.employeeTotalCount = res.data.totalCount;
      }
    });
  }
  findMovingPopulationCount() {
    AnalysisTabService.findMovingPopulationCount(
      this.analysisTabSearchDto,
    ).subscribe(res => {
      if (res) {
        this.movingPopulationTotalCount = res.data.totalCount;
      }
    });
  }

  findMovingPopulationGenderAndAgeRatio() {
    this.dataLoadingMovingPopulation = true;
    AnalysisTabService.findMovingPopulationGenderAndAgeRatio(
      this.analysisTabSearchDto,
    ).subscribe(res => {
      if (res) {
        this.dataLoadingMovingPopulation = false;
        this.movingPopulationGenderData = res.data[0];
        this.movingPopulationAgeData = res.data[1];
      }
    });
  }

  findAnalysisPopulation() {
    this.findPopulationResidentCount();
    this.findPopulationGenderRatio();
    this.findAgeGroupRatio();
    this.findPopulationResidentialRatio();
    this.findPopulationEmployeeCount();
    this.findMovingPopulationCount();
    this.findMovingPopulationGenderAndAgeRatio();
  }

  created() {
    setTimeout(() => {
      this.analysisTabSearchDto.bdongCode = this.bdongCode;
      this.findAnalysisPopulation();
    }, 1000);
  }
}
</script>
