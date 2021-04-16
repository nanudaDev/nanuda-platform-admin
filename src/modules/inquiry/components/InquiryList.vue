<template>
  <section>
    <SectionTitle title="Q&amp;A" divider />
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <div class="col-12 col-lg-2 mb-3">
          <label for="space_type">질문 유형</label>
          <select
            class="custom-select"
            id="space_type"
            v-model="inquirySearchDto.inquiryType"
          >
            <option value selected>전체</option>
            <option
              v-for="inquiryType in inquiryTypeSelect"
              :key="inquiryType"
              :value="inquiryType"
              >{{ inquiryType | enumTransformer }}</option
            >
          </select>
        </div>
        <div class="col-12 col-lg-10 mb-3">
          <label for="company">제목</label>
          <input
            type="text"
            class="form-control"
            v-model="inquirySearchDto.title"
          />
        </div>
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
            {{ inquiryTotalCount }}
          </strong>
        </h5>
      </div>
    </div>
    <template v-if="!dataLoading">
      <div class="bg-white table-responsive">
        <table
          class="table table-hover table-sm text-center table-nowrap"
          v-if="inquiryTotalCount"
        >
          <colgroup>
            <col width="80" />
            <col width="200" />
            <col width="auto" />
            <col width="150" />
            <col width="150" />
            <col width="150" />
            <col width="200" />
            <col width="200" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">NO</th>
              <th
                scope="col"
                v-bind:class="{ highlighted: inquirySearchDto.inquiryType }"
              >
                카테고리
              </th>
              <th
                scope="col"
                v-bind:class="{ highlighted: inquirySearchDto.title }"
              >
                제목
              </th>
              <th scope="col">업체명</th>
              <th scope="col">작성자</th>
              <th scope="col">등록일</th>
              <th scope="col">답변 상태</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="inquiry in inquiryList"
              :key="inquiry.no"
              @click="
                $router.push({
                  name: 'InquiryDetail',
                  params: {
                    id: inquiry.no,
                  },
                })
              "
              style="cursor:pointer"
            >
              <th scope="row">
                {{ inquiry.no }}
              </th>
              <td>
                <template v-if="inquiry.codeManagement.value">
                  {{ inquiry.codeManagement.value }}
                </template>
              </td>
              <td class="text-left">
                <template v-if="inquiry.title">
                  {{ inquiry.title }}
                </template>
              </td>
              <td>
                <template v-if="inquiry.company && inquiry.company.nameKr">
                  {{ inquiry.company.nameKr }}
                </template>
              </td>
              <td>
                <template
                  v-if="inquiry.companyUser && inquiry.companyUser.name"
                >
                  {{ inquiry.companyUser.name }}
                </template>
              </td>
              <td>
                {{ inquiry.createdAt | dateTransformer }}
              </td>
              <td>
                <b-badge
                  variant="success"
                  class="badge-pill p-2"
                  v-if="inquiry.isClosed === 'Y'"
                >
                  {{ inquiry.isClosed | stringInquiryTransformer }}
                </b-badge>
                <b-badge
                  variant="warning"
                  class="badge-pill p-2"
                  v-else-if="inquiry.replyCount > 0"
                >
                  답변중
                </b-badge>
                <b-badge variant="secondary" class="badge-pill p-2" v-else>
                  {{ inquiry.isClosed | stringInquiryTransformer }}
                </b-badge>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="empty-data border">검색결과가 없습니다.</div>
      </div>
      <b-pagination
        v-model="pagination.page"
        v-if="inquiryTotalCount"
        pills
        :total-rows="inquiryTotalCount"
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
import BaseComponent from '../../../core/base.component';
import Component from 'vue-class-component';
import { InquiryDto, InquiryListDto } from '../../../dto';
import { Pagination, INQUIRY, CONST_INQUIRY } from '../../../common';
import InquiryService from '../../../services/inquiry.service';
import {
  ClearOutQueryParamMapper,
  ReverseQueryParamMapper,
  RouterQueryParamMapper,
} from '@/core';

@Component({
  name: 'InquiryList',
})
export default class InquiryList extends BaseComponent {
  private inquiryList: InquiryDto[] = [];
  private inquirySearchDto = new InquiryListDto();
  private inquiryTotalCount = null;
  private pagination = new Pagination();
  private dataLoading = false;
  private inquiryTypeSelect: INQUIRY[] = [...CONST_INQUIRY];

  findAll(isPagination?: boolean, isSearch?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    } else {
      if (isSearch) this.pagination.page = 1;
      RouterQueryParamMapper(this.inquirySearchDto, this.pagination);
    }
    InquiryService.findAll(this.inquirySearchDto, this.pagination).subscribe(
      res => {
        if (res) {
          this.dataLoading = false;
          this.inquiryList = res.data.items;
          this.inquiryTotalCount = res.data.totalCount;
        }
      },
    );
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
      this.inquirySearchDto = new InquiryListDto();
      this.findAll();
    }
  }

  created() {
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.inquirySearchDto = query;
      if (!isNaN(+query.limit) && !isNaN(+query.page)) {
        this.pagination.limit = +query.limit;
        this.pagination.page = +query.page;
      } else {
        this.pagination = new Pagination();
      }
      this.paginateSearch();
    } else {
      this.findAll();
    }
  }
}
</script>
