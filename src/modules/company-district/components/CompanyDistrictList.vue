<template>
  <section>
    <SectionTitle title="업체 지점 관리" divider></SectionTitle>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <!-- <b-col sm="12" lg="1" class="mb-3">
          <label for="district_id">지점 ID</label>
          <b-form-input
            type="text"
            id="district_id"
            v-model="companyDistrictSearchDto.no"
          ></b-form-input>
        </b-col>-->
        <b-col sm="12" lg="2" class="mb-3">
          <b-form-group label="업체명">
            <b-form-input
              list="company_lsit"
              v-model="companyDistrictSearchDto.companyNameKr"
            ></b-form-input>
            <datalist id="company_lsit">
              <option
                v-for="company in companySelect"
                :key="company.no"
                :value="company.nameKr"
                >{{ company.nameKr }}</option
              >
            </datalist>
          </b-form-group>
        </b-col>
        <b-col sm="12" lg="2" class="mb-3">
          <label for="district_name_kr">지점명</label>
          <b-form-input
            type="text"
            id="district_name_kr"
            v-model="companyDistrictSearchDto.nameKr"
          ></b-form-input>
        </b-col>
        <b-col sm="12" lg="6" class="mb-3">
          <label for="district_address">주소</label>
          <b-form-input
            type="text"
            id="district_address"
            v-model="companyDistrictSearchDto.address"
          ></b-form-input>
        </b-col>
        <b-col sm="12" lg="2" class="mb-3">
          <label for="district_status">승인 상태</label>
          <b-form-select
            id="district_status"
            v-model="companyDistrictSearchDto.companyDistrictStatus"
          >
            <b-select-option value>전체</b-select-option>
            <b-form-select-option
              v-for="status in approvalStatus"
              :key="status"
              :value="status"
              >{{ status | enumTransformer }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
      </b-form-row>
      <b-row align-h="center">
        <b-btn-group>
          <b-button variant="primary" @click="clearOut()">초기화</b-button>
          <b-button variant="success" @click="search()">검색</b-button>
        </b-btn-group>
      </b-row>
    </div>
    <div class="table-top">
      <div class="total-count">
        <h5>
          <span>TOTAL</span>
          <strong class="text-primary">{{ companyDistrictListCount }}</strong>
        </h5>
      </div>
      <b-button
        variant="primary"
        v-b-modal.add_company_district
        @click="showCreateModal()"
        >업체 지점 추가</b-button
      >
    </div>
    <div v-if="!dataLoading" class="table-bordered table-responsive">
      <table class="table table-sm table-hover" v-if="companyDistrictListCount">
        <thead>
          <tr>
            <th
              scope="col"
              v-bind:class="{
                highlighted: companyDistrictSearchDto.no,
              }"
            >
              ID
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: companyDistrictSearchDto.companyNameKr,
              }"
            >
              COMPANY
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: companyDistrictSearchDto.nameKr,
              }"
            >
              DISTRICT
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: companyDistrictSearchDto.address,
              }"
            >
              ADDRESS
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: companyDistrictSearchDto.createdAt,
              }"
            >
              CREATED
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: companyDistrictSearchDto.companyDistrictStatus,
              }"
            >
              STATUS
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="district in companyDistrictList" :key="district.no">
            <th scope="row">{{ district.no }}</th>
            <td>{{ district.company.nameKr }}</td>
            <td>{{ district.nameKr }}</td>
            <td class="text-left">{{ district.address }}</td>
            <td>
              {{ district.createdAt | dateTransformer }}
              <!-- <br />
            <span class="text-primary"
              >수정일 : {{ district.updatedAt | dateTransformer }}</span
              >-->
            </td>
            <td>
              <b-badge
                :variant="getStatusColor(district.companyDistrictStatus)"
                class="badge-pill p-2"
              >
                {{ district.companyDistrictStatus | enumTransformer }}
                {{ companyDistrictList.no }}
              </b-badge>
            </td>
            <td>
              <router-link
                class="btn btn-sm btn-secondary text-nowrap"
                :to="{
                  name: 'CompanyDistrictDetail',
                  params: {
                    id: district.no,
                  },
                }"
                >상세보기</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="empty-data border">검색결과가 없습니다.</div>
    </div>
    <b-pagination
      v-model="pagination.page"
      v-if="companyDistrictListCount"
      pills
      :total-rows="companyDistrictListCount"
      :per-page="pagination.limit"
      @input="paginateSearch()"
      class="mt-4 justify-content-center"
    ></b-pagination>
    <div class="half-circle-spinner mt-5" v-if="dataLoading">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
    <!-- 지점 추가 모달 -->
    <b-modal
      id="add_company_district"
      title="업체 지점 추가"
      ok-title="추가"
      cancel-title="취소"
      @hide="clearOutCreateDto()"
      @cancel="clearOutCreateDto()"
      @ok="createCompanyDidstrict()"
    >
      <div v-if="districtImage && districtImage.length > 0" class="mb-4">
        <div v-for="image in districtImage" :key="image.endpoint">
          <b-img-lazy
            :src="image.endpoint"
            class="rounded mx-auto d-block company-logo"
            style="max-height:80px"
          />
        </div>
      </div>
      <b-form-row>
        <b-col cols="12" md="6" class="mt-2">
          <label for="create_district_name_kr">
            지점명
            <span class="red-text">*</span>
          </label>
          <input
            type="text"
            v-model="companyDistrictCreateDto.nameKr"
            class="form-control"
            id="district_name_kr"
          />
        </b-col>
        <b-col cols="12" md="6" class="mt-2">
          <label for="create_district_name_eng">지점명(영문)</label>
          <input
            type="text"
            v-model="companyDistrictCreateDto.nameEng"
            class="form-control"
            id="district_name_eng"
          />
        </b-col>
        <b-col cols="12" md="6" class="mt-2">
          <label for="create_district_address">
            주소
            <span class="red-text">*</span>
          </label>
          <input
            type="text"
            v-model="addressData.address"
            class="form-control"
            id="district_address"
            v-b-modal.postcode
            v-on:keyup.tab="showAddressModal()"
          />
        </b-col>
        <b-col cols="12" md="6" class="mt-2">
          <label for="create_district_status">
            승인 상태
            <span class="red-text">*</span>
          </label>
          <select
            class="custom-select"
            id="district_status"
            v-model="companyDistrictCreateDto.companyDistrictStatus"
          >
            <option value>전체</option>
            <option
              v-for="status in approvalStatus"
              :key="status"
              :value="status"
              >{{ status | enumTransformer }}</option
            >
          </select>
        </b-col>
        <b-col cols="12" class="mt-2">
          <label for="create_district_company">
            공통 시설
            <span class="red-text">*</span>
          </label>
          <b-form-checkbox-group
            id="common_amenity"
            v-model="companyDistrictCreateDto.amenityIds"
            name="common_amenity"
          >
            <b-form-checkbox
              v-for="amenity in commonAmenityList"
              :key="amenity.no"
              :value="amenity.no"
              >{{ amenity.amenityName }}</b-form-checkbox
            >
          </b-form-checkbox-group>
        </b-col>
        <b-col cols="12" md="6" class="mt-2">
          <label for="create_district_company">
            업체 선택
            <span class="red-text">*</span>
          </label>
          <select
            class="custom-select"
            id="district_company"
            v-model="companyDistrictCreateDto.companyNo"
          >
            <option
              v-for="company in companySelect"
              :key="company.no"
              :value="company.no"
              >{{ company.nameKr }}</option
            >
          </select>
        </b-col>
        <b-col cols="12" md="6" class="mt-2">
          <label for>
            지점 이미지
            <span class="red-text">*</span>
          </label>
          <b-form-file
            placeholder="파일 선택"
            ref="fileInput"
            @input="upload($event)"
          ></b-form-file>
        </b-col>
      </b-form-row>
    </b-modal>
    <!-- 주소 검색 모달 -->
    <b-modal id="postcode" title="주소 검색" hide-footer>
      <vue-daum-postcode
        style="height:500px; overflow-y:auto;"
        @complete="setAddress($event)"
      />
    </b-modal>
  </section>
