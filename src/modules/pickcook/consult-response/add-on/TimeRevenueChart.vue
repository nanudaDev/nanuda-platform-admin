<script lang="ts">
// CommitChart.ts
import BaseComponent from '@/core/base.component';
import Vue from 'vue';
import { Bar, Line, mixins } from 'vue-chartjs';
import { Component, Prop } from 'vue-property-decorator';
import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  extends: Line, // this is important to add the functionality to your component
  mixins: [mixins.reactiveProp],
  components: { ChartDataLabels },
})
export default class TimeRevenueChart extends Vue {
  public renderChart!: (chartData: any, options?: any) => void;
  private gradient: any;
  @Prop() private readonly chartData: any;

  mounted(): void {
    const canvas = document.getElementById('line-chart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, 'rgba(11,83,141,1)');
    gradientStroke.addColorStop(1, 'rgba(103,186,208,1)');

    const gradientFill = ctx.createLinearGradient(0, 0, 0, 500);
    gradientFill.addColorStop(0, 'rgba(103,186,208,1)');
    gradientFill.addColorStop(1, 'rgba(11,83,141,1)');

    this.chartData.datasets[0].borderColor = gradientStroke;
    this.chartData.datasets[0].backgroundColor = 'transparent';
    // Overwriting base render method with actual data.

    const totalAmount = this.chartData.datasets[0].data.reduce(
      (a, b) => a + b,
      0,
    );

    this.renderChart(this.chartData, {
      animation: {
        easing: 'easeInOutBack',
      },
      plugins: {
        datalabels: {
          display: true,
          backgroundColor: 'transparent',
          anchor: 'end',
          align: 'top',
          offset: '15',
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#004D8A',
          formatter: function(number: any) {
            const resultNumber = number.toString().length;
            if (totalAmount) {
              let resultString;
              if (resultNumber > 5) {
                resultString = `${((number / totalAmount) * 100).toFixed(2)}%`;
              } else {
                resultString = `${number}%`;
              }
              return resultString;
            }
          },
        },
      },
      layout: {
        padding: {
          top: 80,
          left: 20,
          right: 20,
          // Any unspecified dimensions are assumed to be 0
        },
      },
      tooltips: {
        enabled: false,
        showAllTooltips: true,
      },
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            ticks: {
              padding: 0,
              fontSize: 15,
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
