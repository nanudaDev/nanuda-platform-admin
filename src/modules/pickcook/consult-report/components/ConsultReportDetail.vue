<template>
  <div id="report" v-if="consultResponseV3Dto" ref="report">
    <b-tabs fill nav-wrapper-class="sticky-top">
      <b-tab active @click="goTop()">
        <template #title>
          <div class="tab-header">
            <h4>
              <b-icon icon="bar-chart"></b-icon>
              <span class="ml-2">상권분석 요약자료</span>
            </h4>
          </div>
        </template>
        <section class="section">
          <header class="section-header">
            <h3 class="title">상권분석 요약자료</h3>
          </header>
          <div class="section-content">
            <template v-if="salesResponseDto">
              <b-row>
                <b-col
                  cols="12"
                  :lg="
                    salesResponseDto.hdong && salesResponseDto.hdong.hdongCode
                      ? 8
                      : 12
                  "
                >
                  <b-form-row v-if="consultResponseV3Dto">
                    <b-col cols="4">
                      <b-form-group label="창엄자명" label-align="left">
                        <b-form-input
                          v-model="consultResponseV3Dto.name"
                          readonly
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col cols="4">
                      <b-form-group label="연락처" label-align="left">
                        <b-form-input
                          v-model="consultResponseV3Dto.phone"
                          readonly
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col
                      cols="4"
                      v-if="consultResponseV3Dto.fnbOwnerCodeStatus"
                    >
                      <b-form-group label="창업자유형" label-align="left">
                        <b-form-input
                          v-model="
                            consultResponseV3Dto.fnbOwnerCodeStatus.comment
                          "
                          readonly
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-form-row>
                  <b-form-row>
                    <b-col cols="4">
                      <b-form-group label="창업 지역" label-align="left">
                        <b-form-input
                          v-model="reportAddress"
                          @click="showAddressModal()"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col cols="4">
                      <b-form-group label="창업 업종" label-align="left">
                        <b-form-select
                          v-model="salesRequestDto.mediumCategoryCode"
                        >
                          <b-form-select-option
                            v-for="category in kbMediumCategories"
                            :key="category"
                            :value="category"
                          >
                            {{ category | kbCategoryTransformer }}
                          </b-form-select-option>
                        </b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col cols="4">
                      <b-row align-v="end" no-gutters>
                        <b-col cols="8">
                          <b-form-group label="창업 유형" label-align="left">
                            <b-form-select v-model="salesRequestDto.storeType">
                              <b-form-select-option
                                v-for="type in storeTypes"
                                :key="type"
                                :value="type"
                              >
                                {{ type }}
                              </b-form-select-option>
                            </b-form-select>
                          </b-form-group>
                        </b-col>
                        <b-col cols="4"
                          ><b-button
                            variant="info"
                            size="lg"
                            block
                            class="ml-2"
                            style="margin-bottom: 1rem"
                            @click="getSalesData()"
                          >
                            상권분석
                          </b-button></b-col
                        >
                      </b-row>
                    </b-col>
                  </b-form-row>
                  <div
                    class="data-info-box"
                    v-if="salesResponseDto && revenueData.length > 0"
                  >
                    <header class="data-info-box-header">
                      <h4>상권매출 현황</h4>
                    </header>
                    <div class="data-info-box-content">
                      <RevenueChart
                        :chartData="revenueChartData"
                        :revenueData="revenueData"
                      />
                    </div>
                  </div>
                </b-col>
                <b-col
                  cols="12"
                  lg="4"
                  v-if="
                    salesResponseDto.hdong && salesResponseDto.hdong.hdongCode
                  "
                >
                  <b-alert variant="info" show>
                    <p class="text-center">행정동 중심지 반경 1km</p>
                  </b-alert>
                  <div
                    id="map"
                    style="width:100%; min-height:300px; height:calc(100% - 6em)"
                  ></div>
                </b-col>
              </b-row>
              <b-row v-if="salesResponseDto">
                <b-col cols="12" v-if="salesResponseDto.livingPopulation">
                  <div class="data-info-box">
                    <header class="data-info-box-header">
                      <h4>
                        인구 및 주 소비 패턴 분석
                        <span> (선택한 행정동 기준)</span>
                      </h4>
                    </header>
                    <div class="data-info-box-content">
                      <p>
                        <strong class="text-primary">
                          <span
                            >거주인구
                            {{
                              salesResponseDto.livingPopulation
                                | numeralTransformer
                            }}명</span
                          >
                          /
                          <span>
                            세대수
                            {{
                              salesResponseDto.sedeCount | numeralTransformer
                            }}세대
                          </span>
                          /
                          <span>
                            직장인구
                            {{
                              salesResponseDto.employeeCount
                                | numeralTransformer
                            }}명
                          </span>
                        </strong>
                        상주 중입니다.
                      </p>
                    </div>
                  </div>
                </b-col>
                <b-col
                  cols="12"
                  xl="5"
                  v-if="
                    salesResponseDto.mainAgeGroup && salesResponseDto.mainGagu
                  "
                >
                  <div class="data-info-box">
                    <div class="data-info-box-content">
                      <b-row>
                        <b-col cols="3">
                          <h5>주 소비층</h5>
                        </b-col>
                        <b-col cols="9">
                          <p>
                            <strong class="text-primary"
                              >{{ computedMainGagu }}
                            </strong>
                            이며,
                            <strong class="text-primary">{{
                              computedMainAgeGroup
                            }}</strong
                            >입니다.
                          </p>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col cols="12" md="6">
                          <div class="doughnut-chart-container">
                            <div class="doughnut-chart-wrapper">
                              <DoughnutChart
                                :chartData="mainGaguChartData"
                                :labels="
                                  Object.keys(salesResponseDto.gaguRatio)
                                "
                                :datasetsData="
                                  Object.values(salesResponseDto.gaguRatio)
                                "
                              />
                              <div class="doughnut-chart-text">
                                <div>
                                  <span>{{ computedMainGagu }}</span>
                                  <p>
                                    {{
                                      Math.round(
                                        salesResponseDto.mainGaguRatio * 10,
                                      ) / 10
                                    }}%
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </b-col>
                        <b-col cols="12" md="6">
                          <div class="doughnut-chart-container">
                            <div class="doughnut-chart-wrapper">
                              <DoughnutChart
                                :chartData="mainAgeGroupChartData"
                                :labels="Object.keys(salesResponseDto.ageRatio)"
                                :datasetsData="
                                  Object.values(salesResponseDto.ageRatio)
                                "
                              />

                              <div class="doughnut-chart-text">
                                <div>
                                  <span>{{ computedMainAgeGroup }}</span>
                                  <p>
                                    {{
                                      Math.round(
                                        salesResponseDto.mainAgeGroupRatio * 10,
                                      ) / 10
                                    }}%
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </b-col>
                      </b-row>
                    </div>
                    <div></div>
                  </div>
                </b-col>
                <b-col
                  cols="12"
                  xl="7"
                  v-if="salesResponseDto.offlineRevenueRatio"
                >
                  <div class="data-info-box">
                    <div class="data-info-box-content">
                      <b-row>
                        <b-col cols="12" xl="2">
                          <h5 class="mb-4">
                            소비 패턴<br />
                            <span>식사&amp;배달 비중</span>
                          </h5>
                        </b-col>
                        <b-col cols="12" xl="10">
                          <template
                            v-if="salesResponseDto.deliveryRevenueRatio >= 20"
                          >
                            <p>
                              <strong class="text-primary">배달</strong>을
                              <strong class="text-primary"
                                >필수적으로 병행하여 운영</strong
                              >
                              해야 합니다
                            </p>
                          </template>
                          <template v-else>
                            <p>
                              <strong class="text-primary">배달</strong>을
                              <strong class="text-primary"
                                >함께 병행하여 운영</strong
                              >하면 좋습니다
                            </p>
                          </template>
                          <b-row no-gutters class="mt-4">
                            <b-col cols="2">
                              <p class="consumption-pattern-labels">
                                <span class="consumption-pattern-label">
                                  매장 식사 비중
                                </span>

                                <strong
                                  class="
                                    consumption-pattern-value
                                    value-restaurant
                                  "
                                  >{{
                                    Math.round(
                                      salesResponseDto.offlineRevenueRatio * 10,
                                    ) / 10
                                  }}%</strong
                                >
                              </p>
                            </b-col>
                            <b-col cols="8">
                              <div class="consumption-pattern-bar-charts">
                                <div
                                  class="consumption-pattern-bar bar-restaurant"
                                  :style="
                                    `width: ${salesResponseDto.offlineRevenueRatio}%`
                                  "
                                ></div>
                                <div
                                  class="consumption-pattern-bar bar-delivery"
                                  :style="
                                    `width: ${salesResponseDto.deliveryRevenueRatio}%`
                                  "
                                ></div>
                              </div>
                            </b-col>
                            <b-col cols="2">
                              <p class="consumption-pattern-labels">
                                <span class="consumption-pattern-label">
                                  배달 식사 비중
                                </span>
                                <strong
                                  class="
                                    consumption-pattern-value
                                    value-delivery
                                  "
                                >
                                  {{
                                    Math.round(
                                      salesResponseDto.deliveryRevenueRatio *
                                        10,
                                    ) / 10
                                  }}%
                                </strong>
                              </p>
                            </b-col>
                          </b-row>
                        </b-col>
                      </b-row>
                    </div>
                    <div class="data-info-box-content">
                      <b-row>
                        <b-col cols="12" xl="2">
                          <h5 class="mb-4">
                            음식점 현황<br />
                            <span>식사&amp;배달 비중</span>
                          </h5>
                        </b-col>
                        <b-col cols="12" xl="10">
                          <b-row no-gutters>
                            <b-col cols="4">
                              <div class="store-status-info-box">
                                <h6>
                                  <b-badge variant="info">점포수</b-badge>
                                </h6>
                                <div class="mb-4">
                                  <p>
                                    <span class="store-status-info-label">{{
                                      salesRequestDto.mediumCategoryCode
                                        | kbCategoryTransformer
                                    }}</span>
                                    <strong
                                      class="
                                        store-status-info-value
                                        text-primary
                                      "
                                    >
                                      {{
                                        salesResponseDto.mediumCategoryStoreRatio.toFixed(
                                          0,
                                        )
                                      }}%
                                    </strong>
                                  </p>
                                </div>
                              </div>
                            </b-col>
                            <b-col cols="4">
                              <div class="store-status-info-box">
                                <h6>
                                  <b-badge variant="info">폐업률</b-badge>
                                </h6>
                                <div class="mb-4">
                                  <p>
                                    <span class="store-status-info-label"
                                      >상권평균</span
                                    >
                                    <strong
                                      class="
                                        store-status-info-value
                                        text-primary
                                      "
                                    >
                                      {{
                                        salesResponseDto.closedStoreRate.toFixed(
                                          0,
                                        )
                                      }}%
                                    </strong>
                                  </p>
                                  <p>
                                    <span class="store-status-info-label">{{
                                      salesRequestDto.mediumCategoryCode
                                        | kbCategoryTransformer
                                    }}</span>
                                    <strong
                                      class="
                                        store-status-info-value
                                        text-primary
                                      "
                                    >
                                      {{
                                        salesResponseDto.mediumCategoryClosedStoreRate.toFixed(
                                          0,
                                        )
                                      }}%
                                    </strong>
                                  </p>
                                </div>
                              </div>
                            </b-col>
                            <b-col cols="4">
                              <div class="store-status-info-box">
                                <h6>
                                  <b-badge variant="info"
                                    >평균 영업 기간
                                  </b-badge>
                                </h6>
                                <div class="mb-4">
                                  <p>
                                    <span class="store-status-info-label"
                                      >상권평균</span
                                    >
                                    <strong
                                      class="
                                        store-status-info-value
                                        text-primary
                                      "
                                    >
                                      {{ salesResponseDto.survivalYears }}년
                                    </strong>
                                  </p>
                                  <p>
                                    <span class="store-status-info-label">
                                      {{
                                        salesRequestDto.mediumCategoryCode
                                          | kbCategoryTransformer
                                      }}</span
                                    >
                                    <strong
                                      class="
                                        store-status-info-value
                                        text-primary
                                      "
                                    >
                                      {{
                                        salesResponseDto.mediumCategorySurvivalYears
                                      }}년
                                    </strong>
                                  </p>
                                </div>
                              </div>
                            </b-col>
                          </b-row>
                        </b-col>
                      </b-row>
                    </div>
                    <div></div>
                  </div>
                </b-col>
              </b-row>
              <b-row v-if="salesResponseDto">
                <b-col
                  cols="12"
                  v-if="salesResponseDto.mediumCategoryRevenueRatio"
                >
                  <div class="data-info-box">
                    <header class="data-info-box-header">
                      <h4>
                        매출 분석
                        <span> (업종별 매출 기준)</span>
                      </h4>
                    </header>
                    <div class="data-info-box-content">
                      <b-row>
                        <b-col
                          cols="12"
                          xl="4"
                          v-if="salesResponseDto.mediumCategoryRevenueRatio"
                        >
                          <div>
                            <h5>업종별 매출비중</h5>
                            <div class="mt-4">
                              <BarChart
                                :chartData="kbCategoryRevenueChartData"
                                :labels="
                                  Object.keys(
                                    salesResponseDto.mediumCategoryRevenueRatio,
                                  )
                                "
                                :datasetsData="
                                  Object.values(
                                    salesResponseDto.mediumCategoryRevenueRatio,
                                  )
                                "
                              />
                            </div>
                          </div>
                        </b-col>
                        <b-col
                          cols="12"
                          xl="8"
                          v-if="
                            salesResponseDto.mediumCategoryGenderRevenueRatio
                          "
                        >
                          <div>
                            <h5>성별 매출비중</h5>
                            <b-row no-gutters class="mt-4">
                              <b-col cols="2">
                                <p class="consumption-pattern-labels">
                                  <span class="consumption-pattern-label">
                                    남성
                                  </span>

                                  <strong
                                    class="
                                      consumption-pattern-value
                                      value-restaurant
                                    "
                                    >{{
                                      Math.round(
                                        salesResponseDto
                                          .mediumCategoryGenderRevenueRatio[
                                          '1'
                                        ] * 10,
                                      ) / 10
                                    }}%</strong
                                  >
                                </p>
                              </b-col>
                              <b-col cols="8">
                                <div class="consumption-pattern-bar-charts">
                                  <div
                                    class="
                                      consumption-pattern-bar
                                      bar-restaurant
                                    "
                                    :style="
                                      `width: ${salesResponseDto.mediumCategoryGenderRevenueRatio['1']}%`
                                    "
                                  ></div>
                                  <div
                                    class="consumption-pattern-bar bar-delivery"
                                    :style="
                                      `width: ${salesResponseDto.mediumCategoryGenderRevenueRatio['2']}%`
                                    "
                                  ></div>
                                </div>
                              </b-col>
                              <b-col cols="2">
                                <p class="consumption-pattern-labels">
                                  <span class="consumption-pattern-label">
                                    여성
                                  </span>
                                  <strong
                                    class="
                                      consumption-pattern-value
                                      value-delivery
                                    "
                                    >{{
                                      Math.round(
                                        salesResponseDto
                                          .mediumCategoryGenderRevenueRatio[
                                          '2'
                                        ] * 10,
                                      ) / 10
                                    }}%</strong
                                  >
                                </p>
                              </b-col>
                            </b-row>
                          </div>
                          <div class="data-info-box mt-4">
                            <header class="data-info-box-header">
                              <h5>요일별 &amp; 시간대별 매출비중</h5>
                            </header>
                            <div class="data-info-box-content">
                              <b-col
                                cols="12"
                                v-if="salesResponseDto.weekDayRevenueRatio"
                              >
                                <b-row align-v="center">
                                  <b-col cols="12" md="6">
                                    <div class="doughnut-chart-container my-4">
                                      <div class="doughnut-chart-wrapper">
                                        <DoughnutChart
                                          :chartData="weekDayRevenueChartData"
                                          :labels="
                                            Object.keys(
                                              salesResponseDto.weekDayRevenueRatio,
                                            )
                                          "
                                          :datasetsData="
                                            Object.values(
                                              salesResponseDto.weekDayRevenueRatio,
                                            )
                                          "
                                        />
                                        <div class="doughnut-chart-text">
                                          <div>
                                            <p>
                                              {{
                                                maxRevenueWeekday
                                                  | weekDayTransformer
                                              }}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="doughnut-chart-legend">
                                        <div class="legend-label-list">
                                          <p
                                            v-for="(label,
                                            index) in Object.keys(
                                              salesResponseDto.weekDayRevenueRatio,
                                            )"
                                            :key="index"
                                          >
                                            <span
                                              class="legend-label-point"
                                              :style="{
                                                'background-color':
                                                  weekDayRevenueChartData
                                                    .datasets[0]
                                                    .backgroundColor[index],
                                              }"
                                            ></span>
                                            <span class="legend-label-text">
                                              {{
                                                label | weekDayTransformer
                                              }}</span
                                            >
                                          </p>
                                        </div>
                                        <div class="legend-value-list">
                                          <p
                                            v-for="(data,
                                            index) in Object.values(
                                              salesResponseDto.weekDayRevenueRatio,
                                            )"
                                            :key="index"
                                          >
                                            <span class="legend-value">
                                              {{ data }}%</span
                                            >
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </b-col>
                                  <b-col cols="12" md="6">
                                    <div class="doughnut-chart-container my-4">
                                      <div class="doughnut-chart-wrapper">
                                        <DoughnutChart
                                          :chartData="hourRevenueChartData"
                                          :labels="
                                            Object.keys(
                                              salesResponseDto.hourRevenueRatio,
                                            )
                                          "
                                          :datasetsData="
                                            Object.values(
                                              salesResponseDto.hourRevenueRatio,
                                            )
                                          "
                                        />
                                        <div class="doughnut-chart-text">
                                          <div>
                                            <p>
                                              {{
                                                maxRevenueHour | hourTransformer
                                              }}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="doughnut-chart-legend">
                                        <div class="legend-label-list">
                                          <p
                                            v-for="(label,
                                            index) in Object.keys(
                                              salesResponseDto.hourRevenueRatio,
                                            )"
                                            :key="index"
                                          >
                                            <span
                                              class="legend-label-point"
                                              :style="{
                                                'background-color':
                                                  hourRevenueChartData
                                                    .datasets[0]
                                                    .backgroundColor[index],
                                              }"
                                            ></span>
                                            <span class="legend-label-text">
                                              {{
                                                label | hourTransformer
                                              }}</span
                                            >
                                          </p>
                                        </div>
                                        <div class="legend-value-list">
                                          <p
                                            v-for="(data,
                                            index) in Object.values(
                                              salesResponseDto.hourRevenueRatio,
                                            )"
                                            :key="index"
                                          >
                                            <span class="legend-value">
                                              {{ data }}%</span
                                            >
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </b-col>
                                </b-row>
                              </b-col>
                            </div>
                          </div>
                        </b-col>
                      </b-row>
                    </div>
                    <div
                      class="data-info-box-content"
                      v-if="salesRequestDto.mediumCategoryCode"
                    >
                      <p>
                        해당 행정동에서
                        <strong class="text-primary">
                          {{
                            salesRequestDto.mediumCategoryCode
                              | kbCategoryTransformer
                          }}</strong
                        >의 매출은
                        <strong class="text-primary"
                          >{{ mediumCategoryRank }}순위</strong
                        >입니다.
                        <br />
                        <strong class="text-primary">
                          {{
                            salesRequestDto.mediumCategoryCode
                              | kbCategoryTransformer
                          }}</strong
                        >의 경우
                        <strong class="text-primary"
                          >{{ salesResponseDto.mainAge }}대 /
                          {{
                            parseInt(mainGender) | genderNumberTransformer
                          }}</strong
                        >의 매출이 가장 높으며,
                        <strong class="text-primary">{{
                          salesResponseDto.revenuePerOrder
                        }}</strong>
                        메뉴의 판매가 높습니다. <br />
                        <strong class="text-primary">{{
                          maxRevenueWeekday | weekDayTransformer
                        }}</strong>
                        매출이 우세하며,
                        <strong class="text-primary">{{
                          maxRevenueHour | hourTransformer
                        }}</strong
                        >에 주력할 수 있는 메뉴를 도입해야 합니다.
                      </p>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row v-if="salesResponseDto">
                <b-col
                  cols="12"
                  v-if="
                    salesResponseDto.recommendedMenu &&
                      salesResponseDto.recommendedMenu.length > 0
                  "
                >
                  <div class="data-info-box">
                    <header class="data-info-box-header">
                      <h4
                        v-if="
                          salesResponseDto.hdong &&
                            salesResponseDto.hdong.hdongName
                        "
                      >
                        {{ salesResponseDto.hdong.hdongName }} 추천메뉴
                      </h4>
                    </header>
                    <div class="data-info-box-content">
                      <div class="mb-4">
                        <h5 class="text-primary">
                          픽쿡에서는 상권의 입지, 인구, 매출, 소비패턴, 매출 등
                          다양한 요인을 분석한 결과로 최적의 메뉴를 추천합니다
                        </h5>
                      </div>
                      <b-row>
                        <b-col
                          cols="4"
                          v-for="(menu,
                          index) in salesResponseDto.recommendedMenu"
                          :key="index"
                        >
                          <div class="recommended-menu-info-box">
                            <div class="recommended-menu-img">
                              <b-img-lazy
                                :src="
                                  `https://kr.object.ncloudstorage.com/common-storage-pickcook/menu/${menu.sSmallCategoryCode}.jpg`
                                "
                              ></b-img-lazy>
                            </div>
                            <div class="recommended-menu-info">
                              <div>
                                <b-badge variant="warning">{{
                                  menu.pkMediumCategoryName
                                }}</b-badge>
                                <b-badge variant="primary">{{
                                  menu.pkSmallCategoryName
                                }}</b-badge>
                              </div>
                              <h5>{{ menu.pkMenuName }}</h5>
                              <p>
                                추천지수
                                <strong class="text-primary">{{
                                  menu.averageScore
                                }}</strong
                                >%
                              </p>
                            </div>
                          </div>
                        </b-col>
                      </b-row>
                    </div>
                  </div>
                </b-col>
                <b-col cols="12" v-if="salesResponseDto.recommendMenuHdong">
                  <div class="data-info-box">
                    <header class="data-info-box-header">
                      <h4>반경 3km이내의 추천 메뉴</h4>
                    </header>
                    <div class="data-info-box-content">
                      <b-row>
                        <b-col
                          cols="4"
                          v-for="(menu, index) in recommendMenuHdong"
                          :key="index"
                        >
                          <b-img-lazy
                            :src="
                              `https://kr.object.ncloudstorage.com/common-storage-pickcook/menu/pickcook_${menu}.png`
                            "
                          ></b-img-lazy>
                          <div class="text-center">
                            <p>{{ index + 1 }}위 {{ menu }}</p>
                          </div>
                        </b-col>
                      </b-row>
                      <div class="row-box mt-4 pt-4">
                        <p>
                          해당 행정동에서는 외식업 전체적으로
                          <strong class="text-primary"
                            >{{
                              salesResponseDto.mainHourHdong | hourTransformer
                            }},
                            {{
                              salesResponseDto.mainGenderHdong
                                | genderNumberTransformer
                            }}, {{ salesResponseDto.mainAgeHdong }}</strong
                          >의 매출이 높습니다. <br />
                          이와 유사한 지역에서는
                          <strong class="text-primary">
                            {{
                              Object.values(
                                salesResponseDto.recommendMenuHdong,
                              ).join(',')
                            }}
                          </strong>
                          메뉴의 판매량이 높습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </template>
          </div>
        </section>
      </b-tab>
      <b-tab @click="getBaeminData()">
        <template #title>
          <div class="tab-header">
            <h4>
              <b-icon icon="truck"></b-icon>
              <span class="ml-2">배달업종 상세현황</span>
            </h4>
          </div>
        </template>
        <section class="section">
          <template v-if="consultBaeminReport">
            <header class="section-header">
              <h3 class="title">
                {{ consultBaeminReport.baeminCategoryCode }}
                업종 유사상권
              </h3>
            </header>
            <div class="section-content">
              <b-row>
                <b-col cols="6" lg="4">
                  <div class="baemin-info-box">
                    <div>
                      <p class="baemin-info-value">
                        <strong>{{ consultBaeminReport.averageScore }}</strong>
                      </p>
                      <p class="baemin-info-label">
                        <span>평점</span>
                      </p>
                    </div>
                  </div>
                </b-col>
                <b-col cols="6" lg="4">
                  <div class="baemin-info-box">
                    <div>
                      <p class="baemin-info-value">
                        <strong>{{
                          consultBaeminReport.averageOrderRate
                            | numeralTransformer
                        }}</strong>
                      </p>
                      <p class="baemin-info-label">
                        <span>평균 주문수<br />(6개월 합산)</span>
                      </p>
                    </div>
                  </div>
                </b-col>
                <b-col cols="6" lg="4">
                  <div class="baemin-info-box">
                    <div>
                      <p class="baemin-info-value">
                        <strong>{{
                          consultBaeminReport.averageMonthlyOrderRate
                            | numeralTransformer
                        }}</strong>
                      </p>
                      <p class="baemin-info-label">
                        <span>월 평균 주문수</span>
                      </p>
                    </div>
                  </div>
                </b-col>
                <b-col cols="6" lg="4">
                  <div class="baemin-info-box">
                    <div>
                      <p class="baemin-info-value">
                        <strong>{{
                          consultBaeminReport.minimumOrderPrice
                            | numeralTransformer
                        }}</strong>
                      </p>
                      <p class="baemin-info-label">
                        <span>최소 주문금액</span>
                      </p>
                    </div>
                  </div>
                </b-col>
                <b-col cols="6" lg="4">
                  <div class="baemin-info-box">
                    <div>
                      <p class="baemin-info-value">
                        <strong>{{
                          consultBaeminReport.averageDeliveryTip
                            | numeralTransformer
                        }}</strong>
                      </p>
                      <p class="baemin-info-label">
                        <span>배달팁</span>
                      </p>
                    </div>
                  </div>
                </b-col>
                <b-col cols="6" lg="4">
                  <div class="baemin-info-box">
                    <div>
                      <p class="baemin-info-value">
                        <strong>{{
                          consultBaeminReport.averageLikeRate
                            | numeralTransformer
                        }}</strong>
                      </p>
                      <p class="baemin-info-label">
                        <span>찜 수</span>
                      </p>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <div class="data-info-box">
                <div class="data-info-box-content">
                  <p>
                    <strong class="text-primary">{{
                      consultBaeminReport.baeminCategoryCode
                    }}</strong>
                    업종의 경우
                    <strong class="text-primary">{{ computedMainGagu }}</strong>
                    상권에서 평균
                    <strong class="text-primary">{{
                      consultBaeminReport.averageOrderRate | numeralTransformer
                    }}</strong>
                    건의 주문수를 보이며, 배달팁 적정 금액은
                    <strong class="text-primary">{{
                      consultBaeminReport.averageDeliveryTip
                        | numeralTransformer
                    }}</strong
                    >원이며, 맛집 랭킹에 들어가기 위해서는 최소
                    <strong class="text-primary">{{
                      consultBaeminReport.averageLikeRate | numeralTransformer
                    }}</strong
                    >개 이상의 찜이 필요합니다.
                  </p>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="bg-light text-center p-4">
              <p>배민 데이터 정보가 필요합니다</p>
              <div class="mt-2">
                <b-button
                  variant="primary"
                  @click="
                    $router.push({
                      name: 'ConsultResponseV3Detail',
                      params: {
                        id: $route.params.id,
                      },
                    })
                  "
                >
                  입력하기
                </b-button>
              </div>
            </div>
          </template>
        </section>
      </b-tab>
      <b-tab @click="goTop()">
        <template #title>
          <div class="tab-header">
            <h4>
              <b-icon icon="file-earmark"></b-icon>
              <span class="ml-2">신규창업자 영업자료</span>
            </h4>
          </div>
        </template>
        <div class="row-box" v-for="n in 18" :key="n">
          <b-img-lazy
            :src="
              `https://kr.object.ncloudstorage.com/common-storage-pickcook/sales/new_sales_data_${
                n > 10 ? n : '0' + n
              }.png`
            "
          >
          </b-img-lazy>
        </div>
      </b-tab>
      <b-tab @click="goTop()">
        <template #title>
          <div class="tab-header">
            <h4>
              <b-icon icon="file-earmark"></b-icon>
              <span class="ml-2">기창업자 영업자료</span>
            </h4>
          </div>
        </template>
        <div class="row-box" v-for="n in 14" :key="n">
          <b-img-lazy
            :src="
              `https://kr.object.ncloudstorage.com/common-storage-pickcook/sales/cur_sales_data_${
                n > 10 ? n : '0' + n
              }.png`
            "
          >
          </b-img-lazy>
        </div>
      </b-tab>
    </b-tabs>

    <!-- 주소 검색 모달 -->
    <b-modal id="postcode" title="주소 검색" hide-footer>
      <vue-daum-postcode
        style="height:500px; overflow-y:auto;"
        @complete="setAddress($event)"
      />
    </b-modal>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import {
  BaeminReportDto,
  ConsultResponseV3Dto,
  SalesRequestDto,
  SalesResponseDto,
} from '@/dto';
import {
  CONST_KB_MEDIUM_CATEGORY,
  CONST_STORE_TYPE,
  KB_MEDIUM_CATEGORY,
  KB_MEDIUM_CATEGORY_KOREAN,
  STORE_TYPE,
} from '@/services/shared';
import { Component } from 'vue-property-decorator';
import RevenueChart from '../add-on/RevenueChart.vue';
import DoughnutChart from '../add-on/DoughnutChart.vue';
import BarChart from '../add-on/BarChart.vue';

