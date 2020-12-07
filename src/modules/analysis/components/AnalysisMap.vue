<template>
  <div>
    <div id="map" style="width:500px;height:400px;"></div>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';

export default class AnalysisMap extends BaseComponent {
  // 지도 가져오기
  setMap() {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);
  }

  mounted() {
    this.setMap();
  }
}
</script>
