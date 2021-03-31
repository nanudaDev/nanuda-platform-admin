<script lang="ts">
// CommitChart.ts
import BaseComponent from '@/core/base.component';
import Vue from 'vue';
import { Doughnut, mixins } from 'vue-chartjs';
import { Component, Prop } from 'vue-property-decorator';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  extends: Doughnut, // this is important to add the functionality to your component
  mixins: [mixins.reactiveProp],
  components: { ChartDataLabels },
})
export default class FoodCategoryRatioChart extends Vue {
  @Prop() private readonly chartData: any;
  public renderChart!: (chartData: any, options?: any) => void;

  mounted(): void {
    // Overwriting base render method with actual data.
    this.renderChart(this.chartData, {
      plugins: {
        datalabels: {
          align: 'center',
          anchor: 'center',
          // color: function(ctx: any) {
          //   return 'rgba(11,83,141,1)';
          // },
          font: { size: 12, align: 'center', weight: 'bold' },
          backgroundColor: 'white',
          textAlign: 'center',
          formatter: function(value: any, ctx: any) {
            return `${ctx.chart.data.labels[ctx.dataIndex]}\n${value}%`;
          },
          borderRadius: 500,
          borderWidth: 3,
          borderColor: 'rgba(245,245,245,1)',
          padding: 10,
          offset: 10,
          color: 'rgba(11,83,141,1)',
        },
      },
      tooltips: {
        enabled: false,
      },
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          padding: 20,
        },
      },
    });
  }
}
</script>

<style></style>
