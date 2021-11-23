<template>
  <div id="report">
    <div class="text-center mb-4 d-print-none">
      <b-btn
        variant="dark"
        size="lg"
        @click="generateReport()"
        class="d-print-none txt-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-printer"
          viewBox="0 0 16 16"
        >
          <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
          <path
            d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"
          />
        </svg>
        <span class="ml-2">프린트</span>
      </b-btn>
    </div>
    <div class="page cover">
      <div class="page-inner">
        <div>
          <header>
            <h1>
              <p class="mb-2">
                <img
                  src="https://kr.object.ncloudstorage.com/common-storage-pickcook/common/logo_symbol_w.png"
                  alt="픽쿡"
                  class=""
                />
              </p>
              <span>PICKCOOK</span>
              상권분석 리포트
            </h1>
            <p class="mt-4">
              <span class="sub-title-en">ANALYSIS REPORT</span>
            </p>
          </header>
          <address>
            <p>이름<span contenteditable>김보라</span></p>
            <p>지역<span contenteditable>서울시 노원구 공릉1동</span></p>
            <p>선택 업종<span contenteditable>한식</span></p>
            <p>서비스 이용횟수<span contenteditable>2</span>회</p>
          </address>
        </div>
        <footer>
          <div class="mb-3">
            <p class="date">2021년 08월 12일</p>
          </div>
          <p>
            PICKCOOK은 주기적인 업데이트 과정을 거친 실 데이터를 기반으로 한
            분석 결과물입니다. <br />(분석 시기별로 내용이 변경되오니 이점
            유의하시길 바랍니다.)
          </p>
        </footer>
      </div>
    </div>
    <div class="page">
      <div class="page-inner">
        <div>
          <header>
            <h1>01 상권 분석 개요</h1>
          </header>
          <article>
            <b-row>
              <b-col cols="6">
                <div class="row-box">
                  <div id="map" style="height:400px"></div>
                </div>
              </b-col>
              <b-col cols="6">
                <div class="row-box">
                  <table class="table">
                    <colgroup>
                      <col width="25%" />
                      <col width="*" />
                      <col width="25%" />
                      <col width="*%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scpoe="row">선택지역</th>
                        <td colspan="3">서울시 노원구 공릉1동</td>
                      </tr>
                      <tr>
                        <th scpoe="row">선택업종</th>
                        <td colspan="3">한식</td>
                      </tr>
                      <tr>
                        <th scope="row">음식점수(개)</th>
                        <td>1,350</td>
                        <th scope="row">주거인구(명)</th>
                        <td>34,990</td>
                      </tr>
                      <tr>
                        <th scope="row">총세대수(세대)</th>
                        <td>24,500</td>
                        <th scope="row">직장인구(명)</th>
                        <td>8,000</td>
                      </tr>
                      <tr>
                        <th scope="row">평균 영업기간(년)</th>
                        <td>4</td>
                        <th scope="row">유동인구(명)</th>
                        <td>10,500</td>
                      </tr>
                      <tr>
                        <th scope="row">주요 연령대</th>
                        <td>20~30대</td>
                        <th scope="row"></th>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </b-col>
              <b-col cols="12">
                <div class="row-box mt-4">
                  <b-alert variant="secondary" show>
                    <h5 class="text-primary">
                      <b-icon icon="info-circle-fill"></b-icon>
                      <span class="ml-2">통계 기준 안내</span>
                    </h5>
                    <div class="mt-2">
                      <p>
                        한식음식점 3년생존율은 61.5%로 서울시 3년생존율 45.7%
                        보다 높고 전년동기 45.1% 보다 높습니다. 해당지역에
                        한식음식점 창업 시 향후 경쟁관계에 큰 변화가 없다면 2년
                        정도의 영업기간을 기대할 수 있을 것으로 예상됩니다. 기대
                        영 업기간이 길수록 좋은 상권입니다. 선택상권의
                        주거인구밀도는 1ha(1만㎡)당 130명 규모로 전년대비
                        증가하였습니다. 면적은 59,866 평방제곱미터(㎡),
                        직장인구밀도는 78명, 3개월간 상존인구밀도는 약34,990명
                        수준입니다.<br />
                        선택상권 행정동 1층 임대료는 3.3㎡당 139,700원으로 전년
                        동기 137,188원에 비해 높습니다. 임대료의 급격한 상승이나
                        개폐업율변 화가 큰곳인지 상세분석을 참조하세요.선택상권
                        한식음식점은 전년대비 동일한 경향을 보이고 있으며,
                        개업률 4.1%, 폐업률4.1%이며 개업률, 폐업률이
                        정체상태입니다. 한식음식점 의 3개월간매출은 13,188,130원
                        수준이며, 서울시 평균에 비해 낮은 편이며 전년 동기
                        12,979,820원보다 높은 수준입니 다.
                      </p>
                    </div>
                  </b-alert>
                </div>
              </b-col>
            </b-row>
          </article>
        </div>
        <footer>
          <p>PICKCOOK ANALYSIS ⓒ2021</p>
        </footer>
      </div>
    </div>
    <div class="page">
      <div class="page-inner">
        <div>
          <header>
            <h1>02 인구분석</h1>
          </header>
          <article>
            <section>
              <div id="chart"></div>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">상권유형</th>
                    <th scope="col">주거인구(명)</th>
                    <th scope="col">직장인구(명)</th>
                    <th scope="col">유동인구(명)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>주상복합</td>
                    <td>3,000</td>
                    <td>4,000</td>
                    <td>5,000</td>
                  </tr>
                </tbody>
              </table>
            </section>
            <section>
              <b-row>
                <b-col cols="6">
                  <div class="card">
                    <ApexPieChart
                      :series="donutSeries"
                      :options="donutOptions"
                    ></ApexPieChart>
                  </div>
                </b-col>
                <b-col cols="6">
                  <div class="card">
                    <ApexLineChart
                      :series="lineSeries"
                      :options="lineOptions"
                    ></ApexLineChart>
                  </div>
                </b-col>
              </b-row>
            </section>
          </article>
        </div>
        <footer>
          <p>PICKCOOK ANALYSIS ⓒ2021</p>
        </footer>
      </div>
    </div>
    <div class="page">
      <div class="page-inner">
        <div>
          <section>
            <div class="card">
              <ApexMixedChart
                :series="mixedSeries"
                :options="mixedOptions"
              ></ApexMixedChart>
            </div>
          </section>
          <section>
            <div class="card">
              <ApexPieChart
                :series="donutSeries"
                :options="donutOptions"
              ></ApexPieChart>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';
