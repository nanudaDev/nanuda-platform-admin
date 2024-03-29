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
import VueDaumPostcode from 'vue-daum-postcode';
import VStickyElement from 'vue-sticky-element';
import VueApexCharts from 'vue-apexcharts';

import MainLayout from '../src/modules/_layouts/Layout/MainLayout.layout.vue';
import NonMainLayout from '../src/modules/_layouts/Layout/NonMainLayout.layout.vue';
import AnalysisLayout from '../src/modules/_layouts/Layout/AnalysisLayout.layout.vue';
import PickcookLayout from '../src/modules/_layouts/Layout/PickcookLayout.layout.vue';
import EmptyLayout from '../src/modules/_layouts/Layout/EmptyLayout.layout.vue';
import SectionTitle from '../src/modules/_components/SectionTitle.vue';
import BaseCard from '../src/modules/_components/BaseCard.vue';
import JsonExcel from 'vue-json-excel';
import datePicker from 'vue-bootstrap-datetimepicker';

import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
// import '@fortawesome/fontawesome-free/css/all.css';
// import '@fortawesome/fontawesome-free/js/all.js';

import {
  DatePipeTransformer,
  DateOnlyPipeTransformer,
  EnumPipeTransformer,
  StringPipeTransformer,
  StringViewPipeTransformer,
  StringDistrictPipeTransformer,
  PhonePipeTransformer,
  BizNoPipeTransformer,
  StringInquiryPipeTransformer,
  StringShowPipeTransformer,
  StringTruncatePipeTransformer,
  CurrencyPipeTransformer,
  SpaceTypePipeTransformer,
  NumberPipeTransformer,
  KbCategoryPipeTransformer,
  NumeralPipeTransformer,
  WeekDayPipeTransformer,
  HourPipeTransformer,
  GenderNumberPipeTransformer,
  BaeminCategoryPipeTransformer,
} from '@/core';
import '@/core/guards/auth-role.guard';

import utilityPlugin from '@/plugins/custom/utility';

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
Vue.component('AnalysisLayout', AnalysisLayout);
Vue.component('PickcookLayout', PickcookLayout);
Vue.component('EmptyLayout', EmptyLayout);
Vue.component('SectionTitle', SectionTitle);
Vue.component('BaseCard', BaseCard);
Vue.component('downloadExcel', JsonExcel);
Vue.component('apexchart', VueApexCharts);

// filters
BizNoPipeTransformer();
CurrencyPipeTransformer();
DatePipeTransformer();
DateOnlyPipeTransformer();
EnumPipeTransformer();
NumberPipeTransformer();
PhonePipeTransformer();
StringPipeTransformer();
StringDistrictPipeTransformer();
StringInquiryPipeTransformer();
StringShowPipeTransformer();
StringTruncatePipeTransformer();
StringViewPipeTransformer();
SpaceTypePipeTransformer();
KbCategoryPipeTransformer();
NumeralPipeTransformer();
WeekDayPipeTransformer();
HourPipeTransformer();
GenderNumberPipeTransformer();
BaeminCategoryPipeTransformer();

// bootstrap
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(JsonExcel);
Vue.use(datePicker);

// daum kakao
Vue.use(VueDaumPostcode);

Vue.use(utilityPlugin);
Vue.use(VStickyElement);
Vue.use(VueApexCharts);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
