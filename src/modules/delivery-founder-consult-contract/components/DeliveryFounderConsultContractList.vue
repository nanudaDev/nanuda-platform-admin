<template>
  <section>
    <SectionTitle title="배달형 계약 내역" divider />
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col cols="12" md="6" lg="3">
          <b-form-group label="업체명">
            <b-form-input
              list="company_lsit"
              v-model="deliveryFounderConsultContractSearchDto.companyNameKr"
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
        <b-col cols="12" md="6" lg="3">
          <b-form-group label="지점명">
            <b-form-input
              type="text"
              id="contract_districat"
              v-model="
                deliveryFounderConsultContractSearchDto.companyDistrictNo
              "
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="3">
          <b-form-group label="이름">
            <b-form-input
              v-model="deliveryFounderConsultContractSearchDto.nameKr"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="3">
          <b-form-group label="연락처">
            <b-form-input
              v-model="deliveryFounderConsultContractSearchDto.phone"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-row align-h="center">
        <div>
          <b-button variant="secondary" @click="clearOut()">초기화</b-button>
          <b-button variant="primary" @click="search()">검색</b-button>
        </div>
      </b-row>
    </div>
    <div class="table-top">
      <div class="total-count">
        <h5>
          <span>TOTAL</span>
          <strong class="text-primary">{{
            deliveryFounderConsultContractTotalCount
          }}</strong>
        </h5>
        <b-form-select
          v-model="newLimit"
          size="sm"
          class="select-limit ml-3"
          @change="search()"
          v-if="deliveryFounderConsultContractTotalCount"
        >
          <b-form-select-option
            v-for="count in paginationCount"
            :key="count"
            :value="count"
            >{{ count }}개</b-form-select-option
          >
        </b-form-select>
      </div>
      <div>
        <download-excel
          class="btn btn-outline-success"
          :data="deliveryFounderConsultContractList"
          :fields="fields"
          :stringifyLongNum="true"
          worksheet="배달형 계약 리스트"
          :name="`delivery_founder_consult_contract_${newDate}.xls`"
          v-if="deliveryFounderConsultContractTotalCount"
        >
          <b-icon icon="file-earmark-arrow-down"></b-icon>
          엑셀 다운로드
        </download-excel>
      </div>
    </div>
    <template v-if="!dataLoading">
      <div class="bg-white table-responsive">
        <table
          class="table table-hover table-sm text-center table-nowrap"
          v-if="deliveryFounderConsultContractTotalCount"
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
                상담신청 ID
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted:
                    deliveryFounderConsultContractSearchDto.companyNameKr,
                }"
              >
                업체명
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted:
                    deliveryFounderConsultContractSearchDto.companyDistrictNo,
                }"
              >
                지점명
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted:
                    deliveryFounderConsultContractSearchDto.deliverySpaceNo,
                }"
              >
                타입명
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted:
                    deliveryFounderConsultContractSearchDto.nanudaUserNo,
                }"
              >
                이름
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted:
                    deliveryFounderConsultContractSearchDto.nanudaUserNo,
                }"
              >
                연락처
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted:
                    deliveryFounderConsultContractSearchDto.createdAt,
                }"
              >
                계약일
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="contract in deliveryFounderConsultContractList"
              :key="contract.no"
              @click.stop="
                $router.push(
                  `/delivery-founder-consult-contract/${contract.no}`,
                )
              "
              style="cursor:pointer;"
            >
              <th scope="row">{{ contract.no }}</th>
              <td @click.stop>
                <router-link
                  :to="{
                    name: 'DeliveryFounderConsultDetail',
                    params: {
                      id: contract.deliveryFounderConsultNo,
                    },
                  }"
                  class="text-primary"
                >
                  {{ contract.deliveryFounderConsultNo }}
                </router-link>
              </td>
              <td>
                {{ contract.deliverySpace.companyDistrict.company.nameKr }}
              </td>
              <td>{{ contract.deliverySpace.companyDistrict.nameKr }}</td>
              <td>{{ contract.deliverySpace.typeName }}</td>
              <td>{{ contract.nanudaUser.name }}</td>
              <td class="text-nowrap">
                {{ contract.nanudaUser.phone | phoneTransformer }}
              </td>
              <td>
                {{ contract.createdAt | dateTransformer }}
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
        v-if="deliveryFounderConsultContractTotalCount"
        pills
        :total-rows="deliveryFounderConsultContractTotalCount"
        :per-page="pagination.limit"
        @input="paginateSearch()"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </template>
    <template v-else>
      <div class="loading-spinner">
        <div class="half-circle-spinner">
          <div class="circle circle-1"></div>
          <div class="circle circle-2"></div>
        </div>
      </div>
    </template>
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
  CONST_PAGINATION_COUNT,
  PaginationCount,
} from '../../../services/shared';

