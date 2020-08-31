<template>
  <section>
    <div class="title pb-2 mb-2">
      <h3>사용자 관리</h3>
    </div>
    <div class="divider"></div>
    <div class="serach-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <!-- <b-col cols="6" md="2" class="mb-2">
          <label for="user_no">사용자 ID</label>
          <input
            type="text"
            class="form-control"
            id="user_no"
            v-model="nanudaUserSearchDto.no"
          />
        </b-col> -->
        <b-col cols="6" md="2" class="mb-3">
          <label>사용자명</label>
          <input
            type="text"
            class="form-control"
            v-model="nanudaUserSearchDto.name"
          />
        </b-col>
        <b-col cols="6" md="3" class="mb-3">
          <label>사용자 휴대폰 번호</label>
          <input
            type="text"
            class="form-control"
            v-model="nanudaUserSearchDto.phone"
          />
        </b-col>
      </b-form-row>
      <div class="text-center">
        <div class="btn-group mb-4">
          <button class="btn btn-primary" @click="clearOut()">초기화</button>
          <button class="btn btn-success" @click="search()">검색</button>
        </div>
      </div>
    </div>
    <div class="table-top">
      <div class="total-count">
        <h5>
          <span>TOTAL</span>
          <strong class="text-primary">{{ nanudaUserListCount }}</strong>
        </h5>
      </div>
    </div>
    <table
      class="table table-bordered table-hover table-sm text-center table-nowrap"
      v-if="!dataLoading"
    >
      <colgroup>
        <col width="60" />
        <col width="auto" />
        <col width="auto" />
        <col width="200" />
      </colgroup>
      <thead>
        <tr>
          <th
            scope="col"
            v-bind:class="{ highlighted: nanudaUserSearchDto.no }"
          >
            ID
          </th>
          <th
            scope="col"
            v-bind:class="{
              highlighted: nanudaUserSearchDto.name,
            }"
          >
            NAME
          </th>
          <th
            scope="col"
            v-bind:class="{ highlighted: nanudaUserSearchDto.phone }"
          >
            PHONE
          </th>
          <th scope="col">CREATED</th>
        </tr>
      </thead>
      <tbody v-if="nanudaUserListCount">
        <tr v-for="user in nanudaUserList" :key="user.no">
          <th scope="row">{{ user.no }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.phone | phoneTransformer }}</td>
          <td>
            {{ user.createdAt | dateTransformer }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="empty-data border">검색결과가 없습니다.</div>
    <b-pagination
      v-model="pagination.page"
      v-if="nanudaUserListCount"
      pills
      :total-rows="nanudaUserListCount"
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
import Component from 'vue-class-component';
import BaseComponent from '@/core/base.component';
import { NanudaUserDto, NanudaUserListDto } from '@/dto';
import NanudaUserService from '../../../services/nanuda-user.service';
import { Pagination } from '@/common';

@Component({
  name: 'NanudaUserList',
})
export default class NanudaUserList extends BaseComponent {
  private nanudaUserList: NanudaUserDto[] = [];
  private nanudaUserListCount = 0;
  private nanudaUserSearchDto = new NanudaUserListDto();
  private pagination = new Pagination();
  private dataLoading = false;

  search(isPagination?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.pagination.limit = 20;
    NanudaUserService.findAll(
      this.nanudaUserSearchDto,
      this.pagination,
    ).subscribe(res => {
      this.dataLoading = false;
      if (res) {
        this.nanudaUserList = res.data.items;
        this.nanudaUserListCount = res.data.totalCount;
      }
    });
  }

  clearOut() {
    this.pagination.page = 1;
    this.nanudaUserSearchDto = new NanudaUserListDto();
    this.search();
  }

  paginateSearch() {
    this.search(true);
  }

  created() {
    this.search();
  }
}
</script>
