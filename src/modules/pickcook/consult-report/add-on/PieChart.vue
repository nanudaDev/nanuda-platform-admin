<template>
  <div>
    <apexchart
      :options="chartOptions"
      :series="chartSeries"
      :height="height ? height : 300"
      ref="chartRef"
    ></apexchart>
  </div>
</template>
<script lang="ts">
/* Apex Chart - Pie, Donut */
import VueApexCharts from 'vue-apexcharts';
import { Component } from 'vue-property-decorator';
import BaseChartComponent from '@/core/base.chart.component';

@Component({
  name: 'ApexPieChart',
  components: {
    VueApexCharts,
  },
})
export default class ApexPieChart extends BaseChartComponent {
  constructor() {
    super();
    this.chartOptions = {
      chart: {
        type: 'donut',
      },
      legend: {
        horizontalAlign: 'center',
        offsetX: 0,
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          strokeColor: '#fff',
          fillColors: undefined,
          radius: 12,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0,
        },
      },
    };
  }
}
</script>