import ConsultResponseV3Service from '@/services/pickcook/consult-response-v3.service';

@Component({
  name: 'ConsultReportDetail',
  components: {
    RevenueChart,
    DoughnutChart,
    BarChart,
  },
})
export default class ConsultReportDetail extends BaseComponent {
  // sales data
  private salesRequestDto = new SalesRequestDto();
  private salesResponseDto: any = new SalesResponseDto();

  // 반경내 추천메뉴
  private recommendMenuHdong = [];

  // 창업 업종
  private kbMediumCategories: KB_MEDIUM_CATEGORY[] = [
    ...CONST_KB_MEDIUM_CATEGORY,
  ];

  // 창업 유형
  private storeTypes: STORE_TYPE[] = [...CONST_STORE_TYPE];

  // 업종별 매출 비율
  private mediumCategoryRank = 0;
  private kbCategoryRevenueChartData = {
    datasets: [
      {
        backgroundColor: [
          'rgb(68, 114, 196)',
          'rgb(68, 114, 196)',
          'rgb(68, 114, 196)',
          'rgb(68, 114, 196)',
          'rgb(68, 114, 196)',
          'rgb(68, 114, 196)',
          'rgb(68, 114, 196)',
          'rgb(68, 114, 196)',
          'rgb(68, 114, 196)',
          'rgb(68, 114, 196)',
          'rgb(68, 114, 196)',
        ],
      },
    ],
  };

