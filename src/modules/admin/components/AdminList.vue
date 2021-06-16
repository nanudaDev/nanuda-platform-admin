<template>
  <section>
    <SectionTitle title="관리자 관리" divider></SectionTitle>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col cols="12" sm="6" md="3">
          <b-form-group label="관리자 ID">
            <b-form-input v-model="adminSearchDto.no"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6" md="3">
          <b-form-group label="이름">
            <b-form-input v-model="adminSearchDto.name"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6" md="3">
          <b-form-group label="휴대폰 번호">
            <b-form-input v-model="adminSearchDto.phone"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6" md="3">
          <b-form-group label="담당 공유주방">
            <b-form-select id="space_type" v-model="adminSearchDto.spaceTypeNo">
              <b-form-select-option value>전체</b-form-select-option>
              <b-form-select-option
                v-for="spaceType in spaceTypes"
                :key="spaceType.no"
                :value="spaceType.no"
                >{{ spaceType.name }}</b-form-select-option
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
    <div class="table-top">
      <div class="total-count">
        <h5>
          <span>TOTAL</span>
          <strong class="text-primary">{{ adminTotalCount }}</strong>
        </h5>
      </div>
      <div class="text-right">
        <b-button variant="primary" v-b-modal.add_admin>관리자 추가</b-button>
      </div>
    </div>
    <template v-if="!dataLoading">
      <div class="bg-white table-responsive">
        <table class="table table-sm table-hover" v-if="adminTotalCount">
          <thead>
            <th
              scope="row"
              v-bind:class="{
                highlighted: adminSearchDto.no,
              }"
            >
              ID
            </th>
            <th
              scope="row"
              v-bind:class="{
                highlighted: adminSearchDto.name,
              }"
            >
              이름
            </th>
            <th
              scope="row"
              v-bind:class="{
                highlighted: adminSearchDto.phone,
              }"
            >
              휴대폰 번호
            </th>
            <th
              scope="row"
              v-bind:class="{
                highlighted: adminSearchDto.spaceTypeNo,
              }"
            >
              담당 공유주방
            </th>
          </thead>
          <tbody>
            <tr
              v-for="admin in adminList"
              :key="admin.no"
              @click="$router.push(`/admin/${admin.no}`)"
              style="cursor:pointer"
            >
              <td>{{ admin.no }}</td>
              <td>{{ admin.name }}</td>
              <td>{{ admin.phone | phoneTransformer }}</td>
              <td>
                <template v-if="admin.spaceTypeNo">
                  {{ admin.spaceType.name }}
                </template>
                <template v-else>
                  -
                </template>
              </td>
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
    </template>
    <template v-else>
      <div class="loading-spinner">
        <div class="half-circle-spinner">
          <div class="circle circle-1"></div>
          <div class="circle circle-2"></div>
        </div>
      </div>
    </template>
    <!-- 관리자 추가 모달 -->
    <b-modal
      id="add_admin"
      title="관리자 추가"
      hide-footer
      no-close-on-backdrop
      @hide="clearOutCreateDto()"
    >
      <b-form ref="form" @submit.stop.prevent="createAdmin()">
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
        <div class="text-right pt-3 mt-4 border-top">
          <b-button variant="secondary" @click="clearOutCreateDto()"
            >취소</b-button
          >
          <b-button type="submit" variant="primary">추가</b-button>
        </div>
      </b-form>
    </b-modal>
  </section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import AdminService from '@/services/admin.service';
import SpaceTypeService from '@/services/space-type.service';
import { AdminDto, AdminListDto, SpaceTypeDto } from '@/dto';
import { Pagination } from '@/common';
import {
  ClearOutQueryParamMapper,
  ReverseQueryParamMapper,
  RouterQueryParamMapper,
} from '@/core';
import { BaseUser } from '@/services/shared/auth';
import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'AdminList',
})
export default class AdminList extends BaseComponent {
  private adminList: AdminDto[] = [];
  private adminSearchDto = new AdminListDto();
  private pagination = new Pagination();
  private adminCreateDto = new AdminDto(BaseUser);
  private adminTotalCount = null;
  private dataLoading = false;
  private spaceTypes: SpaceTypeDto[] = [];
  private searchQueryParamsDto: any = {};

  // findAll admin
  findAll(isPagination?: boolean, isSearch?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    } else {
      if (isSearch) this.pagination.page = 1;
      RouterQueryParamMapper(this.adminSearchDto, this.pagination);
    }
    AdminService.findAll(this.adminSearchDto, this.pagination).subscribe(
      res => {
        if (res) {
          this.dataLoading = false;
          this.adminList = res.data.items;
          this.adminTotalCount = res.data.totalCount;
        }
      },
    );
  }

  // search admin
  search() {
    this.findAll(true, true);
  }

  // pagination
  paginateSearch() {
    this.findAll(true);
  }

  // clearout search dto
  clearOut() {
    if (location.search) {
      ClearOutQueryParamMapper();
    } else {
      this.adminSearchDto = new AdminListDto();
      this.findAll();
    }
  }

  // get space type
  getSpaceTypes() {
    SpaceTypeService.findForSelect().subscribe(res => {
      this.spaceTypes = res.data;
    });
  }

  // create admin
  createAdmin() {
    AdminService.create(this.adminCreateDto).subscribe(res => {
      if (res) {
        toast.success('추가완료');
        this.clearOut();
      }
    });
  }

  // clearout create dto
  clearOutCreateDto() {
    this.adminCreateDto = new AdminDto(BaseUser);
    this.$bvModal.hide('add_admin');
  }

  created() {
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.adminSearchDto = query;
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
    this.getSpaceTypes();
  }
}
</script>
