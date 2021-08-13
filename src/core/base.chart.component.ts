import { ApexOptions } from 'apexcharts';
import { Component, Prop, Vue } from 'vue-property-decorator';
import debounce from 'lodash/debounce';
import VueApexCharts from 'vue-apexcharts';
@Component({
  components: {
    VueApexCharts,
  },
})
export default class BaseChartComponent extends Vue<ApexCharts> {
  constructor() {
    super();
  }

  @Prop() protected series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  @Prop() protected options: ApexOptions;
  @Prop() protected height;

  declare $refs: any;
  protected chartSeries: ApexAxisChartSeries | ApexNonAxisChartSeries = [];
  protected chartOptions: ApexOptions = {
    chart: {
      height: 'auto',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
  };

  handleDebouncedScroll: {
    (this: Window, ev: Event): any;
    (this: Window, ev: Event): any;
  } = null;

  handleScroll() {
    const target = this.$refs.chartRef;
    if (target) {
      const ref = target.$el.children[0].getBoundingClientRect();
      if (ref.top < ref.height * 2) {
        this.changeData();
      }
    }
  }

  protected changeData() {
    this.chartSeries = this.series;
  }

  created() {
    this.chartSeries = this.series;
    this.chartOptions = { ...this.chartOptions, ...this.options };
  }

  mounted() {
    this.handleDebouncedScroll = debounce(this.handleScroll, 100);
    window.addEventListener('scroll', this.handleDebouncedScroll);
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleDebouncedScroll);
  }
}
