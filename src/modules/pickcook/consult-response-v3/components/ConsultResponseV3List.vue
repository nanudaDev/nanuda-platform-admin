<template>
  <section>
    <SectionTitle title="상담신청 목록 V3" divider></SectionTitle>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col cols="12" sm="6" md="3" class="mb-3">
          <label>사용자명</label>
          <input
            type="text"
            class="form-control"
            v-model="consultResponseV3SearchDto.name"
          />
        </b-col>
        <b-col cols="12" sm="6" md="3" class="mb-3">
          <label>휴대폰 번호</label>
          <input
            type="text"
            class="form-control"
            v-model="consultResponseV3SearchDto.phone"
          />
        </b-col>
        <b-col cols="12" sm="6" md="3">
          <b-form-group label="창업자 유형">
            <b-form-select
              id="space_type"
              v-model="consultResponseV3SearchDto.fnbOwnerStatus"
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
              v-model="consultResponseV3SearchDto.consultStatus"
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
        <!-- <b-col cols="12" sm="6" md="3">
          <b-form-group label="미팅 취소사유">
            <b-form-select v-model="consultResponseV2SerchDto.deleteReason">
              <b-form-select-option value>전체</b-form-select-option>
              <b-form-select-option
                v-for="reason in reservationDeleteReasons"
                :key="reason"
                :value="reason"
                >{{ reason }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col> -->
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
        <b-form-select
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
        </b-form-select>
      </div>
      <div>
        <!-- <b-button
          variant="primary"
          v-b-modal.update_product_consult_status_nos
          v-if="selectedProductConsultNos.length > 0"
          @click="getProductConsultCodes()"
          >신청 상태 수정</b-button
        > -->
        <download-excel
          class="btn btn-outline-success"
          :data="consultResponseV3List"
          :fields="fields"
          :stringifyLongNum="true"
          worksheet="픽쿡 상담 리스트"
          :name="`pickcook_consult_${newDate}.xls`"
          v-if="consultResponseTotalCount"
        >
          <b-icon icon="file-earmark-arrow-down"></b-icon>
          엑셀 다운로드
        </download-excel>
        <b-button
          variant="primary"
          v-b-modal.add_consult
          @click="createProforma()"
          >상담신청 추가</b-button
        >
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
            <col width="200" />
            <col width="200" />
            <col width="auto" />
            <col width="200" />
            <col width="200" />
            <col width="200" />
          </colgroup>
          <thead>
            <tr>
              <th
                scope="col"
                v-bind:class="{ highlighted: consultResponseV3SearchDto.id }"
              >
                ID
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: consultResponseV3SearchDto.fnbOwnerStatus,
                }"
              >
                유형
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: consultResponseV3SearchDto.name,
                }"
              >
                사용자명
              </th>
              <!-- <th scope="col">
                나이
              </th> -->
              <th
                scope="col"
                v-bind:class="{ highlighted: consultResponseV3SearchDto.phone }"
              >
                휴대폰 번호
              </th>
              <!-- <th scope="col">
                미팅날짜
              </th> -->
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
              v-for="consult in consultResponseV3List"
              :key="consult.id"
              @click="
                $router.push(`/pickcook/consult-response-v3/${consult.id}`)
              "
              style="cursor:pointer;"
            >
              <th scope="row">
                {{ consult.id }}
              </th>
              <td>
                <template
                  v-if="
                    consult.proformaConsultResult &&
                      consult.proformaConsultResult.fnbOwnerStatus
                  "
                >
                  {{
                    consult.proformaConsultResult.fnbOwnerStatus
                      | enumTransformer
                  }}
                </template>
              </td>
              <td>{{ consult.name }}</td>
              <!-- <td>
                <template v-if="consult.ageGroupCodeStatus">
                  {{ consult.ageGroupCodeStatus.displayName }}
                </template>
              </td> -->
              <td>{{ consult.phone | phoneTransformer }}</td>
              <!-- <td>
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
              </td> -->
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
        @input="paginateSearch()"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </template>
    <template v-else>
      <div class="half-circle-spinner py-4">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
      </div>
    </template>
    <!-- 상담신청 추가 모달 -->
    <b-modal id="add_consult" title="상담신청 추가" @ok="createConsult()">
      <b-form-row>
        <b-col cols="12">
          <b-form-group label="창업자 유형">
            <b-form-select v-model="consultResponseV3CreateDto.fnbOwnerStatus">
              <b-form-select-option
                v-for="status in fnbOwnerStatus"
                :key="status.key"
                :value="status.value"
                >{{ status.comment }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group label="이름">
            <b-form-input v-model="consultResponseV3CreateDto.name">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group label="휴대폰 번호">
            <b-form-input v-model="consultResponseV3CreateDto.phone">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="내용">
            <b-form-textarea v-model="consultResponseV3CreateDto.description">
            </b-form-textarea>
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-modal>
  </section>
</template>
<script lang="ts">
import { Pagination } from '@/common';
import {
  ClearOutQueryParamMapper,
  getStatusColor,
  ReverseQueryParamMapper,
  RouterQueryParamMapper,
} from '@/core';
import BaseComponent from '@/core/base.component';
import {
  ConsultResponseV3CreateDto,
  ConsultResponseV3Dto,
  ConsultResponseV3ListDto,
  ProductConsultStatusUpdateDto,
} from '@/dto';
import { PickcookCodeManagementDto } from '@/services/init/dto';
import {
  PaginationCount,
  CONST_PAGINATION_COUNT,
  RESERVATION_DELETE_REASON,
  CONST_RESERVATION_DELETE_REASON,
  BRAND_CONSULT,
  FNB_OWNER,
  CONST_FNB_OWNER,
} from '@/services/shared';
import { Component } from 'vue-property-decorator';
import CommonCodeService from '@/services/pickcook/common-code.service';
import ConsultResponseV3Service from '@/services/pickcook/consult-response-v3.service';
import axios from 'axios';
import toast from '../../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'ConsultResponseV3List',
})
export default class ConsultResponseV3List extends BaseComponent {
  private consultResponseV3List: ConsultResponseV3Dto[] = [];
  private consultResponseV3SearchDto = new ConsultResponseV3ListDto();
  private consultResponseV3CreateDto = new ConsultResponseV3CreateDto();
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
    // 나이: 'ageGroupCodeStatus.displayName',
    연락처: 'phone',
    // 미팅예약날짜: 'reservation.reservationDate',
    // 미팅예약시간: 'reservation.reservationTime',
    // 미팅취소사유: 'reservation.deleteReason',
    // 취소기타사유: 'reservation.deleteReasonEtc',
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
    this.pagination.limit = this.newLimit;
    if (!isPagination) {
      this.pagination.page = 1;
    } else {
      if (isSearch) this.pagination.page = 1;
      RouterQueryParamMapper(this.consultResponseV3SearchDto, this.pagination);
    }

