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
              <span
                ><img
                  src="https://kr.object.ncloudstorage.com/common-storage-pickcook/common/logo_symbol_w.png"
                  alt="픽쿡"
                  class=""
              /></span>
              <span>PICKCOOK</span>
              상권분석 리포트
            </h1>
            <p class="mt-4">
              <span class="sub-title-en">ANALYSIS REPORT</span>
            </p>
          </header>
          <address contenteditable>
            <p>RIA</p>
            <p>101 E. Chapman Ave<br />Orange, CA 92866</p>
            <p>010 4153 7907</p>
          </address>
        </div>
      </div>
    </div>
    <div class="page">
      <div class="page-inner">
        <div>
          <header>
            <h1>01 상권개요</h1>
          </header>
          <article>
            <section>
              <div id="map" style="height:300px"></div>
            </section>
            <section>
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
                    <td>10</td>
                    <th scope="row">주거인구(명)</th>
                    <td>10</td>
                  </tr>
                  <tr>
                    <th scope="row">총세대수(세대)</th>
                    <td>10</td>
                    <th scope="row">직장인구(명)</th>
                    <td>10</td>
                  </tr>
                  <tr>
                    <th scope="row">평균 영업기간(년)</th>
                    <td>10</td>
                    <th scope="row">유동인구(명)</th>
                    <td>10</td>
                  </tr>
                  <tr>
                    <th scope="row">주요 연령대</th>
                    <td>10</td>
                    <th scope="row"></th>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </section>
            <section>
              <apexchart
                width="500"
                type="donut"
                :options="chartOptions"
                :series="series"
              ></apexchart>
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
          <header>
            <h1>02 매출분석</h1>
          </header>
          <article>
            <section>
              <b-row>
                <b-col cols="8">
                  <div
                    class="chart-container"
                    v-if="salesResponseDto && revenueData.length > 0"
                  >
                    <RevenueChart
                      :chartData="revenueChartData"
                      :revenueData="revenueData"
                      style="height:250px"
                    />
                  </div>
                </b-col>
                <b-col cols="4">
                  <div
                    class="chart-container"
                    v-if="
                      salesResponseDto &&
                        salesResponseDto.gaguRatio &&
                        mainGaguChartData
                    "
                  >
                    <DoughnutChart
                      :chartData="mainGaguChartData"
                      :labels="Object.keys(salesResponseDto.gaguRatio)"
                      :datasetsData="Object.values(salesResponseDto.gaguRatio)"
                      :backgroundColor="computedMainGaguLabelColor"
                      style="height:250px"
                    />
                  </div>
                </b-col>
              </b-row>
            </section>
            <section>
              <p>
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
                테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트
                테스트 테스트 테스트 테스트 테스트 <br />
              </p>
            </section>
          </article>
        </div>
        <footer>
          <p>PICKCOOK ANALYSIS ⓒ2021</p>
        </footer>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';
import ConsultResponseV3Service from '@/services/pickcook/consult-response-v3.service';
import { ConsultResponseV3Dto, SalesRequestDto, SalesResponseDto } from '@/dto';
import RevenueChart from '../add-on/RevenueChart.vue';
import DoughnutChart from '../add-on/DoughnutChart.vue';
import VueApexCharts from 'vue-apexcharts';

@Component({
  name: 'ConsultReportPrint',
  components: {
    RevenueChart,
    DoughnutChart,
    VueApexCharts,
  },
})
export default class ConsultReportPrint extends BaseComponent {
  declare $refs: any;

  generateReport() {
    window.print();
  }

  private chartOptions = {
    chart: {
      id: 'vuechart-example',
    },
    // xaxis: {
    //   categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    // },
  };
  private series = [44, 55, 13, 33];

  private salesRequestDto = new SalesRequestDto();
  private salesResponseDto: any = new SalesResponseDto();
  private consultResponseV3Dto = new ConsultResponseV3Dto();
  private map;
  private reportAddress = '성남시 수정구 신흥2동';

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
        // toast.error('다른 주소로 선택해주세요');
      }
    };
    geocoder.addressSearch(res.address, callback);
    this.$bvModal.hide('postcode');
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
    font-size: 18pt;
  }
}

/* table */

table {
  font-size: 75%;
  table-layout: fixed;
  width: 100%;
}
table {
  border-collapse: separate;
  border-spacing: 2px;
}
th,
td {
  border-width: 1px;
  padding: 0.5em;
  position: relative;
  text-align: left;
}
th,
td {
  border-radius: 0.25em;
  border-style: solid;
}
th {
  background: #eee;
  border-color: #bbb;
}
td {
  border-color: #ddd;
}

/* page */

html {
  font: 16px/1, sans-serif;
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
  width: 8.3in;
  height: 11.7in;
  background: #fff;
  box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
  padding: 0.5in;
  + .page {
    margin-top: 1in;
  }

  .page-inner {
    position: relative;
    // display: flex;
    // flex-direction: column;
    //  justify-content: space-between;
    height: 10.68in;
    overflow: hidden;
  }

  &.cover {
    background-color: #004d8a;

    header {
      margin-top: 3in;
      color: #fff;
      text-align: center;
      h1 {
        font-size: 24pt;
        background: transparent;
        letter-spacing: 0.5em;
        padding-left: 0.5em;
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
    .page-inner {
      border: 2px solid #fff;
    }
    address {
      position: absolute;
      right: 0.25in;
      bottom: 0.25in;
      font-size: 18pt;
      color: #fff;
      text-align: right;
    }
  }
}

/* footer */
footer {
  text-align: center;
  font-size: 8pt;
  position: absolute;
  left: 0;
  bottom: 0;
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
  html {
    font: 16px/1 'Open Sans', sans-serif;
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
      height: 10.68in;
    }
  }

  @page {
    size: a4 !important;
    margin: 0 !important;
    padding: 0 !important;
  }
}
</style>