  // 주 소비층
  get computedMainGagu() {
    if (this.salesResponseDto.mainGagu === 1) {
      return '1~2인 가구';
    } else {
      return '3~4인 가구';
    }
  }

  // 주 연령대
  get computedMainAgeGroup() {
    if (this.salesResponseDto.mainAgeGroup === 2) {
      return '20~40대';
    } else {
      return '30~50대';
    }
  }

  // 주 소비층 차트
  private mainGaguChartData = {
    datasets: [
      {
        backgroundColor: [
          'rgb(46, 79, 139)',
          'rgb(55, 93, 161)',
          'rgb(61, 104, 179)',
          'rgb(68, 114, 196)',
          'rgb(129, 151, 208)',
          'rgb(167, 181, 219)',
          'rgb(195, 204, 229)',
        ],
      },
    ],
  };

  // 주 연령대 차트
  private mainAgeGroupChartData = {
    datasets: [
      {
        backgroundColor: [
          'rgb(46, 79, 139)',
          'rgb(55, 93, 161)',
          'rgb(61, 104, 179)',
          'rgb(68, 114, 196)',
          'rgb(129, 151, 208)',
          'rgb(167, 181, 219)',
          'rgb(195, 204, 229)',
        ],
      },
    ],
  };

  // 요일별 매출 비율 차트
  private maxRevenueWeekday: any;
  private weekDayRevenueChartData = {
    datasets: [
      {
        backgroundColor: [
          'rgb(46, 79, 139)',
          'rgb(55, 93, 161)',
          'rgb(61, 104, 179)',
          'rgb(68, 114, 196)',
          'rgb(129, 151, 208)',
          'rgb(167, 181, 219)',
          'rgb(195, 204, 229)',
        ],
      },
    ],
  };