import AmenityService from '../../../services/amenity.service';
import { getStatusColor } from '../../../core/utils/status-color.util';
import deliveryFounderConsultContractService from '@/services/delivery-founder-consult-contract.service';
import {
  ClearOutQueryParamMapper,
  ReverseQueryParamMapper,
  RouterQueryParamMapper,
} from '@/core';

@Component({
  name: 'DeliveryFounderConsultContractList',
})
export default class DeliveryFounderConsultContractList extends BaseComponent {
  private deliveryFounderConsultContractList: CompanyDistrictDto[] = Array<
    CompanyDistrictDto
  >();
  private deliveryFounderConsultContractTotalCount = null;
  private deliveryFounderConsultContractSearchDto = new DeliveryFounderConsultContractListDto();
  private pagination = new Pagination();
  private approvalStatus: APPROVAL_STATUS[] = [...CONST_APPROVAL_STATUS];
  private companySelect: CompanyDto[] = [];
  private dataLoading = false;
  private addressData = {
    address: '',
  };

  private newLimit = null;
  private paginationCount: PaginationCount[] = [...CONST_PAGINATION_COUNT];

  private commonAmenityList = [];

  private newDate = new Date();
  // excel options
  private fields = {
    이름: 'nanudaUser.name',
    연락처: 'nanudaUser.phone',
    업체: 'deliverySpace.companyDistrict.company.nameKr',
    지점: 'deliverySpace.companyDistrict.nameKr',
    타입: 'deliverySpace.typeName',
    상담신청ID: 'deliveryFounderConsultNo',
  };
  private json_meta = [
    [
      {
        key: 'charset',
        value: 'utf-8',
      },
    ],
  ];

  getCompanies() {
    CompanyService.findForSelect().subscribe(res => {
      this.companySelect = res.data;
    });
  }

  paginateSearch() {
    this.findAll(true);
  }

  search() {
    this.findAll(true, true);
  }

  findAll(isPagination?: boolean, isSearch?: boolean) {
    this.dataLoading = true;
    this.pagination.limit = this.newLimit;
    if (!isPagination) {
      this.pagination.page = 1;
    } else {
      if (isSearch) this.pagination.page = 1;
      RouterQueryParamMapper(
        this.deliveryFounderConsultContractSearchDto,
        this.pagination,
      );
    }
    deliveryFounderConsultContractService
      .findAll(this.deliveryFounderConsultContractSearchDto, this.pagination)
      .subscribe(res => {
        if (res) {
          this.dataLoading = false;
          this.deliveryFounderConsultContractList = res.data.items;
          this.deliveryFounderConsultContractTotalCount = res.data.totalCount;
        }
      });
  }

  clearOut() {
    if (location.search) {
      ClearOutQueryParamMapper();
    } else {
      this.deliveryFounderConsultContractSearchDto = new DeliveryFounderConsultContractListDto();
      this.findAll();
    }
  }

  created() {
    this.newLimit = PaginationCount.TWENTY;
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.deliveryFounderConsultContractSearchDto = query;
      if (!isNaN(+query.limit) && !isNaN(+query.page)) {
        this.newLimit = +query.limit;
        // this.pagination.limit = +query.limit;
        this.pagination.page = +query.page;
      } else {
        this.pagination = new Pagination();
      }
      this.paginateSearch();
    } else {
      this.findAll();
    }
    this.getCompanies();
  }
}
</script>
