<template>
  <section>
    <div class="title pb-2 mb-2">
      <h3>배달형 상담 신청</h3>
    </div>
    <div class="divider"></div>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <div class="form-row">
        <div class="col-6 col-lg-1 mb-3">
          <label for="space_id">공간 ID</label>
          <input
            type="text"
            class="form-control"
            id="space_id"
            v-model="deliveryFounderConsultSearchDto.deliverySpaceNo"
          />
        </div>
        <div class="col-6 col-lg-2 mb-3">
          <label for="user_name">사용자명</label>
          <input
            type="text"
            class="form-control"
            id="user_name"
            v-model="deliveryFounderConsultSearchDto.nanudaUserName"
          />
        </div>
        <div class="col-6 col-lg-3 mb-3">
          <label for="user_phone">휴대폰 번호</label>
          <input
            type="text"
            class="form-control"
            id="user_phone"
            v-model="deliveryFounderConsultSearchDto.phone"
          />
        </div>
        <div class="col-6 col-lg-1 mb-3">
          <label for="user_gender">성별</label>
          <select
            class="custom-select"
            id="user_gender"
            v-model="deliveryFounderConsultSearchDto.gender"
          >
            <option value selected>전체</option>
            <option
              v-for="gender in genderSelect"
              :key="gender"
              :value="gender"
              >{{ gender | enumTransformer }}</option
            >
          </select>
        </div>
        <div class="col-6 col-lg-1 mb-3">
          <label for="changup_exp_yn">창업 경험</label>
          <select
            class="custom-select"
            id="changup_exp_yn"
            v-model="deliveryFounderConsultSearchDto.changUpExpYn"
          >
            <option value selected>전체</option>
            <option v-for="yn in delYn" :key="yn" :value="yn">
              {{ yn | enumTransformer }}
            </option>
          </select>
        </div>
        <div class="col-6 col-lg-2 mb-3">
          <label for="company">업체명</label>
          <select
            class="custom-select"
            id="company"
            v-model="deliveryFounderConsultSearchDto.companyNo"
          >
            <option value selected>전체</option>
            <option
              v-for="company in companySelect"
              :key="company.no"
              :value="company.no"
              >{{ company.nameKr }}</option
            >
          </select>
        </div>
        <div class="col-12 col-lg-2 mb-3">
          <label for="company_district">업체 지점</label>
          <input
            type="text"
            class="form-control"
            id="company_district"
            v-model="deliveryFounderConsultSearchDto.companyDistrictNameKr"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="col-6 col-lg-2 mb-3">
          <label for="admin_user">관리자명</label>
          <template>
            <b-form-input
              list="admin_list"
              id="admin_user"
              v-model="deliveryFounderConsultSearchDto.adminName"
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
        </div>

        <div class="col-6 col-lg-2 mb-3">
          <label for="hope_time">희망 시간대</label>
          <select
            class="custom-select"
            id="hope_time"
            v-model="deliveryFounderConsultSearchDto.hopeTime"
          >
            <option value selected>전체</option>
            <option
              v-for="time in availableTimesSelect"
              :key="time.no"
              :value="time.key"
              >{{ time.value }}</option
            >
          </select>
        </div>
        <div class="col-6 col-lg-2 mb-3">
          <label for="status">신청 상태</label>
          <select
            class="custom-select"
            id="status"
            v-model="deliveryFounderConsultSearchDto.companyDecisionStatus"
          >
            <option value selected>전체</option>
            <option
              v-for="status in statusSelect"
              :key="status.no"
              :value="status.key"
              >{{ status.value }}</option
            >
          </select>
        </div>
        <div class="col-6 col-lg-2 mb-3">
          <label for="view_count">열람 유무</label>
          <select
            class="custom-select"
            id="view_count"
            v-model="deliveryFounderConsultSearchDto.viewCount"
          >
            <option value selected>전체</option>
            <option v-for="yn in delYn" :key="yn" :value="yn">
              {{ yn | viewTransformer }}
            </option>
          </select>
        </div>
      </div>
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
            deliveryFounderConsultListCount
          }}</strong>
        </h5>
      </div>
      <b-button variant="primary" v-b-modal.add_founder_consult
        >상담 신청 추가</b-button
      >
    </div>
    <div v-if="!dataLoading" class="table-bordered table-responsive">
      <table
        class="table  table-hover table-sm  text-center"
        v-if="deliveryFounderConsultListCount"
      >
        <thead>
          <tr>
            <th scope="col">NO</th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultSearchDto.deliverySpaceNo,
              }"
            >
              SPACE ID
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultSearchDto.nanudaUserName,
              }"
            >
              USER NAME
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultSearchDto.phone,
              }"
            >
              USER PHONE
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultSearchDto.gender,
              }"
            >
              GENDER
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultSearchDto.companyNo,
              }"
            >
              COMPANY
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted:
                  deliveryFounderConsultSearchDto.companyDistrictNameKr,
              }"
            >
              DISTRICT
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultSearchDto.hopeTime,
              }"
            >
              AVAILABLE TIME
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultSearchDto.changUpExpYn,
              }"
            >
              EXPERIENCE
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultSearchDto.viewCount,
              }"
            >
              VIEW
            </th>
            <th scope="col">CREATED</th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultSearchDto.adminUserName,
              }"
            >
              ADMIN
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: deliveryFounderConsultSearchDto.status,
              }"
            >
              STATUS
            </th>
            <th scope="col">공간 공실 수</th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="founderConsult in deliveryFounderConsultList"
            :key="founderConsult.no"
          >
            <th scope="row">{{ founderConsult.no }}</th>
            <td>{{ founderConsult.deliverySpaceNo }}</td>
            <td>
              <div
                v-if="
                  founderConsult.nanudaUser && founderConsult.nanudaUser.name
                "
              >
                {{ founderConsult.nanudaUser.name }}
              </div>
            </td>
            <td class="text-nowrap">
              <div
                v-if="
                  founderConsult.nanudaUser && founderConsult.nanudaUser.phone
                "
              >
                {{ founderConsult.nanudaUser.phone | phoneTransformer }}
              </div>
            </td>
            <td>
              <div
                v-if="
                  founderConsult.nanudaUser &&
                    founderConsult.nanudaUser.genderInfo
                "
              >
                {{ founderConsult.nanudaUser.genderInfo.value }}
              </div>
            </td>
            <td>
              <div v-if="founderConsult.deliverySpaces">
                {{
                  founderConsult.deliverySpaces.companyDistrict.company.nameKr
                }}
              </div>
            </td>
            <td>
              <div v-if="founderConsult.deliverySpaces">
                {{ founderConsult.deliverySpaces.companyDistrict.nameKr }}
              </div>
            </td>
            <td>
              <div v-if="founderConsult.availableTime">
                {{ founderConsult.availableTime.value }}
              </div>
            </td>
            <td>
              <b-badge
                v-if="founderConsult.changUpExpYn"
                :variant="
                  founderConsult.changUpExpYn === 'Y' ? 'success' : 'danger'
                "
                >{{ founderConsult.changUpExpYn }}</b-badge
              >
              <div v-else>-</div>
            </td>
            <td>
              <div v-if="founderConsult.viewCount">
                <b-badge
                  :variant="
                    founderConsult.viewCount === 'Y' ? 'success' : 'danger'
                  "
                  >{{ founderConsult.viewCount }}</b-badge
                >
              </div>
            </td>
            <td>{{ founderConsult.createdAt | dateTransformer }}</td>
            <td>
              <div v-if="founderConsult.admin">
                {{ founderConsult.admin.name }}
              </div>
              <div v-else>-</div>
            </td>
            <td>
              <b-badge
                :variant="getStatusColor(founderConsult.codeManagement.key)"
                class="badge-pill p-2 mr-2"
                >{{ founderConsult.codeManagement.value }}</b-badge
              >
            </td>
            <td>
              <div
                v-if="
                  founderConsult.deliverySpaces &&
                    founderConsult.deliverySpaces.contracts
                "
              >
                {{
                  founderConsult.deliverySpaces.quantity -
                    founderConsult.deliverySpaces.contracts.length
                }}/{{ founderConsult.deliverySpaces.quantity }}
              </div>
            </td>
            <td>
              <router-link
                v-if="founderConsult.no"
                class="btn btn-sm btn-secondary text-nowrap"
                :to="{
                  name: 'DeliveryFounderConsultDetail',
                  params: {
                    id: founderConsult.no,
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
      v-if="deliveryFounderConsultListCount"
      pills
      :total-rows="deliveryFounderConsultListCount"
      :per-page="pagination.limit"
      @input="paginateSearch"
      class="mt-4 justify-content-center"
    ></b-pagination>
    <div class="half-circle-spinner mt-5" v-if="dataLoading">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
    <b-modal
      id="add_founder_consult"
      size="xl"
      title="상담 신청 추가"
      @hide="clearOutCreateDto()"
      @cancel="clearOutCreateDto()"
      @ok="create()"
    >
      <b-form-row>
        <b-col lg="4">
          <div class="mb-3">
            <label>사용자명</label>
            <div>
              <div
                class="border rounded bg-light light p-2 mb-2"
                v-if="nanudaUserData"
              >
                {{ nanudaUserData }}
              </div>
              <b-button
                variant="primary"
                size="md"
                v-b-modal.add_nanuda_user
                @click="findUser()"
                >사용자 추가하기</b-button
              >
            </div>
          </div>
          <div class="mb-3">
            <label>창업 유무</label>

            <b-form-radio
              v-model="deliveryFounderConsultCreateDto.changUpExpYn"
              v-for="yn in delYn"
              :key="yn"
              :value="yn"
              name="changup_exp_yn"
              :id="`changup_exp_yn_${yn}`"
              >{{ yn | enumTransformer }}</b-form-radio
            >
          </div>
          <div class="mb-3">
            <label>공간 소유 유무</label>
            <b-form-radio
              v-model="deliveryFounderConsultCreateDto.spaceOwnYn"
              v-for="yn in delYn"
              :key="yn"
              :value="yn"
              name="space_own_yn"
              :id="`space_own_yn_${yn}`"
              >{{ yn | enumTransformer }}</b-form-radio
            >
          </div>
          <div class="mb-3">
            <label>희망 업종</label>
            <template>
              <b-form-input
                list="food_category_list"
                id="hope_food_category"
                v-model="deliveryFounderConsultCreateDto.hopeFoodCategory"
              ></b-form-input>
              <datalist id="food_category_list">
                <option
                  v-for="category in foodCategorySelect"
                  :key="category.code"
                  :value="category.nameKr"
                  >{{ category.nameKr }}</option
                >
              </datalist>
            </template>
          </div>
          <div class="mb-3">
            <label>희망 시간 대</label>
            <select
              class="custom-select"
              v-model="deliveryFounderConsultCreateDto.hopeTime"
            >
              <option value selected>전체</option>
              <option
                v-for="time in availableTimesSelect"
                :key="time.no"
                :value="time.key"
                >{{ time.value }}</option
              >
            </select>
          </div>
        </b-col>
        <b-col lg="4">
          <div class="mb-3">
            <label>업체명</label>
            <select
              class="custom-select"
              v-model="deliveryFounderConsultCreateDto.companyNo"
              @change="changeCompany($event)"
            >
              <option
                v-for="company in companySelect"
                :key="company.no"
                :value="company.no"
                >{{ company.nameKr }}</option
              >
            </select>
          </div>
          <div class="mb-3">
            <label>지점명</label>
            <select
              class="custom-select"
              v-model="deliveryFounderConsultCreateDto.districtNo"
              @change="changeDistrict($event)"
            >
              <option value selected disabled>업체를 선택해주세요</option>
              <option
                v-for="district in districtSelect.items"
                :key="district.no"
                :value="district.no"
                >{{ district.nameKr }}</option
              >
            </select>
          </div>
          <div class="mb-3">
            <label>타입명</label>
            <select
              class="custom-select"
              v-model="deliveryFounderConsultCreateDto.deliverySpaceNo"
            >
              <option value selected disabled>지점을 선택해주세요</option>
              <option
                v-for="space in deliverySpaceSelect.items"
                :key="space.no"
                :value="space.no"
                >{{ space.typeName }}</option
              >
            </select>
          </div>
        </b-col>
        <b-col lg="4">
          <div class="mb-3">
            <label>담당자</label>
            <select
              class="custom-select"
              v-model="deliveryFounderConsultCreateDto.spaceConsultManager"
            >
              <option value selected disabled>담장자를 선택해주세요</option>
              <option
                v-for="admin in adminList.items"
                :key="admin.no"
                :value="admin.no"
                >{{ admin.name }}</option
              >
            </select>
          </div>
          <div class="mb-3">
            <label>신청 상태</label>
            <select
              class="custom-select"
              id="status"
              v-model="deliveryFounderConsultCreateDto.status"
            >
              <option value selected>전체</option>
              <option
                v-for="status in statusSelect"
                :key="status.no"
                :value="status.key"
                >{{ status.value }}</option
              >
            </select>
          </div>
          <div class="mb-3">
            <label>메모</label>
            <b-form-textarea
              v-model="deliveryFounderConsultCreateDto.spaceConsultEtc"
              style="height:200px"
            ></b-form-textarea>
          </div>
        </b-col>
      </b-form-row>
    </b-modal>
    <NanudaUserList />
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import { BaseUser } from '@/services/shared/auth';
import {
  FOUNDER_CONSULT,
  CONST_FOUNDER_CONSULT,
  GENDER,
  CONST_GENDER,
} from '../../../services/shared';
import { CodeManagementDto } from '../../../services/init/dto';

import AdminService from '../../../services/admin.service';
import CompanyService from '../../../services/company.service';
import CompanyUserService from '../../../services/company-user.service';
import CompanyDistrictService from '../../../services/company-district.service';
import CodeManagementService from '../../../services/code-management.service';
import DeliveryFounderConsultService from '../../../services/delivery-founder-consult.service';
import DeliverySpaceService from '@/services/delivery-space.service';
import FoodCategoryService from '../../../services/food-category.service';
import SpaceTypeService from '../../../services/space-type.service';

import NanudaUserList from './NanudaUserList.vue';

import toast from '../../../../resources/assets/js/services/toast.js';

import { getStatusColor } from '../../../core/utils/status-color.util';

import {
  AdminDto,
  CompanyDto,
  CompanyUserDto,
  CompanyDistrictDto,
  DeliveryFounderConsultDto,
  DeliveryFounderConsultListDto,
  DeliverySpaceDto,
  FoodCategoryDto,
  NanudaUserDto,
} from '../../../dto';
import {
  Pagination,
  CONST_OBJECT_BY_VALUE,
  OrderByValue,
  YN,
  CONST_YN,
} from '../../../common';

@Component({
  name: 'DeliveryFounderConsultList',
  components: {
    NanudaUserList,
  },
})
export default class DeliveryFounderConsult extends BaseComponent {
  private deliveryFounderConsultSearchDto = new DeliveryFounderConsultListDto();
  private deliveryFounderConsultDto = new DeliveryFounderConsultDto();
  private deliveryFounderConsultList: DeliveryFounderConsultDto[] = [];
  private deliveryFounderConsultListCount = 0;
  private deliveryFounderConsultCreateDto = new DeliveryFounderConsultDto();

  private statusSelect: CodeManagementDto[] = [];
  private statusB2BSelect: CodeManagementDto[] = [];
  private availableTimesSelect: CodeManagementDto[] = [];
  private companySelect: CompanyDto[] = [];
  private totalPage = 0;
  private delYn: YN[] = [...CONST_YN];
  private genderSelect: GENDER[] = [...CONST_GENDER];

  private pagination = new Pagination();
  private dataLoading = false;

  private adminList: AdminDto[] = [];
  private managerSelect: CompanyUserDto[] = [];
  private companyUserDto = new CompanyUserDto(BaseUser);

  private districtSelect: CompanyDistrictDto[] = [];
  private companyDistrictDto = new CompanyDistrictDto();

  private foodCategorySelect: FoodCategoryDto[] = [];

  private deliverySpaceSelect: DeliverySpaceDto[] = [];
  private deliverySpaceDto = new DeliverySpaceDto();

  private userData = new NanudaUserDto(BaseUser);
  private nanudaUserData = '';

  // get status color
  getStatusColor(status) {
    return getStatusColor(status);
  }

  getAdmin() {
    AdminService.findForSelect().subscribe(res => {
      if (res) {
        this.adminList = res.data;
      }
    });
  }

  // 상태값
  getFounderConsultCodes() {
    CodeManagementService.findCodesFounderConsultB2B().subscribe(res => {
      this.statusB2BSelect = res.data;
    });

    CodeManagementService.findCodesFounderConsult().subscribe(res => {
      this.statusSelect = res.data;
    });
  }

  changeCompany(event) {
    const companyNo = event.target.value;
    // this.getCompanyUser(companyNo);
    this.getCompanyDistrict(companyNo);
  }

  changeDistrict(event) {
    const districtNo = event.target.value;
    this.getDeliverSpace(districtNo);
  }

  // 업체 사용자
  getCompanyUser(companyNo) {
    this.companyUserDto.companyNo = companyNo;
    CompanyUserService.findForSelect(this.companyUserDto).subscribe(res => {
      if (res) {
        this.managerSelect = res.data;
      }
    });
  }

  // 업체 지점
  getCompanyDistrict(companyNo) {
    this.companyDistrictDto.companyNo = companyNo;
    CompanyDistrictService.findForSelect(this.companyDistrictDto).subscribe(
      res => {
        if (res) {
          this.districtSelect = res.data;
        }
      },
    );
  }

  // 타입
  getDeliverSpace(districtNo) {
    this.deliverySpaceDto.companyDistrictNo = districtNo;
    DeliverySpaceService.findForSelect(this.deliverySpaceDto).subscribe(res => {
      if (res) {
        this.deliverySpaceSelect = res.data;
      }
    });
  }

  // 희망시간대
  getAvailableTimes() {
    CodeManagementService.findAvailableTimes().subscribe(res => {
      this.availableTimesSelect = res.data;
    });
  }

  // 음식 업종
  getFoodCategories() {
    FoodCategoryService.findForSelect().subscribe(res => {
      this.foodCategorySelect = res.data;
    });
  }

  // TODO: Create autocomplete box
  getCompanies() {
    CompanyService.findForSelect().subscribe(res => {
      this.companySelect = res.data;
    });
  }

  paginateSearch() {
    this.search(true);
  }

  // 검색하기
  search(isPagination?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    }
    DeliveryFounderConsultService.findAll(
      this.deliveryFounderConsultSearchDto,
      this.pagination,
    ).subscribe(res => {
      this.dataLoading = false;
      this.deliveryFounderConsultList = res.data.items;
      this.deliveryFounderConsultListCount = res.data.totalCount;
    });
    window.scrollTo(0, 0);
  }

  // 초기화
  clearOut() {
    this.pagination.page = 1;
    this.deliveryFounderConsultSearchDto = new DeliveryFounderConsultListDto();
    this.search();
  }

  create() {
    DeliveryFounderConsultService.create(
      this.deliveryFounderConsultCreateDto,
    ).subscribe(res => {
      if (res) {
        this.search();
        toast.success('추가완료');
      }
    });
  }
  clearOutCreateDto() {
    this.deliveryFounderConsultCreateDto = new DeliveryFounderConsultDto();
    this.userData = new NanudaUserDto(BaseUser);
    this.nanudaUserData = '';
  }

  // 사용자 추가
  findUser() {
    this.$root.$emit('find_nanuda_user');
  }

  created() {
    this.pagination.page = 1;
    this.getAvailableTimes();
    this.getCompanies();
    this.getFounderConsultCodes();
    this.getFoodCategories();
    this.getAdmin();
    this.search();
  }

  mounted() {
    this.$root.$on('select_nanuda_user', user => {
      if (user.no) {
        this.userData = user;
        this.nanudaUserData = `${this.userData.name} - ${this.userData.phone}`;
        this.deliveryFounderConsultCreateDto.nanudaUserNo = user.no;
      }
    });
  }
}
</script>
