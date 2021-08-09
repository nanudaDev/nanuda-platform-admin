<template>
  <div id="report">
    <div class="page d-print">
      <header>
        <h1>상권분석 리포트</h1>
        <address contenteditable>
          <p>RIA</p>
          <p>101 E. Chapman Ave<br />Orange, CA 92866</p>
          <p>010 4153 7907</p>
        </address>
      </header>
    </div>
    <div class="page">
      <header>
        <h1>상권개요</h1>
      </header>
      <article>
        <b-col
          cols="12"
          xl="7"
          v-if="salesResponseDto && revenueData.length > 0"
        >
        </b-col>
      </article>
    </div>
    <div class="page">
      <header>
        <h1>매출분석</h1>
      </header>
      <article>
        <b-row>
          <b-col cols="12" xl="8">
            <RevenueChart
              :chartData="revenueChartData"
              :revenueData="revenueData"
            />
          </b-col>
        </b-row>
      </article>
    </div>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';
import ConsultResponseV3Service from '@/services/pickcook/consult-response-v3.service';
import { ConsultResponseV3Dto, SalesRequestDto, SalesResponseDto } from '@/dto';
import RevenueChart from '../add-on/RevenueChart.vue';

@Component({
  name: 'ConsultReportPrint',
  components: {
    RevenueChart,
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

* {
  border: 0;
  box-sizing: content-box;
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

*[contenteditable] {
  border-radius: 0.25em;
  min-width: 1em;
  outline: 0;
}

*[contenteditable] {
  cursor: pointer;
}

*[contenteditable]:hover,
*[contenteditable]:focus,
td:hover *[contenteditable],
td:focus *[contenteditable],
img.hover {
  background: #def;
  box-shadow: 0 0 1em 0.5em #def;
}

span[contenteditable] {
  display: inline-block;
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
  font: 16px/1 'Open Sans', sans-serif;
  overflow: auto;
  padding: 0.5in;
  background: #999;
  cursor: default;
}

body {
  background: none;
}

.page {
  box-sizing: border-box;
  height: 11in;
  margin: 0 auto;
  overflow: hidden;
  padding: 0.5in;
  width: 8.5in;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);

  + .page {
    margin-top: 1in;
  }
}

/* header */

header {
  margin: 0 0 3em;
}
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
}
header address p {
  margin: 0 0 0.25em;
}
header span,
header img {
  display: block;
  float: right;
}
header span {
  margin: 0 0 1em 1em;
  max-height: 25%;
  max-width: 60%;
  position: relative;
}
header img {
  max-height: 100%;
  max-width: 100%;
}
header input {
  cursor: pointer;
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

/* article */

article,
article address,
table.meta,
table.inventory {
  margin: 0 0 3em;
}
article:after {
  clear: both;
  content: '';
  display: table;
}
article h1 {
  clip: rect(0 0 0 0);
  position: absolute;
}

article address {
  float: left;
  font-size: 125%;
  font-weight: bold;
}

/* table meta & balance */

table.meta,
table.balance {
  float: right;
  width: 36%;
}
table.meta:after,
table.balance:after {
  clear: both;
  content: '';
  display: table;
}

/* table meta */

table.meta th {
  width: 40%;
}
table.meta td {
  width: 60%;
}

/* table items */

table.inventory {
  clear: both;
  width: 100%;
}
table.inventory th {
  font-weight: bold;
  text-align: center;
}

table.inventory td:nth-child(1) {
  width: 26%;
}
table.inventory td:nth-child(2) {
  width: 38%;
}
table.inventory td:nth-child(3) {
  text-align: right;
  width: 12%;
}
table.inventory td:nth-child(4) {
  text-align: right;
  width: 12%;
}
table.inventory td:nth-child(5) {
  text-align: right;
  width: 12%;
}

/* table balance */

table.balance th,
table.balance td {
  width: 50%;
}
table.balance td {
  text-align: right;
}

/* aside */

aside h1 {
  border: none;
  border-width: 0 0 1px;
  margin: 0 0 1em;
}
aside h1 {
  border-color: #999;
  border-bottom-style: solid;
}

/* javascript */

.add,
.cut {
  border-width: 1px;
  display: block;
  font-size: 0.8rem;
  padding: 0.25em 0.5em;
  float: left;
  text-align: center;
  width: 0.6em;
}

.add,
.cut {
  background: #9af;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  background-image: -moz-linear-gradient(#00adee 5%, #0078a5 100%);
  background-image: -webkit-linear-gradient(#00adee 5%, #0078a5 100%);
  border-radius: 0.5em;
  border-color: #0076a3;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  text-shadow: 0 -1px 2px rgba(0, 0, 0, 0.333);
}

.add {
  margin: -2.5em 0 0;
}

.add:hover {
  background: #00adee;
}

.cut {
  opacity: 0;
  position: absolute;
  top: 0;
  left: -1.5em;
}
.cut {
  -webkit-transition: opacity 100ms ease-in;
}

tr:hover .cut {
  opacity: 1;
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
    page-break-after: always;
    + .page {
      margin-top: 0;
    }
  }

  @page {
    size: a4 !important;
    margin: 0 !important;
    padding: 0 !important;
  }
}
</style>
