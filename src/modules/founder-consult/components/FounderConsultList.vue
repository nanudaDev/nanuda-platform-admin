<template>
  <section>
    <div class="title pb-2 mb-2">
      <h3>식당형 상담 신청</h3>
    </div>
    <div class="divider"></div>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <div class="form-row">
        <div class="col-6 col-lg-2 mb-3">
          <label for="user_name">사용자명</label>
          <input
            type="text"
            class="form-control"
            id="user_name"
            v-model="founderConsultSearchDto.nanudaUserName"
          />
        </div>
        <div class="col-6 col-lg-2 mb-3">
          <label for="user_phone">휴대폰 번호</label>
          <input
            type="text"
            class="form-control"
            id="user_phone"
            v-model="founderConsultSearchDto.phone"
          />
        </div>
        <div class="col-6 col-lg-1 mb-3">
          <label for="user_gender">성별</label>
          <select
            class="custom-select"
            id="user_gender"
            v-model="founderConsultSearchDto.gender"
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
            v-model="founderConsultSearchDto.changUpExpYn"
          >
            <option value selected>전체</option>
            <option v-for="yn in delYn" :key="yn" :value="yn">
              {{ yn | enumTransformer }}
            </option>
          </select>
        </div>
        <div class="col-6 col-lg-3 mb-3">
          <div>
            <label for="ended">시작 날짜</label>
            <b-form-datepicker
              id="started"
              v-model="founderConsultSearchDto.started"
            ></b-form-datepicker>
          </div>
        </div>
        <div class="col-6 col-md-3 mb-3">
          <div>
            <label for="ended">종료 날짜</label>
            <b-form-datepicker
              id="ended"
              v-model="founderConsultSearchDto.ended"
              :disabled="founderConsultSearchDto.started ? false : true"
            ></b-form-datepicker>
          </div>
        </div>
      </div>
      <!-- second row -->
      <div class="form-row">
        <div class="col-6 col-lg-1 mb-3">
          <label for="space_id">공간 ID</label>
          <input
            type="text"
            class="form-control"
            id="space_id"
            v-model="founderConsultSearchDto.spaceNo"
          />
        </div>
        <div class="col-lg-3 mb-2">
          <label for="space_address">공간 주소</label>
          <input
            type="text"
            class="form-control"
            id="space_address"
            v-model="founderConsultSearchDto.address"
          />
        </div>
        <div class="col-6 col-lg-2 mb-3">
          <label for="admin_user">관리자명</label>
          <template>
            <b-form-input
              list="admin_list"
              id="admin_user"
              v-model="founderConsultSearchDto.adminName"
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
            v-model="founderConsultSearchDto.hopeTime"
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
            v-model="founderConsultSearchDto.status"
          >
            <option value selected>전체</option>
            <option
              v-for="status in founderConsultStatusSelect"
              :key="status.no"
              :value="status.key"
              >{{ status.value }}</option
            >
          </select>
        </div>
        <!-- <div class="col-6 col-lg-2 mb-3">
          <label for="view_count">열람 유무</label>
          <select
            class="custom-select"
            id="view_count"
            v-model="founderConsultSearchDto.viewCount"
          >
            <option value selected>전체</option>
            <option v-for="yn in delYn" :key="yn" :value="yn">
              {{ yn | viewTransformer }}
            </option>
          </select>
        </div> -->
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
          <strong class="text-primary">{{ founderConsultTotalCount }}</strong>
        </h5>
        <b-form-select
          v-model="newLimit"
          size="sm"
          class="select-limit ml-3"
          @change="search()"
          v-if="founderConsultTotalCount"
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
          :data="founderConsultList"
          :fields="fields"
          :stringifyLongNum="true"
          worksheet="식당형 리스트"
          :name="`founder_consult_${newDate}.xls`"
        >
          <b-icon icon="file-earmark-arrow-down"></b-icon>
          엑셀 다운로드
        </download-excel>
      </div>
    </div>
    <div v-if="!dataLoading">
      <div class="table-responsive border" v-if="founderConsultTotalCount">
        <table class="table table-hover table-sm text-center table-fixed">
          <colgroup>
            <col width="60" />
            <col width="60" />
            <col width="100" />
            <col width="100" />
            <col width="60" />
            <col width="300" />
            <col width="100" />
            <col width="100" />
            <col width="300" />
            <col width="100" />
            <col width="100" />
            <col width="150" />
            <col width="100" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th
                scope="col"
                v-bind:class="{ highlighted: founderConsultSearchDto.spaceNo }"
              >
                공간 ID
              </th>
              <!-- <th
              scope="col"
              v-bind:class="{ highlighted: founderConsultSearchDto.spaceNo }"
            >
              SPACE TYPE
            </th>-->
              <th
                scope="col"
                v-bind:class="{
                  highlighted: founderConsultSearchDto.nanudaUserName,
                }"
              >
                사용자명
              </th>
              <th
                scope="col"
                v-bind:class="{ highlighted: founderConsultSearchDto.phone }"
              >
                연락처
              </th>
              <th
                scope="col"
                v-bind:class="{ highlighted: founderConsultSearchDto.gender }"
              >
                성별
              </th>
              <th
                scope="col"
                v-bind:class="{ highlighted: founderConsultSearchDto.address }"
              >
                공간 주소
              </th>
              <th
                scope="col"
                v-bind:class="{ highlighted: founderConsultSearchDto.hopeTime }"
              >
                희망 상담 시간대
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: founderConsultSearchDto.changUpExpYn,
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
                  highlighted: founderConsultSearchDto.adminUserName,
                }"
              >
                관리자
              </th>
              <th
                scope="col"
                v-bind:class="{ highlighted: founderConsultSearchDto.status }"
              >
                신청 상태
              </th>
              <th scope="col">생성날짜</th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="founderConsult in founderConsultList"
              :key="founderConsult.no"
            >
              <th scope="row">{{ founderConsult.no }}</th>
              <td>{{ founderConsult.spaceNo }}</td>
              <!-- <td>{{ founderConsult.space.spaceType.displayName }}</td> -->
              <td>{{ founderConsult.nanudaUser.name }}</td>
              <td class="text-nowrap">
                {{ founderConsult.nanudaUser.phone | phoneTransformer }}
              </td>
              <td>
                <template v-if="founderConsult.nanudaUser.genderInfo">
                  {{ founderConsult.nanudaUser.genderInfo.value }}
                </template>
              </td>
              <td class="text-left">
                <template v-if="founderConsult.space">
                  {{ founderConsult.space.address }}
                  {{ founderConsult.space.detailAddress }}
                </template>
              </td>
              <td>
                <template v-if="founderConsult.availableTime">
                  {{ founderConsult.availableTime.value }}
                </template>
              </td>
              <td>
                <template v-if="founderConsult.changUpExpYn">
                  <b-badge
                    :variant="
                      founderConsult.changUpExpYn === 'Y' ? 'success' : 'danger'
                    "
                    >{{ founderConsult.changUpExpYn }}</b-badge
                  >
                </template>
                <template v-else>-</template>
              </td>
              <!-- <td>
              <div v-if="founderConsult.viewCount">
                <b-badge
                  :variant="
                    founderConsult.viewCount === 'Y' ? 'success' : 'danger'
                  "
                  >{{ founderConsult.viewCount }}</b-badge
                >
              </div>
            </td> -->
              <td>
                <template v-if="founderConsult.spaceConsultEtc">
                  <pre>{{ founderConsult.spaceConsultEtc }}</pre>
                </template>
              </td>
              <td>
                <template v-if="founderConsult.admin">
                  {{ founderConsult.admin.name }}
                </template>
                <template v-else>-</template>
              </td>
              <td>
                <b-badge
                  :variant="getStatusColor(founderConsult.status)"
                  class="badge-pill p-2 mr-2"
                  >{{ founderConsult.codeManagement.value }}</b-badge
                >
              </td>
              <td>{{ founderConsult.createdAt | dateTransformer }}</td>
              <td>
                <router-link
                  v-if="founderConsult.space"
                  class="btn btn-sm btn-secondary text-nowrap"
                  :to="{
                    name: 'FounderConsultDetail',
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
      </div>
      <div v-else class="empty-data border">검색결과가 없습니다.</div>
      <b-pagination
        v-model="pagination.page"
        v-if="founderConsultTotalCount"
        pills
        :total-rows="founderConsultTotalCount"
        :per-page="pagination.limit"
        @input="paginateSearch"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </div>
    <div class="half-circle-spinner mt-5" v-if="dataLoading">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import {
  FOUNDER_CONSULT,
  CONST_FOUNDER_CONSULT,
  GENDER,
  CONST_GENDER,
  SPACE_TYPE,
  PaginationCount,
  CONST_PAGINATION_COUNT,
} from '../../../services/shared';
import { CodeManagementDto } from '../../../services/init/dto';

