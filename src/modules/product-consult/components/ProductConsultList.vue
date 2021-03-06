<template>
  <section>
    <SectionTitle title="상품 상담 신청" divider></SectionTitle>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col cols="6" md="4" lg="3">
          <b-form-group label="이름">
            <b-form-input
              v-model="productConsultSearchDto.nanudaUserName"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="4" lg="3">
          <b-form-group label="연락처">
            <b-form-input
              v-model="productConsultSearchDto.nanudaUserPhone"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="4" lg="3">
          <b-form-group label="성별">
            <b-form-select
              class="custom-select"
              id="user_gender"
              v-model="productConsultSearchDto.gender"
            >
              <b-form-select-option value selected>전체</b-form-select-option>
              <b-form-select-option
                v-for="gender in genderSelect"
                :key="gender.no"
                :value="gender.key"
                >{{ gender.value }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="4" lg="3">
          <b-form-group label="희망 상담 시간대">
            <b-form-select
              class="custom-select"
              id="hope_time"
              v-model="productConsultSearchDto.hopeTime"
            >
              <b-form-select-option value selected>전체</b-form-select-option>
              <b-form-select-option
                v-for="time in availableTimesSelect"
                :key="time.no"
                :value="time.key"
                >{{ time.value }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="4" lg="3">
          <b-form-group label="브랜드명">
            <b-form-input
              list="brand_list"
              v-model="productConsultSearchDto.brandName"
            ></b-form-input>
            <datalist id="brand_list">
              <option
                v-for="brand in brandList"
                :key="brand.nameKr"
                :value="brand.nameKr"
                >{{ brand.nameKr }}</option
              >
            </datalist>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="4" lg="3">
          <b-form-group label="창업 경험">
            <b-form-select
              class="custom-select"
              id="changup_exp_yn"
              v-model="productConsultSearchDto.changUpExpYn"
            >
              <b-form-select-option value selected>전체</b-form-select-option>
              <b-form-select-option v-for="yn in expYn" :key="yn" :value="yn">
                {{ yn | enumTransformer }}
              </b-form-select-option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="4" lg="3">
          <b-form-group label="관리자">
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
          </b-form-group>
        </b-col>
        <b-col cols="6" md="4" lg="3">
          <b-form-group label="신청 상태">
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
          <strong class="text-primary">{{ productConsultTotalCount }}</strong>
        </h5>
        <b-form-select
          v-model="newLimit"
          size="sm"
          class="select-limit ml-3"
          @change="search()"
          v-if="productConsultTotalCount"
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
        <b-button
          variant="primary"
          v-b-modal.update_product_consult_status_nos
          v-if="selectedProductConsultNos.length > 0"
          @click="getProductConsultCodes()"
          >신청 상태 수정</b-button
        >

        <download-excel
          class="btn btn-outline-success"
          :data="productConsultListDto"
          :fields="fields"
          :stringifyLongNum="true"
          worksheet="상품 상담 리스트"
          :name="`product_consult_${newDate}.xls`"
          v-if="productConsultTotalCount"
        >
          <b-icon icon="file-earmark-arrow-down"></b-icon>
          엑셀 다운로드
        </download-excel>
      </div>
    </div>
    <template v-if="!dataLoading">
      <div class="bg-white table-responsive">
        <table
          v-if="productConsultTotalCount"
          class="table table-hover table-sm text-center table-nowrap"
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
                  highlighted: productConsultSearchDto.brandName,
                }"
              >
                관심 브랜드
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: productConsultSearchDto.changUpExpYn,
                }"
              >
                창업 경험
              </th>
              <th>
                비고
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: productConsultSearchDto.adminName,
                }"
              >
                관리자
              </th>
              <th scope="col">
                신청일
              </th>
              <th scope="col">
                신청 상태
              </th>
              <!-- <th></th> -->
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="productConsult in productConsultListDto"
              :key="productConsult.no"
              @click.stop="
                $router.push(`/product-consult/${productConsult.no}`)
              "
              style="cursor:pointer;"
            >
              <td @click.stop>
                <b-form-checkbox
                  :value="productConsult.no"
                  v-model="selectedProductConsultNos"
                ></b-form-checkbox>
              </td>
              <td>
                {{ productConsult.no }}
              </td>
              <td>
                <template v-if="productConsult.nanudaUser">
                  {{ productConsult.nanudaUser.name }}
                </template>
                <template v-else>
                  {{ productConsult.nonUserName }}
                  <span class="red-text">(비회원)</span>
                </template>
              </td>
              <td>
                <template v-if="productConsult.nanudaUser">
                  {{ productConsult.nanudaUser.phone | phoneTransformer }}
                </template>
                <template v-else>
                  {{ productConsult.nonUserPhone | phoneTransformer }}
                </template>
              </td>
              <td>
                <template
                  v-if="
                    productConsult.nanudaUser &&
                      productConsult.nanudaUser.gender
                  "
                >
                  {{ productConsult.nanudaUser.gender | enumTransformer }}
                </template>
                <template v-else>
                  -
                </template>
              </td>
              <td>
                <template v-if="productConsult.availableTime">
                  {{ productConsult.availableTime.value }}
                </template>
                <template v-else>
                  -
                </template>
              </td>
              <td>
                <template v-if="productConsult.brand">
                  {{ productConsult.brand.nameKr }}
                </template>
                <template v-else>
                  -
                </template>
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
                <template v-if="productConsult.pConsultEtc">
                  <pre>{{ productConsult.pConsultEtc }}</pre>
                </template>
              </td>
              <td>
                <template v-if="productConsult.admin">
                  {{ productConsult.admin.name }}
                </template>
                <template v-else>
                  -
                </template>
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
              <!-- <td>
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
              </td> -->
            </tr>
          </tbody>
        </table>
        <div v-else class="empty-data border">검색결과가 없습니다.</div>
      </div>
      <b-pagination
        v-model="pagination.page"
        v-if="productConsultTotalCount"
        pills
        :total-rows="productConsultTotalCount"
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
    <!-- 상태값 변경 -->
    <b-modal
      id="update_product_consult_status"
      title="상품상담 상태 변경"
      @ok="updateProductConsult()"
    >
      <b-form-row>
        <b-col cols="6" class="mb-3">
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
    <b-modal
      id="update_product_consult_status_nos"
      title="상품상담 상태 변경"
      @ok="updateProductConsultNos()"
    >
      <b-form-row>
        <b-col cols="6" class="mb-3">
          <div>
            <b-form-select
              v-model="productConsultUpdateStatusDto.status"
              class="mt-2"
            >
              <b-form-select-option
                v-for="code in statusSelect"
                :key="code.no"
                :value="code.key"
                >{{ code.value }}</b-form-select-option
              >
            </b-form-select>
          </div>
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
  BrandDto,
  ProductConsultDto,
  ProductConsultListDto,
  ProductConsultStatusUpdateDto,
} from '@/dto';
import ProductConsultService from '@/services/product-consult.service';
import { CONST_YN, OrderByValue, Pagination, YN } from '@/common';
import {
  ClearOutQueryParamMapper,
  QueryParamMapper,
  ReverseQueryParamMapper,
  RouterQueryParamMapper,
} from '@/core';
import {
  APPROVAL_STATUS,
  CONST_APPROVAL_STATUS,
  CONST_PAGINATION_COUNT,
  CONST_PRODUCT_CONSULT,
  PaginationCount,
  PRODUCT_CONSULT,
} from '@/services/shared';
import router from '@/router';
import { getStatusColor } from '@/core/utils/status-color.util';
import CodeManagementService from '@/services/code-management.service';
import { CodeManagementDto } from '@/services/init/dto';
import AdminService from '@/services/admin.service';
import BrandService from '@/services/brand.service';