  // 시간대별 매출 비율 차트
  private maxRevenueHour: any;
  private hourRevenueChartData = {
    datasets: [
      {
        backgroundColor: [
          'rgb(46, 79, 139)',
          'rgb(61, 104, 179)',
          'rgb(129, 151, 208)',
          'rgb(195, 204, 229)',
        ],
      },
    ],
  };

  // 매출 분석 차트
  private revenueChartData = {
    labels: ['', '최저매출', '평균매출', '최고매출', ''],
    datasets: [
      {
        pointRadius: [0, 5, 15, 5, 0],
        pointHoverRadius: [0, 5, 20, 5, 0],
        pointBackgroundColor: [
          'rgba(196,196,196,1)',
          'rgba(196,196,196,1)',
          'rgba(0,77,138,1)',
          'rgba(196,196,196,1)',
          'rgba(196,196,196,1)',
        ],
      },
    ],
  };

  // 상권매출현황 차트
  private revenueData = [];

  // 성별 매출비중
  private mainGender: any;

  // 배달의민족 상세현황
  private consultBaeminReport = new BaeminReportDto();

  // 지도 가져오기
  private map;
  private reportAddress = '';
  private consultResponseV3Dto = new ConsultResponseV3Dto();

  getSalesData() {
    ConsultResponseV3Service.getSalesData(this.salesRequestDto).subscribe(
      res => {
        if (res) {
          this.salesResponseDto = res.data;

          if (this.salesResponseDto) {
            // 행정동 주소
            this.reportAddress = `${this.salesResponseDto.hdong.sidoName} ${this.salesResponseDto.hdong.guName} ${this.salesResponseDto.hdong.hdongName}`;

            // 행정동 추천 메뉴
            this.recommendMenuHdong = [
              ...Object.values(res.data.recommendMenuHdong),
            ];

            //상권매출현황 차트 데이터
            this.revenueData = [
              0,
              +this.salesResponseDto.minRevenue,
              +this.salesResponseDto.medianRevenue,
              +this.salesResponseDto.maxRevenue,
              parseInt(this.salesResponseDto.maxRevenue) +
                parseInt(this.salesResponseDto.maxRevenue) / 2,
            ];

            // 요일별 매출 분석
            const weekDayRatioObj = this.salesResponseDto.weekDayRevenueRatio;
            this.maxRevenueWeekday = Object.keys(weekDayRatioObj).reduce(
              (a: string, b: string) => {
                return weekDayRatioObj[a] > weekDayRatioObj[b] ? a : b;
              },
            );

            // 시간대별 매출 분석
            const maxHourRatioObj = this.salesResponseDto.hourRevenueRatio;
            this.maxRevenueHour = Object.keys(maxHourRatioObj).reduce(
              (a: string, b: string) => {
                return maxHourRatioObj[a] > maxHourRatioObj[b] ? a : b;
              },
            );

            // 성별 매출 분석
            const maxGenderRatioObj = this.salesResponseDto
              .mediumCategoryGenderRevenueRatio;
            this.mainGender = Object.keys(maxGenderRatioObj).reduce(
              (a: string, b: string) => {
                return maxGenderRatioObj[a] > maxGenderRatioObj[b] ? a : b;
              },
            );

            // 업종 매출 순위

            const mediumCategoryRevenueRatio = this.salesResponseDto
              .mediumCategoryRevenueRatio;

            let sortArr: any[] = [...Object.values(mediumCategoryRevenueRatio)];
            const keysArr = [...Object.keys(mediumCategoryRevenueRatio)];
            const findIdx = keysArr.findIndex(
              e => e === this.salesResponseDto.mediumCategoryCode,
            );
            const sorted = sortArr.slice().sort((a: number, b: number) => {
              return b - a;
            });
            sortArr = sortArr.slice().map(e => {
              return sorted.indexOf(e) + 1;
            });
            this.mediumCategoryRank = parseInt(sortArr[findIdx]);

            //kb 중분류 코드에서 한글로 변경
            const tempObj = {};
            Object.keys(mediumCategoryRevenueRatio).map(e => {
              tempObj[KB_MEDIUM_CATEGORY_KOREAN[e]] =
                mediumCategoryRevenueRatio[e];
            });

            this.$set(
              this.salesResponseDto,
              'mediumCategoryRevenueRatio',
              tempObj,
            );
          }
          this.setMap();
        }
      },
    );
  }