import AdminService from '../../../services/admin.service';
import CompanyService from '../../../services/company.service';
import CodeManagementService from '../../../services/code-management.service';
import FounderConsultService from '../../../services/founder-consult.service';
import SpaceTypeService from '../../../services/space-type.service';

import { getStatusColor } from '../../../core/utils/status-color.util';

import {
  AdminDto,
  FounderConsultListDto,
  CompanyDto,
  FounderConsultDto,
  SpaceTypeDto,
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
  name: 'FounderConsultList',
})
export default class FounderConsult extends BaseComponent {
  private founderConsultSearchDto = new FounderConsultListDto();
  private founderConsultList: FounderConsultDto[] = [];
  private founderConsultTotalCount = null;
  private newLimit = null;
  private paginationCount: PaginationCount[] = [...CONST_PAGINATION_COUNT];

  private founderConsultStatusSelect: CodeManagementDto[] = [];
  private availableTimesSelect: CodeManagementDto[] = [];
  private companySelect: CompanyDto[] = [];
  private totalPage = 0;
  private delYn: YN[] = [...CONST_YN];
  private genderSelect: GENDER[] = [...CONST_GENDER];
  private spaceTypeSelect: SpaceTypeDto[] = [];
  private pagination = new Pagination();
  private dataLoading = false;
  private newDate = new Date();
  private adminList: AdminDto[] = [];

