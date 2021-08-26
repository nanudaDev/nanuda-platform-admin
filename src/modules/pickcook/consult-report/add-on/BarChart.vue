<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Bar, mixins } from 'vue-chartjs';
import { ChartOptions } from 'chart.js';

@Component({
  extends: Bar,
  mixins: [mixins.reactiveProp],
})
export default class BarChart extends Vue<Bar> {
  constructor() {
    super();
  }
  @Prop({ required: true }) chartData!: any;
  @Prop() private datasetsData: any;
  @Prop() private labels?: any;
  @Watch('datasetsData')
  public onRevenueData() {
    if (this.labels.length > 0) {
      this.chartData.labels = this.labels;
    }
    this.chartData.datasets[0].data = [...this.datasetsData];
    this.renderChart(this.chartData, this.options);
  }
  private options: ChartOptions = {
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    plugins: {
      datalabels: {
        align: 'top',
        anchor: 'end',
        color: 'rgb(11 83 141)',
        font: {
          size: 18,
          weight: 'bold',
        },
        formatter: (value, context) => {
          const arr = context.dataset.data;
          const sorted = arr.slice().sort((a, b) => {
            return b - a;
          });
          return value + '%';
        },
        display: context => {
          return context.dataIndex < 3;
        },
      },
    },
    layout: {
      padding: {
        top: 40,
      },
    },
  };
  mounted() {
    if (this.labels.length > 0) {
      this.chartData.labels = this.labels;
    }
    this.chartData.datasets[0].data = this.datasetsData;

    this.renderChart(this.chartData, this.options);
  }
}
</script>
