<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-2">
          <label>시/도 선택</label>
          <select class="custom-select" v-model="graphSelectionDto.spaceCity">
            <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
          </select>
          <br />
          <button
            type="button"
            class="btn btn-success btn-lg btn-block mt-1"
            @click="getData()"
          >검색하기</button>
        </div>
        <div class="col-md-10">
          <DashboardBarChart
            v-if="data"
            :chartData="data"
            :options="options"
            :styles="{ height: '630px' }"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import GraphService from '../../../services/graph.service';
import DashboardBarChart from '../../dashboard/add-on/DashboardBarChart.vue';
import { GraphSelectionDto } from '../../../dto';

@Component({
  name: 'GraphByCity',
  components: {
    DashboardBarChart,
  },
})
export default class GraphByCity extends BaseComponent {
  private data = null;
  private cities: [] = [];
  private graphSelectionDto = new GraphSelectionDto();
  private options = null;

  getCities() {
    GraphService.getCities().subscribe(res => {
      this.cities = res.data;
    });
  }

  getDistrictGraphData() {
    if (!this.graphSelectionDto.spaceCity) {
      this.graphSelectionDto.spaceCity = '서울';
    }
    GraphService.getDistrictsGraph(this.graphSelectionDto).subscribe(res => {
      this.options = { responsive: true, maintainAspectRatio: false };
      this.data = res.data;
      console.log(this.data);
    });
  }

  getData() {
    this.data = null;
    this.getDistrictGraphData();
  }

  created() {
    //   TODO: change this later.';
    this.getCities();
    this.getDistrictGraphData();
  }
}
</script>