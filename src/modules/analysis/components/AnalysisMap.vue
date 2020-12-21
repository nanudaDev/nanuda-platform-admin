<template>
  <div class="map-area">
    <div id="map" style="width:100%;height:100%;"></div>
    <!-- 맵 컨트롤 -->
    <div class="map-controls">
      <b-button
        variant="dark"
        @click="slidebarVisible = !slidebarVisible"
        class="btn-close-map"
        >닫기</b-button
      >
      <b-row no-gutters align-v="center">
        <b-form-group
          label="행정구역 보기"
          label-size="sm"
          label-text-align="right"
          label-cols="8"
          class="mb-0"
        >
          <b-form-checkbox
            switch
            size="lg"
            v-model="hdongAreaVisible"
          ></b-form-checkbox>
        </b-form-group>
        <b-button
          variant="danger"
          id="remove-circles"
          class="ml-2"
          @click="removeCircles()"
          >반경 모두 지우기</b-button
        >
      </b-row>
    </div>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { CompanyDistrictDto } from '@/dto';
import HdongCoords from '../../../../resources/assets/json/hdong_boundary.json';

@Component({
  name: 'AnalysisMap',
})
export default class AnalysisMap extends BaseComponent {
  @Prop() district?: CompanyDistrictDto;
  // private lat = this.district.lat;
  // private lon = this.district.lon;
  private map;
  private customOverlay;
  private polygons;
  private theCircle;
  private circles;
  private hdongAreaVisible = false;

  @Prop() slidebarVisible?: boolean;
  @Watch('slidebarVisible')
  slidebarVisibleChanged() {
    this.map.relayout();
  }
  @Watch('district', {
    deep: true,
  })
  coordsChanged() {
    // 전에있던 원 삭제
    if (this.theCircle) {
      this.theCircle.setMap(null);
    }
    // 이동할 위도 경도 위치를 생성합니다
    const moveLatLon = new window.kakao.maps.LatLng(
      this.district.lat,
      this.district.lon,
    );
    this.theCircle = new window.kakao.maps.Circle({
      map: this.map,
      center: moveLatLon,
      strokeWeight: 2,
      strokeColor: '#ffffff',
      strokeOpacity: 0.8,
      strokeStyle: 'dashed',
      fillColor: '#17a2b8',
      fillOpacity: 0.5,
    });

    this.theCircle.setRadius(1000);

    // 지도 중심을 이동 시킵니다
    this.theCircle.setMap(this.map);
    this.map.setCenter(moveLatLon);
  }

  @Watch('hdongAreaVisible')
  switchHdongArea() {
    console.log(this.hdongAreaVisible);
    if (this.hdongAreaVisible) {
      this.getCoordPolygons(this.map, this.customOverlay);
    } else {
      this.removeCoordPolygons(this.polygons);
    }
  }
  // 행정구역 가져오기
  getCoordPolygons(map, customOverlay) {
    // 폴리곤
    const infowindow = new window.kakao.maps.InfoWindow({ removable: true });
    const data = HdongCoords.features;
    let coordinates = [];
    let name = '';
    const polygons = [];

    // 다각형을 생상하고 이벤트를 등록하는 함수입니다
    function displayArea(coordinates, name) {
      const path = [];
      const points = [];
      coordinates.map(coord => {
        const point = new Object();
        points.push(point);
        path.push(new window.kakao.maps.LatLng(coord[1], coord[0]));
      });

      // 다각형을 생성합니다
      const polygon = new window.kakao.maps.Polygon({
        map: map, // 다각형을 표시할 지도 객체
        path: path,
        strokeWeight: 1,
        strokeColor: '#004c80',
        strokeOpacity: 1,
        fillColor: '#fff',
        fillOpacity: 0.3,
      });

      // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
      // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
      window.kakao.maps.event.addListener(polygon, 'mouseover', mouseEvent => {
        polygon.setOptions({ fillColor: '#09f' });

        customOverlay.setContent('<div class="area">' + name + '</div>');

        customOverlay.setPosition(mouseEvent.latLng);
        customOverlay.setMap(map);
      });

      // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다
      window.kakao.maps.event.addListener(polygon, 'mousemove', mouseEvent => {
        customOverlay.setPosition(mouseEvent.latLng);
      });

      // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
      // 커스텀 오버레이를 지도에서 제거합니다
      window.kakao.maps.event.addListener(polygon, 'mouseout', () => {
        polygon.setOptions({ fillColor: '#fff' });
        customOverlay.setMap(null);
      });

      window.kakao.maps.event.addListener(polygon, 'click', mouseEvent => {
        const level = map.getLevel() - 2;

        map.setLevel(level, {
          animate: {
            duration: 350,
          },
        });
      });

      polygons.push(polygon);
    }

    data.map((v, i) => {
      coordinates = v.geometry.coordinates[0][0];
      name = v.properties.ADM_NM;
      displayArea(coordinates, name);
    });

    this.polygons = polygons;
  }

