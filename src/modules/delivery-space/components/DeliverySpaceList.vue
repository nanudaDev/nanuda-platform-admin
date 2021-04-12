<template>
  <section>
    <SectionTitle title="지점 타입 관리" divider></SectionTitle>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col cols="6" lg="3">
          <b-form-group label="업체명">
            <b-form-input
              list="company_lsit"
              v-model="deliverySpaceSearchDto.companyName"
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
        <b-col cols="6" lg="3">
          <b-form-group label="업체 지점명">
            <b-form-input
              v-model="deliverySpaceSearchDto.companyDistrictName"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6" lg="3">
          <b-form-group label="타입명">
            <b-form-input
              v-model="deliverySpaceSearchDto.typeName"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6" lg="3">
          <b-form-group label="브랜드명">
            <b-form-input
              v-model="deliverySpaceSearchDto.brandName"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6" lg="3">
          <b-form-group label="최대 보증금 (만원 단위)">
            <b-form-input
              v-model="deliverySpaceSearchDto.deposit"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6" lg="3">
          <b-form-group label="최대 월 임대료 (만원 단위)">
            <b-form-input
              v-model="deliverySpaceSearchDto.monthlyRentFee"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6" lg="3">
          <b-form-group label="관리자 노출 여부">
            <b-form-select v-model="deliverySpaceSearchDto.delYn">
              <b-form-select-option value>전체</b-form-select-option>
              <b-form-select-option
                v-for="yn in ynSelect.slice().reverse()"
                :key="yn"
                :value="yn"
                >{{ yn !== 'Y' ? '노출' : '미노출' }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="6" lg="3">
          <b-form-group label="업체 노출 여부">
            <b-form-select v-model="deliverySpaceSearchDto.showYn">
              <b-form-select-option value>전체</b-form-select-option>
              <b-form-select-option
                v-for="yn in ynSelect"
                :key="yn"
                :value="yn"
                >{{ yn | stringShowTransformer }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="6" lg="3">
          <b-form-group label="직영점">
            <b-form-select v-model="deliverySpaceSearchDto.isOperatedYn">
              <b-form-select-option value>전체</b-form-select-option>
              <b-form-select-option
                v-for="yn in ynSelect"
                :key="yn"
                :value="yn"
                >{{ yn === 'Y' ? '직영점' : '공유주방' }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="6" lg="3">
          <b-form-group label="운영여부">
            <b-form-select v-model="deliverySpaceSearchDto.isOpenedYn">
              <b-form-select-option value>전체</b-form-select-option>
              <b-form-select-option
                v-for="yn in ynSelect"
                :key="yn"
                :value="yn"
                >{{ yn !== 'Y' ? '오픈예정' : '운영중' }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>
      <!-- second row -->
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
          <strong class="text-primary">{{ deliverySpaceTotalCount }}</strong>
        </h5>
      </div>
      <b-button variant="primary" v-b-modal.add_delivery_space
        >지점 타입 추가</b-button
      >
    </div>
    <template v-if="!dataLoading">
      <div class="bg-white table-responsive">
        <table
          c
          class="table table-hover table-sm text-center table-nowrap"
          v-if="deliverySpaceTotalCount"
        >
          <thead>
            <tr>
              <th
                scope="col"
                v-bind:class="{ highlighted: deliverySpaceSearchDto.no }"
              >
                ID
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: deliverySpaceSearchDto.companyName,
                }"
              >
                업체명
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: deliverySpaceSearchDto.companyDistrictName,
                }"
              >
                지점명
              </th>
              <th
                scope="col"
                v-bind:class="{ highlighted: deliverySpaceSearchDto.typeName }"
              >
                타입명
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: deliverySpaceSearchDto.buildingName,
                }"
              >
                건물명
              </th>
              <th
                scope="col"
                v-bind:class="{ highlighted: deliverySpaceSearchDto.size }"
              >
                평수
              </th>
              <th
                scope="col"
                v-bind:class="{ highlighted: deliverySpaceSearchDto.deposit }"
              >
                보증금
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: deliverySpaceSearchDto.monthlyRentFee,
                }"
              >
                월 임대료
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: deliverySpaceSearchDto.monthlyUtilityFee,
                }"
              >
                월 관리비
              </th>
              <th
                v-bind:class="{
                  highlighted: deliverySpaceSearchDto.delYn,
                }"
              >
                관리자 노출 여부
              </th>
              <th
                v-bind:class="{
                  highlighted: deliverySpaceSearchDto.showYn,
                }"
              >
                업체 노출 여부
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="type in deliverySpaceList"
              :key="type.no"
              @click="
                $router.push({
                  name: 'DeliverySpaceDetail',
                  params: {
                    id: type.no,
                  },
                })
              "
              style="cursor:pointer"
            >
              <td>{{ type.no }}</td>
              <td class="text-nowrap">
                <template v-if="type.companyDistrict.company.nameKr">
                  {{ type.companyDistrict.company.nameKr }}
                </template>
              </td>
              <td class="text-nowrap">
                <template v-if="type.companyDistrict.nameKr">
                  {{ type.companyDistrict.nameKr }}
                </template>
              </td>
              <td>
                <template v-if="type.typeName">
                  <b-badge
                    variant="warning"
                    v-if="type.isOperatedYn === 'Y'"
                    class="mr-1"
                    >직영점</b-badge
                  >
                  <b-badge
                    variant="danger"
                    v-if="type.isOpenedYn !== 'Y'"
                    class="mr-1"
                  >
                    오픈예정
                  </b-badge>
                  {{ type.typeName }}
                </template>
              </td>
              <td>
                <template v-if="type.buildingName">{{
                  type.buildingName
                }}</template>
              </td>
              <td v-if="type.size">{{ type.size }} 평</td>
              <td>
                <template v-if="type.deposit">{{ type.deposit }} 만원</template>
              </td>
              <td>
                <template v-if="type.monthlyRentFee">
                  {{ type.monthlyRentFee }} 만원
                </template>
              </td>
              <td>
                <template v-if="type.monthlyUtilityFee">
                  {{ type.monthlyUtilityFee }} 만원
                </template>
              </td>
              <td>
                <b-badge
                  v-if="type.delYn"
                  :variant="type.delYn !== 'Y' ? 'success' : 'danger'"
                >
                  {{ type.delYn !== 'Y' ? 'Y' : 'N' }}</b-badge
                >
              </td>
              <td>
                <b-badge
                  v-if="type.showYn"
                  :variant="type.showYn === 'Y' ? 'success' : 'danger'"
                >
                  {{ type.showYn }}</b-badge
                >
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="empty-data border">타입 정보 없음</div>
      </div>
      <b-pagination
        v-model="pagination.page"
        v-if="deliverySpaceTotalCount"
        pills
        :total-rows="deliverySpaceTotalCount"
        :per-page="pagination.limit"
        @input="paginateSearch"
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
import { CONST_YN, Pagination, YN } from '@/common';

