<template>
  <section>
    <SectionTitle title="상담신청 목록" divider></SectionTitle>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col cols="12" sm="6" md="3" class="mb-3">
          <label>사용자명</label>
          <input
            type="text"
            class="form-control"
            v-model="consultResponseSerchDto.name"
          />
        </b-col>
        <b-col cols="12" sm="6" md="3" class="mb-3">
          <label>휴대폰 번호</label>
          <input
            type="text"
            class="form-control"
            v-model="consultResponseSerchDto.phone"
          />
        </b-col>
        <b-col cols="12" sm="6" md="3">
          <b-form-group label="창업자 유형">
            <b-form-select
              id="space_type"
              v-model="consultResponseSerchDto.fnbOwnerStatus"
            >
              <b-form-select-option value>전체</b-form-select-option>
              <b-form-select-option
                v-for="status in fnbOwnerStatus"
                :key="status.key"
                :value="status.value"
                >{{ status.comment }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6" md="3">
          <b-form-group label="신청 상태">
            <b-form-select
              id="space_type"
              v-model="consultResponseSerchDto.consultStatus"
            >
              <b-form-select-option value>전체</b-form-select-option>
              <b-form-select-option
                v-for="status in consultStatus"
                :key="status.key"
                :value="status.value"
                >{{ status.comment }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6" md="3">
          <b-form-group label="미팅 취소사유">
            <b-form-select v-model="consultResponseSerchDto.deleteReason">
              <b-form-select-option value>전체</b-form-select-option>
              <b-form-select-option
                v-for="reason in reservationDeleteReasons"
                :key="reason"
                :value="reason"
                >{{ reason }}</b-form-select-option
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
          <strong class="text-primary">{{ consultResponseTotalCount }}</strong>
        </h5>
        <!-- <b-form-select
          v-model="newLimit"
          size="sm"
          class="select-limit ml-3"
          @change="search()"
          v-if="consultResponseTotalCount"
        >
          <b-form-select-option
            v-for="count in paginationCount"
            :key="count"
            :value="count"
            >{{ count }}개</b-form-select-option
          >
        </b-form-select> -->
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
          :data="consultResponseList"
          :fields="fields"
          :stringifyLongNum="true"
          worksheet="픽쿡 상담 리스트"
          :name="`pickcook_consult_${newDate}.xls`"
          v-if="consultResponseTotalCount"
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
          v-if="consultResponseTotalCount"
        >
          <colgroup>
            <col width="60" />
            <col width="100" />
            <col width="150" />
            <col width="100" />
            <col width="150" />
            <col width="auto" />
            <col width="150" />
            <col width="150" />
            <col width="150" />
          </colgroup>
          <thead>
            <tr>
              <th
                scope="col"
                v-bind:class="{ highlighted: consultResponseSerchDto.id }"
              >
                ID
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: consultResponseSerchDto.fnbOwnerStatus,
                }"
              >
                유형
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: consultResponseSerchDto.name,
                }"
              >
                사용자명
              </th>
              <th scope="col">
                나이
              </th>
              <th
                scope="col"
                v-bind:class="{ highlighted: consultResponseSerchDto.phone }"
              >
                휴대폰 번호
              </th>
              <th scope="col">
                미팅날짜
              </th>
              <th scope="col">
                담당자
              </th>
              <th scope="col">
                신청상태
              </th>
              <th scope="col">신청일</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="consult in consultResponseList"
              :key="consult.id"
              @click="$router.push(`/pickcook/consult-response/${consult.id}`)"
              style="cursor:pointer;"
            >
              <th scope="row">
                {{ consult.id }}
              </th>
              <td>
                <template v-if="consult.fnbOwnerCodeStatus">
                  {{ consult.fnbOwnerCodeStatus.comment }}
                </template>
              </td>
              <td>{{ consult.name }}</td>
              <td>
                <template v-if="consult.ageGroupCodeStatus">
                  {{ consult.ageGroupCodeStatus.displayName }}
                </template>
              </td>
              <td>{{ consult.phone | phoneTransformer }}</td>
              <td>
                <template v-if="consult.reservation">
                  <template v-if="consult.reservation.isCancelYn !== 'Y'">
                    {{
                      consult.reservation.reservationDate | dateOnlyTransformer
                    }}
                    {{ consult.reservation.reservationTime }}
                  </template>
                  <template v-else>
                    <p class="red-text" v-if="consult.reservation.deleteReason">
                      <b-badge variant="danger">취소</b-badge>
                      <template v-if="consult.reservation.deleteReasonEtc">
                        {{ consult.reservation.deleteReasonEtc }}
                      </template>
                      <template v-else>
                        {{ consult.reservation.deleteReason }}
                      </template>
                    </p>
                  </template>
                </template>
              </td>
              <td>
                <template v-if="consult.admin">
                  {{ consult.admin.name }}
                </template>
              </td>
              <td>
                <template v-if="consult.consultCodeStatus">
                  <b-badge
                    :variant="getStatusColor(consult.consultCodeStatus.value)"
                    class="badge-pill p-2 mr-2"
                    >{{ consult.consultCodeStatus.comment }}</b-badge
                  >
                </template>
              </td>
              <td>{{ consult.created | dateTransformer }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else class="empty-data border">검색결과가 없습니다.</div>
      </div>
      <b-pagination
        v-model="pagination.page"
        v-if="consultResponseTotalCount"
        pills
        :total-rows="consultResponseTotalCount"
        :per-page="pagination.limit"
        @input="paginateSearch"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </template>
    <template v-else>
      <div class="half-circle-spinner py-4">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
      </div>
    </template>
  </section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';
import ConsultResponseService from '@/services/pickcook/consult-response.service';
import {
  ConsultResponseDto,
  ConsultResponseListDto,
  ProductConsultStatusUpdateDto,
} from '@/dto';
import { Pagination } from '@/common';
import {
  BRAND,
  BRAND_CONSULT,
  CONST_BRAND_CONSULT,
  CONST_FNB_OWNER,
  CONST_PAGINATION_COUNT,
  CONST_RESERVATION_DELETE_REASON,
  FNB_OWNER,
  PaginationCount,
  RESERVATION_DELETE_REASON,
} from '@/services/shared';
import { getStatusColor } from '@/core/utils/status-color.util';
import CommonCodeService from '@/services/pickcook/common-code.service';
import { PickcookCodeManagementDto } from '@/services/init/dto';
import { ReverseQueryParamMapper } from '@/core';

@Component({
  name: 'ConsultResponseList',
})
export default class ConsultResponseList extends BaseComponent {
  private consultResponseList: ConsultResponseDto[] = [];
  private consultResponseSerchDto = new ConsultResponseListDto();
  private pagination = new Pagination();
  private consultResponseTotalCount = null;
  private newLimit = null;
  private paginationCount: PaginationCount[] = [...CONST_PAGINATION_COUNT];
  private searchPramsDto: any = {};

  private dataLoading = false;
  private fnbOwnerStatus: PickcookCodeManagementDto[] = [];
  private consultStatus: PickcookCodeManagementDto[] = [];
  private codeManagementDto = new PickcookCodeManagementDto();
  private paginationCode = new Pagination();

  private reservationDeleteReasons: RESERVATION_DELETE_REASON[] = [
    ...CONST_RESERVATION_DELETE_REASON,
  ];

  private selectedProductConsultNos: number[] = [];
  private consultStatusUpdateDto = new ProductConsultStatusUpdateDto();
  private newDate = new Date();

  // excel options
  private fields = {
    ID: 'id',
    이름: 'name',
    나이: 'ageGroupCodeStatus.displayName',
    연락처: 'phone',
    미팅예약날짜: 'reservation.reservationDate',
    미팅예약시간: 'reservation.reservationTime',
    미팅취소사유: 'reservation.deleteReason',
    취소기타사유: 'reservation.deleteReasonEtc',
    담당자: 'admin.name',
    신청상태: 'consultCodeStatus.comment',
    신청일: 'created',
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
  getStatusColor(status: BRAND_CONSULT) {
    return getStatusColor(status);
  }

  // get common codes
  getCommonCodes() {
    this.codeManagementDto.category = 'FNB_OWNER';
    CommonCodeService.findAll(
      this.codeManagementDto,
      this.paginationCode,
    ).subscribe(res => {
      this.fnbOwnerStatus = res.data.items;
    });

    this.codeManagementDto.category = 'BRAND_CONSULT';
    CommonCodeService.findAll(
      this.codeManagementDto,
      this.paginationCode,
    ).subscribe(res => {
      this.consultStatus = res.data.items;
    });
  }

  findAll(isPagination?: boolean, isSearch?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    } else {
      if (isSearch) this.pagination.page = 1;
      this.searchPramsDto = Object.assign(
        this.consultResponseSerchDto,
        this.pagination,
      );
    }

    ConsultResponseService.findAll(
      this.consultResponseSerchDto,
      this.pagination,
    ).subscribe(res => {
      this.dataLoading = false;
      this.consultResponseList = res.data.items;
      this.consultResponseTotalCount = res.data.totalCount;
      this.$router.push({
        query: this.searchPramsDto,
      });
    });
  }

  search() {
    this.findAll(true, true);
  }

  paginateSearch() {
    this.findAll(true);
  }

  clearOut() {
    this.consultResponseSerchDto = new ConsultResponseListDto();
    this.$router.push({ query: null });
  }

  created() {
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.consultResponseSerchDto = query;
      this.pagination.limit = +query.limit;
      this.pagination.page = +query.page;
      this.paginateSearch();
    } else {
      this.findAll();
    }
    this.getCommonCodes();
  }
}
</script>
