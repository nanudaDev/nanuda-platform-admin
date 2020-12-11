<template>
  <div id="map" style="width:100%;height:100%;"></div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { CompanyDistrictDto } from '@/dto';

@Component({
  name: 'AnalysisMap',
})
export default class AnalysisMap extends BaseComponent {
  // @Prop() district?: CompanyDistrictDto;
  // private lat = this.district.lat;
  // private lon = this.district.lon;
  // 지도 가져오기
  setMap(lat?: string, lon?: string) {
    const container = document.getElementById('map');
    const markerPosition = new window.kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치입니다
    const options = {
      center: markerPosition,
      level: 4,
      maxLevel: 6,
      minLevel: 3,
    };
    const map = new window.kakao.maps.Map(container, options); // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    const mapTypeControl = new window.kakao.maps.MapTypeControl(); // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    const zoomControl = new window.kakao.maps.ZoomControl(); // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다

    const marker = new window.kakao.maps.Marker({
      position: markerPosition, // 마커를 생성합니다
    });
    // const markers = this.data.map(item => {
    //   console.log(item);
    //   return new window.kakao.maps.Marker({
    //     position: new window.kakao.maps.LatLng(item.lat, item.lon),
    //   });
    // });
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

    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    // circle.setRadius(1000);
    // circle.setMap(map);
    customOverlay.setMap(map);
    // clusterer.addMarkers(markers);
  }

  mounted() {
    // if (!this.district) {
    //   this.district.lat = '37.5640455';
    //   this.district.lon = '126.8340033';
    // }
    // emit 함수 추가
    this.$root.$on('changeDistrict', (lat?: string, lon?: string) => {
      this.setMap(lat, lon);
    });
    // this.setMap();
  }
}
</script>
