<template>
  <section>
    <SectionTitle title="식당형 상담 신청" divider></SectionTitle>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col cols="6" md="4" lg="2">
          <b-form-group label="사용자명">
            <b-form-input v-model="founderConsultSearchDto.nanudaUserName" />
          </b-form-group>
        </b-col>
        <b-col cols="6" md="4" lg="2">
          <b-form-group label="휴대폰 번호">
            <b-form-input v-model="founderConsultSearchDto.phone" />
          </b-form-group>
        </b-col>
        <b-col cols="6" md="4" lg="2">
          <b-form-group label="성별">
            <b-form-select v-model="founderConsultSearchDto.gender">
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
        <b-col cols="6" md="4" lg="2">
          <b-form-group label="창업 경험">
            <b-form-select
              class="custom-select"
              id="changup_exp_yn"
              v-model="founderConsultSearchDto.changUpExpYn"
            >
              <b-form-select-option value selected>전체</b-form-select-option>
              <b-form-select-option v-for="yn in delYn" :key="yn" :value="yn">
                {{ yn | enumTransformer }}
              </b-form-select-option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="4" lg="2">
          <b-form-group label="시작 날짜">
            <b-form-datepicker
              id="started"
              v-model="founderConsultSearchDto.started"
            ></b-form-datepicker>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="4" lg="2">
          <b-form-group label="종료 날짜">
            <b-form-datepicker
              id="ended"
              v-model="founderConsultSearchDto.ended"
              :disabled="founderConsultSearchDto.started ? false : true"
            ></b-form-datepicker>
          </b-form-group>
        </b-col>
      </b-form-row>
      <!-- second row -->
      <b-form-row>
        <b-col cols="6" md="4" lg="2">
          <b-form-group label="공간 ID">
            <b-form-input v-model="founderConsultSearchDto.spaceNo" />
          </b-form-group>
        </b-col>
        <b-col cols="6" md="4" lg="4">
          <b-form-group label="공간 주소">
            <b-form-input v-model="founderConsultSearchDto.address" />
          </b-form-group>
        </b-col>
        <b-col cols="6" md="4" lg="2">
          <b-form-group label="관리자명">
            <template>
              <b-form-input
                list="admin_list"
                id="admin_user"
                v-model="founderConsultSearchDto.adminUserName"
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
        <b-col cols="6" md="4" lg="2">
          <b-form-group label="희망 상담 시간대">
            <b-form-select
              class="custom-select"
              id="hope_time"
              v-model="founderConsultSearchDto.hopeTime"
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
        <b-col cols="12" md="4" lg="2">
          <b-form-group label="신청 상태">
            <b-form-select
              class="custom-select"
              id="status"
              v-model="founderConsultSearchDto.status"
            >
              <b-form-select-option value selected>전체</b-form-select-option>
              <b-form-select-option
                v-for="status in founderConsultStatusSelect"
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
          <strong class="text-primary">{{ founderConsultTotalCount }}</strong>
        </h5>
        <b-form-select
          v-model="newLimit"
          size="sm"
          class="select-limit ml-3"
          @change="paginateSearch()"
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
    <template v-if="!dataLoading">
      <div class="bg-white table-responsive">
        <table
          class="table table-hover table-sm text-center table-nowrap"
          v-if="founderConsultTotalCount"
        >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th
                scope="col"
                v-bind:class="{ highlighted: founderConsultSearchDto.spaceNo }"
              >
                공간 ID
              </th>
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
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="founderConsult in founderConsultList"
              :key="founderConsult.no"
              @click.stop="
                $router.push(`/founder-consult/${founderConsult.no}`)
              "
              style="cursor:pointer;"
            >
              <th scope="row">{{ founderConsult.no }}</th>
              <td @click.stop>
                <a
                  :href="
                    `https://nanudakitchen.com/restaurant-kitchen/${founderConsult.spaceNo}`
                  "
                  class="text-primary"
                  target="_blank"
                >
                  {{ founderConsult.spaceNo }}</a
                >
              </td>
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
              <td @click.stop>
                <template v-if="founderConsult.spaceConsultEtc">
                  <!-- <pre>{{ founderConsult.spaceConsultEtc }}</pre> -->
                  <p v-b-modal="getMoreConsultEtc(founderConsult.no)">
                    <span>
                      {{
                        founderConsult.spaceConsultEtc
                          | stringTruncateTransformer(50, '...')
                      }}
                    </span>
                    <span
                      class="text-primary"
                      v-if="founderConsult.spaceConsultEtc.length > 50"
                      >더보기</span
                    >
                  </p>
                  <b-modal
                    size="lg"
                    :id="`more_etc_${founderConsult.no}`"
                    hide-footer
                  >
                    <pre>{{ founderConsult.spaceConsultEtc }}</pre>
                  </b-modal>
                </template>
              </td>
              <td>
                <template v-if="founderConsult.admin">
                  {{ founderConsult.admin.name }}
                </template>
              </td>
              <td>
                <b-badge
                  :variant="getStatusColor(founderConsult.status)"
                  class="badge-pill p-2 mr-2"
                  >{{ founderConsult.codeManagement.value }}</b-badge
                >
              </td>
              <td>{{ founderConsult.createdAt | dateTransformer }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else class="empty-data border">검색결과가 없습니다.</div>
      </div>
      <b-pagination
        v-model="pagination.page"
        v-if="founderConsultTotalCount"
        pills
        :total-rows="founderConsultTotalCount"
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
import {
  ClearOutQueryParamMapper,
  ReverseQueryParamMapper,
  RouterQueryParamMapper,
} from '@/core';

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

  getMoreConsultEtc(consultNo) {
    return `more_etc_${consultNo}`;
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
    this.findAll(true);
  }

  search() {
    this.findAll(true, true);
  }

  // 검색하기
  findAll(isPagination?: boolean, isSearch?: boolean) {
    this.founderConsultSearchDto.spaceTypeNo = SPACE_TYPE.SPACE_SHARE;
    this.dataLoading = true;
    this.pagination.limit = this.newLimit;
    if (!isPagination) {
      this.pagination.page = 1;
    } else {
      if (isSearch) this.pagination.page = 1;
      RouterQueryParamMapper(this.founderConsultSearchDto, this.pagination);
    }
    FounderConsultService.findAll(
      this.founderConsultSearchDto,
      this.pagination,
    ).subscribe(res => {
      this.dataLoading = false;
      this.founderConsultList = res.data.items;
      this.founderConsultTotalCount = res.data.totalCount;
    });
  }

  // 초기화
  clearOut() {
    if (location.search) {
      ClearOutQueryParamMapper();
    } else {
      this.founderConsultSearchDto = new FounderConsultListDto();
      this.findAll();
    }
  }

  created() {
    this.newLimit = PaginationCount.TWENTY;
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.founderConsultSearchDto = query;
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
    this.getSpaceTypes();
    this.findAdmin();
  }
}
</script>
<style lang="scss" scoped></style>