    ConsultResponseV3Service.findAll(
      this.consultResponseV3SearchDto,
      this.pagination,
    ).subscribe(res => {
      if (res) {
        this.dataLoading = false;
        this.consultResponseV3List = res.data.items;
        this.consultResponseTotalCount = res.data.totalCount;
      }
    });
  }

  search() {
    this.findAll(true, true);
  }

  paginateSearch() {
    this.findAll(true);
  }

  clearOut() {
    if (location.search) {
      ClearOutQueryParamMapper();
    } else {
      this.consultResponseV3SearchDto = new ConsultResponseV3ListDto();
      this.findAll();
    }
  }

  createProforma() {
    axios.get('https://api.ipify.org?format=json').then(res => {
      this.consultResponseV3CreateDto.ipAddress = res.data.ip;
    });
  }

  createConsult() {
    ConsultResponseV3Service.create(this.consultResponseV3CreateDto).subscribe(
      res => {
        if (res) {
          console.log(this.consultResponseV3CreateDto);
          toast.success('추가완료');
          this.clearOut();
        }
      },
    );
  }

  created() {
    this.newLimit = PaginationCount.TWENTY;
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.consultResponseV3SearchDto = query;
      this.pagination.page = +query.page;
      this.newLimit = +query.limit;
      this.paginateSearch();
    } else {
      this.findAll();
    }
    this.getCommonCodes();
  }
}
</script>
