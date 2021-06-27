<template>
  <div id="report">
    <b-tabs fill>
      <b-tab active>
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
            <h3 class="title">상담신청 고객정보</h3>
          </header>
          <div class="section-content">
            <b-row>
              <b-col cols="12" lg="8">
                <b-form-row>
                  <b-col cols="4">
                    <b-form-group label="창엄자명" label-align="left">
                      <b-form-input value="이현우" readonly></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="4">
                    <b-form-group label="연락처" label-align="left">
                      <b-form-input value="01041537907" readonly></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="4">
                    <b-form-group label="창업자유형" label-align="left">
                      <b-form-input value="신규창업자" readonly></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-form-row>
                <b-form-row>
                  <b-col cols="4">
                    <b-form-group label="창업 지역" label-align="left">
                      <b-form-input value="서울시 종로구 무학동"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="4">
                    <b-form-group label="창업 업종" label-align="left">
                      <b-form-select v-model="selectedFoodCategory">
                        <b-form-select-option
                          v-for="category in foodCategories"
                          :key="category"
                          value=""
                        >
                          {{ category }}
                        </b-form-select-option>
                      </b-form-select>
                    </b-form-group>
                  </b-col>
                  <b-col cols="4">
                    <b-row align-v="end" no-gutters>
                      <b-col cols="8">
                        <b-form-group label="창업 유형" label-align="left">
                          <b-form-select>
                            <b-form-select-option value="">
                              매장
                            </b-form-select-option>
                            <b-form-select-option value="">
                              배달
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
                          style="margin-bottom:1rem"
                        >
                          상권분석
                        </b-button></b-col
                      >
                    </b-row>
                  </b-col>
                </b-form-row>
                <div class="data-info-box">
                  <header class="data-info-box-header">
                    <h4>상권매출 현황</h4>
                  </header>
                  <div class="data-info-box-content">
                    <ResultRevenueChart :chartData="revenueChartData" />
                  </div>
                </div>
              </b-col>
              <b-col cols="12" lg="4">
                <div id="map" style="width:100%; height:100%"></div>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <div class="data-info-box">
                  <header class="data-info-box-header">
                    <h4>
                      인구 및 주 소비 패턴 분석
                      <span> (선택한 행정동 기준)</span>
                    </h4>
                  </header>
                  <div class="data-info-box-content">
                    <p>
                      <strong class="text-primary"
                        >거주인구 22,712명/세대수 14,412세대/직장인구
                        29,777명</strong
                      >
                      상주 중입니다.
                    </p>
                  </div>
                </div>
              </b-col>
              <b-col cols="12" lg="5">
                <div class="data-info-box">
                  <div class="data-info-box-content">
                    <b-row>
                      <b-col cols="4">
                        <h5>주 소비층</h5>
                      </b-col>
                      <b-col cols="8">
                        <p>
                          <strong class="text-primary">1~2인 가구 </strong>
                          이며,
                          <strong class="text-primary">20~40대</strong>입니다.
                        </p>
                      </b-col>
                    </b-row>
                  </div>
                  <div></div>
                </div>
              </b-col>
              <b-col cols="12" lg="7">
                <div class="data-info-box">
                  <div class="data-info-box-content">
                    <b-row>
                      <b-col cols="12" xl="2">
                        <h5>
                          소비 패턴<br />
                          <span>식사&amp;배달 비중</span>
                        </h5>
                      </b-col>
                      <b-col cols="12" xl="10">
                        <template v-if="true">
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
                                class="consumption-pattern-value value-restaurant"
                                >80%</strong
                              >
                            </p>
                          </b-col>
                          <b-col cols="8">
                            <div class="consumption-pattern-bar-charts">
                              <div
                                class="consumption-pattern-bar bar-restaurant"
                              ></div>
                              <div
                                class="consumption-pattern-bar bar-delivery"
                              ></div>
                            </div>
                          </b-col>
                          <b-col cols="2">
                            <p class="consumption-pattern-labels">
                              <span class="consumption-pattern-label">
                                배달 식사 비중
                              </span>
                              <strong
                                class="consumption-pattern-value value-delivery"
                                >80%</strong
                              >
                            </p>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </div>
                  <div class="data-info-box-content">
                    <b-row>
                      <b-col cols="12" xl="2">
                        <h5>
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
                                  <span class="store-status-info-label"
                                    >한식</span
                                  >
                                  <strong
                                    class="store-status-info-value text-primary"
                                  >
                                    36%
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
                                    class="store-status-info-value text-primary"
                                  >
                                    54%
                                  </strong>
                                </p>
                                <p>
                                  <span class="store-status-info-label"
                                    >한식</span
                                  >
                                  <strong
                                    class="store-status-info-value text-primary"
                                  >
                                    60%
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
                                    class="store-status-info-value text-primary"
                                  >
                                    4.1년
                                  </strong>
                                </p>
                                <p>
                                  <span class="store-status-info-label"
                                    >한식</span
                                  >
                                  <strong
                                    class="store-status-info-value text-primary"
                                  >
                                    4.5년
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
            <b-row>
              <b-col cols="12">
                <div class="data-info-box">
                  <header class="data-info-box-header">
                    <h4>
                      매출 분석
                      <span> (업종별 매출 기준)</span>
                    </h4>
                  </header>
                  <div class="data-info-box-content">
                    <b-row>
                      <b-col cols="12" xl="4">
                        <div>
                          <h5>
                            업종별 매출비중
                          </h5>
                        </div>
                      </b-col>
                      <b-col cols="12" xl="4">
                        <div>
                          <h5>
                            성별 매출비중
                          </h5>
                        </div>
                      </b-col>
                      <b-col cols="12" xl="4">
                        <div class="row-box">
                          <h5>
                            요일별 매출비중
                          </h5>
                          <div class="doughnut-chart-wrapper">
                            <DoughnutChart :chartData="dayRevenueChartData" />
                            <div class="doughnut-chart-text">
                              <span>금요일</span>
                            </div>
                          </div>
                          <div class="doughnut-chart-legend">
                            <div class="legend-label-list">
                              <p
                                v-for="label in dayRevenueChartData.labels"
                                :key="label"
                              >
                                <span class="legend-label-point"></span>
                                <span class="legend-label-text">
                                  {{ label }}</span
                                >
                              </p>
                            </div>
                            <div class="legend-value-list">
                              <p
                                v-for="data in dayRevenueChartData.datasets[0]
                                  .data"
                                :key="data"
                              >
                                <span class="legend-value"> {{ data }}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="row-box">
                          <h5>
                            시간대별 매출비중
                          </h5>
                          <div>
                            <DoughnutChart :chartData="timeRevenueChartData" />
                          </div>
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
        </section>
        <div class="section-header"></div>
      </b-tab>
      <b-tab>
        <template #title>
          <div class="tab-header">
            <h4>
              <b-icon icon="truck"></b-icon>
              <span class="ml-2">배달업종 상세현황</span>
            </h4>
          </div>
        </template>
        <b-row>
          <b-col cols="6" lg="4">
            <div class="baemin-info-box">
              <div>
                <p class="baemin-info-value">
                  <strong>4.9</strong>
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
                  <strong>10,200</strong>
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
                  <strong>1,700</strong>
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
                  <strong>8,480</strong>
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
                  <strong>1,900</strong>
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
                  <strong>2,529</strong>
                </p>
                <p class="baemin-info-label">
                  <span>찜 수</span>
                </p>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab>
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
      <b-tab>
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
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { DeliveryFounderConsultDto } from '@/dto';
import {
  BEST_FOOD_CATEGORY,
  CONST_BEST_FOOD_CATEGORY,
} from '@/services/shared';
import { Component } from 'vue-property-decorator';
import DeliveryFounderConsultService from '../../../../services/delivery-founder-consult.service';
import ResultRevenueChart from '@/modules/pickcook/consult-response/add-on/ResultRevenueChart.vue';
import DoughnutChart from '../add-on/DoughnutChart.vue';
import DashboardBarChart from '@/modules/dashboard/add-on/DashboardBarChart.vue';