</template>
<script lang="ts">
import BaseComponent from '../../../core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import {
  CompanyDto,
  CompanyDistrictDto,
  CompanyDistrictListDto,
} from '../../../dto';
import CompanyService from '../../../services/company.service';
import CompanyDistrictService from '../../../services/company-district.service';
import { Pagination } from '../../../common';
import { CodeManagementDto } from '../../../services/init/dto';
import {
  APPROVAL_STATUS,
  CONST_APPROVAL_STATUS,
} from '../../../services/shared';

import AmenityService from '../../../services/amenity.service';

import { FileAttachmentDto } from '@/services/shared/file-upload';
import FileUploadService from '../../../services/shared/file-upload/file-upload.service';
import { UPLOAD_TYPE } from '../../../services/shared/file-upload/file-upload.service';
import { ATTACHMENT_REASON_TYPE } from '@/services/shared/file-upload';

import { getStatusColor } from '../../../core/utils/status-color.util';
import { ReverseQueryParamMapper } from '@/core';
import { CompanyDistrictCreateDto } from '@/dto/company-district/company-district-create.dto';

@Component({
  name: 'CompanyDistrictList',
})
export default class CompanyDistrictList extends BaseComponent {
  private companyDistrictList: CompanyDistrictDto[] = Array<
    CompanyDistrictDto
  >();
  private companyDistrictListCount = 0;
  private companyDistrictSearchDto = new CompanyDistrictListDto();
  private pagination = new Pagination();
  private approvalStatus: APPROVAL_STATUS[] = [...CONST_APPROVAL_STATUS];
  private companyDistrictCreateDto = new CompanyDistrictCreateDto();
  private companySelect: CompanyDto[] = [];
  private dataLoading = false;
  private addressData = {
    address: '',
  };

