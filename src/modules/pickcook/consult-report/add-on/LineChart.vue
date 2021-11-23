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
/* Apex Chart - Line */
import VueApexCharts from 'vue-apexcharts';
import { Component } from 'vue-property-decorator';
import BaseChartComponent from '@/core/base.chart.component';

@Component({
  name: 'ApexLineChart',
  components: {
    VueApexCharts,
  },
})
export default class ApexLineChart extends BaseChartComponent {
  constructor() {
    super();
    this.chartOptions = {
      chart: {
        type: 'line',
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
      stroke: {
        width: 2,
      },
      markers: {
        size: 4,
        strokeWidth: 1,
        strokeColors: ['#008ffb', '#00e396', '#feb019'],
        colors: ['#fff'],
        hover: {
          sizeOffset: 3,
        },
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function(val) {
                return val;
              },
            },
          },
          {
            title: {
              formatter: function(val) {
                return val;
              },
            },
          },
          {
            title: {
              formatter: function(val) {
                return val;
              },
            },
          },
        ],
      },
      grid: {
        borderColor: '#f1f1f1',
      },
    };
  }
}
</script>
