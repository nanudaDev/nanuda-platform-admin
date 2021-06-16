<template>
  <section>
    <SectionTitle title="업체 관리" divider></SectionTitle>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col cols="6" md="4" lg="3">
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
        </b-col>
        <b-col cols="6" md="4" lg="3">
          <b-form-group label="대표자명">
            <b-form-input v-model="companySearchDto.ceoKr"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="4" lg="3">
          <b-form-group label="전화번호">
            <b-form-input v-model="companySearchDto.phone"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="4" lg="3">
          <b-form-group label="이메일">
            <b-form-input v-model="companySearchDto.email"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="4" lg="3">
          <b-form-group label="팩스">
            <b-form-input v-model="companySearchDto.fax"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="4" lg="3">
          <b-form-group label="승인 상태">
            <b-form-select
              class="custom-select"
              v-model="companySearchDto.companyStatus"
            >
              <b-form-select-option value>전체</b-form-select-option>
              <b-form-select-option
                v-for="status in approvalStatus"
                :key="status"
                :value="status"
                >{{ status | enumTransformer }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>
      <!-- second row -->
      <b-row align-h="center">
        <div>
          <b-button variant="secondary" @click="clearOut()">초기화</b-button>
          <b-button variant="primary" @click="search()">검색</b-button>
        </div>
      </b-row>
    </div>
    <div class="table-top flex-row-reverse">
      <div class="btn-wrap">
        <b-button
          variant="primary"
          v-b-modal.add_company
          @click="clearOutCompanyCreateDto()"
          >업체 추가</b-button
        >
      </div>
      <div class="total-count">
        <h5>
          <span>TOTAL</span>
          <strong class="text-primary">{{ companyTotalCount }}</strong>
        </h5>
      </div>
    </div>
    <template v-if="!dataLoading">
      <div class="bg-white table-responsive">
        <table
          class="table table-hover table-sm text-center table-nowrap"
          v-if="companyTotalCount"
        >
          <thead>
            <tr>
              <th
                scope="col"
                v-bind:class="{ highlighted: companySearchDto.no }"
              >
                ID
              </th>
              <th scope="col">로고</th>
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
            </tr>
          </thead>
          <tbody v-if="companyTotalCount">
            <tr
              v-for="company in companyList"
              :key="company.no"
              @click="$router.push(`/company/${company.no}`)"
              style="cursor:pointer"
            >
              <th scope="row">{{ company.no }}</th>
              <td>
                <template v-if="company.logo && company.logo[0]">
                  <b-img-lazy
                    :src="company.logo[0].endpoint"
                    :alt="company.nameKr"
                    style="max-height:60px; max-width:none;"
                    v-if="company.logo[0].endpoint"
                  />
                </template>
              </td>
              <td class="text-nowrap">{{ company.nameKr }}</td>
              <td class="text-nowrap">{{ company.ceoKr }}</td>
              <td class="text-nowrap">
                {{ company.phone | phoneTransformer }}
              </td>
              <td>{{ company.email }}</td>
              <td class="text-nowrap">{{ company.fax | phoneTransformer }}</td>
              <td class="text-nowrap">{{ company.address }}</td>
              <td>{{ company.createdAt | dateTransformer }}</td>
              <td>
                <b-badge
                  :variant="getStatusColor(company.companyStatus)"
                  class="badge-pill p-2 mr-2"
                  >{{ company.codeManagement.value }}</b-badge
                >
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="empty-data border">검색결과가 없습니다.</div>
      </div>
      <b-pagination
        v-model="pagination.page"
        v-if="companyTotalCount"
        pills
        :total-rows="companyTotalCount"
        :per-page="pagination.limit"
        @input="paginateSearch()"
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
      id="add_company"
      title="업체 추가"
      size="lg"
      hide-footer
      no-close-on-backdrop
    >
      <div v-if="companyLogo && companyLogo.length > 0">
        <div v-for="logo in companyLogo" :key="logo.endpoint">
          <img
            :src="logo.endpoint"
            class="rounded mx-auto d-block company-logo"
          />
        </div>
      </div>
      <b-form ref="form" @submit.stop.prevent="createCompany()">
        <b-form-row>
          <b-col cols="6" lg="3" class="mt-3">
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
          <b-col cols="6" lg="3" class="mt-3">
            <label>업체명(영문)</label>
            <input
              type="text"
              v-model="companyCreateDto.nameEng"
              class="form-control"
            />
          </b-col>
          <b-col cols="6" lg="3" class="mt-3">
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
          <b-col cols="6" lg="3" class="mt-3">
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
          <b-col cols="6" lg="3" class="mt-3">
            <label>FAX</label>
            <input
              type="text"
              v-model="companyCreateDto.fax"
              class="form-control"
            />
          </b-col>
          <b-col cols="6" lg="3" class="mt-3">
            <label>
              사업자번호
            </label>
            <input
              type="text"
              v-model="companyCreateDto.businessNo"
              class="form-control"
            />
          </b-col>
          <b-col cols="6" lg="3" class="mt-3">
            <label>
              대표자명
              <span class="red-text">*</span>
            </label>
            <input
              type="text"
              v-model="companyCreateDto.ceoKr"
              class="form-control"
            />
          </b-col>
          <b-col cols="6" lg="3" class="mt-3">
            <label>대표자명(영문)</label>
            <input
              type="text"
              v-model="companyCreateDto.ceoEng"
              class="form-control"
            />
          </b-col>
          <b-col lg="6" class="mt-3">
            <label>
              주소
            </label>
            <input
              type="text"
              v-model="addressData.address"
              class="form-control"
              v-on:keyup.tab="showAddressModal()"
              v-b-modal.postcode
            />
          </b-col>
          <b-col lg="6" class="mt-3">
            <label>
              상세 주소
            </label>
            <b-form-input
              v-model="addressData.addressDetail"
              :disabled="!addressData.address"
            />
          </b-col>
          <b-col cols="6" lg="6" class="mt-3">
            <label>웹사이트</label>
            <input
              type="text"
              v-model="companyCreateDto.website"
              class="form-control"
            />
          </b-col>
          <b-col lg="6" class="mt-3">
            <label>업체 로고</label>
            <b-form-file
              placeholder="파일 선택"
              ref="fileInput"
              @input="upload($event)"
            ></b-form-file>
          </b-col>
          <!-- <b-col lg="3" class="mt-3">
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
          </b-col> -->
        </b-form-row>
        <div class="text-right pt-3 mt-4 border-top">
          <b-button variant="secondary" @click="$bvModal.hide('add_company')"
            >취소</b-button
          >
          <b-button type="submit" variant="primary">추가</b-button>
        </div>
      </b-form>
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
import { CompanyListDto, CompanyDto, CompanyAddrssDataDto } from '../../../dto';
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
import { ClearOutQueryParamMapper, ReverseQueryParamMapper } from '@/core';
import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'CompanyList',
})
export default class CompanyList extends BaseComponent {
  constructor() {
    super();
  }
  private companySearchDto = new CompanyListDto();
  //   or you can set this value to an empty erray. either or
  //   private companyList: Array<CompanyDto>();
  private companyList: CompanyDto[] = [];
  private companyTotalCount = null;
  private companyCreateDto = new CompanyDto();
  private companySelect: CompanyDto[] = [];
  private pagination = new Pagination();
  private approvalStatus: APPROVAL_STATUS[] = [...CONST_APPROVAL_STATUS];
  private totalPage = 0;
  private dataLoading = false;
  // single file일 경우 치환자를 attachment으로 정한다
  private companyLogo: FileAttachmentDto[] = [];
  private addressData = new CompanyAddrssDataDto();
  private searchQueryParamsDto: any = {};

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

