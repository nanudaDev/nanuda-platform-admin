<template>
  <main id="main-wrapper">
    <div id="side-nav">
      <h1 class="logo">
        <a href="https://pickcook.kr" target="_blank">
          <b-img-lazy
            src="https://kr.object.ncloudstorage.com/common-storage-pickcook/common/logo_symbol_w.png"
            alt="픽쿡"
          >
          </b-img-lazy
        ></a>
      </h1>
      <nav class="side-nav-tabs">
        <div
          class="side-nav-tab"
          :class="{ 'is-active': activeTab === tab.id }"
          @click="onSideTabClick(tab.id)"
          v-for="(tab, index) in sideNavTabs"
          :key="index"
        >
          <span
            class="tab-icon"
            :style="{
              'background-image':
                'url(' +
                `https://kr.object.ncloudstorage.com/common-storage-pickcook/common/icon_tab_${tab.icon}.svg` +
                ')',
            }"
          ></span>
          <span class="tab-name">{{ tab.name }}</span>
        </div>
      </nav>
    </div>
    <article id="report" v-if="consultResponseV3Dto" ref="report">
      <header class="article-header" style="display:none;">
        <h2>픽쿡 상권분석</h2>
      </header>
      <div class="article-content">
        <transition name="fadeIn">
          <section class="section" v-show="activeTab === 'chart'">
            <header class="section-header">
              <h3 class="title">상권분석 요약자료</h3>
              <span class="desc">Commercial Area Analysis Report</span>
            </header>
            <div class="section-content" v-if="salesResponseDto">
              <b-row>
                <b-col cols="12">
                  <div class="report-card">
                    <b-row align-v="center">
                      <b-col cols="12" xl="9">
                        <b-form-row v-if="consultResponseV3Dto">
                          <b-col cols="6" xl="4">
                            <b-form-group label="창업자명" label-align="left">
                              <b-form-input
                                v-model="consultResponseV3Dto.name"
                                readonly
                              ></b-form-input>
                            </b-form-group>
                          </b-col>
                          <b-col cols="6" xl="4">
                            <b-form-group label="연락처" label-align="left">
                              <b-form-input
                                v-model="consultResponseV3Dto.phone"
                                readonly
                              ></b-form-input>
                            </b-form-group>
                          </b-col>
                          <b-col
                            cols="6"
                            xl="4"
                            v-if="consultResponseV3Dto.fnbOwnerCodeStatus"
                          >
                            <b-form-group label="창업자유형" label-align="left">
                              <b-form-input
                                v-model="
                                  consultResponseV3Dto.fnbOwnerCodeStatus
                                    .comment
                                "
                                readonly
                              ></b-form-input>
                            </b-form-group>
                          </b-col>
                          <b-col cols="6" xl="4">
                            <b-form-group label="창업 지역" label-align="left">
                              <b-form-input
                                v-model="reportAddress"
                                @click="showAddressModal()"
                              ></b-form-input>
                            </b-form-group>
                          </b-col>
                          <b-col cols="6" xl="4">
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
                          <b-col cols="6" xl="4">
                            <b-form-group label="창업 유형" label-align="left">
                              <b-form-select
                                v-model="salesRequestDto.storeType"
                              >
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
                        </b-form-row>
                      </b-col>
                      <b-col cols="12" xl="3">
                        <div class="text-center my-2">
                          <b-button
                            variant="primary"
                            size="lg"
                            block
                            pill
                            @click="getSalesData()"
                            class="btn-search"
                          >
                            상권분석
                          </b-button>
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
                <b-col
                  cols="12"
                  xl="7"
                  v-if="salesResponseDto && revenueData.length > 0"
                >
                  <div class="report-card">
                    <div class="report-card-header">
                      <h4>상권매출 현황</h4>
                    </div>
                    <div class="report-card-content">
                      <RevenueChart
                        :chartData="revenueChartData"
                        :revenueData="revenueData"
                      />
                    </div>
                  </div>
                </b-col>
                <b-col
                  cols="12"
                  xl="5"
                  v-if="
                    salesResponseDto.hdong && salesResponseDto.hdong.hdongCode
                  "
                >
                  <div class="report-card no-body">
                    <div id="map"></div>
                    <div class="map-hdong-name">
                      <b-icon icon="geo-alt"></b-icon>
                      <span class="ml-2">{{
                        salesResponseDto.hdong.hdongName
                      }}</span>
                    </div>
                  </div>
                </b-col>
                <b-col
                  cols="12"
                  xl="7"
                  v-if="salesResponseDto.livingPopulation"
                >
                  <div class="report-card">
                    <header class="report-card-header">
                      <h4>
                        인구 분석
                      </h4>
                      <p>
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
                            salesResponseDto.employeeCount | numeralTransformer
                          }}명
                        </span>
                        상주 중입니다.
                      </p>
                      <p>
                        주소비층은
                        <strong class="text-blue"
                          >{{ computedMainGagu }}
                        </strong>
                        이며,
                        <strong class="text-blue">{{
                          computedMainAgeGroup
                        }}</strong
                        >입니다.
                      </p>
                    </header>
                    <div class="report-card-content">
                      <b-row
                        v-if="
                          salesResponseDto.mainAgeGroup &&
                            salesResponseDto.mainGagu
                        "
                      >
                        <b-col cols="12" lg="6">
                          <div class="doughnut-chart-container mt-4">
                            <div class="doughnut-chart-wrapper">
                              <DoughnutChart
                                :chartData="mainGaguChartData"
                                :labels="
                                  Object.keys(salesResponseDto.gaguRatio)
                                "
                                :datasetsData="
                                  Object.values(salesResponseDto.gaguRatio)
                                "
                                :backgroundColor="computedMainGaguLabelColor"
                              />
                              <div class="doughnut-chart-text">
                                <div>
                                  <span class="badge">{{
                                    computedMainGagu
                                  }}</span>
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
                            <div class="mt-4 pt-2">
                              <div class="legend-label-list text-center">
                                <p
                                  v-for="(value,
                                  name,
                                  index) in salesResponseDto.gaguRatio"
                                  :key="index"
                                >
                                  <span
                                    class="legend-label-point"
                                    :style="{
                                      'background-color': `${computedMainGaguLabelColor[index]}`,
                                    }"
                                  ></span>
                                  <span class="legend-label-text">{{
                                    name
                                  }}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </b-col>
                        <b-col cols="12" lg="6">
                          <div class="doughnut-chart-container mt-4">
                            <div class="doughnut-chart-wrapper">
                              <DoughnutChart
                                :chartData="mainAgeGroupChartData"
                                :labels="Object.keys(computedAgeRatio)"
                                :datasetsData="Object.values(computedAgeRatio)"
                                :backgroundColor="
                                  computedMainAgeGroupLabelColor
                                "
                              />

                              <div class="doughnut-chart-text">
                                <div>
                                  <span class="badge">{{
                                    computedMainAgeGroup
                                  }}</span>
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
                            <div class="mt-4 pt-2">
                              <div class="legend-label-list text-center">
                                <p
                                  v-for="(value,
                                  name,
                                  index) in computedAgeRatio"
                                  :key="index"
                                >
                                  <span
                                    class="legend-label-point"
                                    :style="{
                                      'background-color': `${computedMainAgeGroupLabelColor[index]}`,
                                    }"
                                  ></span>
                                  <span class="legend-label-text">{{
                                    name
                                  }}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </b-col>
                      </b-row>
                    </div>
                  </div>
                </b-col>
                <b-col
                  cols="12"
                  xl="5"
                  v-if="salesResponseDto.offlineRevenueRatio"
                >
                  <div class="report-card">
                    <header class="report-card-header">
                      <h4>
                        소비 패턴
                      </h4>
                      <p>
                        해당 행정동은 <br />
                        <template
                          v-if="salesResponseDto.deliveryRevenueRatio >= 20"
                        >
                          <strong class="text-blue"
                            >배달을 필수적으로 병행</strong
                          >하여 운영 해야 합니다.
                        </template>
                        <template v-else>
                          <strong class="text-blue"
                            >배달을 함께 병행하여 운영</strong
                          >하면 좋습니다.
                        </template>
                      </p>
                    </header>
                    <div class="report-card-content">
                      <b-row class="consumption-pattern-delivery mt-4">
                        <b-col cols="7">
                          <div class="consumption-pattern-delivery-icon">
                            <b-img-lazy
                              src="https://kr.object.ncloudstorage.com/common-storage-pickcook/common/icon_delivery.svg"
                            ></b-img-lazy>
                          </div>
                        </b-col>
                        <b-col cols="5">
                          <div class="consumption-pattern-delivery-text">
                            <div>
                              <h5>배달 적합도</h5>
                              <p>
                                {{
                                  salesResponseDto.deliveryRevenueRatio >= 20
                                    ? '추천'
                                    : '보통'
                                }}
                              </p>
                            </div>
                          </div>
                        </b-col>
                      </b-row>
                      <div class="horizontal-stacked-bar-charts mt-4">
                        <div
                          class="horizontal-stacked-bar bar-restaurant"
                          :style="{
                            width: `${salesResponseDto.offlineRevenueRatio}%`,
                            'background-color':
                              salesResponseDto.offlineRevenueRatio >
                              salesResponseDto.deliveryRevenueRatio
                                ? '#00b1ff'
                                : '#E4EBF2',
                          }"
                        ></div>
                        <div
                          class="horizontal-stacked-bar bar-delivery"
                          :style="{
                            width: `${salesResponseDto.deliveryRevenueRatio}%`,
                            'background-color':
                              salesResponseDto.deliveryRevenueRatio >
                              salesResponseDto.offlineRevenueRatio
                                ? '#00b1ff'
                                : '#E4EBF2',
                          }"
                        ></div>
                      </div>
                      <b-row no-gutters class="mt-4">
                        <b-col cols="6">
                          <p
                            class="consumption-pattern-labels label-restaurant"
                          >
                            <span class="consumption-pattern-label">
                              매장 식사 비중
                            </span>

                            <strong
                              class="
                                    consumption-pattern-value
                                    value-restaurant
                                  "
                              :style="{
                                color:
                                  salesResponseDto.offlineRevenueRatio >
                                  salesResponseDto.deliveryRevenueRatio
                                    ? '#007EEB'
                                    : '#707070',
                              }"
                              >{{
                                Math.round(
                                  salesResponseDto.offlineRevenueRatio * 10,
                                ) / 10
                              }}%</strong
                            >
                          </p>
                        </b-col>
                        <b-col cols="6">
                          <p class="consumption-pattern-labels label-delivery">
                            <span class="consumption-pattern-label">
                              배달 식사 비중
                            </span>
                            <strong
                              class="
                                    consumption-pattern-value
                                    value-delivery
                                  "
                              :style="{
                                color:
                                  salesResponseDto.deliveryRevenueRatio >
                                  salesResponseDto.offlineRevenueRatio
                                    ? '#007EEB'
                                    : '#707070',
                              }"
                            >
                              {{
                                Math.round(
                                  salesResponseDto.deliveryRevenueRatio * 10,
                                ) / 10
                              }}%
                            </strong>
                          </p>
                        </b-col>
                      </b-row>
                    </div>
                  </div>
                </b-col>
                <b-col
                  cols="12"
                  xl="4"
                  v-if="salesResponseDto.mediumCategoryRevenueRatio"
                >
                  <div class="report-card">
                    <header class="report-card-header">
                      <h4>
                        업종별 매출비중
                      </h4>
                      <p>
                        해당 행정동에서
                        <strong class="text-blue">
                          {{
                            salesRequestDto.mediumCategoryCode
                              | kbCategoryTransformer
                          }}</strong
                        >의 매출은
                        <strong class="text-blue"
                          >{{ mediumCategoryRank }}순위</strong
                        >입니다.
                      </p>
                    </header>
                    <div
                      class="report-card-content"
                      v-if="salesRequestDto.mediumCategoryCode"
                    >
                      <div class="mt-4">
                        <BarChart
                          :chartData="kbCategoryRevenueChartData"
                          :labels="mediumCategoryRevenueLabel"
                          :datasetsData="mediumCategoryRevenueValue"
                          style="height:470px;"
                        />
                      </div>
                    </div>
                  </div>
                </b-col>
                <b-col
                  cols="12"
                  xl="8"
                  v-if="salesResponseDto.weekDayRevenueRatio"
                >
                  <div class="report-card h-half">
                    <header class="report-card-header">
                      <h4>요일별 매출비중</h4>
                      <p>
                        해당 행정동은
                        <strong class="text-blue"
                          >{{ maxRevenueWeekday | weekDayTransformer }}요일에
                          가장 높은 매출율</strong
                        >을 보입니다.
                      </p>
                    </header>
                    <div class="report-card-content">
                      <div class="horizontal-stacked-bar-charts mt-4">
                        <div
                          v-for="(ratio, index) in Object.values(
                            salesResponseDto.weekDayRevenueRatio,
                          )"
                          :key="index"
                          class="horizontal-stacked-bar"
                          :class="{
                            'bg-lightblue':
                              parseInt(maxRevenueWeekday) === index + 1,
                          }"
                          :style="
                            `width: ${ratio}%; background: rgba(100,132,163, ${(index +
                              1) /
                              Object.values(
                                salesResponseDto.weekDayRevenueRatio,
                              ).length};`
                          "
                        ></div>
                      </div>
                      <div class="mt-4">
                        <div class="legend-label-list">
                          <p
                            v-for="(value,
                            name,
                            index) in salesResponseDto.weekDayRevenueRatio"
                            :key="index"
                          >
                            <span
                              class="legend-label-point"
                              :style="{
                                'background-color': `rgba(100,132,163, ${(index +
                                  1) /
                                  Object.values(
                                    salesResponseDto.weekDayRevenueRatio,
                                  ).length}`,
                              }"
                              :class="{
                                'bg-lightblue':
                                  parseInt(maxRevenueWeekday) === index + 1,
                              }"
                            ></span>
                            <span class="legend-label-text">{{
                              name | weekDayTransformer
                            }}</span>
                            <span class="legend-label-value"
                              >{{ value }} %</span
                            >
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="report-card h-half"
                    v-if="salesResponseDto.hourRevenueRatio"
                  >
                    <header class="report-card-header">
                      <h4>시간대별 매출비중</h4>
                      <p>
                        해당 행정동은
                        <strong class="text-blue"
                          >{{ maxRevenueHour | hourTransformer }}에 가장 높은
                          매출율</strong
                        >을 보입니다.
                      </p>
                    </header>
                    <div class="report-card-content">
                      <div class="horizontal-stacked-bar-charts mt-4">
                        <div
                          v-for="(ratio,
                          name,
                          index) in computedHourRevenueRatio"
                          :key="index"
                          class="horizontal-stacked-bar"
                          :class="{
                            'bg-lightblue': maxRevenueHour === name,
                          }"
                          :style="
                            `width: ${ratio}%; background: rgba(100,132,163, ${(index +
                              1) /
                              Object.values(salesResponseDto.hourRevenueRatio)
                                .length};`
                          "
                        ></div>
                      </div>
                      <div class="mt-4">
                        <div class="legend-label-list">
                          <p
                            v-for="(value,
                            name,
                            index) in computedHourRevenueRatio"
                            :key="index"
                          >
                            <span
                              class="legend-label-point"
                              :style="{
                                'background-color': `rgba(100,132,163, ${(index +
                                  1) /
                                  Object.values(
                                    salesResponseDto.hourRevenueRatio,
                                  ).length}`,
                              }"
                              :class="{
                                'bg-lightblue': maxRevenueHour === name,
                              }"
                            ></span>
                            <span class="legend-label-text">{{
                              name | hourTransformer
                            }}</span>
                            <span class="legend-label-value"
                              >{{ value }} %</span
                            >
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </b-col>
                <b-col
                  cols="12"
                  xl="4"
                  v-if="salesResponseDto.mediumCategoryGenderRevenueRatio"
                  class="gender-graph-wrapper"
                >
                  <div class="report-card">
                    <div class="report-card-header">
                      <h4>성별 매출비중</h4>
                    </div>
                    <div class="report-card-content">
                      <div class="gender-graph-list">
                        <b-row no-gutters align-v="end" class="mt-4">
                          <b-col cols="12" xl="2">
                            <p class="text-left">
                              <span class="badge">
                                여성
                              </span>
                              <strong
                                class="
                                     text-value d-block
                                    "
                                >{{
                                  Math.round(
                                    salesResponseDto
                                      .mediumCategoryGenderRevenueRatio['2'] *
                                      10,
                                  ) / 10
                                }}%</strong
                              >
                            </p>
                          </b-col>
                          <b-col cols="12" xl="8">
                            <div class="gender-graph-chart">
                              <div class="gender-graph gender-female">
                                <div
                                  class="graph-value"
                                  :style="
                                    `height: ${salesResponseDto.mediumCategoryGenderRevenueRatio['2']}%`
                                  "
                                ></div>
                              </div>
                              <div class="gender-graph gender-male">
                                <div
                                  class="graph-value"
                                  :style="
                                    `height: ${salesResponseDto.mediumCategoryGenderRevenueRatio['1']}%`
                                  "
                                ></div>
                              </div>
                            </div>
                          </b-col>
                          <b-col cols="12" xl="2">
                            <p class="text-right">
                              <span class="badge">
                                남성
                              </span>
                              <strong
                                class="
                                     text-value text-blue d-block
                                    "
                                >{{
                                  Math.round(
                                    salesResponseDto
                                      .mediumCategoryGenderRevenueRatio['1'] *
                                      10,
                                  ) / 10
                                }}%</strong
                              >
                            </p>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </div>
                </b-col>
                <b-col
                  cols="12"
                  xl="8"
                  v-if="salesResponseDto.mediumCategoryStoreRatio"
                  class="store-status-wrapper"
                >
                  <div class="store-status-list">
                    <b-row>
                      <b-col cols="12" xl="4">
                        <div class="report-card store-status-card">
                          <div class="report-card-header">
                            <h4>
                              음식점 현황
                            </h4>
                          </div>
                          <div class="report-card-content">
                            <div class="store-status-box">
                              <b-row
                                no-gutters
                                align-v="center"
                                align-h="between"
                              >
                                <div class="store-status-title">
                                  <h5>점포 비중</h5>
                                </div>
                                <div class="store-status-icon">
                                  <b-img-lazy
                                    src="https://kr.object.ncloudstorage.com/common-storage-pickcook/common/icon_store_ratio.svg"
                                  ></b-img-lazy>
                                </div>
                              </b-row>
                              <div class="store-status-info">
                                <p>
                                  <span class="store-status-info-label">{{
                                    salesRequestDto.mediumCategoryCode
                                      | kbCategoryTransformer
                                  }}</span>
                                  <strong
                                    class="store-status-info-value text-value text-blue d-block"
                                    v-if="
                                      salesResponseDto.mediumCategoryStoreRatio
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
                          </div>
                        </div>
                      </b-col>
                      <b-col cols="6" xl="4">
                        <div class="report-card store-status-card">
                          <div class="report-card-content">
                            <div class="store-status-box">
                              <b-row
                                no-gutters
                                align-v="center"
                                align-h="between"
                              >
                                <div class="store-status-title">
                                  <h5>폐업률</h5>
                                </div>
                                <div class="store-status-icon">
                                  <b-img-lazy
                                    src="https://kr.object.ncloudstorage.com/common-storage-pickcook/common/icon_store_closed_ratio.svg"
                                  ></b-img-lazy>
                                </div>
                              </b-row>
                              <div class="store-status-info">
                                <p>
                                  <span class="store-status-info-label">{{
                                    salesRequestDto.mediumCategoryCode
                                      | kbCategoryTransformer
                                  }}</span>
                                  <strong
                                    class="store-status-info-value text-value text-blue d-block"
                                    v-if="
                                      salesResponseDto.mediumCategoryClosedStoreRate
                                    "
                                  >
                                    {{
                                      salesResponseDto.mediumCategoryClosedStoreRate.toFixed(
                                        0,
                                      )
                                    }}%
                                  </strong>
                                </p>
                                <p>
                                  <span class="store-status-info-label"
                                    >상권평균</span
                                  >
                                  <strong
                                    class="store-status-info-value text-value d-block"
                                    v-if="salesResponseDto.closedStoreRate"
                                  >
                                    {{
                                      salesResponseDto.closedStoreRate.toFixed(
                                        0,
                                      )
                                    }}%
                                  </strong>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </b-col>
                      <b-col cols="6" xl="4">
                        <div class="report-card store-status-card">
                          <div class="report-card-content">
                            <div class="store-status-box">
                              <b-row
                                no-gutters
                                align-v="center"
                                align-h="between"
                              >
                                <div class="store-status-title">
                                  <h5>평균영업기간</h5>
                                </div>
                                <div class="store-status-icon">
                                  <b-img-lazy
                                    src="https://kr.object.ncloudstorage.com/common-storage-pickcook/common/icon_store_opening_hours.svg"
                                  ></b-img-lazy>
                                </div>
                              </b-row>
                              <div class="store-status-info">
                                <p>
                                  <span class="store-status-info-label">
                                    {{
                                      salesRequestDto.mediumCategoryCode
                                        | kbCategoryTransformer
                                    }}</span
                                  >
                                  <strong
                                    class="store-status-info-value text-value text-blue d-block"
                                  >
                                    {{
                                      salesResponseDto.mediumCategorySurvivalYears
                                    }}년
                                  </strong>
                                </p>
                                <p>
                                  <span class="store-status-info-label"
                                    >상권평균</span
                                  >
                                  <strong
                                    class="store-status-info-value text-value  d-block"
                                  >
                                    {{ salesResponseDto.survivalYears }}년
                                  </strong>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
                <b-col
                  cols="12"
                  v-if="
                    salesRequestDto.mediumCategoryCode &&
                      salesResponseDto.mainAge &&
                      salesResponseDto.revenuePerOrder
                  "
                >
                  <div class="report-card">
                    <div class="report-card-header">
                      <h4>종합 의견</h4>
                    </div>
                    <div class="report-card-content">
                      <p>
                        <strong class="text-blue">
                          {{
                            salesRequestDto.mediumCategoryCode
                              | kbCategoryTransformer
                          }}</strong
                        >의 경우
                        <strong class="text-blue"
                          >{{ salesResponseDto.mainAge }}대 /
                          {{
                            parseInt(mainGender) | genderNumberTransformer
                          }}</strong
                        >의 매출이 가장 높으며,
                        <strong class="text-blue">{{
                          salesResponseDto.revenuePerOrder
                        }}</strong>
                        메뉴의 판매가 높습니다. <br />
                        <strong class="text-blue"
                          >{{
                            maxRevenueWeekday | weekDayTransformer
                          }}요일</strong
                        >
                        매출이 우세하며,
                        <strong class="text-blue">{{
                          maxRevenueHour | hourTransformer
                        }}</strong
                        >에 주력할 수 있는 메뉴를 도입해야 합니다.
                      </p>
                    </div>
                  </div>
                </b-col>
                <b-col
                  cols="12"
                  v-if="
                    salesResponseDto.recommendedMenu &&
                      salesResponseDto.recommendedMenu.length > 0
                  "
                >
                  <div class="report-card recommended-menu-card">
                    <header class="report-card-header">
                      <h4
                        v-if="
                          salesResponseDto.hdong &&
                            salesResponseDto.hdong.hdongName
                        "
                      >
                        {{ salesResponseDto.hdong.hdongName }} 추천메뉴
                      </h4>
                      <p>
                        픽쿡에서는 상권의 입지, 인구, 매출, 소비패턴 등 다양한
                        요인을 종합하여 최적의 메뉴를 추천합니다.
                      </p>
                    </header>
                    <div class="report-card-content">
                      <b-row>
                        <b-col
                          cols="12"
                          :sm="index === 0 ? 12 : 6"
                          xl="4"
                          v-for="(menu,
                          index) in salesResponseDto.recommendedMenu"
                          :key="index"
                        >
                          <div class="recommended-menu-box my-2">
                            <div class="recommended-menu-img">
                              <b-img-lazy
                                :src="
                                  `https://kr.object.ncloudstorage.com/common-storage-pickcook/menu/${menu.sSmallCategoryCode}.jpg`
                                "
                              ></b-img-lazy>
                            </div>
                            <div class="recommended-menu-info">
                              <p>
                                추천지수
                                <strong class="text-blue"
                                  >{{ menu.averageScore }}%</strong
                                >
                              </p>
                              <h5>{{ menu.pkMenuName }}</h5>
                              <div>
                                <span class="badge bg-blue" v-if="index === 0"
                                  >최고적합률</span
                                >
                                <span class="badge">{{
                                  menu.pkMediumCategoryName
                                }}</span>
                                <span class="badge">{{
                                  menu.pkSmallCategoryName
                                }}</span>
                              </div>
                            </div>
                          </div>
                        </b-col>
                      </b-row>
                    </div>
                  </div>
                </b-col>
                <b-col cols="12" v-if="salesResponseDto.recommendMenuHdong">
                  <div class="report-card">
                    <header class="report-card-header">
                      <h4>반경 3km이내의 추천 메뉴</h4>
                      <p>
                        해당 행정동에서는 전체적으로
                        <strong class="text-blue">{{
                          salesResponseDto.mainHourHdong | hourTransformer
                        }}</strong
                        >시간대
                        <strong class="text-blue">{{
                          salesResponseDto.mainGenderHdong
                            | genderNumberTransformer
                        }}</strong
                        >의
                        <strong class="text-blue">{{
                          salesResponseDto.mainAgeHdong
                        }}</strong
                        >매출이 높습니다. <br />
                        이와 반경 3KM내에서 해당 소비층은
                        <strong class="text-blue">
                          {{
                            Object.values(
                              salesResponseDto.recommendMenuHdong,
                            ).join(',')
                          }} </strong
                        >를 주로 소비합니다.
                      </p>
                    </header>
                    <div class="report-card-content">
                      <div class="pickcook-menu-list">
                        <div
                          v-for="(menu, index) in recommendMenuHdong"
                          :key="index"
                        >
                          <div class="pickcook-menu-box">
                            <div class="pickcook-menu-img text-center">
                              <b-img-lazy
                                :src="
                                  `https://kr.object.ncloudstorage.com/common-storage-pickcook/menu/pickcook_${menu}.png`
                                "
                              ></b-img-lazy>
                            </div>
                            <div>
                              <div class="text-center">
                                <span class="badge">{{ index + 1 }}위</span>
                                <p class="text-value mt-2">{{ menu }}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </div>
          </section>
        </transition>
        <transition name="fadeIn">
          <section class="section" v-show="activeTab === 'delivery'">
            <template v-if="consultBaeminReport">
              <header class="section-header">
                <h3 class="title">
                  배달현황 분석
                </h3>
                <span class="desc">Delivery Analysis Report</span>
              </header>
              <div class="section-content">
                <b-row>
                  <b-col cols="12">
                    <div class="report-card">
                      <div
                        class="report-card-header"
                        v-if="salesResponseDto.hdong"
                      >
                        <h4>{{ salesResponseDto.hdong.hdongName }} 배달현황</h4>
                      </div>
                      <div class="report-card-content">
                        <p>
                          <template
                            v-if="consultBaeminReport.baeminCategoryCode"
                          >
                            <strong class="text-blue">{{
                              consultBaeminReport.baeminCategoryCode
                                | baeminCategoryTransformer
                            }}</strong>
                            업종의 경우
                          </template>
                          <strong class="text-blue">{{
                            computedMainGagu
                          }}</strong>
                          에서 주로 주문하며, 6개월
                          <strong class="text-blue"
                            >평균
                            {{
                              consultBaeminReport.averageOrderRate
                                | numeralTransformer
                            }}
                            건의 주문수</strong
                          >를 보입니다. 상권 내
                          <strong class="text-blue"
                            >배달팁의 적정 금액은
                            {{
                              consultBaeminReport.averageDeliveryTip
                                | numeralTransformer
                            }}원</strong
                          >이며, 맛집 랭킹에 들어가기 위해서는
                          <strong class="text-blue"
                            >최소
                            {{
                              consultBaeminReport.averageLikeRate
                                | numeralTransformer
                            }}개 이상의 찜</strong
                          >이 필요합니다.
                        </p>
                        <b-row class="mt-4 pt-4">
                          <b-col cols="12" lg="6" xl="4">
                            <div class="baemin-info-box average-score">
                              <div>
                                <h5 class="baemin-info-label">
                                  평점
                                </h5>
                                <p class="baemin-info-value">
                                  <strong>{{
                                    consultBaeminReport.averageScore
                                      ? consultBaeminReport.averageScore
                                      : 0
                                  }}</strong>
                                </p>
                              </div>
                            </div>
                          </b-col>
                          <b-col cols="12" lg="6" xl="4">
                            <div class="baemin-info-box average-order-rate">
                              <div>
                                <h5 class="baemin-info-label">
                                  평균 주문수 <span>6개월 합산</span>
                                </h5>
                                <p class="baemin-info-value">
                                  <strong>{{
                                    consultBaeminReport.averageOrderRate
                                      | numeralTransformer
                                  }}</strong>
                                </p>
                              </div>
                            </div>
                          </b-col>
                          <b-col cols="12" lg="6" xl="4">
                            <div
                              class="baemin-info-box average-monthly-order-rate"
                            >
                              <div>
                                <h5 class="baemin-info-label">
                                  월 평균 주문수
                                </h5>
                                <p class="baemin-info-value">
                                  <strong>{{
                                    consultBaeminReport.averageMonthlyOrderRate
                                      | numeralTransformer
                                  }}</strong>
                                </p>
                              </div>
                            </div>
                          </b-col>
                          <b-col cols="12" lg="6" xl="4">
                            <div class="baemin-info-box minimum-order-price">
                              <div>
                                <h5 class="baemin-info-label">
                                  최소 주문금액
                                </h5>
                                <p class="baemin-info-value">
                                  <strong>{{
                                    consultBaeminReport.minimumOrderPrice
                                      | numeralTransformer
                                  }}</strong>
                                </p>
                              </div>
                            </div>
                          </b-col>
                          <b-col cols="12" lg="6" xl="4">
                            <div class="baemin-info-box average-delivery-tip">
                              <div>
                                <h5 class="baemin-info-label">
                                  배달팁
                                </h5>
                                <p class="baemin-info-value">
                                  <strong>{{
                                    consultBaeminReport.averageDeliveryTip
                                      | numeralTransformer
                                  }}</strong>
                                </p>
                              </div>
                            </div>
                          </b-col>
                          <b-col cols="12" lg="6" xl="4">
                            <div class="baemin-info-box average-like-count">
                              <div>
                                <h5 class="baemin-info-label">
                                  찜 수
                                </h5>
                                <p class="baemin-info-value">
                                  <strong>{{
                                    consultBaeminReport.averageLikeRate
                                      | numeralTransformer
                                  }}</strong>
                                </p>
                              </div>
                            </div>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-col>
                </b-row>
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
        </transition>
        <transition name="fadeIn">
          <section class="section" v-show="activeTab === 'files01'">
            <header class="section-header">
              <h3 class="title">신규창업자 픽쿡 소개자료</h3>
              <span class="desc">PICKCOOK Introduction (New-founder)</span>
            </header>
            <div class="section-content">
              <b-row>
                <b-col cols="12">
                  <div class="sales-data-img-list">
                    <div class="row-box" v-for="n in 18" :key="n">
                      <b-img-lazy
                        :src="
                          `https://kr.object.ncloudstorage.com/common-storage-pickcook/sales/new_sales_data_${
                            n > 9 ? n : '0' + n
                          }.png`
                        "
                      >
                      </b-img-lazy>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </div>
          </section>
        </transition>
        <transition name="fadeIn">
          <section class="section" v-show="activeTab === 'files02'">
            <header class="section-header">
              <h3 class="title">기창업자 픽쿡 소개자료</h3>
              <span class="desc">PICKCOOK Introduction (Existing-founder)</span>
            </header>
            <div class="section-content">
              <b-row>
                <b-col cols="12">
                  <div class="sales-data-img-list">
                    <div class="row-box" v-for="n in 14" :key="n">
                      <b-img-lazy
                        :src="
                          `https://kr.object.ncloudstorage.com/common-storage-pickcook/sales/cur_sales_data_${
                            n > 9 ? n : '0' + n
                          }.png`
                        "
                      >
                      </b-img-lazy>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </div>
          </section>
        </transition>
        <transition name="fadeIn">
          <section class="section" v-show="activeTab === 'calculator'">
            <header class="section-header">
              <h3 class="title">상품 금액 안내</h3>
              <span class="desc">Product Amount Notice</span>
            </header>
            <div class="section-content">
              <b-tabs fill>
                <b-tab active title="PICKCOOK LITE">
                  <ProformaCalculator
                    categoryType="LITE"
                    :serviceCategories="pickcookLite"
                  ></ProformaCalculator>
                </b-tab>
                <b-tab title="PICKCOOK PREMIUM">
                  <ProformaCalculator
                    categoryType="PREMIUM"
                    :serviceCategories="pickcookPremium"
                  ></ProformaCalculator>
                </b-tab>
              </b-tabs>
            </div>
          </section>
        </transition>
      </div>
      <!-- 주소 검색 모달 -->
      <b-modal id="postcode" title="주소 검색" hide-footer>
        <vue-daum-postcode
          style="height:500px; overflow-y:auto;"
          @complete="setAddress($event)"
        />
      </b-modal>
    </article>
  </main>
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
import ProformaCalculator from '../add-on/ProformaCalculator.vue';

