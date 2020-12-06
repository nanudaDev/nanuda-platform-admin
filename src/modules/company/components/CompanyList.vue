<template>
  <section>
    <SectionTitle title="업체 관리" divider></SectionTitle>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <div class="col-md-1 mb-3">
          <label for="username">업체 ID</label>
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="companySearchDto.no"
          />
        </div>
        <div class="col-md-3 mb-3">
          <b-form-group label="업체명">
            <b-form-input
              list="company_list"
              v-model="companySearchDto.nameKr"
            ></b-form-input>
            <datalist id="company_list">
              <option
                v-for="company in companySelect"
                :key="company.no"
                :value="company.nameKr"
                >{{ company.nameKr }}</option
              >
            </datalist>
          </b-form-group>
        </div>
        <div class="col-md-2 mb-3">
          <label>전화 번호</label>
          <input
            type="text"
            class="form-control"
            v-model="companySearchDto.phone"
          />
        </div>
        <div class="col-md-2 mb-3">
          <label>이메일</label>
          <input
            type="text"
            class="form-control"
            v-model="companySearchDto.email"
          />
        </div>
        <div class="col-md-2 mb-3">
          <label>팩스 번호</label>
          <input
            type="text"
            class="form-control"
            v-model="companySearchDto.fax"
          />
        </div>
        <div class="col-md-2 mb-3">
          <label>승인 상태</label>
          <select
            class="custom-select"
            v-model="companySearchDto.companyStatus"
          >
            <option value>전체</option>
            <option
              v-for="status in approvalStatus"
              :key="status"
              :value="status"
              >{{ status | enumTransformer }}</option
            >
          </select>
        </div>
      </b-form-row>
      <!-- second row -->
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
          <strong class="text-primary">{{ companyListTotalCount }}</strong>
        </h5>
      </div>
      <b-button
        variant="primary"
        v-b-modal.add_company
        @click="clearOutCompanyCreateDto()"
        >업체 추가</b-button
      >
    </div>
    <div v-if="!dataLoading" class="table-bordered table-responsive">
      <table
        class="table table-hover table-sm text-center"
        v-if="companyListTotalCount"
      >
        <thead>
          <tr>
            <th scope="col" v-bind:class="{ highlighted: companySearchDto.no }">
              ID
            </th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: companySearchDto.nameKr,
              }"
            >
              업체명
            </th>
            <th
              scope="col"
              v-bind:class="{ highlighted: companySearchDto.ceoKr }"
            >
              대표자명
            </th>
            <th
              scope="col"
              v-bind:class="{ highlighted: companySearchDto.phone }"
            >
              전화번호
            </th>
            <th
              scope="col"
              v-bind:class="{ highlighted: companySearchDto.email }"
            >
              이메일
            </th>
            <th
              scope="col"
              v-bind:class="{ highlighted: companySearchDto.fax }"
            >
              팩스
            </th>
            <th
              scope="col"
              v-bind:class="{ highlighted: companySearchDto.address }"
            >
              주소
            </th>
            <th scope="col">등록일</th>
            <th
              scope="col"
              v-bind:class="{ highlighted: companySearchDto.companyStatus }"
            >
              승인 상태
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody v-if="companyListTotalCount">
          <tr v-for="company in companyListDto" :key="company.no">
            <th scope="row">{{ company.no }}</th>
            <td class="text-nowrap">{{ company.nameKr }}</td>
            <td class="text-nowrap">{{ company.ceoKr }}</td>
            <td class="text-nowrap">{{ company.phone | phoneTransformer }}</td>
            <td>{{ company.email }}</td>
            <td class="text-nowrap">{{ company.fax | phoneTransformer }}</td>
            <td class="text-left">{{ company.address }}</td>
            <td>{{ company.createdAt | dateTransformer }}</td>
            <td>
              <b-badge
                :variant="getStatusColor(company.companyStatus)"
                class="badge-pill p-2 mr-2"
                >{{ company.codeManagement.value }}</b-badge
              >
            </td>
            <td>
              <router-link
                v-if="company.no"
                class="btn btn-sm btn-secondary text-nowrap"
                :to="{
                  name: 'CompanyDetail',
                  params: {
                    id: company.no,
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
      v-if="companyListTotalCount"
      pills
      :total-rows="companyListTotalCount"
      :per-page="pagination.limit"
      @input="paginateSearch()"
      class="mt-4 justify-content-center"
    ></b-pagination>
    <div class="half-circle-spinner mt-5" v-if="dataLoading">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>

    <b-modal
      id="add_company"
      title="업체 추가"
      ok-title="추가"
      cancel-title="취소"
      size="lg"
      @ok="createCompany()"
    >
      <div v-if="companyLogo && companyLogo.length > 0">
        <div v-for="logo in companyLogo" :key="logo.endpoint">
          <img
            :src="logo.endpoint"
            class="rounded mx-auto d-block company-logo"
          />
        </div>
      </div>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-row>
          <b-col cols="6" lg="3" class="mt-2">
            <label>
              업체명
              <span class="red-text">*</span>
            </label>
            <input
              type="text"
              v-model="companyCreateDto.nameKr"
              class="form-control"
            />
          </b-col>
          <b-col cols="6" lg="3" class="mt-2">
            <label>업체명(영문)</label>
            <input
              type="text"
              v-model="companyCreateDto.nameEng"
              class="form-control"
            />
          </b-col>
          <b-col cols="6" lg="3" class="mt-2">
            <label>
              전화번호
              <span class="red-text">*</span>
            </label>
            <input
              type="text"
              v-model="companyCreateDto.phone"
              class="form-control"
            />
          </b-col>
          <b-col cols="6" lg="3" class="mt-2">
            <label>
              이메일
              <span class="red-text">*</span>
            </label>
            <input
              type="text"
              v-model="companyCreateDto.email"
              class="form-control"
            />
          </b-col>
          <b-col cols="6" lg="3" class="mt-2">
            <label>FAX</label>
            <input
              type="text"
              v-model="companyCreateDto.fax"
              class="form-control"
            />
          </b-col>
          <b-col cols="6" lg="3" class="mt-2">
            <label>
              사업자번호
              <span class="red-text">*</span>
            </label>
            <input
              type="text"
              v-model="companyCreateDto.businessNo"
              class="form-control"
            />
          </b-col>
          <b-col cols="6" lg="3" class="mt-2">
            <label>
              대표명
              <span class="red-text">*</span>
            </label>
            <input
              type="text"
              v-model="companyCreateDto.ceoKr"
              class="form-control"
            />
          </b-col>
          <b-col cols="6" lg="3" class="mt-2">
            <label>대표명(영문)</label>
            <input
              type="text"
              v-model="companyCreateDto.ceoEng"
              class="form-control"
            />
          </b-col>
          <b-col lg="6" class="mt-2">
            <label>
              주소
              <span class="red-text">*</span>
            </label>
            <input
              type="text"
              v-model="addressData.address"
              class="form-control"
              v-on:keyup.tab="showAddressModal()"
              v-b-modal.postcode
            />
          </b-col>
          <b-col lg="6" class="mt-2">
            <label>
              상세 주소
            </label>
            <b-form-input v-model="addressDetail" />
          </b-col>
          <b-col cols="12" lg="6" class="mt-2">
            <label>웹사이트</label>
            <input
              type="text"
              v-model="companyCreateDto.website"
              class="form-control"
            />
          </b-col>
          <b-col lg="3" class="mt-2">
            <label>업체 로고</label>
            <b-form-file
              placeholder="파일 선택"
              ref="fileInput"
              @input="upload($event)"
            ></b-form-file>
          </b-col>
          <b-col lg="3" class="mt-2">
            <label>
              승인 상태
              <span class="red-text">*</span>
            </label>
            <select
              class="custom-select"
              v-model="companyCreateDto.companyStatus"
            >
              <option value>전체</option>
              <option
                v-for="status in approvalStatus"
                :key="status"
                :value="status"
                >{{ status | enumTransformer }}</option
              >
            </select>
          </b-col>
        </b-form-row>
      </form>
    </b-modal>
    <!-- 주소 검색 모달 -->
    <b-modal id="postcode" title="주소 검색" hide-footer>
      <vue-daum-postcode
        style="height:500px; overflow-y:auto;"
        @complete="setAddress($event)"
      />
    </b-modal>
  </section>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import { CompanyListDto, CompanyDto } from '../../../dto';
import { Pagination } from '../../../common';
import CompanyService from '../../../services/company.service';
import {
  CONST_APPROVAL_STATUS,
  APPROVAL_STATUS,
} from '../../../services/shared';
import { FileAttachmentDto } from '@/services/shared/file-upload';
import FileUploadService from '../../../services/shared/file-upload/file-upload.service';
import { UPLOAD_TYPE } from '../../../services/shared/file-upload/file-upload.service';
import { ATTACHMENT_REASON_TYPE } from '@/services/shared/file-upload';
import { getStatusColor } from '../../../core/utils/status-color.util';
import { ReverseQueryParamMapper } from '@/core';

@Component({
  name: 'CompanyList',
})
export default class Company extends BaseComponent {
  constructor() {
    super();
  }
  private companySearchDto = new CompanyListDto();
  //   or you can set this value to an empty erray. either or
  //   private companyListDto: Array<CompanyDto>();
  private companyListDto: CompanyDto[] = [];
  private companyListTotalCount = null;
  private companyCreateDto = new CompanyDto();
  private companySelect: CompanyDto[] = [];
  private pagination = new Pagination();
  private approvalStatus: APPROVAL_STATUS[] = [...CONST_APPROVAL_STATUS];
  private totalPage = 0;
  private dataLoading = false;
  // single file일 경우 치환자를 attachment으로 정한다
  private companyLogo: FileAttachmentDto[] = [];
  private addressData = { address: '' };
  private addressDetail = null;

  // get status color
  getStatusColor(status: APPROVAL_STATUS) {
    return getStatusColor(status);
  }

  // 업체 셀렉트 박스
  getCompanies() {
    CompanyService.findAllForSelect().subscribe(res => {
      this.companySelect = res.data;
    });
  }

  // 주소 검색 모달
  showAddressModal() {
    this.$bvModal.show('postcode');
  }

  paginateSearch() {
    this.search(true);
  }

  clearOut() {
    this.pagination = new Pagination();
    this.companySearchDto = new CompanyListDto();
    this.companyLogo = [];
    this.search();
  }

  search(isPagination?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    }

    CompanyService.findAll(this.companySearchDto, this.pagination).subscribe(
      res => {
        this.dataLoading = false;
        this.companyListDto = res.data.items;
        this.companyListTotalCount = res.data.totalCount;
        this.totalPage = Math.ceil(
          this.companyListTotalCount / this.pagination.limit,
        );
        this.$router.push({
          query: Object.assign(this.companySearchDto),
        });
      },
    );
  }

  async upload(file: File) {
    const attachments = await FileUploadService.upload(
      UPLOAD_TYPE.COMPANY_LOGO,
      [file],
    );
    this.companyLogo = [];
    this.companyLogo.push(
      ...attachments.filter(
        fileUpload =>
          fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
      ),
    );
  }

  // 업체 생성
  createCompany() {
    this.companyCreateDto.logo = this.companyLogo;
    if (this.addressDetail.length > 0) {
      this.companyCreateDto.address = `${this.addressData.address} ${this.addressDetail}`;
    }
    CompanyService.createCompany(this.companyCreateDto).subscribe(res => {
      if (res) {
        this.search();
      }
    });
  }

  setAddress(res) {
    this.addressData = res;
    this.companyCreateDto.address = this.addressData.address;
    this.$bvModal.hide('postcode');
  }

  // 업체 생성 초기화
  clearOutCompanyCreateDto() {
    this.companyCreateDto = new CompanyDto();
    this.addressData = { address: '' };
    this.companyLogo = [];
  }

  created() {
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.companySearchDto = query;
    }
    this.search();
    this.getCompanies();
  }
}
</script>
<style lang="scss">
.company-logo {
  height: 80px;
}
</style>
