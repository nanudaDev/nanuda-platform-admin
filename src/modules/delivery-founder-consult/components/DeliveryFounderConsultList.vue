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
            <option v-for="yn in delYn" :key="yn" :value="yn">{{
              yn | enumTransformer
            }}</option>
          </select>
        </div>
        <div class="col-6 col-lg-2 mb-3">
          <b-form-group label="업체명">
            <b-form-input
              list="company_lsit"
              v-model="deliveryFounderConsultSearchDto.companyNameKr"
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
        <!-- <div class="col-6 col-lg-2 mb-3">
          <label for="admin_user">관리자명</label>
          <template>
            <b-form-input
              list="admin_list"
              id="admin_user"
              v-model="deliveryFounderConsultSearchDto.adminUserName"
            ></b-form-input>
            <datalist id="admin_list">
              <option
                v-for="admin in adminList.items"
                :key="admin.no"
                :value="admin.name"
              >{{ admin.name }}</option>
            </datalist>
          </template>
        </div>-->

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
            v-model="deliveryFounderConsultSearchDto.status"
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
            <option v-for="yn in delYn" :key="yn" :value="yn">{{
              yn | viewTransformer
            }}</option>
          </select>
        </div>
        <div class="col-6 col-lg-3 mb-3">
          <div>
            <label for="ended">시작 날짜</label>
            <b-form-datepicker
              id="started"
              v-model="deliveryFounderConsultSearchDto.started"
            ></b-form-datepicker>
          </div>
        </div>
        <div class="col-6 col-md-3 mb-3">
          <div>
            <label for="ended">종료 날짜</label>
            <b-form-datepicker
              id="ended"
              v-model="deliveryFounderConsultSearchDto.ended"
              :disabled="deliveryFounderConsultSearchDto.started ? false : true"
            ></b-form-datepicker>
          </div>
        </div>
      </div>
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
          <strong class="text-primary">
            {{ deliveryFounderConsultTotalCount }}
          </strong>
        </h5>
        <b-form-select
          v-model="newLimit"
          size="sm"
          class="select-limit ml-3"
          @change="search()"
          v-if="deliveryFounderConsultTotalCount"
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
          :data="deliveryFounderConsultListDto"
          :fields="fields"
          :stringifyLongNum="true"
          worksheet="배달형 상담 리스트"
          :name="`deliverey_founder_consult_${newDate}.xls`"
          v-if="deliveryFounderConsultTotalCount"
        >
          <b-icon icon="file-earmark-arrow-down"></b-icon>
          엑셀 다운로드
        </download-excel>
        <b-button variant="primary" v-b-modal.add_founder_consult
          >상담 신청 추가</b-button
        >
      </div>
    </div>
    <div v-if="!dataLoading">
      <div
        class="table-responsive border"
        v-if="deliveryFounderConsultTotalCount"
      >
        <table class="table table-hover table-sm text-center table-fixed">
          <colgroup>
            <col width="60" />
            <col width="60" />
            <col width="100" />
            <col width="100" />
            <col width="60" />
            <col width="100" />
            <col width="100" />
            <col width="100" />
            <col width="100" />
            <col width="60" />
            <col width="60" />
            <col width="300" />
            <col width="80" />
            <col width="80" />
            <col width="100" />
            <col width="150" />
            <col width="100" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: deliveryFounderConsultSearchDto.deliverySpaceNo,
                }"
              >
                공간 ID
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: deliveryFounderConsultSearchDto.nanudaUserName,
                }"
              >
                사용자명
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: deliveryFounderConsultSearchDto.phone,
                }"
              >
                연락처
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: deliveryFounderConsultSearchDto.gender,
                }"
              >
                성별
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: deliveryFounderConsultSearchDto.companyNameKr,
                }"
              >
                업체명
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted:
                    deliveryFounderConsultSearchDto.companyDistrictNameKr,
                }"
              >
                지점명
              </th>
              <th>
                평수
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: deliveryFounderConsultSearchDto.hopeTime,
                }"
              >
                희망 상담 시간대
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: deliveryFounderConsultSearchDto.changUpExpYn,
                }"
              >
                창업 경험
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: deliveryFounderConsultSearchDto.viewCount,
                }"
              >
                열람 유무
              </th>
              <th scope="col">
                비고
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: deliveryFounderConsultSearchDto.adminUserName,
                }"
              >
                관리자명
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: deliveryFounderConsultSearchDto.status,
                }"
              >
                신청 상태
              </th>
              <th scope="col">공간 공실 수</th>
              <th scope="col">생성날짜</th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="deliveryFounderConsult in deliveryFounderConsultListDto"
              :key="deliveryFounderConsult.no"
            >
              <th scope="row">{{ deliveryFounderConsult.no }}</th>
              <td>{{ deliveryFounderConsult.deliverySpaceNo }}</td>
              <td>
                <template
                  v-if="
                    deliveryFounderConsult.nanudaUser &&
                      deliveryFounderConsult.nanudaUser.name
                  "
                >
                  {{ deliveryFounderConsult.nanudaUser.name }}
                </template>
              </td>
              <td class="text-nowrap">
                <template
                  v-if="
                    deliveryFounderConsult.nanudaUser &&
                      deliveryFounderConsult.nanudaUser.phone
                  "
                >
                  {{
                    deliveryFounderConsult.nanudaUser.phone | phoneTransformer
                  }}
                </template>
              </td>
              <td>
                <template
                  v-if="
                    deliveryFounderConsult.nanudaUser &&
                      deliveryFounderConsult.nanudaUser.genderInfo
                  "
                >
                  {{ deliveryFounderConsult.nanudaUser.genderInfo.value }}
                </template>
              </td>
              <td>
                <template v-if="deliveryFounderConsult.deliverySpace">
                  {{
                    deliveryFounderConsult.deliverySpace.companyDistrict.company
                      .nameKr
                  }}
                </template>
              </td>
              <td>
                <template v-if="deliveryFounderConsult.deliverySpace">
                  {{
                    deliveryFounderConsult.deliverySpace.companyDistrict.nameKr
                  }}
                </template>
              </td>
              <td>
                <template
                  v-if="
                    deliveryFounderConsult.deliverySpace &&
                      deliveryFounderConsult.deliverySpace.size
                  "
                >
                  {{ deliveryFounderConsult.deliverySpace.size }}
                </template>
              </td>
              <td>
                <template v-if="deliveryFounderConsult.availableTime">
                  {{ deliveryFounderConsult.availableTime.value }}
                </template>
              </td>
              <td>
                <template v-if="deliveryFounderConsult.changUpExpYn">
                  <b-badge
                    :variant="
                      deliveryFounderConsult.changUpExpYn === 'Y'
                        ? 'success'
                        : 'danger'
                    "
                    >{{ deliveryFounderConsult.changUpExpYn }}</b-badge
                  >
                </template>
                <template v-else>-</template>
              </td>
              <td>
                <template v-if="deliveryFounderConsult.viewCount">
                  <b-badge
                    :variant="
                      deliveryFounderConsult.viewCount === 'Y'
                        ? 'success'
                        : 'danger'
                    "
                    >{{ deliveryFounderConsult.viewCount }}</b-badge
                  >
                </template>
              </td>
              <td>
                <template v-if="deliveryFounderConsult.spaceConsultEtc">
                  <pre> {{ deliveryFounderConsult.spaceConsultEtc }}</pre>
                </template>
              </td>
              <td>
                <template v-if="deliveryFounderConsult.admin">
                  {{ deliveryFounderConsult.admin.name }}
                </template>
                <template v-else>-</template>
              </td>
              <td>
                <b-badge
                  :variant="getStatusColor(deliveryFounderConsult.status)"
                  class="badge-pill p-2 mr-2"
                  >{{ deliveryFounderConsult.codeManagement.value }}</b-badge
                >
              </td>
              <td>
                <template
                  v-if="
                    deliveryFounderConsult.deliverySpace &&
                      deliveryFounderConsult.deliverySpace.contracts
                  "
                >
                  {{
                    deliveryFounderConsult.deliverySpace.quantity -
                      deliveryFounderConsult.deliverySpace.contracts.length
                  }}/{{ deliveryFounderConsult.deliverySpace.quantity }}
                </template>
              </td>
              <td>{{ deliveryFounderConsult.createdAt | dateTransformer }}</td>
              <td>
                <router-link
                  v-if="deliveryFounderConsult.no"
                  class="btn btn-sm btn-secondary text-nowrap"
                  :to="{
                    name: 'DeliveryFounderConsultDetail',
                    params: {
                      id: deliveryFounderConsult.no,
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
        v-if="deliveryFounderConsultTotalCount"
        pills
        :total-rows="deliveryFounderConsultTotalCount"
        :per-page="pagination.limit"
        @input="paginateSearch"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </div>
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
  PaginationCount,
  CONST_PAGINATION_COUNT,
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
import { ReverseQueryParamMapper } from '@/core';

@Component({
  name: 'DeliveryFounderConsultList',
  components: {
    NanudaUserList,
  },
})
export default class DeliveryFounderConsult extends BaseComponent {
  private deliveryFounderConsultSearchDto = new DeliveryFounderConsultListDto();
  private deliveryFounderConsultDto = new DeliveryFounderConsultDto();
  private deliveryFounderConsultListDto: DeliveryFounderConsultDto[] = [];
  private deliveryFounderConsultTotalCount = null;
  private deliveryFounderConsultCreateDto = new DeliveryFounderConsultDto();
  private newLimit = null;
  private paginationCount: PaginationCount[] = [...CONST_PAGINATION_COUNT];
  private newDate = new Date();
  // excel options
  private fields = {
    이름: 'nanudaUser.name',
    연락처: 'nanudaUser.phone',
    비회원명: 'nonUserName',
    비회원연락처: 'nonUserPhone',
    성별: 'nanudaUser.genderInfo.value',
    업체명: 'deliverySpace.companyDistrict.company.nameKr',
    지점명: 'deliverySpace.companyDistrict.nameKr',
    평수: 'deliverySpace.size',
    상담시간: 'availableTime.value',
    신청일: 'createdAt',
    창업경험: 'changUpExpYn',
    신청상태: 'codeManagement.value',
    비고: 'spaceConsultEtc',
  };
  private json_meta = [
    [
      {
        key: 'charset',
        value: 'utf-8',
      },
    ],
  ];

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
  getStatusColor(status: FOUNDER_CONSULT) {
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
    this.pagination.limit = this.newLimit;
    DeliveryFounderConsultService.findAll(
      this.deliveryFounderConsultSearchDto,
      this.pagination,
    ).subscribe(res => {
      this.dataLoading = false;
      this.deliveryFounderConsultListDto = res.data.items;
      this.deliveryFounderConsultTotalCount = res.data.totalCount;
      this.$router.push({
        query: Object.assign(this.deliveryFounderConsultSearchDto),
      });
    });
    window.scrollTo(0, 0);
  }

  // 초기화
  clearOut() {
    this.pagination = new Pagination();
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
    this.newLimit = 50;
    this.pagination.limit = this.newLimit;
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.deliveryFounderConsultSearchDto = query;
    }
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
