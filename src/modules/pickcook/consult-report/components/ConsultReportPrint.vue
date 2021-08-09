<template>
  <div id="report">
    <div class="page cover">
      <div class="page-inner">
        <div>
          <header>
            <h1>
              <span>PICKCOOK</span>
              상권분석 리포트
            </h1>
            <address contenteditable>
              <p>RIA</p>
              <p>101 E. Chapman Ave<br />Orange, CA 92866</p>
              <p>010 4153 7907</p>
            </address>
          </header>
        </div>
      </div>
    </div>
    <div class="page">
      <div class="page-inner">
        <div>
          <header>
            <h1>상권개요</h1>
          </header>
          <article>
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
            <h1>매출분석</h1>
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

@Component({
  name: 'ConsultReportPrint',
  components: {
    RevenueChart,
    DoughnutChart,
  },
})
export default class ConsultReportPrint extends BaseComponent {
  private salesRequestDto = new SalesRequestDto();
  private salesResponseDto: any = new SalesResponseDto();
  private consultResponseV3Dto = new ConsultResponseV3Dto();

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

  created() {
    this.getConsultData(this.$route.params.id);
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

h1 {
  font: bold 100% sans-serif;
  letter-spacing: 0.5em;
  text-align: center;
  text-transform: uppercase;
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

section {
  + section {
    margin-top: 1em;
  }
}

/* page */
.page {
  box-sizing: border-box;
  margin: 0 auto;
  overflow: hidden;
  width: 8.5in;
  height: 11.7in;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);

  + .page {
    margin-top: 1in;
  }

  .page-inner {
    position: relative;
    // display: flex;
    // flex-direction: column;
    //  justify-content: space-between;
    height: 10.7in;
    margin: 0.5in;
    overflow: hidden;
  }

  &.cover {
    background-color: #004d8a;

    header {
      margin-top: 3in;
      h1 {
        font-size: 24pt;
        background: transparent;
        span {
          display: block;
        }
      }
    }
    .page-inner {
      border: 2px solid #fff;
    }
    address {
      position: absolute;
      right: 0.25in;
      bottom: 0.25in;
      font-size: 14pt;
    }
  }
}

/* header */

header:after {
  clear: both;
  content: '';
  display: table;
}

header h1 {
  background: #000;
  border-radius: 0.25em;
  color: #fff;
  margin: 0 0 1em;
  padding: 0.5em 0;
}
header address {
  float: left;
  font-size: 75%;
  font-style: normal;
  line-height: 1.25;
  margin: 0 1em 1em 0;
  color: #fff;
}
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
    height: 11.7in;
    min-height: 1058px;
    margin: 0;
    + .page {
      margin-top: 0;
    }
    .page-inner {
      height: 10.7in;
    }
  }

  @page {
    size: a4 !important;
    margin: 0 !important;
    padding: 0 !important;
  }
}
</style>