@Component({
  name: 'ProductConsultList',
})
export default class ProductConsultList extends BaseComponent {
  private productConsultDto = new ProductConsultDto();
  private brandList: BrandDto[] = [];
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
  private selectedProductConsultNos: number[] = [];
  private productConsultUpdateStatusDto = new ProductConsultStatusUpdateDto();
  private newDate = new Date();
  // excel options
  private fields = {
    이름: 'nanudaUser.name',
    연락처: 'nanudaUser.phone',
    비회원명: 'nonUserName',
    비회원연락처: 'nonUserPhone',
    성별: 'nanudaUser.genderInfo.value',
    상담시간: 'availableTime.value',
    신청일: 'createdAt',
    창업경험: 'changUpExpYn',
    신청상태: 'codeManagement.value',
    주소: 'addressInfo.name',
    비고: 'pConsultEtc',
    관심브랜드: 'brand.nameKr',
  };
  private json_meta = [
    [
      {
        key: 'charset',
        value: 'utf-8',
      },
    ],
  ];

  findAdmin() {
    AdminService.findForSelect().subscribe(res => {
      if (res) {
        this.adminList = res.data;
      }
    });
  }

  findBrands() {
    BrandService.findNanudaBrand().subscribe(res => {
      this.brandList = res.data;
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

  updateProductConsultNos() {
    if (this.selectedProductConsultNos.length > 0) {
      this.productConsultUpdateStatusDto.productConsultNos = this.selectedProductConsultNos;
      ProductConsultService.updateStatus(
        this.productConsultUpdateStatusDto,
      ).subscribe(res => {
        this.selectedProductConsultNos = [];
        this.statusSelect = [];
        this.search();
      });
    }
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

  findAll(isPagination?: boolean, isSearch?: boolean) {
    this.dataLoading = true;
    this.pagination.limit = this.newLimit;
    if (!isPagination) {
      this.pagination.page = 1;
    } else {
      if (isSearch) this.pagination.page = 1;
      RouterQueryParamMapper(this.productConsultSearchDto, this.pagination);
    }
    ProductConsultService.findAll(
      this.productConsultSearchDto,
      this.pagination,
    ).subscribe(res => {
      if (res) {
        this.dataLoading = false;
        this.productConsultListDto = res.data.items;
        this.productConsultTotalCount = res.data.totalCount;
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
      this.productConsultSearchDto = new ProductConsultListDto();
      this.findAll();
    }
  }

  created() {
    this.newLimit = PaginationCount.TWENTY;
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.productConsultSearchDto = query;
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
    this.getProductConsultCodes();
    this.findBrands();
    this.getAvailableTimes();
    this.getGender();
    this.findAdmin();
  }
}
</script>
