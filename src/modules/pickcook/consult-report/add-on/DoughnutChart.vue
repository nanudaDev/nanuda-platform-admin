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
export default class DoughnutChart extends Vue {
  @Prop() private readonly chartData: any;
  public renderChart!: (chartData: any, options?: any) => void;

  mounted(): void {
    const chart = this.renderChart(this.chartData, {
      plugins: {
        datalabels: {
          color: 'transparent',
        },
      },
      tooltips: {
        enabled: true,
      },
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
    });
  }
}
</script>

<style></style>
