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
  private data = [
    {
      lat: 37.4969117,
      lon: 127.03292,
    },
    {
      lat: 37.4969117,
      lon: 127.03292,
    },
    {
      lat: 37.4969117,
      lon: 127.03292,
    },
    {
      lat: 37.4969117,
      lon: 127.03292,
    },
    {
      lat: 37.4969117,
      lon: 127.03292,
    },
    {
      lat: 37.4969117,
      lon: 127.03292,
    },
    {
      lat: 37.4969117,
      lon: 127.03292,
    },
    {
      lat: 37.4969117,
      lon: 127.03292,
    },
  ];
  // 지도 가져오기
  setMap() {
    const container = document.getElementById('map');
    const markerPosition = new window.kakao.maps.LatLng(37.4969117, 127.03292); // 마커가 표시될 위치입니다
    const options = {
      center: markerPosition,
      level: 5,
      maxLevel: 6,
      minLevel: 3,
    };
    const map = new window.kakao.maps.Map(container, options); // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    const mapTypeControl = new window.kakao.maps.MapTypeControl(); // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    const zoomControl = new window.kakao.maps.ZoomControl(); // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다

    // const marker = new window.kakao.maps.Marker({
    //   position: markerPosition, // 마커를 생성합니다
    // });
    const markers = this.data.map(item => {
      console.log(item);
      return new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(item.lat, item.lon),
      });
    });
    const content = '';
    const customOverlay = new window.kakao.maps.CustomOverlay({
      position: markerPosition,
      content: content,
    });
    const circle = new window.kakao.maps.Circle({
      map: map,
      center: markerPosition,
      strokeWeight: 2,
      strokeColor: '#ffffff',
      strokeOpacity: 0.8,
      strokeStyle: 'dashed',
      fillColor: '#00EEEE',
      fillOpacity: 0.5,
    });

    const clusterer = new window.kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 10, // 클러스터 할 최소 지도 레벨
    });

    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    // circle.setRadius(1000);
    // circle.setMap(map);
    customOverlay.setMap(map);
    clusterer.addMarkers(markers);
  }

  mounted() {
    this.setMap();
  }
}
</script>
