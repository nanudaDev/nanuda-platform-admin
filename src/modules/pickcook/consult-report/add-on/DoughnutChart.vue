<script lang="ts">
// CommitChart.ts
import BaseComponent from '@/core/base.component';
import Vue from 'vue';
import { Doughnut, mixins } from 'vue-chartjs';
import { Component, Prop, Watch } from 'vue-property-decorator';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  extends: Doughnut, // this is important to add the functionality to your component
  mixins: [mixins.reactiveProp],
  components: { ChartDataLabels },
})
export default class DoughnutChart extends Vue {
  public renderChart!: (chartData: any, options?: any) => void;
  @Prop() private readonly chartData: any;
  @Prop() private datasetsData: any;
  @Prop() private labels?: any;

  @Watch('datasetsData')
  public onRevenueData() {
    this.chartData.datasets[0].data = [...this.datasetsData];
    this.renderChart(this.chartData, this.options);
  }

  private options = {
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
    cutoutPercentage: 60,
    legend: {
      display: false,
    },
  };

  mounted(): void {
    if (this.labels.length > 0) {
      this.chartData.labels = this.labels;
    }
    this.chartData.datasets[0].data = this.datasetsData;

    this.renderChart(this.chartData, this.options);
  }
}
</script>

<style></style>
