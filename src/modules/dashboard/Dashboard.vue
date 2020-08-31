<template>
  <section>
    <b-row class="my-0">
      <b-col md="6" class="my-3">
        <BaseCard title="업체 승인 요청" no-body>
          <template v-slot:head>
            <router-link to="/company" class="btn btn-primary float-right">
              더 보기
            </router-link>
          </template>
          <DashboardCompanyList />
        </BaseCard>
      </b-col>
      <b-col md="6" class="my-3">
        <BaseCard title="업체 사용자 승인 요청" no-body>
          <template v-slot:head>
            <router-link
              to="/company/company-user"
              class="btn btn-primary float-right"
            >
              더 보기
            </router-link>
          </template>
          <DashboardCompanyUserList />
        </BaseCard>
      </b-col>
    </b-row>
    <b-row class="my-0">
      <b-col lg="4" class="my-3">
        <BaseCard title="배달형 상담 신청">
          <template v-slot:body>
            <DashboardDeliveryConsultGraph />
          </template>
        </BaseCard>
      </b-col>
      <b-col lg="8">
        <b-row>
          <b-col md="6" class="my-3">
            <BaseCard title="식당형 상담 신청">
              <template v-slot:body>
                <DashboardGraph />
              </template>
            </BaseCard>
          </b-col>
          <b-col md="6" class="my-3">
            <BaseCard title="식당형 지역별 신청 추이">
              <template v-slot:head>
                <div>
                  <router-link
                    to="/graph-by-cities"
                    class="btn btn-primary text-center float-right"
                    >더 보기</router-link
                  >
                </div>
              </template>
              <template v-slot:body>
                <DashboardCityGraph />
              </template>
            </BaseCard>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="my-0">
      <b-col lg="6" class="my-3">
        <BaseCard title="최신 배달형 상담 신청" no-body>
          <template v-slot:head>
            <router-link
              to="/delivery-founder-consult"
              class="btn btn-primary float-right"
              >더 보기</router-link
            >
          </template>
          <DashboardDeliveryConsultList />
        </BaseCard>
      </b-col>
      <b-col lg="6" class="my-3">
        <BaseCard title="최신 식당형 상담 신청" no-body>
          <template v-slot:head>
            <router-link
              to="/founder-consult"
              class="btn btn-primary float-right"
              >더 보기</router-link
            >
          </template>
          <DashboardFounderConsultList />
        </BaseCard>
      </b-col>
    </b-row>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../core/base.component';
import DashboardFounderConsultList from './components/DashboardFounderConsultList.vue';
import DashboardCompanyUserList from './components/DashboardCompanyUserList.vue';
import DashboardCompanyList from './components/DashboardCompanyList.vue';
import DashboardGraph from './components/DashboardGraph.vue';
import DashboardCityGraph from './components/DashboardCityGraph.vue';
import DashboardDeliveryConsultGraph from './components/DashboardDeliveryConsultGraph.vue';
import DashboardDeliveryConsultList from './components/DashboardDeliveryConsultList.vue';

@Component({
  name: 'Dashboard',
  components: {
    DashboardFounderConsultList,
    DashboardCompanyUserList,
    DashboardCompanyList,
    DashboardGraph,
    DashboardCityGraph,
    DashboardDeliveryConsultGraph,
    DashboardDeliveryConsultList,
  },
})
export default class Dashboard extends BaseComponent {}
</script>
<style lang="scss">
.title {
  margin-bottom: 15px;
}

h5 {
  margin-top: 3px;
}
</style>