  findAll(isPagination?: boolean, isSearch?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    } else {
      if (isSearch) this.pagination.page = 1;
      this.searchQueryParamsDto = Object.assign(
        this.companySearchDto,
        this.pagination,
      );
    }

    CompanyService.findAll(this.companySearchDto, this.pagination).subscribe(
      res => {
        this.dataLoading = false;
        this.companyList = res.data.items;
        this.companyTotalCount = res.data.totalCount;
        this.totalPage = Math.ceil(
          this.companyTotalCount / this.pagination.limit,
        );
        this.$router
          .push({
            query: this.searchQueryParamsDto,
          })
          .catch(() => {
            //
          });
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
      this.companySearchDto = new CompanyListDto();
      this.findAll();
    }
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

  // create company
  createCompany() {
    if (this.companyLogo.length > 0) {
      this.companyCreateDto.logo = this.companyLogo;
    }
    this.companyCreateDto.address = `${this.addressData.address} ${this.addressData.addressDetail}`;
    // default status
    this.companyCreateDto.companyStatus = APPROVAL_STATUS.APPROVAL;

    CompanyService.createCompany(this.companyCreateDto).subscribe(res => {
      if (res) {
        toast.success('추가완료');
        this.clearOut();
        this.$bvModal.hide('add_company');
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
    this.addressData = new CompanyAddrssDataDto();
    this.companyLogo = [];
  }

  created() {
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.companySearchDto = query;
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
    this.getCompanies();
  }
}
</script>
<style lang="scss">
.company-logo {
  max-height: 80px;
}
</style>