import ConsultResponseV3Service from '@/services/pickcook/consult-response-v3.service';
import { ConsultResponseV3Dto, SalesRequestDto, SalesResponseDto } from '@/dto';
import ApexLineChart from '../add-on/LineChart.vue';
import ApexMixedChart from '../add-on/MixedChart.vue';
import ApexPieChart from '../add-on/PieChart.vue';

@Component({
  name: 'ConsultReportPrint',
  components: {
    ApexLineChart,
    ApexMixedChart,
    ApexPieChart,
  },
})
export default class ConsultReportPrint extends BaseComponent {
  declare $refs: any;

  private plotlyLayout = {
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
      pad: 4,
    },
    showtitle: false,
    showlegend: true,
    legend: {
      orientation: 'h',
    },
  };

  private plotlyData = [
    {
      x: [0, 1, 2, 3, 4],
      y: [1, 5, 3, 7, 5],
      mode: 'lines+markers',
      type: 'scatter',
    },
    {
      x: [1, 2, 3, 4, 5],
      y: [4, 0, 4, 6, 8],
      mode: 'lines+markers',
      type: 'scatter',
    },
  ];

  private plotlyOptions = {
    editable: false,
    displayModeBar: false,
    showEditInChartStudio: false,
    staticPlot: true,
    responsive: true,
  };

  private mixedSeries = [
    {
      name: '여성',
      type: 'column',
      data: [20, 30, 60, 70, 40, 10],
    },
    {
      name: '남성',
      type: 'column',
      data: [15, 20, 40, 60, 70, 30],
    },
    {
      name: '전체',
      type: 'line',
      data: [20, 29, 60, 80, 35, 20],
    },
  ];

  private mixedOptions = {
    xaxis: {
      categories: ['10대', '20대', '30대', '40대', '50대', '60대 이상'],
    },
    yaxis: {},
    fill: {
      colors: ['#f26360', '#0080c6', '#f9a74a'],
    },
    stroke: {
      colors: ['#f26360', '#0080c6', '#f9a74a'],
      width: [0, 0, 4],
    },
    markers: {
      size: 6,
      colors: '#f9a74a',
      strokeColors: '#fff',
      strokeWidth: 3,
    },

    legend: {
      markers: {
        fillColors: ['#f26360', '#0080c6', '#f9a74a'],
      },
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0, 1],
      background: false,
      style: {
        colors: ['#fff'],
      },
      formatter: function(val, opts) {
        return val;
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'bottom',
        },
      },
    },
  };

  private lineSeries = [
    {
      name: '여성',
      data: [20, 30, 60, 70, 40, 10],
    },
    {
      name: '남성',
      data: [15, 20, 40, 60, 70, 30],
    },
    {
      name: '전체',
      data: [20, 29, 60, 80, 35, 20],
    },
  ];

  private lineOptions = {
    xaxis: {
      categories: ['10대', '20대', '30대', '40대', '50대', '60대 이상'],
    },
  };

  private donutSeries = [44, 55, 41, 17, 15];
  private donutOptions = {
    labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
    plotOptions: {
      pie: {
        customScale: 0.8,
      },
    },
  };

  private salesRequestDto = new SalesRequestDto();
  private salesResponseDto: any = new SalesResponseDto();
  private consultResponseV3Dto = new ConsultResponseV3Dto();
  private map;
  private reportAddress = '서울시 노원구 공릉1동';

  // 상권매출현황 차트
  private revenueData = [];
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

  getSalesData() {
    ConsultResponseV3Service.getSalesData(this.salesRequestDto).subscribe(
      res => {
        if (res) {
          this.salesResponseDto = res.data;

          if (this.salesResponseDto) {
            //상권매출현황 차트 데이터
            this.revenueData = [
              0,
              +this.salesResponseDto.minRevenue,
              +this.salesResponseDto.medianRevenue,
              +this.salesResponseDto.maxRevenue,
              parseInt(this.salesResponseDto.maxRevenue) +
                parseInt(this.salesResponseDto.maxRevenue) / 2,
            ];
          }
        }
      },
    );
  }

  // 지도 가져오기
  setMap() {
    const geocoder = new window.kakao.maps.services.Geocoder();

    const callback = function(result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const mapContainer = document.getElementById('map');
        if (!mapContainer) return;
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
        circle.setRadius(700);
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
        // toast.error('다른 주소로 선택해주세요');
      }
    };
    geocoder.addressSearch(res.address, callback);
    this.$bvModal.hide('postcode');
  }

  generateReport() {
    window.print();
  }

  created() {
    this.getConsultData(this.$route.params.id);
    this.setMap();
  }
}
</script>
<style lang="scss">
/* reset */
.chart-container {
  max-width: 100%;
  canvas {
    min-height: 100%;
    max-width: 100%;
    max-height: 100%;
    height: auto !important;
    width: auto !important;
  }
}
* {
  border: 0;
  box-sizing: border-box;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  list-style: none;
  margin: 0;
  padding: 0;
  text-decoration: none;
  vertical-align: top;
}