import ConsultResponseV3Service from '@/services/pickcook/consult-response-v3.service';
import toast from '../../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'ConsultReportDetail',
  components: {
    RevenueChart,
    DoughnutChart,
    BarChart,
    ProformaCalculator,
  },
})
export default class ConsultReportDetail extends BaseComponent {
  // 사이드 탭
  private activeTab = 'chart';
  private sideNavTabs = [
    {
      id: 'chart',
      name: '상권분석',
      icon: 'chart',
      active: true,
    },
    {
      id: 'delivery',
      name: '배달현황분석',
      icon: 'delivery',
      active: false,
    },
    {
      id: 'files01',
      name: '신규창업자',
      icon: 'files',
      active: false,
    },
    {
      id: 'files02',
      name: '기창업자',
      icon: 'files',
      active: false,
    },
    {
      id: 'calculator',
      name: '상품안내',
      icon: 'calculator',
      active: false,
    },
  ];

  private isLoading = false;

  onSideTabClick(tabId: string): void {
    this.isLoading = true;
    this.activeTab = tabId;
    if (tabId === 'delivery') this.getBaeminData();
    this.goTop();
  }

  // 픽쿡 상품
  private pickcookLite = [
    {
      title: '레시피',
      name: 'recipe',
      items: [
        {
          id: 'recipe01',
          name: '레시피 및 조리영상 제공&물류연결',
          price: 1188000,
        },
      ],
    },
    {
      title: '메뉴교육',
      name: 'menu',
      // type: 'radio',
      items: [
        {
          id: 'menu01',
          name: '현장실습',
          price: 300000,
        },
        {
          id: 'menu02',
          name: '방문교육 (교통비 실비 별도)',
          price: 300000,
        },
      ],
    },
    {
      title: '배달앱관리',
      name: 'delivery_app',
      items: [
        {
          id: 'deliveryApp01',
          name: '배달 앱 등록 (배민, 쿠팡, 요기요 등)',
          price: 100000,
        },
        {
          id: 'deliveryApp02',
          name: '로고, 사진, 브랜드 제공',
          price: 0,
        },
        {
          id: 'deliveryApp03',
          name: '배달앱 컨설팅 (리뷰이벤트, 깃발 등)',
          price: 200000,
        },
      ],
    },
    {
      title: '디자인물',
      name: 'design',
      items: [
        {
          id: 'designApp01',
          name: '스티커, 메모지, 자석전단지',
          price: 100000,
        },
      ],
    },
  ];