  private fields = {
    이름: 'nanudaUser.name',
    연락처: 'nanudaUser.phone',
    성별: 'nanudaUser.genderInfo.value',
    상담시간: 'availableTime.value',
    신청일: 'createdAt',
    창업경험: 'changUpExpYn',
    신청상태: 'codeManagement.value',
    점포명: 'space.name',
    주소: 'space.address',
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

  // get status color
  getStatusColor(status: FOUNDER_CONSULT) {
    return getStatusColor(status);
  }

  findAdmin() {
    AdminService.findForSelect().subscribe(res => {
      if (res) {
        this.adminList = res.data;
      }
    });
  }

  // 상태값
  getFounderConsultCodes() {
    CodeManagementService.findCodesFounderConsult().subscribe(res => {
      this.founderConsultStatusSelect = res.data;
    });
  }

  // 희망시간대
  getAvailableTimes() {
    CodeManagementService.findAvailableTimes().subscribe(res => {
      this.availableTimesSelect = res.data;
    });
  }

  // TODO: Create autocomplete box
  getCompanies() {
    CompanyService.findForSelect().subscribe(res => {
      this.companySelect = res.data;
    });
  }

  getSpaceTypes() {
    SpaceTypeService.findForSelect().subscribe(res => {
      this.spaceTypeSelect = res.data;
    });
  }

  paginateSearch() {
    this.search(true);
  }

  // 검색하기
  search(isPagination?: boolean) {
    this.founderConsultSearchDto.spaceTypeNo = SPACE_TYPE.SPACE_SHARE;
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.pagination.limit = this.newLimit;
    FounderConsultService.findAll(
      this.founderConsultSearchDto,
      this.pagination,
    ).subscribe(res => {
      this.dataLoading = false;
      this.founderConsultList = res.data.items;
      this.founderConsultTotalCount = res.data.totalCount;
      this.totalPage = Math.ceil(
        this.founderConsultTotalCount / this.pagination.limit,
      );
      this.$router.push({
        query: Object.assign(this.founderConsultSearchDto),
      });
    });
    window.scrollTo(0, 0);
  }

  // 초기화
  clearOut() {
    this.pagination.page = 1;
    this.founderConsultSearchDto = new FounderConsultListDto();
    this.search();
  }

  created() {
    this.newLimit = 50;
    this.pagination.limit = this.newLimit;
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.founderConsultSearchDto = query;
    }
    this.getAvailableTimes();
    this.getCompanies();
    this.getFounderConsultCodes();
    this.getSpaceTypes();
    this.findAdmin();
    this.search();
  }
}
</script>
<style lang="scss" scoped></style>
