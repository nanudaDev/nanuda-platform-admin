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
              <b-form-select-option>전체</b-form-select-option>
              <b-form-select-option
                v-for="status in fnbOwnerStatus"
                :key="status.key"
                :value="status.value"
                >{{ status.comment }}</b-form-select-option
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
                매출
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
                <template v-if="consult.revenueRangeCodeStatus">
                  {{ consult.revenueRangeCodeStatus.displayName }}
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
  CONST_FNB_OWNER,
  FNB_OWNER,
} from '@/services/shared';
import { getStatusColor } from '@/core/utils/status-color.util';
import CommonCodeService from '@/services/pickcook/common-code.service';
import { PickcookCodeManagementDto } from '@/services/init/dto';

@Component({
  name: 'ConsultResponseList',
})
export default class ConsultResponseList extends BaseComponent {
  private consultResponseList: ConsultResponseDto[] = [];
  private consultResponseSerchDto = new ConsultResponseListDto();
  private pagination = new Pagination();
  private consultResponseTotalCount = null;
  private dataLoading = false;
  private fnbOwnerStatus: PickcookCodeManagementDto[] = [];
  private codeManagementDto = new PickcookCodeManagementDto();
  private paginationCode = new Pagination();

  private selectedProductConsultNos: number[] = [];
  private consultStatusUpdateDto = new ProductConsultStatusUpdateDto();
  private newDate = new Date();
  // excel options
  private fields = {
    ID: 'id',
    이름: 'name',
    연락처: 'phone',
    비회원명: 'nonUserName',
    비회원연락처: 'nonUserPhone',
    미팅일자: 'availableTime.value',
    담당자: 'consultManager',
    신청일: 'createdAt',
    신청상태: 'codeManagement.value',
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
  }

  search(isPagination?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.pagination.limit = 50;
    ConsultResponseService.findAll(
      this.consultResponseSerchDto,
      this.pagination,
    ).subscribe(res => {
      this.dataLoading = false;
      this.consultResponseList = res.data.items;
      this.consultResponseTotalCount = res.data.totalCount;
    });
  }

  clearOut() {
    this.consultResponseSerchDto = new ConsultResponseListDto();
    this.pagination = new Pagination();
    this.search();
  }

  paginateSearch() {
    this.search(true);
  }

  created() {
    this.search();
    this.getCommonCodes();
  }
}
</script>
