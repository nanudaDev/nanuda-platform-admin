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
