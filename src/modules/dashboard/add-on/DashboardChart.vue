<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Line, Bar } from 'vue-chartjs';

@Component({
  extends: Line,
})
export default class DashboardChart extends Vue<Line> {
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
