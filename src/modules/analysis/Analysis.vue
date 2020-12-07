<template>
  <div>
    <AnalysisMap />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../core/base.component';
import AnalysisMap from './components/AnalysisMap.vue';

@Component({
  components: {
    AnalysisMap,
  },
})
export default class Analysis extends BaseComponent {}
</script>
