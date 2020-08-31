<template>
  <section>
    <SectionTitle title="지점 타입 관리" divider></SectionTitle>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col cols="6" md="2" class="mb-3">
          <b-form-group label="업체명">
            <b-form-input list="company_lsit" v-model="deliverySpaceSearchDto.companyName"></b-form-input>
            <datalist id="company_lsit">
              <option
                v-for="compay in companySelect"
                :key="compay.no"
                :value="compay.nameKr"
              >{{ compay.nameKr }}</option>
            </datalist>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="3" class="mb-3">
          <b-form-group label="업체 지점명">
            <b-form-input v-model="deliverySpaceSearchDto.companyDistrictName"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="3" class="mb-3">
          <b-form-group label="타입명">
            <b-form-input v-model="deliverySpaceSearchDto.typeName"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="3" class="mb-3">
          <b-form-group label="브랜드명">
            <b-form-input v-model="deliverySpaceSearchDto.brandName"></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <!-- second row -->
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
          <strong class="text-primary">{{ deliverySpaceListCount }}</strong>
        </h5>
      </div>
      <b-button variant="primary" v-b-modal.add_delivery_space>지점 타입 추가</b-button>
    </div>
    <div v-if="!dataLoading">
      <div class="table-bordered table-responsive">
        <table class="table table-hover table-sm table-nowrap" v-if="deliverySpaceListCount">
          <thead>
            <tr>
              <th scope="col" v-bind:class="{ highlighted: deliverySpaceSearchDto.no }">ID</th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: deliverySpaceSearchDto.companyName,
                }"
              >업체명</th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: deliverySpaceSearchDto.companyDistrictName,
                }"
              >지점명</th>
              <th scope="col" v-bind:class="{ highlighted: deliverySpaceSearchDto.typeName }">타입명</th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: deliverySpaceSearchDto.buildingName,
                }"
              >건물명</th>
              <th scope="col" v-bind:class="{ highlighted: deliverySpaceSearchDto.size }">평수</th>
              <th scope="col" v-bind:class="{ highlighted: deliverySpaceSearchDto.deposit }">보증금</th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: deliverySpaceSearchDto.monthlyRentFee,
                }"
              >월 임대료</th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: deliverySpaceSearchDto.monthlyUtilityFee,
                }"
              >월 관리비</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="type in deliverySpaceList" :key="type.no">
              <td>{{ type.no }}</td>
              <td class="text-nowrap">
                <div
                  v-if="type.companyDistrict.company.nameKr"
                >{{ type.companyDistrict.company.nameKr }}</div>
              </td>
              <td class="text-nowrap">
                <div v-if="type.companyDistrict.nameKr">{{ type.companyDistrict.nameKr }}</div>
              </td>
              <td>
                <div v-if="type.typeName">{{ type.typeName }}</div>
              </td>
              <td>
                <div v-if="type.buildingName">{{ type.buildingName }}</div>
              </td>
              <td v-if="type.size">{{ type.size }} 평</td>
              <td>
                <div v-if="type.deposit">{{ type.deposit }} 만원</div>
              </td>
              <td>
                <div v-if="type.monthlyRentFee">{{ type.monthlyRentFee }} 만원</div>
              </td>
              <td>
                <div v-if="type.monthlyUtilityFee">{{ type.monthlyUtilityFee }} 만원</div>
              </td>
              <td>
                <router-link
                  v-if="type.no"
                  class="btn btn-sm btn-secondary text-nowrap"
                  :to="{
                    name: 'DeliverySpaceDetail',
                    params: {
                      id: type.no,
                    },
                  }"
                >상세보기</router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="empty-data border">타입 정보 없음</div>
      </div>
      <b-pagination
        v-model="pagination.page"
        v-if="deliverySpaceListCount"
        pills
        :total-rows="deliverySpaceListCount"
        :per-page="pagination.limit"
        @input="paginateSearch"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </div>
    <div class="half-circle-spinner mt-5" v-if="dataLoading">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
    <!-- 지점 추가 모달 -->
    <DeliverySpaceCreate />
  </section>
</template>
<script lang="ts">
import BaseCard from '../../_components/BaseCard.vue';
import BaseComponent from '@/core/base.component';
import { Prop, Vue, Component } from 'vue-property-decorator';
import {
  DeliverySpaceDto,
  DeliverySpaceListDto,
  CompanyDto,
} from '../../../dto';
import { Pagination } from '@/common';

import CompanyService from '../../../services/company.service';
import DeliverSpaceService from '../../../services/delivery-space.service';

import DeliverySpaceCreate from './DeliverySpaceCreate.vue';

@Component({
  name: 'DeliverySpaceList',
  components: {
    DeliverySpaceCreate,
  },
})
export default class DeliverySpaceList extends BaseComponent {
  private deliverySpaceList: DeliverySpaceDto[] = Array<DeliverySpaceDto>();
  private deliverySpaceSearchDto = new DeliverySpaceListDto();
  private deliverySpaceDto = new DeliverySpaceDto();
  private deliverySpaceListCount = 0;
  private pagination = new Pagination();

  private companySelect: CompanyDto[] = Array<CompanyDto>();
  private dataLoading = false;

  // 업체 셀렉트 박스
  getCompanies() {
    CompanyService.findForSelect().subscribe(res => {
      this.companySelect = res.data;
    });
  }

  // 타입 공간 리스트
  search(isPagination?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.pagination.limit = 20;

    DeliverSpaceService.findAll(
      this.deliverySpaceSearchDto,
      this.pagination,
    ).subscribe(res => {
      this.dataLoading = false;
      this.deliverySpaceList = res.data.items;
      this.deliverySpaceListCount = res.data.totalCount;
    });
  }

  paginateSearch() {
    this.search(true);
  }

  clearOut() {
    this.pagination.page = 1;
    this.deliverySpaceSearchDto = new DeliverySpaceListDto();
    this.search();
  }

  created() {
    this.getCompanies();
    this.search();
  }

  mounted() {
    this.$root.$on('delivery_space_create', () => {
      this.search();
    });
  }
}
</script>