  private commonAmenityList = [];
  private districtImage = [];

  // get status color
  getStatusColor(status: APPROVAL_STATUS) {
    return getStatusColor(status);
  }

  // get company list
  getCompanies() {
    CompanyService.findAllForSelect().subscribe(res => {
      this.companySelect = res.data;
    });
  }

  // show company district modal
  showCreateModal() {
    this.getAmenities();
  }

  // show address modal
  showAddressModal() {
    this.$bvModal.show('postcode');
  }

  // set address info
  setAddress(res) {
    this.addressData = res;
    this.companyDistrictCreateDto.address = this.addressData.address;

    const geocoder = new window.kakao.maps.services.Geocoder();
    const callback = (results, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        this.companyDistrictCreateDto.lon = results[0].x;
        this.companyDistrictCreateDto.lat = results[0].y;
        this.companyDistrictCreateDto.region1DepthName =
          results[0].address.region_1depth_name;
        this.companyDistrictCreateDto.region2DepthName =
          results[0].address.region_2depth_name;
        this.companyDistrictCreateDto.region3DepthName =
          results[0].address.region_3depth_name;
        this.companyDistrictCreateDto.hCode = results[0].address.h_code;
        this.companyDistrictCreateDto.bCode = results[0].address.b_code;
      }
    };
    geocoder.addressSearch(this.companyDistrictCreateDto.address, callback);
    this.$bvModal.hide('postcode');
  }

  // serach district
  search(isPagination?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    }
    CompanyDistrictService.findAll(
      this.companyDistrictSearchDto,
      this.pagination,
    ).subscribe(res => {
      this.dataLoading = false;
      this.companyDistrictList = res.data.items;
      this.companyDistrictListCount = res.data.totalCount;
      this.$router.push({
        query: Object.assign(this.companyDistrictSearchDto),
      });
    });
  }

  // paginate
  paginateSearch() {
    this.search(true);
  }

  // clear out district search dto
  clearOut() {
    this.pagination = new Pagination();
    this.companyDistrictSearchDto = new CompanyDistrictListDto();
    this.search();
  }

  // create company district
  createCompanyDidstrict() {
    if (this.districtImage.length > 0) {
      this.companyDistrictCreateDto.image = this.districtImage;
    }
    CompanyDistrictService.createCompanyDistrict(
      this.companyDistrictCreateDto,
    ).subscribe(res => {
      this.search();
    });
  }

  // clear out company district create dto
  clearOutCreateDto() {
    this.districtImage = [];
    this.companyDistrictCreateDto = new CompanyDistrictDto();
  }

  async upload(file: File) {
    const attachments = await FileUploadService.upload(
      UPLOAD_TYPE.COMPANY_DISTRICT,
      [file],
    );
    this.districtImage = [];
    this.districtImage.push(
      ...attachments.filter(
        fileUpload =>
          fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
      ),
    );
  }

  // get common facility
  getAmenities() {
    AmenityService.findAmenities('common-facility').subscribe(res => {
      this.commonAmenityList = res.data;
    });
  }

  created() {
    if (this.$route.params.companyNo) {
      this.companyDistrictSearchDto.companyNo = parseInt(
        this.$route.params.companyNo,
      );
    }
    this.getCompanies();
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.companyDistrictSearchDto = query;
    }
    this.search();
  }
}
</script>
