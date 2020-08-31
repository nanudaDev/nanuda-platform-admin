<template>
  <section>
    <b-row
      no-gutters
      align-h="between"
      align-v="end"
      class="title mb-3"
      v-if="companyDistrictDto"
    >
      <h3>
        <span v-if="companyDistrictDto.nameKr"
          >{{ companyDistrictDto.nameKr }} - 업체 지점 정보</span
        >
      </h3>
      <router-link
        to="/company/company-district"
        class="btn btn-secondary text-center"
        >목록으로</router-link
      >
    </b-row>
    <div class="row d-flex align-items-stretch">
      <div class="col col-12 col-lg-5 my-3">
        <BaseCard title="지점 정보">
          <template v-slot:head>
            <div v-if="companyDistrictDto.companyDistrictStatus === 'APPROVAL'">
              <b-button
                variant="primary"
                v-b-modal.update_district
                @click="findDistrictInfo()"
                >수정하기</b-button
              >
            </div>
          </template>
          <template v-slot:body>
            <div v-if="companyDistrictDto">
              <div
                v-if="
                  companyDistrictDto.image &&
                    companyDistrictDto.image.length > 0
                "
                class="mb-4"
              >
                <div
                  v-for="image in companyDistrictDto.image"
                  :key="image.endpoint"
                >
                  <b-img-lazy
                    :src="image.endpoint"
                    class="rounded mx-auto d-block company-logo"
                    style="max-height:160px"
                  />
                </div>
              </div>
              <div>
                <ul class="u-list">
                  <li v-if="companyDistrictDto.no">
                    지점 ID : <b>{{ companyDistrictDto.no }}</b>
                  </li>
                  <li v-if="companyDistrictDto.nameKr">
                    지점명 : <b>{{ companyDistrictDto.nameKr }}</b> ({{
                      companyDistrictDto.nameEng
                    }})
                  </li>
                  <li v-if="companyDistrictDto.address">
                    지점 주소 : <b>{{ companyDistrictDto.address }}</b>
                  </li>
                  <li v-if="companyDistrictDto.company">
                    업체명 :
                    <router-link
                      :to="{
                        name: 'CompanyDetail',
                        params: {
                          id: companyDistrictDto.company.no,
                        },
                      }"
                    >
                      <b>{{ companyDistrictDto.company.nameKr }}</b>
                    </router-link>
                  </li>
                  <li>
                    공통 시설 :
                    <b-badge
                      variant="info"
                      v-for="amenity in companyDistrictDto.amenities"
                      :key="amenity.no"
                      class="m-1"
                    >
                      {{ amenity.amenityName }}
                    </b-badge>
                  </li>
                  <li v-if="companyDistrictDto.createdAt">
                    등록일 :
                    {{ companyDistrictDto.createdAt | dateTransformer }}
                  </li>
                  <li v-if="companyDistrictDto.companyDistrictStatus">
                    승인 상태 :
                    <b-badge
                      :variant="
                        getStatusColor(companyDistrictDto.companyDistrictStatus)
                      "
                      class="badge-pill p-2 mr-2"
                    >
                      {{
                        companyDistrictDto.companyDistrictStatus
                          | enumTransformer
                      }}
                    </b-badge>
                    <span
                      v-if="companyDistrictDto.updatedAt"
                      class="d-inline-block"
                      >({{
                        companyDistrictDto.updatedAt | dateTransformer
                      }})</span
                    >
                  </li>
                </ul>
              </div>
              <div class="mt-4">
                <div id="map" style="width:100%; height:300px"></div>
                <div class="text-right mt-2">
                  <a
                    :href="
                      `https://map.kakao.com/link/map/${companyDistrictDto.nameKr},${companyDistrictDto.lat},${companyDistrictDto.lon}`
                    "
                    target="_blank"
                    class="btn btn-sm btn-outline-info"
                    >크게보기</a
                  >
                </div>
              </div>
            </div>
            <ApprovalCard
              :data="companyDistrictDto"
              :dto="companyDistrictUpdateRefusalDto"
              :reasonDto="companyDistrictUpdateRefusalReasonDto"
              status="companyDistrictStatus"
              histories="companyDistrictUpdateHistories"
              @approval="updateApproval()"
              @refusal="updateRefusal()"
            />
          </template>
        </BaseCard>
      </div>
      <div class="col col-12 col-lg-7 my-3">
        <BaseCard title="타입 정보">
          <template v-slot:head>
            <b-button variant="primary" v-b-modal.add_delivery_space
              >추가하기</b-button
            >
          </template>
          <template v-slot:body>
            <!-- 타입 리스트 -->
            <DeliverySpaceList />
          </template>
        </BaseCard>
      </div>
    </div>
    <!-- 업체 지점 정보 수정 모달 -->
    <b-modal
      id="update_district"
      size="xl"
      title="지점 정보 수정"
      @hide="clearOutUpdateDto()"
      @cancel="clearOutUpdateDto()"
      @ok="updateCompanyDistrict()"
    >
      <div
        v-if="
          companyDistrictDto.image &&
            companyDistrictDto.image.length > 0 &&
            !imageChanged
        "
        class="mb-4"
      >
        <div v-for="image in companyDistrictDto.image" :key="image.endpoint">
          <b-img-lazy
            :src="image.endpoint"
            class="rounded mx-auto d-block company-logo"
            style="max-height:160px"
          />
        </div>
      </div>
      <div v-if="newImage && newImage.length > 0 && imageChanged" class="mb-4">
        <div v-for="image in newImage" :key="image.endpoint">
          <b-img-lazy
            :src="image.endpoint"
            class="rounded mx-auto d-block company-logo"
            style="max-height:160px"
          />
        </div>
        <div class="text-center mt-2">
          <b-button variant="danger" @click="removeDistrcitImage()"
            >대표 이미지 삭제</b-button
          >
        </div>
      </div>
      <div class="form-row">
        <div class="col-5 col-md-6 mb-3">
          <label>지점명</label>
          <input
            type="text"
            v-model="companyDistrictUpdateDto.nameKr"
            class="form-control"
          />
        </div>
        <div class="col-5 col-md-6 mb-3">
          <label>지점명(영문)</label>
          <input
            type="text"
            v-model="companyDistrictUpdateDto.nameEng"
            class="form-control"
          />
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label>지점 주소</label>
          <input
            type="text"
            v-model="addressData.address"
            class="form-control"
            :readonly="addressData.address"
          />
          <!-- <input
            type="text"
            v-model="addressData.address"
            v-b-modal.postcode
            v-on:keyup.tab="showAddressModal()"
            class="form-control"
          /> -->
        </div>
        <div class="col-12 col-md-6 mb-3">
          <label>공통 시설</label>
          <b-form-checkbox-group
            id="common_amenity"
            v-model="selectedAmenityIds"
            name="common_amenity"
          >
            <b-form-checkbox
              v-for="amenity in amenityList"
              :key="amenity.no"
              :value="amenity.no"
              >{{ amenity.amenityName }}</b-form-checkbox
            >
          </b-form-checkbox-group>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="">파일첨부</label>
          <div class="custom-file">
            <input
              type="file"
              class="custom-file-input"
              id="customFileLang"
              lang="kr"
              v-on:change="upload($event.target.files)"
              multiple
            />
            <label class="custom-file-label" for="customFileLang"
              >파일 첨부</label
            >
          </div>
        </div>
      </div>
    </b-modal>
    <!-- 주소 검색 모달 -->
    <b-modal id="postcode" title="주소 검색" hide-footer>
      <vue-daum-postcode
        style="height:500px; overflow-y:auto;"
        @complete="setAddress($event, companyDistrictUpdateDto)"
      />
    </b-modal>
    <!-- 지점 타입 추가 모달 -->
    <DeliverySpaceCreate />
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import { BaseUser } from '../../../services/shared/auth';
import {
  CompanyDistrictDto,
  CompanyDistrictUpdateDto,
  CompanyDistrictUpdateRefusalDto,
  CompanyDistrictUpdateRefusalReasonDto,
  AmenityDto,
} from '../../../dto';

