<template>
  <div style="height: 430px">
    <DashboardChart
      v-if="founderConsultGraph"
      :chartData="founderConsultGraph"
      :options="options"
      :styles="{ height: '430px' }"
    />
    <div class="half-circle-spinner" v-else style="margin-top: 180px">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import DashboardService from '../../../services/dashboard.service';
import DashboardChart from '../add-on/DashboardChart.vue';

@Component({
  components: {
    DashboardChart,
  },
})
export default class DashboardGraph extends Vue {
  private founderConsultGraph = null;
  private options = null;

  getGraph() {
    DashboardService.dashboardGraph().subscribe(res => {
      this.options = { responsive: true, maintainAspectRatio: false };
      this.founderConsultGraph = res.data;
    });
  }

  async mounted() {
    this.getGraph();
  }
}
</script>
