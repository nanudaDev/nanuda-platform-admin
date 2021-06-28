<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Bar } from 'vue-chartjs';

@Component({
  extends: Bar,
})
export default class BarChart extends Vue<Bar> {
  constructor() {
    super();
  }
  @Prop({ required: true }) chartData!: any;

  mounted() {
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
    });
  }
}
</script>
