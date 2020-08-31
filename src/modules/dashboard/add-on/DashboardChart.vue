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
  @Prop({ required: true }) chartData!: {
    type: any;
    default: null;
  };
  @Prop({ required: true }) options: {
    type: any;
    default: null;
  };

  mounted() {
    this.renderChart(this.chartData, this.options);
  }
}
</script>
