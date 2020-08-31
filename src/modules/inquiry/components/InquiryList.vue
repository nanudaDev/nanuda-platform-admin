<template>
  <section>
    <div class="title pb-2 mb-2">
      <h3>Q&amp;A 관리</h3>
    </div>
    <div class="divider"></div>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <div class="form-row">
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
          <strong class="text-primary">
            {{ inquiryListCount }}
          </strong>
        </h5>
      </div>
    </div>
    <div v-if="!dataLoading">
      <table
        class="table table-bordered table-hover table-sm text-center"
        v-if="inquiryListCount"
      >
        <colgroup>
          <col width="40" />
          <col width="100" />
          <col width="auto" />
          <col width="100" />
          <col width="100" />
          <col width="150" />
          <col width="100" />
          <col width="100" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">NO</th>
            <th
              scope="col"
              v-bind:class="{ highlighted: inquirySearchDto.inquiryType }"
            >
              CATEGORY
            </th>
            <th
              scope="col"
              v-bind:class="{ highlighted: inquirySearchDto.title }"
            >
              TITLE
            </th>
            <th scope="col">COMPANY</th>
            <th scope="col">COMPANY USER</th>
            <th scope="col">CREATED</th>
            <th scope="col">STATUS</th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="inquiry in inquiryList" :key="inquiry.no">
            <th scope="row">
              {{ inquiry.no }}
            </th>
            <td>
              <div v-if="inquiry.codeManagement.value">
                {{ inquiry.codeManagement.value }}
              </div>
            </td>
            <td>
              <div v-if="inquiry.title">
                {{ inquiry.title }}
              </div>
            </td>
            <td>
              <div v-if="inquiry.company && inquiry.company.nameKr">
                {{ inquiry.company.nameKr }}
              </div>
            </td>
            <td>
              <div v-if="inquiry.companyUser && inquiry.companyUser.name">
                {{ inquiry.companyUser.name }}
              </div>
            </td>
            <td>
              {{ inquiry.createdAt | dateTransformer }}
            </td>
            <td>
              <b-badge
                variant="success"
                class="badge-pill p-2"
                v-if="inquiry.isClosed == 'Y'"
              >
                답변 완료
              </b-badge>
              <b-badge
                variant="warning"
                class="badge-pill p-2"
                v-else-if="inquiry.isEdited == 'Y'"
              >
                답변 중
              </b-badge>
              <b-badge variant="secondary" class="badge-pill p-2" v-else>
                답변 대기
              </b-badge>
            </td>
            <td>
              <router-link
                v-if="inquiry.no"
                class="btn btn-sm btn-secondary text-nowrap"
                :to="{
                  name: 'InquiryDetail',
                  params: {
                    id: inquiry.no,
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
      v-if="inquiryListCount"
      pills
      :total-rows="inquiryListCount"
      :per-page="pagination.limit"
      @input="paginateSearch"
      class="mt-4 justify-content-center"
    ></b-pagination>
    <div class="half-circle-spinner mt-5" v-if="dataLoading">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
  </section>
</template>
<script lang="ts">
import BaseComponent from '../../../core/base.component';
import Component from 'vue-class-component';
import { InquiryDto, InquiryListDto } from '../../../dto';
import { Pagination, INQUIRY, CONST_INQUIRY } from '../../../common';
import InquiryService from '../../../services/inquiry.service';

@Component({
  name: 'InquiryList',
})
export default class InquiryList extends BaseComponent {
  private inquiryList: InquiryDto[] = [];
  private inquirySearchDto = new InquiryListDto();
  private inquiryListCount = 0;
  private pagination = new Pagination();
  private dataLoading = false;
  private inquiryTypeSelect: INQUIRY[] = [...CONST_INQUIRY];

  search(isPagination?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.pagination.limit = 20;

    InquiryService.findAll(this.inquirySearchDto, this.pagination).subscribe(
      res => {
        this.dataLoading = false;
        this.inquiryList = res.data.items;
        this.inquiryListCount = res.data.totalCount;
      },
    );
  }

  paginateSearch() {
    this.search(true);
  }

  clearOut() {
    this.pagination = new Pagination();
    this.inquirySearchDto = new InquiryListDto();
    this.search();
  }

  created() {
    this.pagination.page = 1;
    this.search();
  }
}
</script>