  private pickcookPremium = [
    {
      title: '레시피',
      name: 'recipe',
      items: [
        {
          id: 'premium-recipe01',
          name: '레시피 및 조리영상 제공&물류연결',
          price: 1188000,
        },
      ],
    },
    {
      title: '메뉴교육',
      name: 'menu',
      // type: 'radio',
      items: [
        {
          id: 'premium-menu01',
          name: '현장실습',
          price: 300000,
        },
        {
          id: 'premium-menu02',
          name: '방문교육 (교통비 실비 별도)',
          price: 300000,
        },
      ],
    },
    {
      title: '배달앱관리',
      name: 'delivery_app',
      items: [
        {
          id: 'premium-deliveryApp01',
          name: '배달 앱 등록 (배민, 쿠팡, 요기요 등)',
          price: 100000,
        },
        {
          id: 'premium-deliveryApp02',
          name: '로고, 사진, 브랜드 제공',
          price: 0,
        },
        {
          id: 'premium-deliveryApp03',
          name: '배달앱 컨설팅 (리뷰이벤트, 깃발 등)',
          price: 200000,
        },
      ],
    },
    {
      title: '디자인물',
      name: 'design',
      items: [
        {
          id: 'premium-designApp01',
          name: '스티커, 메모지, 자석전단지',
          price: 100000,
        },
        {
          id: 'premium-designApp02',
          name: '간판',
          price: 500000,
        },
        {
          id: 'premium-designApp03',
          name: '외벽시트지',
          price: 200000,
        },
        {
          id: 'premium-designApp04',
          name: 'X 배너',
          price: 100000,
        },
      ],
    },
  ];

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
          '#00B1FF',
          '#79FEDD',
          '#4FD0E4',
          '#E4EBF2',
          '#C9D7E4',
          '#AFC3D7',
          '#AFC3D7',
          '#AFC3D7',
          '#AFC3D7',
          '#AFC3D7',
          '#AFC3D7',
        ],
      },
    ],
  };
  // 연령별
  get computedAgeRatio() {
    const obj = this.salesResponseDto.ageRatio;
    const arr = [];
    let newObj = {};
    for (const prop in obj) arr.push([prop, obj[prop]]);
    const temp = arr[4];
    arr.unshift(temp);
    const entries = new Map(arr);
    newObj = Object.fromEntries(entries);
    return newObj;
  }

  // 시갠대별
  get computedHourRevenueRatio() {
    const obj = this.salesResponseDto.hourRevenueRatio;
    const arr = [];
    let newObj = {};
    for (const prop in obj) arr.push([prop, obj[prop]]);
    const temp = arr[2];
    arr.unshift(temp);
    const entries = new Map(arr);
    newObj = Object.fromEntries(entries);
    return newObj;
  }

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
        backgroundColor: [],
      },
    ],
  };

  get computedMainGaguBackgroundColor() {
    const arr = [];
    Object.values(this.salesResponseDto.gaguRatio).map((e, index) => {
      arr.push(
        `rgba(100,132,163, ${(index + 1) /
          Object.values(this.salesResponseDto.gaguRatio).length})`,
      );
    });
    return arr;
  }

  get computedMainGaguLabelColor() {
    const rankColorArr = ['#00B1FF', '#79FEDD', '#4FD0E4'];
    let colorData = [];
    let rankData = [];
    colorData = [...this.computedMainGaguBackgroundColor];
    if (this.salesResponseDto.mainGagu === 1) {
      rankData = [1, 2];
    } else {
      rankData = [3, 4];
    }
    colorData.map((e, index) => {
      colorData[rankData[index] - 1] = rankColorArr[index];
    });
    return colorData;
  }

  // 주 연령대 차트
  private mainAgeGroupChartData = {
    datasets: [
      {
        backgroundColor: [],
      },
    ],
  };

  get computedMainAgeGroupBackgroundColor() {
    const arr = [];
    Object.values(this.salesResponseDto.ageRatio).map((e, index) => {
      arr.push(
        `rgba(100,132,163, ${(index + 1) /
          Object.values(this.salesResponseDto.ageRatio).length})`,
      );
    });
    return arr;
  }

  get computedMainAgeGroupLabelColor() {
    const rankColorArr = ['#00B1FF', '#79FEDD', '#4FD0E4'];
    let colorData = [];
    let rankData = [];
    colorData = [...this.computedMainAgeGroupBackgroundColor];
    if (this.salesResponseDto.mainAgeGroup === 2) {
      rankData = [2, 3, 4];
    } else {
      rankData = [3, 4, 5];
    }
    colorData.map((e, index) => {
      colorData[rankData[index] - 1] = rankColorArr[index];
    });
    return colorData;
  }

  // 요일별 매출 비율 차트
  private maxRevenueWeekday: any = '';

  // 시간대별 매출 비율 차트
  private maxRevenueHour: any = '';

  // 매출 분석 차트
  private revenueChartData = {
    labels: ['', '최저매출', '평균매출', '최고매출', ''],
    datasets: [
      {
        pointRadius: [0, 5, 10, 5, 0],
        pointHoverRadius: [0, 5, 20, 5, 0],
        pointBackgroundColor: [
          'rgba(50,127,227,1)',
          'rgba(50,127,227,1)',
          'rgba(255,255,255,1)',
          'rgba(50,127,227,1)',
          'rgba(50,127,227,1)',
        ],
        borderWidth: 3,
      },
    ],
  };

  // 상권매출현황 차트
  private revenueData = [];

  // 성별 매출비중
  private mainGender: any = 0;

  // 배달의민족 상세현황
  private consultBaeminReport = new BaeminReportDto();

  // 지도 가져오기
  private map;
  private reportAddress = '';
  private consultResponseV3Dto = new ConsultResponseV3Dto();
  private mediumCategoryRevenueLabel = [];
  private mediumCategoryRevenueValue = [];

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
            const tempArr = [];
            Object.keys(mediumCategoryRevenueRatio).map(e => {
              tempObj[KB_MEDIUM_CATEGORY_KOREAN[e]] =
                mediumCategoryRevenueRatio[e];
            });

            Object.keys(tempObj).map(e => {
              tempArr.push({ categoryName: e, value: tempObj[e] });
            });

            tempArr.sort((a, b) => {
              return b.value - a.value;
            });
            this.mediumCategoryRevenueLabel = [];
            this.mediumCategoryRevenueValue = [];
            tempArr.map(e => {
              this.mediumCategoryRevenueLabel.push(e.categoryName);
            });
            tempArr.map(e => {
              this.mediumCategoryRevenueValue.push(e.value);
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
  }

  // 지도 가져오기
  setMap() {
    const geocoder = new window.kakao.maps.services.Geocoder();

    const callback = function(result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(result[0].y, result[0].x),
          level: 5,
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
          strokeColor: '#477DE6',
          strokeOpacity: 1,
          strokeStyle: 'solid',
          fillColor: '#4CB0F8',
          fillOpacity: 0.3,
        });
        circle.setRadius(800);
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
        if (results[0]) {
          this.salesRequestDto.hdongCode = +results[0].address.h_code;
        }
      } else {
        toast.error('다른 주소로 선택해주세요');
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
      const top = this.$refs.report.getBoundingClientRect().top;
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

.sales-data-img-list {
  img {
    width: 100%;
  }
}

.tabs {
  margin: 40px 0;
  .nav-tabs {
    background: #efefef;
    border-radius: 80px;
    overflow: hidden;
    box-shadow: inset 0 1px 4px rgba(195, 195, 195, 1);
    padding: 6px;
  }

  .nav-tabs {
    .nav-item {
      width: 50%;
      .nav-link {
        border: 1px solid transparent;
        border-radius: 80px;
        font-size: 20px;
        color: #8c8c8c;
        font-weight: 500;
        padding: 16px 0;
      }
    }
  }
  .nav-tabs .nav-item.show .nav-link,
  .nav-tabs .nav-link.active {
    background: #004d8a;
    color: #fff !important;
    box-shadow: 1px 1px 2px #c9c9c9;
    font-weight: 700;
  }
}
#side-nav {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #004d8a;
  width: 100px;
  z-index: 10;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 126px;
    margin-bottom: 32px;
    img {
      display: block;
    }
  }
  .side-nav-tabs {
    .side-nav-tab {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100px;
      &.is-active {
        .tab-icon {
          background-position: 50% 0;
        }
      }
      .tab-icon {
        display: block;
        width: 40px;
        height: 40px;
        background-repeat: no-repeat;
        background-position: 50% -40px;
        background-size: 40px 80px;
        transition: all 0.4s ease;
      }
      .tab-name {
        display: none;
      }
    }
  }
}
#report {
  color: #707070;
  * {
    word-break: keep-all;
  }
  padding: 64px 64px;
  margin-left: 100px;

  .btn-search {
    height: 60px;
    font-size: 24px;
    font-weight: 700;
    height: 88px;
  }

  .section {
    .section-header {
      display: flex;
      align-items: flex-end;
      margin-bottom: 24px;
      h3 {
        font-size: 40px;
        color: #000000;
        font-weight: 700;
        line-height: 1;
        + .desc {
          font-size: 16px;
          margin-left: 8px;
        }
      }
      + .section-content {
        margin-top: 1.5em;
        > .row {
          > [class*='col-'] {
            padding: 16px;
          }
        }
      }
    }

    p {
      font-size: 16px;
      strong {
        font-size: 20px;
      }
    }
  }

  #map {
    width: 100%;
    min-height: 300px;
    height: calc(100%);
  }
  .map-hdong-name {
    display: inline-block;
    padding: 6px 12px;
    position: absolute;
    left: 32px;
    top: 32px;
    background: #007eeb;
    border-radius: 60px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    z-index: 2;
    box-shadow: 0 7px 9px rgba(195, 195, 195, 0.16);
  }

  .report-card {
    border-radius: 10px;
    box-shadow: 0 7px 9px rgba(195, 195, 195, 0.16);
    background-color: #fff;
    overflow: hidden;
    height: 100%;
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &.no-body {
      padding: 0;
    }
    + .report-card {
      margin-top: 32px;
    }
    &.h-half {
      height: calc(50% - 16px);
    }
    .report-card-header {
      h4 {
        font-size: 24px;
        color: #000000;
        font-weight: 700;
        line-height: 1;
        span {
          display: inline-block;
          font-size: 12px;
          color: #707070;
          margin-left: 8px;
        }
        + p {
          margin-top: 24px;
        }
      }
      + .report-card-content {
        margin-top: 32px;
      }
    }

    .report-card-content {
      .badge {
        display: inline-block;
        background: #e4ebf2;
        border-radius: 20px;
        font-size: 16px;
        padding: 8px 16px;
        color: #000;
        font-weight: 400;
      }
      .text-value {
        font-size: 32px;
        font-weight: 700;
        color: #707070;
      }
    }
  }
  //
  .baemin-info-box {
    background-color: #f5f5f5;
    border-radius: 10px;
    padding: 32px;
    margin: 14px 0;
    > div {
      background-repeat: no-repeat;
      background-position: right center;
      background-size: auto 80px;
    }

    &.average-score > div {
      background-image: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/common/icon_baemin_score.svg');
    }

    &.average-order-rate > div {
      background-image: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/common/icon_baemin_order.svg');
    }

    &.average-monthly-order-rate > div {
      background-image: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/common/icon_baemin_order.svg');
    }

    &.minimum-order-price > div {
      background-image: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/common/icon_baemin_tip.svg');
    }

    &.average-delivery-tip > div {
      background-image: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/common/icon_baemin_delivery.svg');
    }

    &.average-like-count > div {
      background-image: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/common/icon_baemin_like.svg');
    }

    .baemin-info-label {
      font-size: 20px;
      color: #000;
      font-weight: 500;
      span {
        font-size: 12px;
      }
    }
    .baemin-info-value {
      margin-top: 64px;
      strong {
        font-size: 44px;
        font-weight: 700;
        color: #007eeb;
      }
    }
  }

  //
  .recommended-menu-card {
    [class*='col-'] {
      &:nth-child(1) {
        .recommended-menu-info {
          &:after {
            background-image: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/common/icon_rank_01.svg');
          }
        }
      }
      &:nth-child(2) {
        .recommended-menu-info {
          &:after {
            background-image: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/common/icon_rank_02.svg');
          }
        }
      }
      &:nth-child(3) {
        .recommended-menu-info {
          &:after {
            background-image: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/common/icon_rank_03.svg');
          }
        }
      }
    }
  }
  .recommended-menu-box {
    position: relative;
    .recommended-menu-img {
      position: relative;
      padding-bottom: 92.3%;
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
      position: absolute;
      bottom: 28px;
      background-color: rgba(255, 255, 255, 0.9);
      z-index: 2;
      min-width: 340px;
      padding: 24px 64px 24px 24px;
      border-top-right-radius: 100px;
      border-bottom-right-radius: 100px;
      &:after {
        display: block;
        content: '';
        width: 82px;
        height: 86px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        position: absolute;
        right: 80px;
        top: 0;
      }
      .badge {
        background-color: #c9d7e4;
        + .badge {
          margin-left: 0.5em;
          margin-bottom: 0.25em;
        }
      }
      h5 {
        font-size: 32px;
        font-weight: 700;
        color: #000;
        margin: 24px 0 32px;
        line-height: 1;
      }
      p {
        font-size: 16px;
        color: #000;
        line-height: 1;
      }
    }
  }
  //
  .pickcook-menu-list {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .pickcook-menu-box {
      display: flex;
      align-items: center;
      .pickcook-menu-img {
        max-width: 250px;
      }
    }
  }

  //
  .store-status-list {
    height: 100%;
    > .row {
      height: inherit;
      > [class*='col-'] {
        .report-card-content {
          height: inherit;
        }
      }
    }
  }
  .store-status-card {
    position: relative;
    .report-card-header {
      position: absolute;
      top: 32px;
      left: 32px;
      + .report-card-content {
        margin-top: 0;
      }
    }
  }
  .store-status-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .store-status-title {
      h5 {
        color: #000000;
        font-weight: 500;
        font-size: 20px;
      }
    }
    .store-status-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 135px;
      height: 135px;
      border-radius: 20px;
      background-color: #f0f7fc;
      img {
        max-height: 64px;
      }
    }
    .store-status-info {
      display: flex;
      flex-wrap: wrap;
      > p {
        text-align: left;
        width: 50%;
        + p {
          border-left: 1px solid #c9c9c9;
          padding-left: 48px;
        }
      }
    }
  }

  //
  .horizontal-stacked-bar-charts {
    display: flex;
    height: 76px;
    .horizontal-stacked-bar {
      width: 100%;
      height: 100%;
      &.bar-restaurant {
        background: #79fedd;
      }
      &.bar-delivery {
        background: #00b1ff;
      }
    }
  }
  //
  .consumption-pattern-labels {
    text-align: center;
    padding: 0 0.5em;
    &.label-restaurant {
      text-align: left;
    }
    &.label-delivery {
      text-align: right;
    }
    .consumption-pattern-label {
      display: block;
      font-size: 1rem;
    }
    .consumption-pattern-value {
      font-size: 1.6rem;
      &.value-restaurant {
        color: #79fedd;
      }
      &.value-delivery {
        color: #00b1ff;
      }
    }
  }
  //
  .legend-label-list {
    // display: flex;
    // align-items: center;
    > p {
      white-space: nowrap;
      display: inline-block;
      + p {
        margin-left: 16px;
      }
    }
    .legend-label-point {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .legend-label-text {
      font-size: 16px;
      margin-left: 8px;
    }

    .legend-label-value {
      font-size: 20px;
      margin-left: 10px;
      font-weight: 500;
    }
  }
  //
  .consumption-pattern-delivery {
    .consumption-pattern-delivery-icon {
      text-align: center;
      img {
        max-width: 240px;
      }
    }
    .consumption-pattern-delivery-text {
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1px solid #c9c9c9;
      text-align: center;
      height: 100%;
      h5 {
        color: #000000;
        font-size: 24px;
      }
      p {
        color: #007eeb;
        font-size: 64px;
        font-weight: 800;
      }
    }
  }

  // gender graph
  .gender-graph-list {
    max-width: 500px;
    margin: 0 auto;
  }
  .gender-graph-chart {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin: 0 auto;
    .gender-graph {
      position: relative;
      display: flex;
      align-items: flex-end;
      width: 102px;
      height: 224px;
      margin: 0 12px;
      background-color: #e4ebf2;
      &:after {
        display: block;
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        z-index: 1;
      }
      .graph-value {
        width: 100%;
      }
      &.gender-female {
        .graph-value {
          background-color: #79fedd;
        }
        &:after {
          background-image: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/common/icon_gender_female.svg');
        }
      }
      &.gender-male {
        .graph-value {
          background-color: #00b1ff;
        }
        &:after {
          background-image: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/common/icon_gender_male.svg');
        }
      }
    }
  }
  //
  .doughnut-chart-container {
    .doughnut-chart-wrapper {
      position: relative;
      width: 300px;
      height: 300px;
      margin-top: 1em;
      margin-left: auto;
      margin-right: auto;
      .chartjs-render-monitor {
        height: 300px !important;
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
        text-align: center;

        p {
          font-size: 32px;
          color: #007eeb;
          margin-top: 16px;
          line-height: 1;
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
    }
    .legend-label-list {
      .legend-label-text {
        font-size: 12px;
      }
    }
  }
}

@media screen and (max-width: 1680px) {
  #report {
    padding: 32px 32px;

    .recommended-menu-box {
      border: 1px solid #dcdcdc;
      border-radius: 1rem;
      overflow: hidden;
      .recommended-menu-img {
        border-radius: 0;
      }
      .recommended-menu-info {
        position: relative;
        bottom: 0;
        padding-right: 24px;
        border-radius: 0;
        min-width: 0;
        &:after {
          right: 24px;
        }
      }
    }
    .gender-graph-wrapper,
    .store-status-wrapper {
      flex: 0 0 100%;
      max-width: 100%;
    }
    .store-status-box {
      padding-top: 40px;
      .store-status-icon {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        img {
          width: 32px;
        }
      }
      .store-status-info {
        display: block;
        p {
          width: auto;
          text-align: center;
          padding: 20px 0;
          + p {
            padding-left: 0;
            border-left: 0;
            border-top: 1px solid #c9c9c9;
          }
        }
      }
    }
    .consumption-pattern-delivery {
      .consumption-pattern-delivery-text {
        h5 {
          font-size: 20px;
        }
        p {
          font-size: 46px;
        }
      }
    }
    .doughnut-chart-container {
      .doughnut-chart-wrapper {
        width: 260px;
        height: 260px;
        .chartjs-render-monitor {
          height: 260px !important;
        }
      }
    }
    .pickcook-menu-list {
      .pickcook-menu-box {
        display: block;
      }
    }
  }
}

@media screen and (max-width: 1199px) {
  #report {
    #map {
      width: 100%;
      min-height: 500px;
      height: auto;
    }
    .pickcook-menu-list {
      flex-wrap: wrap;
      justify-content: flex-start;
      > div {
        width: 50%;
        &:first-child {
          width: 100%;
        }
      }
      .pickcook-menu-box {
        .pickcook-menu-img {
          max-width: 100%;
        }
      }
    }
    .store-status-list {
      > .row {
        > [class*='col-'] {
          + [class*='col-'] {
            padding: 32px 16px 0;
          }
        }
      }
    }
    .store-status-card {
      .report-card-header {
        position: static;
      }
      .store-status-box {
        padding-top: 0;
      }
    }
  }
}

