<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Bar } from 'vue-chartjs';

@Component({
  extends: Bar,
})
export default class DashboardBarChart extends Vue<Bar> {
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
