<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Bar, mixins } from 'vue-chartjs';

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

  mounted() {
    if (this.labels.length > 0) {
      this.chartData.labels = this.labels;
    }
    this.chartData.datasets[0].data = this.datasetsData;

    this.renderChart(this.chartData, {
      legend: {
        display: false,
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
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
          formatter: function(value, context) {
            const arr = context.dataset.data;
            const sorted = arr.slice().sort(function(a, b) {
              return b - a;
            });
            return value + '%';
          },
        },
      },
    });
  }
}
</script>