import CompanyService from '../../../services/company.service';
import DeliverSpaceService from '../../../services/delivery-space.service';

import DeliverySpaceCreate from './DeliverySpaceCreate.vue';
import {
  ClearOutQueryParamMapper,
  ReverseQueryParamMapper,
  RouterQueryParamMapper,
} from '@/core';

import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'DeliverySpaceList',
  components: {
    DeliverySpaceCreate,
  },
})
export default class DeliverySpaceList extends BaseComponent {
  private deliverySpaceList: DeliverySpaceDto[] = [];
  private deliverySpaceSearchDto = new DeliverySpaceListDto();
  private deliverySpaceDto = new DeliverySpaceDto();
  private deliverySpaceTotalCount = 0;
  private pagination = new Pagination();
  private companySelect: CompanyDto[] = [];
  private dataLoading = false;
  private ynSelect: YN[] = [...CONST_YN];

  // 업체 셀렉트 박스
  getCompanies() {
    CompanyService.findForSelect().subscribe(res => {
      this.companySelect = res.data;
    });
  }

  // 타입 공간 리스트
  findAll(isPagination?: boolean, isSearch?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1; // 최초 페이지 진입시 페이지 초기화
    } else {
      if (isSearch) this.pagination.page = 1; // 검색버튼 클릭시 페이지 초기화
      RouterQueryParamMapper(this.deliverySpaceSearchDto, this.pagination);
    }
    DeliverSpaceService.findAll(
      this.deliverySpaceSearchDto,
      this.pagination,
    ).subscribe(res => {
      if (res) {
        this.dataLoading = false;
        this.deliverySpaceList = res.data.items;
        this.deliverySpaceTotalCount = res.data.totalCount;
      }
    });
  }

  paginateSearch() {
    this.findAll(true);
  }

  search() {
    this.findAll(true, true);
  }

  clearOut() {
    if (location.search) {
      ClearOutQueryParamMapper();
    } else {
      this.deliverySpaceSearchDto = new DeliverySpaceListDto();
      this.findAll();
    }
  }

  created() {
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.deliverySpaceSearchDto = query;
      if (!isNaN(+query.limit) && !isNaN(+query.page)) {
        this.pagination.limit = +query.limit;
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

  mounted() {
    // create delivery space
    this.$root.$on('delivery_space_create', () => {
      this.clearOut();
    });
  }
}
</script>
