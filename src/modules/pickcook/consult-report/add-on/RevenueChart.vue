<script lang="ts">
// CommitChart.ts
import Vue from 'vue';
import { Line, mixins } from 'vue-chartjs';
import { Component, Prop, Watch } from 'vue-property-decorator';
import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  extends: Line, // this is important to add the functionality to your component
  mixins: [mixins.reactiveProp],
  components: { ChartDataLabels },
})
export default class RevenueChart extends Vue {
  public renderChart!: (chartData: any, options?: any) => void;
  private gradient: any;
  private chartData: any;
  private options = {
    animation: {
      easing: 'easeInOutBack',
    },
    plugins: {
      datalabels: {
        backgroundColor: 'transparent',
        anchor: 'end',
        align: 'top',
        offset: '15',
        font: {
          size: 24,
          weight: 'bold',
        },
        color: ['transparent', '#007EEB', '#007EEB', '#007EEB', 'transparent'],
        formatter: (number: any, context: any) => {
          // console.log('context', context);
          if (context.dataIndex == 0) {
            return null;
          } else if (context.dataIndex == 5) {
            return null;
          } else {
            // 단위 추가
            const inputNumber: any = number < 0 ? false : number * 1;
            const unitWords = ['원', '만원', '억', '조', '경'];
            const splitUnit = 10000;
            const splitCount = unitWords.length;
            const resultArray = [];
            let resultString = '';
            for (let i = 0; i < splitCount; i++) {
              let unitResult =
                (inputNumber % Math.pow(splitUnit, i + 1)) /
                Math.pow(splitUnit, i);
              unitResult = Math.floor(unitResult);
              if (i !== 0 && unitResult > 0) {
                resultArray[i] = unitResult;
              }
            }

            for (let i = 0; i < resultArray.length; i++) {
              if (!resultArray[i]) continue;
              resultString = `${String(resultArray[i])}${unitWords[i]}`;
            }

            return resultString;
          }
        },
      },
    },
    layout: {
      padding: {
        // Any unspecified dimensions are assumed to be 0
        top: 0,
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
            fontSize: 18,
            fontColor: 'black',
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
            display: true,
            stepSize: 20000000,
            callback: number => {
              const inputNumber: any = number < 0 ? false : number * 1;
              const unitWords = ['원', '만원', '억', '조', '경'];
              const splitUnit = 10000;
              const splitCount = unitWords.length;
              const resultArray = [];
              let resultString = '';
              for (let i = 0; i < splitCount; i++) {
                let unitResult =
                  (inputNumber % Math.pow(splitUnit, i + 1)) /
                  Math.pow(splitUnit, i);
                unitResult = Math.floor(unitResult);
                if (i !== 0 && unitResult > 0) {
                  resultArray[i] = unitResult;
                }
              }

              for (let i = 0; i < resultArray.length; i++) {
                if (!resultArray[i]) continue;
                resultString = `${String(resultArray[i])}${unitWords[i]}`;
              }

              return resultString;
            },
          },
          gridLines: {
            display: true,
          },
        },
      ],
    },
  };
  @Prop() revenueData: any;
  @Watch('revenueData')
  public onRevenueData() {
    this.chartData.datasets[0].data = [...this.revenueData];
    this.renderChart(this.chartData, this.options);
  }
  mounted(): void {
    const canvas = document.getElementById('line-chart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#327FE3');
    gradientStroke.addColorStop(1, '#327FE3');

    const gradientFill = ctx.createLinearGradient(0, 0, 0, 500);
    gradientFill.addColorStop(0, 'rgba(76,176,248,0.4)');
    gradientFill.addColorStop(1, 'rgba(50,127,227,1)');

    this.chartData.datasets[0].borderColor = gradientStroke;
    this.chartData.datasets[0].backgroundColor = gradientFill;
    // Overwriting base render method with actual data.
    this.chartData.datasets[0].data = [...this.revenueData];

    this.renderChart(this.chartData, this.options);
  }
}
</script>

<style></style>
