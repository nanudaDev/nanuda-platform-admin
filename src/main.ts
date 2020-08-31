import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from '../src/router';
import {
  DevelopmentEnvironment,
  StagingEnvironment,
  Environment,
  EnvironmentType,
  ProductionEnvironment,
} from '../environments';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueDaumPostcode from 'vue-daum-postcode';

import MainLayout from '../src/modules/_layouts/Layout/MainLayout.layout.vue';
import NonMainLayout from '../src/modules/_layouts/Layout/NonMainLayout.layout.vue';
import SectionTitle from '../src/modules/_components/SectionTitle.vue';
import BaseCard from '../src/modules/_components/BaseCard.vue';
import '@/core/guards/auth-role.guard';

import {
  DatePipeTransformer,
  EnumPipeTransformer,
  StringPipeTransformer,
  ViewPipeTransformer,
  StringDistrictPipeTransformer,
  PhonePipeTransformer,
  BizNoPipeTransformer,
} from './core';

let env = new Environment();
if (process.env.NODE_ENV === EnvironmentType.development) {
  console.log(process.env.NODE_ENV);
  env = DevelopmentEnvironment;
}
if (process.env.NODE_ENV === EnvironmentType.staging) {
  console.log(process.env.NODE_ENV);
  env = StagingEnvironment;
}
if (process.env.NODE_ENV === EnvironmentType.production) {
  // console.log(process.env.NODE_ENV);
  env = ProductionEnvironment;
}
Vue.config.productionTip = env.productionTip;

// import layouts
Vue.component('NonMainLayout', NonMainLayout);
Vue.component('MainLayout', MainLayout);

Vue.component('SectionTitle', SectionTitle);
Vue.component('BaseCard', BaseCard);

// filters
DatePipeTransformer();
EnumPipeTransformer();
StringPipeTransformer();
StringDistrictPipeTransformer();
ViewPipeTransformer();
PhonePipeTransformer();
BizNoPipeTransformer();

// bootstrap
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

// daum kakao
Vue.use(VueDaumPostcode);

new Vue({
  router,
  store,

  render: h => h(App),
}).$mount('#app');