  getConsultData(id) {
    ConsultResponseV3Service.findOne(id).subscribe(res => {
      if (res) {
        this.consultResponseV3Dto = res.data;
        if (res.data.consultBaeminReport) {
          const hdongCode = res.data.consultBaeminReport.hdongCode;
          this.salesRequestDto.hdongCode = hdongCode.toString();
          this.salesRequestDto.mediumCategoryCode =
            res.data.consultBaeminReport.mediumCategoryCode;
          this.getSalesData();
        }
      }
    });
  }

  getBaeminData() {
    ConsultResponseV3Service.findOne(this.$route.params.id).subscribe(res => {
      if (res) {
        this.consultBaeminReport = res.data.consultBaeminReport;
      }
    });
    this.goTop();
  }

  // 지도 가져오기
  setMap() {
    const geocoder = new window.kakao.maps.services.Geocoder();

    const callback = function(result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(result[0].y, result[0].x),
          level: 6,
          minLevel: 3,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        const content = ``;
        const markerPosition = new window.kakao.maps.LatLng(
          result[0].y,
          result[0].x,
        );

        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          // image: markerImage,
        });

        const circle = new window.kakao.maps.Circle({
          map: map,
          center: new window.kakao.maps.LatLng(result[0].y, result[0].x),
          strokeWeight: 2,
          strokeColor: '#ffffff',
          strokeOpacity: 0,
          strokeStyle: 'dashed',
          fillColor: '#89aef1',
          fillOpacity: 0.5,
        });
        circle.setRadius(1000);
        circle.setMap(map);
        customOverlay.setMap(map);
      }
    };

    geocoder.addressSearch(this.reportAddress, callback);
  }

  setAddress(res) {
    this.reportAddress = `${res.sido} ${res.sigungu} ${res.bname}`;
    const geocoder = new window.kakao.maps.services.Geocoder();
    const callback = (results, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        this.salesRequestDto.hdongCode = +results[0].address.h_code;
      }
    };
    geocoder.addressSearch(res.address, callback);
    this.$bvModal.hide('postcode');
  }

  showAddressModal() {
    this.$bvModal.show('postcode');
  }

  goTop() {
    this.$nextTick(() => {
      // this.$refs.report.scrollTop = 0;
      const top = this.$refs.report.offsetTop;
      window.scrollTo(0, top);
    });
  }

  created() {
    const id = this.$route.params.id;
    this.getConsultData(id);
  }
}
</script>
<style lang="scss">
body {
  -webkit-print-color-adjust: exact !important;
}
#report {
  * {
    word-break: keep-all;
  }
  .recommended-menu-info-box {
    text-align: center;
    .recommended-menu-img {
      position: relative;
      padding-bottom: 56.25%;
      border-radius: 1rem;
      overflow: hidden;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .recommended-menu-info {
      margin-top: 2em;
      .badge {
        + .badge {
          margin-left: 0.5em;
        }
      }
      h5 {
        font-size: 2rem !important;
        margin: 0.25em 0;
      }
      p {
        font-size: 1rem;
      }
    }
  }
  .consumption-pattern-labels {
    text-align: center;
    padding: 0 0.5em;
    .consumption-pattern-label {
      display: block;
      font-size: 1rem;
    }
    .consumption-pattern-value {
      font-size: 1.6rem;
      &.value-restaurant {
        color: #0b538d;
      }
      &.value-delivery {
        color: skyblue;
      }
    }
  }
  .consumption-pattern-bar-charts {
    display: flex;
    height: 100%;
    .consumption-pattern-bar {
      width: 100%;
      height: 100%;
      &.bar-restaurant {
        background: #0b538d;
      }
      &.bar-delivery {
        background: skyblue;
      }
    }
  }
  .store-status-info-box {
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-start;
    text-align: center;
    height: 100%;
    border-left: 1px solid #212121;
    p {
      .store-status-info-label {
        display: block;
        font-size: 1.2rem;
      }
      .text-primary {
        font-size: 2.4rem;
      }
      + p {
        margin-top: 1em;
      }
    }
  }
  .data-info-box {
    .data-info-box-header {
      padding-bottom: 1em;
      h4 {
        font-weight: bold;
        font-size: 1.4rem;
        span {
          font-size: 1rem;
        }
      }
    }

    .data-info-box-content {
      padding: 2.5em 1em;
      border-top: 2px solid #212121;
      h5 {
        font-size: 1.2rem;
        font-weight: bold;

        span {
          display: block;
          font-size: 1rem;
        }
      }
      .badge {
        font-size: 1rem;
      }
      p {
        font-size: 1.4rem;
        line-height: 1.2;
      }
    }
  }
  .baemin-info-box {
    background-color: #f5f5f5;
    padding: 4em 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 1.5em 0;
    height: calc(100% - 3em);
    .baemin-info-value {
      font-size: 3.6rem;
      strong {
        font-weight: bold;
        color: #0b538d;
      }
    }
    .baemin-info-label {
      font-size: 1.2rem;
    }
  }
  .section {
    margin-top: 2.5em;
    .section-header {
      padding: 1em 0;
      border-bottom: 3px solid #0b538d;
      h3 {
        font-size: 1.6rem;
        color: #0b538d;
        font-weight: bold;
      }
      + .section-content {
        margin-top: 1.5em;
      }
    }
  }
}
.tabs {
  .sticky-top {
    background-color: #f5f5f5;
  }
  .nav-tabs {
    .nav-link {
      padding: 1.5em 1em;
      .tab-header {
        h4 {
          font-size: 1.2rem;
        }
      }
      &.active {
        h4 {
          color: #0b538d;
          font-weight: bold;
        }
      }
    }
  }
  .tab-content {
    background: #fff;
    border: 1px solid #dcdcdc;
    border-top: 0;
    padding: 2em;
  }

  .row + .row {
    margin-top: 1.5em;
  }
}
.doughnut-chart-container {
  display: flex;
  align-items: center;
  justify-content: center;

  .doughnut-chart-wrapper {
    position: relative;
    width: 160px;
    height: 160px;
    margin-top: 1em;
    .chartjs-render-monitor {
      height: 160px !important;
    }
    .doughnut-chart-text {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      text-align: center;
      span {
        font-size: 14px;
      }
      p {
        font-size: 32px;
      }
    }
  }
  .doughnut-chart-legend {
    width: 100px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    white-space: nowrap;
    margin-left: 2em;
    .legend-label-list {
      .legend-label-point {
        display: inline-block;
        width: 16px;
        height: 16px;
        background-color: #0b538d;
        border-radius: 50%;
      }
      .legend-label-text {
        font-size: 16px;
      }
    }
    .legend-value-list {
      .legend-value {
        font-size: 16px;
        margin-left: 0.5em;
        font-weight: bold;
      }
    }
  }
}
</style>
