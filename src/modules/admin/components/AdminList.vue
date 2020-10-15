<template>
  <section>
    <SectionTitle title="관리자 관리" divider></SectionTitle>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <div class="col-sm-4 col-lg-3 mb-3">
          <b-form-group label="ID">
            <b-form-input v-model="adminListDto.no"></b-form-input>
          </b-form-group>
        </div>
        <div class="col-sm-4 col-lg-3 mb-3">
          <b-form-group label="이름">
            <b-form-input v-model="adminListDto.name"></b-form-input>
          </b-form-group>
        </div>
        <div class="col-sm-4 col-lg-3 mb-3">
          <b-form-group label="휴대폰 번호">
            <b-form-input v-model="adminListDto.phone"></b-form-input>
          </b-form-group>
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
          <strong class="text-primary">{{ adminTotalCount }}</strong>
        </h5>
      </div>
      <b-button variant="primary" v-b-modal.add_admin>관리자 추가</b-button>
    </div>
    <div v-if="!dataLoading" class="table-bordered table-responsive">
      <table class="table table-sm table-hover" v-if="adminTotalCount">
        <thead>
          <th
            scope="row"
            v-bind:class="{
              highlighted: adminListDto.no,
            }"
          >
            NO
          </th>
          <th
            scope="row"
            v-bind:class="{
              highlighted: adminListDto.name,
            }"
          >
            이름
          </th>
          <th
            scope="row"
            v-bind:class="{
              highlighted: adminListDto.phone,
            }"
          >
            휴대폰 번호
          </th>
        </thead>
        <tbody>
          <tr
            v-for="admin in adminList"
            :key="admin.no"
            @click="findOne(admin.no)"
            style="cursor:pointer"
          >
            <td>{{ admin.no }}</td>
            <td>{{ admin.name }}</td>
            <td>{{ admin.phone | phoneTransformer }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else class="empty-data border">검색결과가 없습니다.</div>
    </div>
    <b-pagination
      v-model="pagination.page"
      v-if="adminTotalCount"
      pills
      :total-rows="adminTotalCount"
      :per-page="pagination.limit"
      @input="paginateSearch()"
      class="mt-4 justify-content-center"
    ></b-pagination>
    <div class="half-circle-spinner mt-5" v-if="dataLoading">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
    <b-modal
      id="add_admin"
      title="관리자 추가"
      ok-title="추가"
      cancel-title="취소"
      size="sm"
      @ok="create()"
      @cancel="clearOutCreateDto()"
      @hide="clearOutCreateDto()"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-row>
          <b-col cols="6" class="mt-2">
            <label>
              이름
              <span class="red-text">*</span>
            </label>
            <input
              type="text"
              v-model="adminCreateDto.name"
              class="form-control"
            />
          </b-col>
          <b-col cols="6" class="mt-2">
            <label>
              휴대폰 번호
              <span class="red-text">*</span>
            </label>
            <input
              type="text"
              v-model="adminCreateDto.phone"
              class="form-control"
            />
          </b-col>
          <b-col cols="6" class="mt-2">
            <label>
              비밀번호
              <span class="red-text">*</span>
            </label>
            <input
              type="password"
              v-model="adminCreateDto.password"
              class="form-control"
            />
          </b-col>
          <b-col cols="6" class="mt-2">
            <label>
              비밀번호 확인
              <span class="red-text">*</span>
            </label>
            <input
              type="password"
              v-model="adminCreateDto.passwordConfirm"
              class="form-control"
            />
          </b-col>
        </b-form-row>
      </form>
    </b-modal>
  </section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import AdminService from '@/services/admin.service';
import { AdminDto, AdminListDto } from '@/dto';
import { Pagination } from '@/common';
import { ReverseQueryParamMapper } from '@/core';
import { BaseUser } from '@/services/shared/auth';

@Component({
  name: 'AdminList',
})
export default class AdminList extends BaseComponent {
  private adminList: AdminDto[] = [];
  private adminListDto = new AdminListDto();
  private pagination = new Pagination();
  private adminCreateDto = new AdminDto(BaseUser);
  private adminTotalCount = null;
  private dataLoading = true;

  search(isPagination?: boolean) {
    if (!isPagination) {
      this.dataLoading = false;
      this.pagination.page = 1;
    }
    AdminService.findAll(this.adminListDto, this.pagination).subscribe(res => {
      this.adminList = res.data.items;
      this.adminTotalCount = res.data.totalCount;
    });
  }

  clearOut() {
    this.adminListDto = new AdminListDto();
    this.pagination = new Pagination();
  }

  clearOutCreateDto() {
    this.adminCreateDto = new AdminDto(BaseUser);
  }

  create() {
    AdminService.create(this.adminCreateDto).subscribe(res => {
      this.adminCreateDto = new AdminDto(BaseUser);
      this.search();
    });
  }

  created() {
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.adminListDto = query;
    }
    this.search();
  }
}
</script>