  // 행정구역 지우기
  removeCoordPolygons(polygons) {
    for (let i = 0; i < polygons.length; i++) {
      polygons[i].setMap(null);
    }
    polygons = [];
  }

  // 지도 가져오기
  setMap(lat?: string, lon?: string) {
    const container = document.getElementById('map');
    // const removeButton = document.getElementById('remove-circles');

    const markerPosition = new window.kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치입니다
    const options = {
      center: markerPosition,
      level: 7,
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
    let content = '';
    const customOverlay = new window.kakao.maps.CustomOverlay({
      position: markerPosition,
      content: content,
    });

    // map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
    // map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
    // map.relayout();

    let drawingFlag = false; // 원이 그려지고 있는 상태를 가지고 있을 변수입니다
    let centerPosition; // 원의 중심좌표 입니다
    let drawingCircle; // 그려지고 있는 원을 표시할 원 객체입니다
    let drawingLine; // 그려지고 있는 원의 반지름을 표시할 선 객체입니다
    let drawingOverlay; // 그려지고 있는 원의 반경을 표시할 커스텀오버레이 입니다
    let drawingDot; // 그려지고 있는 원의 중심점을 표시할 커스텀오버레이 입니다

    const circles = []; // 클릭으로 그려진 원과 반경 정보를 표시하는 선과 커스텀오버레이를 가지고 있을 배열입니다

    // 지도에 클릭 이벤트를 등록합니다
    window.kakao.maps.event.addListener(map, 'click', mouseEvent => {
      // 클릭 이벤트가 발생했을 때 원을 그리고 있는 상태가 아니면 중심좌표를 클릭한 지점으로 설정합니다
      if (!drawingFlag && !this.hdongAreaVisible) {
        // 상태를 그리고있는 상태로 변경합니다
        drawingFlag = true;

        // 원이 그려질 중심좌표를 클릭한 위치로 설정합니다
        centerPosition = mouseEvent.latLng;

        // 그려지고 있는 원의 반경을 표시할 선 객체를 생성합니다
        if (!drawingLine) {
          drawingLine = new window.kakao.maps.Polyline({
            strokeWeight: 2, // 선의 두께 입니다
            strokeColor: '#ffffff', // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일입니다
          });
        }

        // 그려지고 있는 원을 표시할 원 객체를 생성합니다
        if (!drawingCircle) {
          drawingCircle = new window.kakao.maps.Circle({
            strokeWeight: 2, // 선의 두께입니다
            strokeColor: '#ffffff', // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle: 'dashed', // 선의 스타일입니다
            fillColor: '#e85d47', // 채우기 색깔입니다
            fillOpacity: 0.5, // 채우기 불투명도입니다
          });
        }

        // 그려지고 있는 원의 반경 정보를 표시할 커스텀오버레이를 생성합니다
        if (!drawingOverlay) {
          drawingOverlay = new window.kakao.maps.CustomOverlay({
            xAnchor: 0,
            yAnchor: 0,
            zIndex: 1,
          });
        }
      }
    });

    // 지도에 마우스무브 이벤트를 등록합니다
    // 원을 그리고있는 상태에서 마우스무브 이벤트가 발생하면 그려질 원의 위치와 반경정보를 동적으로 보여주도록 합니다
    window.kakao.maps.event.addListener(map, 'mousemove', mouseEvent => {
      // 마우스무브 이벤트가 발생했을 때 원을 그리고있는 상태이면
      if (drawingFlag) {
        // 마우스 커서의 현재 위치를 얻어옵니다
        const mousePosition = mouseEvent.latLng;

        // 그려지고 있는 선을 표시할 좌표 배열입니다. 클릭한 중심좌표와 마우스커서의 위치로 설정합니다
        const linePath = [centerPosition, mousePosition];

        // 그려지고 있는 선을 표시할 선 객체에 좌표 배열을 설정합니다
        drawingLine.setPath(linePath);

        // 원의 반지름을 선 객체를 이용해서 얻어옵니다
        const length = drawingLine.getLength();

        if (length > 0) {
          // 그려지고 있는 원의 중심좌표와 반지름입니다
          const circleOptions = {
            center: centerPosition,
            radius: length,
          };

          // 그려지고 있는 원의 옵션을 설정합니다
          drawingCircle.setOptions(circleOptions);

          // 반경 정보를 표시할 커스텀오버레이의 내용입니다
          const radius = Math.round(drawingCircle.getRadius()),
            content =
              '<div class="info">반경 <span class="number">' +
              radius +
              '</span>m</div>';

          // 반경 정보를 표시할 커스텀 오버레이의 좌표를 마우스커서 위치로 설정합니다
          drawingOverlay.setPosition(mousePosition);

          // 반경 정보를 표시할 커스텀 오버레이의 표시할 내용을 설정합니다
          drawingOverlay.setContent(content);

          // 그려지고 있는 원을 지도에 표시합니다
          drawingCircle.setMap(map);

          // 그려지고 있는 선을 지도에 표시합니다
          drawingLine.setMap(map);

          // 그려지고 있는 원의 반경정보 커스텀 오버레이를 지도에 표시합니다
          drawingOverlay.setMap(map);
        } else {
          drawingCircle.setMap(null);
          drawingLine.setMap(null);
          drawingOverlay.setMap(null);
        }
      }
    });

    // 마우스 우클릭 하여 원 그리기가 종료됐을 때 호출하여
    // 그려진 원의 반경 정보와 반경에 대한 도보, 자전거 시간을 계산하여
    // HTML Content를 만들어 리턴하는 함수입니다
    function getTimeHTML(distance) {
      // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
      const walkkTime = (distance / 67) | 0;
      let walkHour = '',
        walkMin = '';

      // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
      if (walkkTime > 60) {
        walkHour =
          '<span class="number">' + Math.floor(walkkTime / 60) + '</span>시간 ';
      }
      walkMin = '<span class="number">' + (walkkTime % 60) + '</span>분';

      // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
      const bycicleTime = (distance / 227) | 0;
      let bycicleHour = '',
        bycicleMin = '';

      // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
      if (bycicleTime > 60) {
        bycicleHour =
          '<span class="number">' +
          Math.floor(bycicleTime / 60) +
          '</span>시간 ';
      }
      bycicleMin = '<span class="number">' + (bycicleTime % 60) + '</span>분';

      // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
      let content = '<ul class="info">';
      content += '<li>';
      content +=
        '<span class="label">총거리</span><span class="number">' +
        distance +
        '</span>m';
      content += '</li>';
      content += '<li>';
      content += '<span class="label">도보</span>' + walkHour + walkMin;
      content += '</li>';
      content += '<li>';
      content += '<span class="label">자전거</span>' + bycicleHour + bycicleMin;
      content += '</li>';
      content += '</ul>';

      // circle.setMap(map);
      customOverlay.setMap(map);
      // clusterer.addMarkers(markers);

      return content;
    }
    // 지도에 마우스 오른쪽 클릭이벤트를 등록합니다
    // 원을 그리고있는 상태에서 마우스 오른쪽 클릭 이벤트가 발생하면
    // 마우스 오른쪽 클릭한 위치를 기준으로 원과 원의 반경정보를 표시하는 선과 커스텀 오버레이를 표시하고 그리기를 종료합니다
    window.kakao.maps.event.addListener(map, 'rightclick', mouseEvent => {
      if (drawingFlag) {
        // 마우스로 오른쪽 클릭한 위치입니다
        const rClickPosition = mouseEvent.latLng;

        // 원의 반경을 표시할 선 객체를 생성합니다
        const polyline = new window.kakao.maps.Polyline({
          path: [centerPosition, rClickPosition], // 선을 구성하는 좌표 배열입니다. 원의 중심좌표와 클릭한 위치로 설정합니다
          strokeWeight: 2, // 선의 두께 입니다
          strokeColor: '#ffffff', // 선의 색깔입니다
          strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
          strokeStyle: 'solid', // 선의 스타일입니다
        });

        // 원 객체를 생성합니다
        const circle = new window.kakao.maps.Circle({
          center: centerPosition, // 원의 중심좌표입니다
          radius: polyline.getLength(), // 원의 반지름입니다 m 단위 이며 선 객체를 이용해서 얻어옵니다
          strokeWeight: 2, // 선의 두께입니다
          strokeColor: '#ffffff', // 선의 색깔입니다
          strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
          strokeStyle: 'dashed', // 선의 스타일입니다
          fillColor: '#e85d47', // 채우기 색깔입니다
          fillOpacity: 0.5, // 채우기 불투명도입니다
        });

        const radius = Math.round(circle.getRadius()); // 원의 반경 정보를 얻어옵니다
        content = getTimeHTML(radius); // 커스텀 오버레이에 표시할 반경 정보입니다

        // 반경정보를 표시할 커스텀 오버레이를 생성합니다
        const radiusOverlay = new window.kakao.maps.CustomOverlay({
          content: content, // 표시할 내용입니다
          position: rClickPosition, // 표시할 위치입니다. 클릭한 위치로 설정합니다
          xAnchor: 0,
          yAnchor: 0,
          zIndex: 1,
        });

        // 원을 지도에 표시합니다
        circle.setMap(map);

        // 선을 지도에 표시합니다
        polyline.setMap(map);

        // 반경 정보 커스텀 오버레이를 지도에 표시합니다
        radiusOverlay.setMap(map);

        // 배열에 담을 객체입니다. 원, 선, 커스텀오버레이 객체를 가지고 있습니다
        const radiusObj = {
          polyline: polyline,
          circle: circle,
          overlay: radiusOverlay,
        };

        // 배열에 추가합니다
        // 이 배열을 이용해서 "모두 지우기" 버튼을 클릭했을 때 지도에 그려진 원, 선, 커스텀오버레이들을 지웁니다
        circles.push(radiusObj);

        // 그리기 상태를 그리고 있지 않는 상태로 바꿉니다
        drawingFlag = false;

        // 중심 좌표를 초기화 합니다
        centerPosition = null;

        // 그려지고 있는 원, 선, 커스텀오버레이를 지도에서 제거합니다
        drawingCircle.setMap(null);
        drawingLine.setMap(null);
        drawingOverlay.setMap(null);
      }
    });

    this.map = map;
    this.customOverlay = customOverlay;
    this.circles = circles;
  }

  removeCircles() {
    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].circle.setMap(null);
      this.circles[i].polyline.setMap(null);
      this.circles[i].overlay.setMap(null);
    }
    this.circles = [];
  }

  mounted() {
    this.setMap(this.district.lat, this.district.lon);
    // emit 함수 추가
    // this.$root.$on('changeDistrict', (lat?: string, lon?: string) => {
    //   this.setMap(lat, lon);
    // });
    // this.setMap();
  }
}
</script>
<style lang="scss">
.map-area {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .map-controls {
    position: absolute;
    left: 20px;
    top: 20px;
    z-index: 5;
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  }
}
.info {
  position: relative;
  top: 5px;
  left: 5px;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  font-size: 12px;
  padding: 5px;
  background: #fff;
  list-style: none;
  margin: 0;
}
.info:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.info .label {
  display: inline-block;
  width: 50px;
}
.number {
  font-weight: bold;
  color: #e85d47;
}

.area {
  position: absolute;
  background: #fff;
  border: 1px solid #888;
  border-radius: 3px;
  font-size: 12px;
  top: -5px;
  left: 15px;
  padding: 2px;

  .info {
    font-size: 12px;
    padding: 5px;
  }
  .info .title {
    font-weight: bold;
  }
}
</style>
