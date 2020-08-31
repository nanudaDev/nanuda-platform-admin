<template>
  <section>
    <div class="title pb-2 mb-2">
      <h3>배달형 계약 내역 관리</h3>
    </div>
    <div class="divider"></div>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col sm="12" lg="1" class="mb-3">
          <label for="contract_id">계약 ID</label>
          <b-form-input
            type="text"
            id="contract_id"
            v-model="deliveryFounderConsultContractSearchDto.no"
          ></b-form-input>
        </b-col>
        <b-col sm="12" lg="3" class="mb-3">
          <label for="contract_company">업체명</label>
          <select
            class="custom-select"
            id="contract_company"
            v-model="deliveryFounderConsultContractSearchDto.companyNo"
          >
            <option value selected>전체</option>
            <option
              v-for="company in companySelect"
              :key="company.no"
              :value="company.no"
              >{{ company.nameKr }}</option
            >
          </select>
        </b-col>
        <b-col sm="12" lg="3" class="mb-3">
          <label for="contract_districat">지점명</label>
          <b-form-input
            type="text"
            id="contract_districat"
            v-model="deliveryFounderConsultContractSearchDto.companyDistrictNo"
          ></b-form-input>
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
          <strong class="text-primary">{{
            deliveryFounderConsultContractListCount
          }}</strong>
        </h5>
      </div>
    </div>
    <div v-if="!dataLoading" class="table-bordered  table-responsive">
      <table
        class="table table-sm table-hover table-nowrap"
        v-if="deliveryFounderConsultContractListCount"
      >
        <thead>
          <tr>
            <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultContractSearchDto.no,
              }"
            >
              ID
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted:
                  deliveryFounderConsultContractSearchDto.founderConsultNo,
              }"
            >
              CONSULT NO
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultContractSearchDto.companyNo,
              }"
            >
              COMPANY
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted:
                  deliveryFounderConsultContractSearchDto.companyDistrictNo,
              }"
            >
              DISTRICT
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted:
                  deliveryFounderConsultContractSearchDto.deliverySpaceNo,
              }"
            >
              TYPE
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted:
                  deliveryFounderConsultContractSearchDto.nanudaUserNo,
              }"
            >
              NAME
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted:
                  deliveryFounderConsultContractSearchDto.nanudaUserNo,
              }"
            >
              PHONE
            </th>
            <!-- <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultContractSearchDto.createdAt,
              }"
            >
              CREATED
            </th> -->
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="contract in deliveryFounderConsultContractList"
            :key="contract.no"
          >
            <th scope="row">{{ contract.no }}</th>
            <td>
              <router-link
                :to="{
                  name: 'DeliveryFounderConsultDetail',
                  params: {
                    id: contract.deliveryFounderConsultNo,
                  },
                }"
              >
                {{ contract.deliveryFounderConsultNo }}
              </router-link>
            </td>
            <td>{{ contract.deliverySpace.companyDistrict.company.nameKr }}</td>
            <td>{{ contract.deliverySpace.companyDistrict.nameKr }}</td>
            <td>{{ contract.deliverySpace.typeName }}</td>
            <td>{{ contract.nanudaUser.name }}</td>
            <td class="text-nowrap">
              {{ contract.nanudaUser.phone | phoneTransformer }}
            </td>
            <!-- <td>
              {{ contract.createdAt | dateTransformer }}
            </td> -->
            <td>
              <router-link
                class="btn btn-sm btn-secondary text-nowrap"
                :to="{
                  name: 'DeliveryFounderConsultContractDetail',
                  params: {
                    id: contract.no,
                  },
                }"
              >
                상세보기
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="empty-data border">
        검색결과가 없습니다.
      </div>
    </div>
    <b-pagination
      v-model="pagination.page"
      v-if="deliveryFounderConsultContractListCount"
      pills
      :total-rows="deliveryFounderConsultContractListCount"
      :per-page="pagination.limit"
      @input="search(true)"
      class="mt-4 justify-content-center"
    ></b-pagination>
    <div class="half-circle-spinner mt-5" v-if="dataLoading">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
  </section>
</template>
<script lang="ts">
import BaseComponent from '../../../core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import {
  CompanyDto,
  CompanyDistrictDto,
  CompanyDistrictListDto,
  DeliveryFounderConsultContractListDto,
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
import { getStatusColor } from '../../../core/utils/status-color.util';
import deliveryFounderConsultContarctService from '@/services/delivery-founder-consult-contarct.service';

@Component({
  name: 'DeliveryFounderConsultContractList',
})
export default class DeliveryFounderConsultContractList extends BaseComponent {
  private deliveryFounderConsultContractList: CompanyDistrictDto[] = Array<
    CompanyDistrictDto
  >();
  private deliveryFounderConsultContractListCount = 0;
  private deliveryFounderConsultContractSearchDto = new DeliveryFounderConsultContractListDto();
  private pagination = new Pagination();
  private approvalStatus: APPROVAL_STATUS[] = [...CONST_APPROVAL_STATUS];
  private companySelect: CompanyDto[] = [];
  private dataLoading = false;
  private addressData = {
    address: '',
  };

  private commonAmenityList = [];

  getCompanies() {
    CompanyService.findForSelect().subscribe(res => {
      this.companySelect = res.data;
    });
  }

  search(isPagination?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    }
    deliveryFounderConsultContarctService
      .findAll(this.deliveryFounderConsultContractSearchDto, this.pagination)
      .subscribe(res => {
        this.dataLoading = false;
        this.deliveryFounderConsultContractList = res.data.items;
        this.deliveryFounderConsultContractListCount = res.data.totalCount;
      });
  }

  clearOut() {
    this.pagination = new Pagination();
    this.deliveryFounderConsultContractSearchDto = new DeliveryFounderConsultContractListDto();
    this.search();
  }

  created() {
    this.search();
    this.getCompanies();
  }
}
</script>
