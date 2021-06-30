<template>
  <div id="report">
    <article class="page">
      <header class="article-header">
        <h2 class="logo">
          <b-img-lazy
            src="https://kr.object.ncloudstorage.com/common-storage-pickcook/main/logo.svg"
            alt="픽쿡"
          ></b-img-lazy>
        </h2>
        <p>
          <span
            ><b-icon icon="geo-alt" variant="primary"></b-icon> 서울시 종로구
            무학동</span
          >
          <span class="ml-4"
            ><b-icon icon="flag-fill" variant="primary"></b-icon> 한식</span
          >
        </p>
      </header>
      <div class="article-content">
        <section class="section">
          <header class="section-header">
            <h3 class="title">상담신청 고객정보</h3>
          </header>
          <div class="section-content">
            <b-row>
              <b-col cols="3">
                <b-form-group label="창엄자명" label-align="left">
                  <b-form-input value="이현우" readonly></b-form-input>
                </b-form-group>
                <b-form-group label="연락처" label-align="left">
                  <b-form-input value="01041537907" readonly></b-form-input>
                </b-form-group>
                <b-form-group label="창업자유형" label-align="left">
                  <b-form-input value="신규창업자" readonly></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="9">
                <div id="map" style="width:100%; height:300px"></div>
              </b-col>
            </b-row>
          </div>
        </section>
        <section class="section">
          <header class="section-header">
            <h3 class="title">상권분석 요약자료</h3>
          </header>
        </section>
      </div>
    </article>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { DeliveryFounderConsultDto } from '@/dto';
import { Component } from 'vue-property-decorator';
import DeliveryFounderConsultService from '../../../../services/delivery-founder-consult.service';

@Component({
  name: 'ConsultReportDetail',
})
export default class ConsultReportDetail extends BaseComponent {
  private map;
  private deliveryFounderConsultMap = new DeliveryFounderConsultDto();

  // 지도 가져오기
  setMap(id) {
    DeliveryFounderConsultService.findOne(id).subscribe(res => {
      if (res) {
        this.deliveryFounderConsultMap = res.data;

        if (
          this.deliveryFounderConsultMap.deliverySpace &&
          this.deliveryFounderConsultMap.deliverySpace.companyDistrict
        ) {
          const mapContainer = document.getElementById('map'),
            mapOption = {
              center: new window.kakao.maps.LatLng(
                this.deliveryFounderConsultMap.deliverySpace.companyDistrict.lat,
                this.deliveryFounderConsultMap.deliverySpace.companyDistrict.lon,
              ),
              level: 6,
              maxLevel: 6,
              minLevel: 3,
              mapTypeId: window.kakao.maps.MapTypeId.ROADMAP,
            };

          const map = new window.kakao.maps.Map(mapContainer, mapOption);
          const content = `<span class="badge badge-primary" style="font-size:21px;border-radius: 100px;opacity: 82%">Here</span>`;
          const markerPosition = new window.kakao.maps.LatLng(
            this.deliveryFounderConsultMap.deliverySpace.companyDistrict.lat,
            this.deliveryFounderConsultMap.deliverySpace.companyDistrict.lon,
          );

          const customOverlay = new window.kakao.maps.CustomOverlay({
            position: markerPosition,
            content: content,
            // image: markerImage,
          });

          const circle = new window.kakao.maps.Circle({
            map: map,
            center: new window.kakao.maps.LatLng(
              this.deliveryFounderConsultMap.deliverySpace.companyDistrict.lat,
              this.deliveryFounderConsultMap.deliverySpace.companyDistrict.lon,
            ),
            strokeWeight: 2,
            strokeColor: '#FF00FF',
            strokeOpacity: 0.8,
            strokeStyle: 'dashed',
            fillColor: '#00EEEE',
            fillOpacity: 0.5,
          });
          circle.setRadius(1000);
          circle.setMap(map);
          customOverlay.setMap(map);
          this.map = map;
        }
      }
    });
  }

  print() {
    window.print();
  }

  created() {
    this.setMap('279');
  }
}
</script>
<style lang="scss">
html {
  background: #999;
}
#report {
  @media print {
    * {
      -webkit-print-color-adjust: exact;
    }
    html {
      background: none;
      padding: 0;
    }
    body {
      box-shadow: none;
      margin: 0;
    }
  }

  @page {
    margin: 0;
  }
  .page {
    box-sizing: border-box;
    height: 11in;
    margin: 0 auto;
    overflow: hidden;
    padding: 0.5in;
    width: 8.5in;
    box-shadow: 0 0 1in -0.25in rgb(0 0 0 / 50%);
    background: #fff;
    + .page {
      margin-top: 1in;
    }
  }
  .article-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      img {
        display: block;
        width: 4em;
      }
    }
  }
  .section {
    margin-top: 2.5em;
    .section-header {
      padding: 0.5em 0;
      border-bottom: 2px solid #0b538d;
      h3 {
        font-size: 1.4rem;
        color: #0b538d;
        font-weight: bold;
      }
      + .section-content {
        margin-top: 1.5em;
      }
    }
  }
}
</style>
