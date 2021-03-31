<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Pie } from 'vue-chartjs';

@Component({
  extends: Pie,
})
export default class DashboardPieChart extends Vue<Pie> {
  constructor() {
    super();
  }
  @Prop({ required: true }) chartData!: any;
  @Prop({ required: true }) options: any;

  mounted() {
    this.renderChart(this.chartData, this.options);
  }
}
</script>
