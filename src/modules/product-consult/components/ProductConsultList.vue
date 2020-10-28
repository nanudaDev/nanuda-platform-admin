<template>
  <section>
    <SectionTitle title="상품 상담 신청 내역" divider></SectionTitle>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col cols="4" lg="2" class="mb-3">
          <label>사용자명</label>
          <b-form-input
            v-model="productConsultSearchDto.nanudaUserName"
          ></b-form-input>
        </b-col>
        <b-col cols="4" lg="2" class="mb-3">
          <label>휴대폰 번호</label>
          <b-form-input
            v-model="productConsultSearchDto.nanudaUserPhone"
          ></b-form-input>
        </b-col>
        <b-col>
          <label for="user_gender">성별</label>
          <select
            class="custom-select"
            id="user_gender"
            v-model="productConsultSearchDto.gender"
          >
            <option value selected>전체</option>
            <option
              v-for="gender in genderSelect"
              :key="gender.no"
              :value="gender.key"
              >{{ gender.value }}</option
            >
          </select>
        </b-col>
        <b-col cols="4" lg="1">
          <label for="changup_exp_yn">창업 경험</label>
          <select
            class="custom-select"
            id="changup_exp_yn"
            v-model="productConsultSearchDto.changUpExpYn"
          >
            <option value selected>전체</option>
            <option v-for="yn in expYn" :key="yn" :value="yn">
              {{ yn | enumTransformer }}
            </option>
          </select>
        </b-col>
        <b-col cols="4" lg="2" class="mb-3">
          <label for="hope_time">희망 시간대</label>
          <select
            class="custom-select"
            id="hope_time"
            v-model="productConsultSearchDto.hopeTime"
          >
            <option value selected>전체</option>
            <option
              v-for="time in availableTimesSelect"
              :key="time.no"
              :value="time.key"
              >{{ time.value }}</option
            >
          </select>
        </b-col>
        <b-col cols="4" lg="2" class="mb-3">
          <label>관리자명</label>
          <template>
            <b-form-input
              list="admin_list"
              id="admin_user"
              v-model="productConsultSearchDto.adminName"
            ></b-form-input>
            <datalist id="admin_list">
              <option
                v-for="admin in adminList.items"
                :key="admin.no"
                :value="admin.name"
                >{{ admin.name }}</option
              >
            </datalist>
          </template>
        </b-col>
        <b-col cols="4" lg="2" class="mb-3">
          <label for="product_approve_status">신청 상태</label>
          <b-form-select
            id="product_approve_status"
            v-model="productConsultSearchDto.status"
          >
            <b-select-option value>전체</b-select-option>
            <b-form-select-option
              v-for="status in statusSelect"
              :key="status.no"
              :value="status.key"
              >{{ status.value }}</b-form-select-option
            >
          </b-form-select>
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
          <strong class="text-primary">{{ productConsultTotalCount }}</strong>
        </h5>

        <b-form-select v-model="newLimit" class="mt-2" @change="search()">
          <b-form-select-option
            v-for="count in paginationCount"
            :key="count"
            :value="count"
            >{{ count }}개</b-form-select-option
          >
        </b-form-select>
      </div>
    </div>
    <div v-if="!dataLoading">
      <div class="table-responsive" v-if="productConsultTotalCount">
        <table
          v-if="productConsultTotalCount"
          class="table table-hover table-nowrap table-sm border"
        >
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th scope="col">
                이름
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: productConsultSearchDto.nanudaUserPhone,
                }"
              >
                연락처
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: productConsultSearchDto.gender,
                }"
              >
                성별
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: productConsultSearchDto.hopeTime,
                }"
              >
                희망 상담 시간대
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: productConsultSearchDto.changUpExpYn,
                }"
              >
                창업 경험 유무
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: productConsultSearchDto.adminName,
                }"
              >
                담당자
              </th>
              <th scope="col">
                신청일
              </th>
              <th scope="col">
                신청 상태
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="productConsult in productConsultListDto"
              :key="productConsult.no"
            >
              <!-- <td>
                {{ productConsult.no }}
              </td> -->
              <td>
                <b-form-checkbox
                  :value="productConsult.no"
                  v-model="selectedProductConsults"
                ></b-form-checkbox>
              </td>
              <td>
                {{ productConsult.no }}
              </td>
              <td>
                <div v-if="productConsult.nanudaUser">
                  {{ productConsult.nanudaUser.name }}
                </div>
                <div v-else>
                  {{ productConsult.nonUserName }}
                  <span class="red-text">(비회원)</span>
                </div>
              </td>
              <td>
                <div v-if="productConsult.nanudaUser">
                  {{ productConsult.nanudaUser.phone | phoneTransformer }}
                </div>
                <div v-else>
                  {{ productConsult.nonUserPhone | phoneTransformer }}
                </div>
              </td>
              <td>
                <div
                  v-if="
                    productConsult.nanudaUser &&
                      productConsult.nanudaUser.gender
                  "
                >
                  {{ productConsult.nanudaUser.gender | enumTransformer }}
                </div>
                <div v-else>
                  -
                </div>
              </td>
              <td>
                <div v-if="productConsult.availableTime">
                  {{ productConsult.availableTime.value }}
                </div>
                <div v-else>
                  -
                </div>
              </td>
              <td>
                <b-badge
                  :variant="
                    productConsult.changUpExpYn === 'Y' ? 'success' : 'danger'
                  "
                  >{{ productConsult.changUpExpYn | enumTransformer }}</b-badge
                >
              </td>
              <td>
                <div v-if="productConsult.admin">
                  {{ productConsult.admin.name }}
                </div>
                <div v-else>
                  -
                </div>
              </td>
              <td>
                {{ productConsult.createdAt | dateTransformer }}
              </td>
              <td>
                <b-button
                  :variant="getStatusColor(productConsult.codeManagement.key)"
                  class="badge-pill p-2 mr-2"
                  @click="findOne(productConsult.no)"
                  v-b-modal.update_product_consult_status
                  ><b>{{ productConsult.codeManagement.value }}</b></b-button
                >
              </td>
              <td>
                <router-link
                  class="btn btn-sm btn-secondary text-nowrap"
                  :to="{
                    name: 'ProductConsultDetail',
                    params: {
                      id: productConsult.no,
                    },
                  }"
                  >상세보기</router-link
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="empty-data border">검색결과가 없습니다.</div>
      <b-pagination
        v-model="pagination.page"
        v-if="productConsultTotalCount"
        pills
        :total-rows="productConsultTotalCount"
        :per-page="pagination.limit"
        @input="paginateSearch()"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </div>
    <div class="half-circle-spinner mt-5" v-if="dataLoading">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
    <!-- 상태값 변경 -->
    <b-modal
      id="update_product_consult_status"
      title="상품상담 상태 변경"
      @ok="updateProductConsult()"
    >
      <b-form-row>
        <b-col cols="12" class="mb-3">
          <b-form-group label="상품상담 상태값">
            <b-form-select v-model="productConsultDto.status" class="mt-2">
              <b-form-select-option
                v-for="code in codeManagement"
                :key="code.no"
                :value="code.key"
                >{{ code.value }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-modal>
  </section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import {
  AdminDto,
  ProductConsultDto,
  ProductConsultListDto,
} from '../../../dto';
import ProductConsultService from '../../../services/product-consult.service';
import { CONST_YN, OrderByValue, Pagination, YN } from '@/common';
import { QueryParamMapper, ReverseQueryParamMapper } from '@/core';
import {
  APPROVAL_STATUS,
  CONST_APPROVAL_STATUS,
  CONST_PAGINATION_COUNT,
  CONST_PRODUCT_CONSULT,
  PaginationCount,
  PRODUCT_CONSULT,
} from '@/services/shared';
import router from '@/router';
import { getStatusColor } from '../../../core/utils/status-color.util';
import CodeManagementService from '../../../services/code-management.service';
import { CodeManagementDto } from '@/services/init/dto';
import AdminService from '../../../services/admin.service';

@Component({
  name: 'ProductConsultList',
})
export default class ProductConsultList extends BaseComponent {
  private productConsultDto = new ProductConsultDto();
  private productConsultSearchDto = new ProductConsultListDto();
  private pagination = new Pagination();
  private productConsultTotalCount = null;
  private productConsultListDto: ProductConsultDto[] = [];
  private dataLoading = false;
  private statusSelect: CodeManagementDto[] = [];
  private adminList: AdminDto[] = [];
  private availableTimesSelect: CodeManagementDto[] = [];
  private expYn: YN[] = [...CONST_YN];
  private genderSelect: CodeManagementDto[] = [];
  private newLimit = null;
  private paginationCount: PaginationCount[] = [...CONST_PAGINATION_COUNT];
  private codeManagement: CodeManagementDto[] = [];
  // 선택된 상품 상담 ID
  private selectedProductConsults: number[] = [];

  findAdmin() {
    AdminService.findForSelect().subscribe(res => {
      if (res) {
        this.adminList = res.data;
      }
    });
  }

  findOne(id) {
    ProductConsultService.findOne(id).subscribe(res => {
      this.productConsultDto = res.data;
      CodeManagementService.findAnyCode('PRODUCT_CONSULT').subscribe(res => {
        this.codeManagement = res.data;
      });
    });
  }

  updateProductConsult() {
    ProductConsultService.update(
      this.productConsultDto.no,
      this.productConsultDto,
    ).subscribe(res => {
      this.search();
    });
  }

  // get status color
  getStatusColor(status: APPROVAL_STATUS) {
    return getStatusColor(status);
  }

  // get product consult codes
  getProductConsultCodes() {
    CodeManagementService.findAnyCode('PRODUCT_CONSULT').subscribe(res => {
      this.statusSelect = res.data;
    });
  }

  // 성별
  getGender() {
    CodeManagementService.findGender().subscribe(res => {
      this.genderSelect = res.data;
    });
  }

  // 희망시간대
  getAvailableTimes() {
    CodeManagementService.findAvailableTimes().subscribe(res => {
      this.availableTimesSelect = res.data;
    });
  }

  search(isPagination?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.pagination.limit = this.newLimit;
    ProductConsultService.findAll(
      this.productConsultSearchDto,
      this.pagination,
    ).subscribe(res => {
      this.productConsultListDto = res.data.items;
      this.productConsultTotalCount = res.data.totalCount;
      this.dataLoading = false;
      this.$router.push({
        query: Object.assign(this.productConsultSearchDto),
      });
    });
  }

  paginateSearch() {
    this.search(true);
  }

  clearOut() {
    this.pagination.page = 1;
    this.productConsultSearchDto = new ProductConsultListDto();
    this.search();
  }

  created() {
    console.log(this.selectedProductConsults);
    this.newLimit = 50;
    this.pagination.limit = this.newLimit;
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.productConsultSearchDto = query;
    }
    this.pagination.page = 1;
    this.search();
    this.getProductConsultCodes();
    this.getAvailableTimes();
    this.getGender();
    this.findAdmin();
  }
}
</script>
