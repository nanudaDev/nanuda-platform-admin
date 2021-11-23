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
/* Apex Chart - Line, Bar mixed */
import VueApexCharts from 'vue-apexcharts';
import { Component } from 'vue-property-decorator';
import BaseChartComponent from '@/core/base.chart.component';

@Component({
  name: 'ApexMixedChart',
  components: {
    VueApexCharts,
  },
})
export default class ApexMixedChart extends BaseChartComponent {
  constructor() {
    super();
    this.chartOptions = {
      legend: {
        horizontalAlign: 'center',
        offsetX: 0,
        tooltipHoverFormatter: function(val, opts) {
          return (
            val +
            ' - ' +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            ''
          );
        },
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
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
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