@media screen and (max-width: 991px) {
  #side-nav {
    width: auto;
    bottom: auto;
    right: 0;
    padding: 0 16px;
    overflow: hidden;
    overflow-x: auto;
    display: flex;
    align-items: center;
    .logo {
      height: 80px;
      margin: 0 24px 0 0;
      img {
        max-width: none;
      }
    }
    .side-nav-tabs {
      display: flex;
      align-items: center;
      .side-nav-tab {
        height: 80px;
        margin-right: 24px;
      }
    }
  }
  .tabs {
    .nav-tabs {
      .nav-item {
        .nav-link {
          font-size: 16px;
        }
      }
    }
  }
  #report {
    margin: 100px 0 0;
    padding: 16px 16px;

    .section {
      .section-header {
        display: block;
        h3 {
          + .desc {
            display: block;
            margin: 8px 0 0 0;
          }
        }
      }
    }

    .report-card {
      &.h-half {
        height: auto;
      }
      padding: 32px 24px;
    }
  }
}

@media screen and (max-width: 575px) {
  .tabs {
    .nav-tabs {
      .nav-item {
        .nav-link {
          font-size: 12px;
        }
      }
    }
  }
  #report {
    .pickcook-menu-list {
      > div {
        width: 100%;
      }
    }
  }
}
</style>
