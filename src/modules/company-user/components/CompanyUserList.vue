<template>
  <section>
    <SectionTitle title="업체 사용자 관리" divider></SectionTitle>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col cols="12" md="4" lg="3">
          <b-form-group label="업체명">
            <b-form-input
              list="company_lsit"
              v-model="companyUserSearchDto.companyNameKr"
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
        <b-col cols="12" md="4" lg="3">
          <b-form-group label="이름">
            <b-form-input v-model="companyUserSearchDto.name" />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="4" lg="3">
          <b-form-group label="휴대폰 번호">
            <b-form-input v-model="companyUserSearchDto.phone" />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="4" lg="3">
          <b-form-group label="이메일">
            <b-form-input v-model="companyUserSearchDto.email" />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="4" lg="3">
          <label>승인 상태</label>
          <b-form-select v-model="companyUserSearchDto.companyUserStatus">
            <b-form-select-option value>전체</b-form-select-option>
            <b-form-select-option
              v-for="status in approvalStatus"
              :key="status"
              :value="status"
              >{{ status | enumTransformer }}</b-form-select-option
            >
          </b-form-select>
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
          <strong class="text-primary">{{ companyUserTotalCount }}</strong>
        </h5>
      </div>
      <b-button
        variant="primary"
        v-b-modal.add_company_user
        @click="clearOutCompanyUserDto()"
        >업체 사용자 추가</b-button
      >
    </div>
    <template v-if="!dataLoading">
      <div class="bg-white table-responsive">
        <table
          class="table table-hover table-sm text-center table-nowrap"
          v-if="companyUserTotalCount"
        >
          <thead>
            <tr>
              <th
                scope="col"
                v-bind:class="{ highlighted: companyUserSearchDto.no }"
              >
                ID
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: companyUserSearchDto.companyNameKr,
                }"
              >
                업체명
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: companyUserSearchDto.name,
                }"
              >
                이름
              </th>
              <th
                scope="col"
                v-bind:class="{ highlighted: companyUserSearchDto.phone }"
              >
                휴대폰 번호
              </th>
              <th
                scope="col"
                v-bind:class="{ highlighted: companyUserSearchDto.email }"
              >
                이메일
              </th>
              <th scope="col">등록일</th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: companyUserSearchDto.companyUserStatus,
                }"
              >
                승인 상태
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="companyUser in companyUserList"
              :key="companyUser.no"
              @click="$router.push(`/company/company-user/${companyUser.no}`)"
              style="cursor:pointer;"
            >
              <th scope="row">{{ companyUser.no }}</th>
              <td class="text-nowrap">{{ companyUser.company.nameKr }}</td>
              <td class="text-nowrap">
                <strong
                  class="text-danger"
                  v-if="companyUser.authCode === companyUserAdminRole[0]"
                  >M</strong
                >
                {{ companyUser.name }}
              </td>
              <td class="text-nowrap">
                {{ companyUser.phone | phoneTransformer }}
              </td>
              <td>{{ companyUser.email }}</td>
              <td>{{ companyUser.createdAt | dateTransformer }}</td>
              <td>
                <b-badge
                  :variant="getStatusColor(companyUser.companyUserStatus)"
                  class="badge-pill p-2 mr-2"
                  >{{ companyUser.codeManagement.value }}</b-badge
                >
              </td>
            </tr>
          </tbody>
        </table>
        <div class="empty-data border" v-else>검색결과가 없습니다.</div>
      </div>
      <b-pagination
        v-model="pagination.page"
        v-if="companyUserTotalCount"
        pills
        :total-rows="companyUserTotalCount"
        :per-page="pagination.limit"
        @input="paginateSearch()"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </template>
    <template v-else>
      <div class="my-5 py-5">
        <div class="half-circle-spinner">
          <div class="circle circle-1"></div>
          <div class="circle circle-2"></div>
        </div>
      </div>
    </template>
    <!--사용자 추가 모달 -->
    <b-modal
      id="add_company_user"
      title="업체 사용자 추가"
      ok-title="추가"
      cancel-title="취소"
      @ok="createCompanyUser()"
    >
      <div class="form-row">
        <div class="col-12 col-md-6">
          <label>
            이름
            <span class="red-text">*</span>
          </label>
          <input
            type="text"
            v-model="companyUserCreateDto.name"
            class="form-control"
          />
        </div>
        <div class="col-12 col-md-6">
          <label>
            휴대폰 번호
            <span class="red-text">*</span>
          </label>
          <input
            type="text"
            v-model="companyUserCreateDto.phone"
            class="form-control"
          />
        </div>
      </div>
      <div class="form-row mt-3">
        <div class="col-12 col-md-6">
          <label for="password">
            비밀번호
            <span class="red-text">*</span>
          </label>
          <input
            type="password"
            class="form-control"
            v-model="companyUserCreateDto.password"
          />
        </div>
        <div class="col-12 col-md-6">
          <label for="password">
            비밀번호 확인
            <span class="red-text">*</span>
          </label>
          <input
            type="password"
            class="form-control"
            v-model="companyUserCreateDto.passwordConfirm"
          />
        </div>
      </div>
      <div class="form-row mt-3">
        <div class="col-12 col-md-6">
          <label>
            이메일
            <span class="red-text">*</span>
          </label>
          <input
            type="text"
            v-model="companyUserCreateDto.email"
            class="form-control"
          />
        </div>
        <div class="col-12 col-md-6">
          <label>
            업체명 (등록 가능한)
            <span class="red-text">*</span>
          </label>
          <select
            class="custom-select"
            v-model="companyUserCreateDto.companyNo"
          >
            <option
              v-for="company in availableCompanySelect"
              :key="company.no"
              :value="company.no"
              >{{ company.nameKr }}</option
            >
          </select>
        </div>
      </div>
      <div class="form-row mt-3">
        <div class="col-12 col-md-6">
          <label>
            관리자 등급
            <span class="red-text">*</span>
          </label>
          <select class="custom-select" v-model="companyUserCreateDto.authCode">
            <option
              v-for="role in companyUserAdminRole"
              :key="role"
              :value="role"
              >{{ role | enumTransformer }}</option
            >
          </select>
        </div>
        <div class="col-12 col-md-6">
          <label>
            승인 상태
            <span class="red-text">*</span>
          </label>
          <select
            class="custom-select"
            v-model="companyUserCreateDto.companyUserStatus"
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
      </div>
    </b-modal>
  </section>