@Component({
  name: 'ConsultReportDetail',
  components: {
    ResultRevenueChart,
    DoughnutChart,
    DashboardBarChart,
  },
})
export default class ConsultReportDetail extends BaseComponent {
  // 창업업종
  private selectedFoodCategory: BEST_FOOD_CATEGORY = BEST_FOOD_CATEGORY.F16;
  private foodCategories: BEST_FOOD_CATEGORY[] = [...CONST_BEST_FOOD_CATEGORY];

  // 요일별 매출 비율 차트
  private dayRevenueChartData = {
    labels: [
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
      '일요일',
    ],
    datasets: [
      {
        data: [12.6, 13.7, 13.7, 15.0, 15.3, 15.0, 15],
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
  private timeRevenueChartData = {
    labels: ['아침', '점심', '저녁', '야식'],
    datasets: [
      {
        data: [10, 20, 40, 30],
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
        data: [125, 534, 754, 922, 1800],
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

  private map;
  private deliveryFounderConsultMap = new DeliveryFounderConsultDto();

  // 지도 가져오기
  setMap(id) {
    DeliveryFounderConsultService.findOne(id).subscribe(res => {
      if (res) {
        this.deliveryFounderConsultMap = res.data;

        if (
          this.deliveryFounderConsultMap.deliverySpace &&
          this.deliveryFounderConsultMap.deliverySpace.companyDistrict
        ) {
          const mapContainer = document.getElementById('map'),
            mapOption = {
              center: new window.kakao.maps.LatLng(
                this.deliveryFounderConsultMap.deliverySpace.companyDistrict.lat,
                this.deliveryFounderConsultMap.deliverySpace.companyDistrict.lon,
              ),
              level: 6,
              maxLevel: 6,
              minLevel: 3,
              mapTypeId: window.kakao.maps.MapTypeId.ROADMAP,
            };

          const map = new window.kakao.maps.Map(mapContainer, mapOption);
          const content = `<span class="badge badge-primary" style="font-size:21px;border-radius: 100px;opacity: 82%">Here</span>`;
          const markerPosition = new window.kakao.maps.LatLng(
            this.deliveryFounderConsultMap.deliverySpace.companyDistrict.lat,
            this.deliveryFounderConsultMap.deliverySpace.companyDistrict.lon,
          );

          const customOverlay = new window.kakao.maps.CustomOverlay({
            position: markerPosition,
            content: content,
            // image: markerImage,
          });

          const circle = new window.kakao.maps.Circle({
            map: map,
            center: new window.kakao.maps.LatLng(
              this.deliveryFounderConsultMap.deliverySpace.companyDistrict.lat,
              this.deliveryFounderConsultMap.deliverySpace.companyDistrict.lon,
            ),
            strokeWeight: 2,
            strokeColor: '#FF00FF',
            strokeOpacity: 0.8,
            strokeStyle: 'dashed',
            fillColor: '#00EEEE',
            fillOpacity: 0.5,
          });
          circle.setRadius(1000);
          circle.setMap(map);
          customOverlay.setMap(map);
          this.map = map;
        }
      }
    });
  }

  created() {
    this.setMap('279');
  }
}
</script>
<style lang="scss">
#report {
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
        font-size: 1.6rem;
        line-height: 1.2;
      }
    }
  }
  .baemin-info-box {
    border-top: 2px solid #0b538d;
    border-bottom: 2px solid #0b538d;
    padding: 4em 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 2em 0;
    height: calc(100% - 4em);
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
.doughnut-chart-wrapper {
  position: relative;
  .doughnut-chart-text {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.doughnut-chart-legend {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
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
    }
  }
}
</style>