/* content editable */
[contenteditable='true'] {
  cursor: text;
}

[contenteditable='true']:hover {
  outline: 2px solid #c4dcf0;
}

[contenteditable='true']:focus {
  outline: 2px solid #5e9ed7;
}

/* heading */

header {
  text-align: left;
  border-bottom: 2px solid #004d8a;
  color: #004d8a;
  padding-bottom: 1em;
  margin-bottom: 1em;
  h1 {
    font-weight: bold;
    font-size: 16pt;
  }
}

/* table */
table {
  font-size: 75%;
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #ddd;
  }

  th {
    background: #eee;
  }
}

/* page */

html {
  overflow: auto;
  padding: 0.5in;
  background: #999;
  cursor: default;
}
body {
  background: none;
  min-width: 0 !important;
}
.container {
  min-width: 0 !important;
}

/* page */
.page {
  margin: 0 auto;
  overflow: hidden;
  width: 11.7in;
  height: 8.3in;
  background: #fff;
  box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
  padding: 0.5in;
  .row-box {
    + .row-box {
      margin-top: 1.5em;
    }
  }
  p {
    font-size: 10pt;
    line-height: 1.6;
  }
  + .page {
    margin-top: 1in;
  }

  .page-inner {
    position: relative;
    height: 7.28in;
  }

  &.cover {
    background-color: #004d8a;

    header {
      margin-top: 1.25in;
      color: #fff;
      text-align: center;
      h1 {
        font-size: 24pt;
        background: transparent;
        letter-spacing: 0.5em;
        padding-left: 0.5em;
        line-height: 1.6;
        span {
          display: block;
        }
      }
      .sub-title-en {
        display: inline-block;
        text-align: center;
        padding-top: 1em;
        font-size: 12px;
        border-top: 1px solid rgba(255, 255, 255, 0.5);
        color: #fff;
        letter-spacing: 2em;
        padding-left: 2em;
      }
    }
    address {
      margin-top: 0.25in;
      color: #fff;
      text-align: center;
      p {
        font-size: 16pt;
        line-height: 1.8;
        span {
          position: relative;
          display: inline-block;
          padding-left: 0.5em;
          margin-left: 0.5em;
          &:before {
            position: absolute;
            left: 0;
            top: 50%;
            margin-top: -0.25em;
            display: inline-block;
            content: '';
            width: 2px;
            height: 0.5em;
            background: rgba(255, 255, 255, 0.5);
          }
        }
      }
    }
    footer {
      color: #fff;
      bottom: 0.25in;
      .date {
        font-size: 16pt;
      }
    }
    .page-inner {
      border: 2px solid #fff;
    }
  }

  .card {
    height: 100%;
    justify-content: center;
  }
}

/* footer */
footer {
  text-align: center;
  font-size: 8pt;
  position: absolute;
  left: 0;
  bottom: -0.25in;
  width: 100%;
}

/* article */

article:after {
  clear: both;
  content: '';
  display: table;
}
article address {
  float: left;
  font-size: 125%;
  font-weight: bold;
}

section {
  + section {
    margin-top: 3em;
  }
}

@media print {
  * {
    -webkit-print-color-adjust: exact;
  }
  html,
  body {
    background: none;
    padding: 0;
    margin: 0;
    min-width: auto;
  }

  .page {
    box-shadow: none;
    width: auto;
    height: auto;
    margin: 0;
    + .page {
      margin-top: 0;
    }
    .page-inner {
      height: 7.28in;
    }
  }

  @page {
    size: a4 landscape !important;
    margin: 0 !important;
    padding: 0 !important;
  }
}
</style>