import AmenityService from '../../../services/amenity.service';
import CompanyDistrictService from '../../../services/company-district.service';

import ApprovalCard from '../../../modules/_components/ApprovalCard.vue';
import BaseCard from '../../_components/BaseCard.vue';
import DeliverySpaceList from './DeliverySpaceList.vue';
import DeliverySpaceCreate from '../../delivery-space/components/DeliverySpaceCreate.vue';

import { FileAttachmentDto } from '@/services/shared/file-upload';
import FileUploadService from '../../../services/shared/file-upload/file-upload.service';
import { UPLOAD_TYPE } from '../../../services/shared/file-upload/file-upload.service';
import { ATTACHMENT_REASON_TYPE } from '@/services/shared/file-upload';

import toast from '../../../../resources/assets/js/services/toast.js';
import { getStatusColor } from '../../../core/utils/status-color.util';

@Component({
  name: 'ComapanyDistrictDetail',
  components: {
    ApprovalCard,
    BaseCard,
    DeliverySpaceList,
    DeliverySpaceCreate,
  },
})
export default class CompanyDistrictDetail extends BaseComponent {
  private companyDistrictDto = new CompanyDistrictDto();
  private companyDistrictUpdateDto = new CompanyDistrictUpdateDto();
  private companyDistrictUpdateRefusalDto = new CompanyDistrictUpdateRefusalDto();
  private companyDistrictUpdateRefusalReasonDto = (this.companyDistrictUpdateRefusalDto.refusalReasons = new CompanyDistrictUpdateRefusalReasonDto());