</template>
<script lang="ts">
import { BaseUser } from '../../../services/shared/auth';
import BaseComponent from '../../../core/base.component';
import { Component } from 'vue-property-decorator';
import { CompanyUserListDto, CompanyUserDto, CompanyDto } from '../../../dto';
import { Pagination } from '../../../common';
import CompanyUserService from '../../../services/company-user.service';
import CompanyService from '../../../services/company.service';
import {
  CONST_APPROVAL_STATUS,
  APPROVAL_STATUS,
  COMPANY_USER,
  CONST_COMPANY_USER,
} from '../../../services/shared';

import { getStatusColor } from '../../../core/utils/status-color.util';
import toast from '../../../../resources/assets/js/services/toast.js';
import {
  ClearOutQueryParamMapper,
  ReverseQueryParamMapper,
  RouterQueryParamMapper,
} from '@/core';

@Component({
  name: 'CompanyUserList',
})
export default class Company extends BaseComponent {
  private companyUserSearchDto = new CompanyUserListDto();
  private companyUserList: CompanyUserDto[] = Array<CompanyUserDto>();
  private companyUserTotalCount = null;
  private companySelect: CompanyDto[] = [];
  private availableCompanySelect: CompanyDto[] = [];
  private companyUserCreateDto = new CompanyUserDto(BaseUser);
  private pagination = new Pagination();
  private approvalStatus: APPROVAL_STATUS[] = [...CONST_APPROVAL_STATUS];
  private companyUserAdminRole: COMPANY_USER[] = [...CONST_COMPANY_USER];
  private dataLoading = false;

  // get status color
  getStatusColor(status: APPROVAL_STATUS) {
    return getStatusColor(status);
  }

  // TODO: Create autocomplete box
  getCompanies() {
    CompanyService.findAllForSelect().subscribe(res => {
      this.companySelect = res.data;
    });
  }

  getAvailableCompanies() {
    CompanyService.findForSelect().subscribe(res => {
      this.availableCompanySelect = res.data;
    });
  }

  paginateSearch() {
    this.findAll(true);
  }

  search() {
    this.findAll(true, true);
  }

  clearOut() {
    this.companyUserSearchDto = new CompanyUserListDto();
    ClearOutQueryParamMapper();
  }

  clearOutCompanyUserDto() {
    this.companyUserCreateDto = new CompanyUserDto(BaseUser);
  }

  findAll(isPagination?: boolean, isSearch?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    } else {
      if (isSearch) this.pagination.page = 1;
      RouterQueryParamMapper(this.companyUserSearchDto, this.pagination);
    }
    CompanyUserService.findAll(
      this.companyUserSearchDto,
      this.pagination,
    ).subscribe(res => {
      if (res) {
        this.dataLoading = false;
        this.companyUserList = res.data.items;
        this.companyUserTotalCount = res.data.totalCount;
      }
    });
  }

  // 사용자 생성
  createCompanyUser() {
    CompanyUserService.createCompanyUser(this.companyUserCreateDto).subscribe(
      res => {
        if (res) {
          toast.success('추가완료');
          this.findAll();
        }
      },
    );
  }

  created() {
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.companyUserSearchDto = query;
      if (query.limit !== 'NaN' && query.page !== '' && query.page !== '0') {
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
    this.getAvailableCompanies();
  }
}
</script>
