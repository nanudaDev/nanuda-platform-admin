<template>
  <section>
    <SectionTitle title="배달형 상담 신청" divider />
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <div class="form-row">
        <b-col cols="6" md="3" lg="2">
          <b-form-group label="공간 ID">
            <b-form-input
              type="text"
              class="form-control"
              id="space_id"
              v-model="deliveryFounderConsultSearchDto.deliverySpaceNo"
            />
          </b-form-group>
        </b-col>
        <b-col cols="6" md="3" lg="2">
          <b-form-group label="사용자명">
            <b-form-input
              type="text"
              class="form-control"
              id="user_name"
              v-model="deliveryFounderConsultSearchDto.nanudaUserName"
            />
          </b-form-group>
        </b-col>
        <b-col cols="6" md="3" lg="2">
          <b-form-group label="휴대폰 번호">
            <b-form-input
              type="text"
              class="form-control"
              id="user_phone"
              v-model="deliveryFounderConsultSearchDto.phone"
            />
          </b-form-group>
        </b-col>
        <b-col cols="6" md="3" lg="1">
          <b-form-group label="성별">
            <b-form-select
              class="custom-select"
              id="user_gender"
              v-model="deliveryFounderConsultSearchDto.gender"
            >
              <b-form-select-option value selected>전체</b-form-select-option>
              <b-form-select-option
                v-for="gender in genderSelect"
                :key="gender"
                :value="gender"
                >{{ gender | enumTransformer }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="3" lg="1">
          <b-form-group label="창업 경험">
            <b-form-select
              class="custom-select"
              id="changup_exp_yn"
              v-model="deliveryFounderConsultSearchDto.changUpExpYn"
            >
              <b-form-select-option value selected>전체</b-form-select-option>
              <b-form-select-option v-for="yn in delYn" :key="yn" :value="yn">{{
                yn | enumTransformer
              }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="3" lg="2">
          <b-form-group label="시작 날짜">
            <b-form-datepicker
              id="started"
              v-model="deliveryFounderConsultSearchDto.started"
            ></b-form-datepicker>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="3" lg="2">
          <b-form-group label="종료 날짜">
            <b-form-datepicker
              id="ended"
              v-model="deliveryFounderConsultSearchDto.ended"
              :disabled="deliveryFounderConsultSearchDto.started ? false : true"
            ></b-form-datepicker>
          </b-form-group>
        </b-col>
      </div>
      <b-form-row>
        <b-col cols="6" md="3" lg="2">
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
        </b-col>
        <b-col cols="6" md="3" lg="2">
          <b-form-group label="업체 지점">
            <b-form-input
              v-model="deliveryFounderConsultSearchDto.companyDistrictNameKr"
            />
          </b-form-group>
        </b-col>
        <b-col cols="6" md="3" lg="2">
          <b-form-group label="관리자">
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
                  >{{ admin.name }}</option
                >
              </datalist>
            </template>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="3" lg="1">
          <b-form-group label="희망 시간대">
            <b-form-select
              class="custom-select"
              id="hope_time"
              v-model="deliveryFounderConsultSearchDto.hopeTime"
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
        <b-col cols="6" md="3" lg="1">
          <b-form-group label="열람 유무">
            <b-form-select
              class="custom-select"
              id="view_count"
              v-model="deliveryFounderConsultSearchDto.viewCount"
            >
              <b-form-select-option value selected>전체</b-form-select-option>
              <b-form-select-option v-for="yn in delYn" :key="yn" :value="yn">{{
                yn | stringViewTransformer
              }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="3" lg="2">
          <b-form-group label="신청 상태">
            <b-form-select
              class="custom-select"
              id="status"
              v-model="deliveryFounderConsultSearchDto.status"
            >
              <b-form-select-option value selected>전체</b-form-select-option>
              <b-form-select-option
                v-for="status in statusSelect"
                :key="status.no"
                :value="status.key"
                >{{ status.value }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="3" lg="2">
          <b-form-group label="업체 상태">
            <b-form-select
              class="custom-select"
              id="status"
              v-model="deliveryFounderConsultSearchDto.companyDecisionStatus"
            >
              <b-form-select-option value selected>전체</b-form-select-option>
              <b-form-select-option
                v-for="status in statusB2BSelect"
                :key="status.no"
                :value="status.key"
                >{{ status.value }}</b-form-select-option
              >
            </b-form-select>
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
    <template v-if="!dataLoading">
      <div class="bg-white table-responsive">
        <table
          class="table table-hover table-sm text-center table-nowrap"
          v-if="deliveryFounderConsultTotalCount"
        >
          <colgroup>
            <col width="60" />
            <col width="60" />
            <col width="100" />
            <col width="100" />
            <col width="60" />
            <col width="100" />
            <col width="100" />
            <col width="60" />
            <col width="100" />
            <col width="60" />
            <col width="60" />
            <col width="300" />
            <col width="80" />
            <col width="100" />
            <col width="100" />
            <col width="100" />
            <col width="150" />
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
                관리자
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: deliveryFounderConsultSearchDto.status,
                }"
              >
                신청 상태
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted:
                    deliveryFounderConsultSearchDto.companyDecisionStatus,
                }"
              >
                업체 상태
              </th>
              <th scope="col">공간 공실 수</th>
              <th scope="col">신청일</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="deliveryFounderConsult in deliveryFounderConsultListDto"
              :key="deliveryFounderConsult.no"
              @click.stop="
                $router.push(
                  `/delivery-founder-consult/${deliveryFounderConsult.no}`,
                )
              "
              style="cursor:pointer"
            >
              <th scope="row">{{ deliveryFounderConsult.no }}</th>
              <td @click.stop>
                <router-link
                  :to="{
                    name: 'DeliverySpaceDetail',
                    params: {
                      id: deliveryFounderConsult.deliverySpaceNo,
                    },
                  }"
                  class="text-primary"
                  >{{ deliveryFounderConsult.deliverySpaceNo }}</router-link
                >
              </td>
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
                <template
                  v-if="
                    deliveryFounderConsult.deliverySpace &&
                      deliveryFounderConsult.deliverySpace.companyDistrict
                  "
                >
                  {{
                    deliveryFounderConsult.deliverySpace.companyDistrict.company
                      .nameKr
                  }}
                </template>
              </td>
              <td>
                <template
                  v-if="
                    deliveryFounderConsult.deliverySpace &&
                      deliveryFounderConsult.deliverySpace.companyDistrict
                  "
                >
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
              </td>
              <td>
                <b-badge
                  :variant="getStatusColor(deliveryFounderConsult.status)"
                  class="badge-pill p-2 mr-2"
                  >{{ deliveryFounderConsult.codeManagement.value }}</b-badge
                >
              </td>
              <td>
                <b-badge
                  :variant="
                    getStatusColor(deliveryFounderConsult.companyDecisionStatus)
                  "
                  class="badge-pill p-2 mr-2"
                  >{{
                    deliveryFounderConsult.companyDecisionStatusCode.value
                  }}</b-badge
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
              <!-- <td>
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
              </td> -->
            </tr>
          </tbody>
        </table>
        <div v-else class="empty-data border">검색결과가 없습니다.</div>
      </div>

      <b-pagination
        v-model="pagination.page"
        v-if="deliveryFounderConsultTotalCount"
        pills
        :total-rows="deliveryFounderConsultTotalCount"
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
                v-for="district in districtSelect"
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
                v-for="space in deliverySpaceSelect"
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
    <DeliveryFounderConsultNanudaUserList />
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

import DeliveryFounderConsultNanudaUserList from './DeliveryFounderConsultNanudaUserList.vue';

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
import {
  ClearOutQueryParamMapper,
  ReverseQueryParamMapper,
  RouterQueryParamMapper,
} from '@/core';

@Component({
  name: 'DeliveryFounderConsultList',
  components: {
    DeliveryFounderConsultNanudaUserList,
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
    this.getDeliverySpace(districtNo);
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
    CompanyDistrictService.findForSelectOption(
      this.companyDistrictDto,
    ).subscribe(res => {
      if (res) {
        this.districtSelect = res.data;
      }
    });
  }

  // 타입
  getDeliverySpace(districtNo) {
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
    this.findAll(true);
  }

  search() {
    this.findAll(true, true);
  }

  // 검색하기
  findAll(isPagination?: boolean, isSearch?: boolean) {
    this.dataLoading = true;
    this.pagination.limit = this.newLimit;
    if (!isPagination) {
      this.pagination.page = 1;
    } else {
      if (isSearch) this.pagination.page = 1;
      RouterQueryParamMapper(
        this.deliveryFounderConsultSearchDto,
        this.pagination,
      );
    }
    DeliveryFounderConsultService.findAll(
      this.deliveryFounderConsultSearchDto,
      this.pagination,
    ).subscribe(res => {
      if (res) {
        this.dataLoading = false;
        this.deliveryFounderConsultListDto = res.data.items;
        this.deliveryFounderConsultTotalCount = res.data.totalCount;
      }
    });
  }

  // 초기화
  clearOut() {
    if (location.search) {
      ClearOutQueryParamMapper();
    } else {
      this.deliveryFounderConsultSearchDto = new DeliveryFounderConsultListDto();
      this.findAll();
    }
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
    this.newLimit = PaginationCount.TWENTY;
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.deliveryFounderConsultSearchDto = query;
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
    this.getAvailableTimes();
    this.getCompanies();
    this.getFounderConsultCodes();
    this.getFoodCategories();
    this.getAdmin();
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
