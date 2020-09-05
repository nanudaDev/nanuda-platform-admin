<template>
  <div style="height:430px">
    <DashboardBarChart
      v-if="paymentListGraph"
      :chartData="paymentListGraph"
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
import DashboardBarChart from '../add-on/DashboardBarChart.vue';
import DashboardService from '../../../services/dashboard.service';

@Component({
  name: 'DashboardPaymentListGraph',
  components: {
    DashboardBarChart,
  },
})
export default class DashboardPaymentListGraph extends BaseComponent {
  private paymentListGraph = null;
  private options = null;

  getGraph() {
    DashboardService.dashboardPaymentListGraph().subscribe(res => {
      this.options = { responsive: true, maintainAspectRatio: false };
      this.paymentListGraph = res.data;
    });
  }

  async mounted() {
    this.getGraph();
  }
}
</script>