  private amenityList = [];
  private selectedAmenities: AmenityDto[] = [];
  private selectedAmenityIds: number[] = [];

  private addressData = {
    address: '',
  };
  private imageChanged = false;
  private newImage: FileAttachmentDto[] = [];

  getStatusColor(status) {
    return getStatusColor(status);
  }

  findOne(id) {
    CompanyDistrictService.findOne(id).subscribe(res => {
      this.companyDistrictDto = res.data;
      this.setMap(this.companyDistrictDto);
    });
  }

  findDistrictInfo() {
    this.companyDistrictUpdateDto = this.companyDistrictDto;
    this.addressData.address = this.companyDistrictDto.address;
    this.selectedAmenityIds = this.companyDistrictDto.amenities.map(v => v.no);
    this.findOne(this.$route.params.id);
    this.getAmenities();
  }

  async upload(file: FileList) {
    const attachments = await FileUploadService.upload(
      UPLOAD_TYPE.COMPANY_DISTRICT,
      file,
    );
    this.newImage = [];
    this.newImage.push(
      ...attachments.filter(
        fileUpload =>
          fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
      ),
    );
    this.imageChanged = true;
  }

  removeDistrcitImage() {
    this.newImage = [];
    this.imageChanged = false;
  }

  // 공용 시설 정보 리스트
  getAmenities() {
    AmenityService.findAmenities('common-facility').subscribe(res => {
      this.amenityList = res.data;
    });
  }

  // 지점 정보 수정
  updateCompanyDistrict() {
    if (this.selectedAmenityIds) {
      this.companyDistrictUpdateDto.amenityIds = this.selectedAmenityIds;
    }
    if (this.newImage.length > 0) {
      this.companyDistrictUpdateDto.image = this.newImage;
    }
    CompanyDistrictService.update(
      this.$route.params.id,
      this.companyDistrictUpdateDto,
    ).subscribe(res => {
      if (res) {
        toast.success('수정완료');
        this.findOne(this.$route.params.id);
      }
    });
  }

  //승인
  updateApproval() {
    CompanyDistrictService.updateCompanyDistrictStatus(
      this.$route.params.id,
      'approve-update',
    ).subscribe(res => {
      if (res) {
        this.findOne(this.$route.params.id);
        toast.success('승인완료');
      }
    });
  }

  // 거절
  updateRefusal() {
    CompanyDistrictService.updateCompanyDistrictStatus(
      this.$route.params.id,
      'refuse-update',
      this.companyDistrictUpdateRefusalDto,
    ).subscribe(res => {
      if (res) {
        this.findOne(this.$route.params.id);
        toast.success('승인거절');
      }
    });
  }

  clearOutUpdateDto() {
    this.companyDistrictUpdateDto = new CompanyDistrictUpdateDto();
    this.findOne(this.$route.params.id);
  }

  // 지도 가져오기
  setMap(district: CompanyDistrictDto) {
    const mapContainer = document.getElementById('map'),
      mapOption = {
        center: new window.kakao.maps.LatLng(district.lat, district.lon),
        level: 3,
        maxLevel: 6,
        mapTypeId: window.kakao.maps.MapTypeId.ROADMAP,
      };

    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    const markerPosition = new window.kakao.maps.LatLng(
      district.lat,
      district.lon,
    );
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }

  showAddressModal() {
    this.$bvModal.show('postcode');
  }

  setAddress(res) {
    this.addressData = res;
    this.companyDistrictUpdateDto.address = this.addressData.address;

    const geocoder = new window.kakao.maps.services.Geocoder();
    const callback = (results, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        this.companyDistrictUpdateDto.lon = results[0].x;
        this.companyDistrictUpdateDto.lat = results[0].y;
      }
    };
    geocoder.addressSearch(this.companyDistrictUpdateDto.address, callback);

    this.$bvModal.hide('postcode');
  }

  // 지점 타입 추가
  created() {
    const id = this.$route.params.id;
    this.findOne(id);
  }
}
</script>
