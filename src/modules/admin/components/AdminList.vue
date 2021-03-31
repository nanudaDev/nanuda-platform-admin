<template>
  <section>
    <SectionTitle title="관리자 관리" divider></SectionTitle>
    <div class="search-box my-4" v-on:keyup.enter="search(true, true)">
      <b-form-row>
        <b-col cols="12" sm="6" md="3">
          <b-form-group label="ID">
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
              <b-form-select-option>전체</b-form-select-option>
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
          <b-button variant="primary" @click="search(true, true)"
            >검색</b-button
          >
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
              @click="findOne(admin.no)"
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
      <div class="half-circle-spinner py-4">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
      </div>
    </template>
    <!-- 관리자 추가 모달 -->
    <b-modal
      id="add_admin"
      title="관리자 추가"
      ok-title="추가"
      cancel-title="취소"
      @ok="createAdmin()"
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
import SpaceTypeService from '@/services/space-type.service';
import { AdminDto, AdminListDto, SpaceTypeDto } from '@/dto';
import { Pagination } from '@/common';
import { ReverseQueryParamMapper } from '@/core';
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
  private searchPramsDto: any = {};

  // search admin
  search(isPagination?: boolean, isSearch?: boolean) {
    this.dataLoading = false;
    if (!isPagination) {
      this.pagination.page = 1;
    } else {
      if (isSearch) this.pagination.page = 1;
      this.searchPramsDto = Object.assign(this.adminSearchDto, this.pagination);
    }
    AdminService.findAll(this.adminSearchDto, this.pagination).subscribe(
      res => {
        if (res) {
          this.dataLoading = false;
          this.adminList = res.data.items;
          this.adminTotalCount = res.data.totalCount;
          this.$router.push({
            query: this.searchPramsDto,
          });
        }
      },
    );
  }

  // find brand detail
  findOne(id) {
    this.$router.push(`/admin/${id}`);
  }

  clearOut() {
    this.adminSearchDto = new AdminListDto();
    this.$router.replace({ query: null });
  }

  clearOutCreateDto() {
    this.adminCreateDto = new AdminDto(BaseUser);
  }

  findSpaceType() {
    SpaceTypeService.findForSelect().subscribe(res => {
      this.spaceTypes = res.data;
    });
  }

  createAdmin() {
    AdminService.create(this.adminCreateDto).subscribe(res => {
      if (res) {
        toast.success('추가완료');
        this.clearOut();
      }
    });
  }

  created() {
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.adminSearchDto = query;
      this.pagination.limit = +query.limit;
      this.pagination.page = +query.page;
      this.search(true);
    } else {
      this.search();
    }
    this.findSpaceType();
  }
}
</script>
