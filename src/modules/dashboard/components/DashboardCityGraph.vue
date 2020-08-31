<template>
  <div style="height: 430px">
    <DashboardBarChart
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
import DashboardBarChart from '../add-on/DashboardBarChart.vue';
import BaseComponent from '@/core/base.component';
import DashboardService from '../../../services/dashboard.service';

@Component({
  components: {
    DashboardBarChart,
  },
})
export default class DashboardGraphCity extends Vue {
  private founderConsultGraph = null;
  private options = null;

  getGraph() {
    DashboardService.dashboardGraphByCity().subscribe(res => {
      this.options = {
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
      };
      this.founderConsultGraph = res.data;
    });
  }
  async mounted() {
    this.getGraph();
  }
}
</script>
