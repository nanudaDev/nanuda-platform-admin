<script lang="ts">
// CommitChart.ts
import BaseComponent from '@/core/base.component';
import Vue from 'vue';
import { Bar, Line, Radar, mixins } from 'vue-chartjs';
import { Component, Prop } from 'vue-property-decorator';
import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  extends: Radar, // this is important to add the functionality to your component
  mixins: [mixins.reactiveProp],
  components: { ChartDataLabels },
})
export default class GenderRevenueChart extends Vue {
  public renderChart!: (chartData: any, options?: any) => void;
  private gradient: any;
  @Prop() private readonly chartData: any;

  mounted(): void {
    const canvas = document.getElementById('line-chart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const gradientStrokeMale = 'rgba(11,83,141,1)';
    const gradientFillMale = ctx.createLinearGradient(0, 0, 0, 500);
    gradientFillMale.addColorStop(0, 'rgba(103,186,208,0.25)');
    gradientFillMale.addColorStop(1, 'rgba(11,83,141,0.25)');

    this.chartData.datasets[0].borderColor = gradientStrokeMale;
    this.chartData.datasets[0].backgroundColor = gradientFillMale;

    const gradientStrokeFeMale = 'rgba(208, 70, 105,1)';
    const gradientFillFeMale = ctx.createLinearGradient(0, 0, 0, 500);
    gradientFillFeMale.addColorStop(0, 'rgba(245, 138, 165,0.25)');
    gradientFillFeMale.addColorStop(1, 'rgba(208, 70, 105,0.25)');

    this.chartData.datasets[1].borderColor = gradientStrokeFeMale;
    this.chartData.datasets[1].backgroundColor = gradientFillFeMale;
    // Overwriting base render method with actual data.

    this.renderChart(this.chartData, {
      animation: {
        easing: 'easeInOutBack',
      },
      plugins: {
        datalabels: {
          display: false,
          backgroundColor: 'transparent',
          anchor: 'end',
          align: 'top',
          offset: '15',
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#004D8A',
        },
      },
      tooltips: {
        enabled: false,
        showAllTooltips: true,
      },
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
      },
      scales: {
        angleLines: {
          display: false,
        },
        xAxes: [
          {
            ticks: {
              display: false,
            },
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              display: false,
            },
            gridLines: {
              display: false,
            },
          },
        ],
      },
    });
  }
}
</script>

<style></style>
