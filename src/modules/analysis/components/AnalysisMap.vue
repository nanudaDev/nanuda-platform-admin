<template>
  <div id="map" style="width:100%;height:100%;"></div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'AnalysisMap',
})
export default class AnalysisMap extends BaseComponent {
  // 지도 가져오기
  setMap() {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 5,
      maxLevel: 6,
      minLevel: 3,
    };

    const mapTypeControl = new window.kakao.maps.MapTypeControl(); // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    const zoomControl = new window.kakao.maps.ZoomControl(); // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667); // 마커가 표시될 위치입니다
    const marker = new window.kakao.maps.Marker({
      position: markerPosition, // 마커를 생성합니다
    });
    const map = new window.kakao.maps.Map(container, options); // 지도에 컨트롤을 추가해야 지도위에 표시됩니다

    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
    marker.setMap(map); // 마커가 지도 위에 표시되도록 설정합니다
    map.relayout();
  }

  mounted() {
    this.setMap();
  }
}
</script>
