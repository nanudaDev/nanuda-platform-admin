<template>
  <b-modal
    id="add_nanuda_user"
    title="사용자 추가하기"
    @hide="cancelSelection()"
    @cancel="cancelSelection()"
    @ok="findNanudaUser()"
  >
    <div class="search-box mb-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col cols="6">
          <label>이름</label>
          <b-form-input v-model="nanudaUserSearchDto.name" />
        </b-col>
        <b-col cols="6">
          <label>전화번호</label>
          <b-form-input v-model="nanudaUserSearchDto.phone" />
        </b-col>
      </b-form-row>
      <b-row align-h="center" class="mt-3">
        <b-btn-group>
          <b-button variant="primary" @click="clearOut()">초기화</b-button>
          <b-button variant="success" @click="search()">검색</b-button>
        </b-btn-group>
      </b-row>
    </div>
    <div class="table-top">
      <div class="totla-count">
        <h5>
          <span>TOTAL </span>
          <strong class="text-primary">{{ nanudaUserListCount }}</strong>
        </h5>
      </div>
    </div>
    <table class="table table-sm tabl-bordered text-center">
      <thead>
        <tr>
          <th scope="col">NAME</th>
          <th scope="col">PHONE</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in nanudaUserList" :key="user.no">
          <td>{{ user.name }}</td>
          <td>{{ user.phone | phoneTransformer }}</td>
          <td class="text-center">
            <button class="btn btn-primary" @click="selectUser(user)">
              선택
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="selectedUser.name"
      class="py-2 px-4 rounded mt-2"
      style="background-color:#f1f1f1"
    >
      선택한 사용자 :
      <b>{{ selectedUser.name }}</b>
    </div>
    <b-pagination
      v-model="pagination.page"
      v-if="nanudaUserListCount"
      pills
      :total-rows="nanudaUserListCount"
      :per-page="pagination.limit"
      @input="paginateSearch"
      class="mt-4 justify-content-center"
    ></b-pagination>
  </b-modal>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import Component from 'vue-class-component';
import { NanudaUserDto, NanudaUserListDto } from '../../../dto';
import NanudaUserService from '../../../services/nanuda-user.service';
import { BaseUser } from '@/services/shared/auth';
import { Pagination } from '@/common';

@Component({
  name: 'NanudaUserList',
})
export default class NanudaUserCreate extends BaseComponent {
  private nanudaUserList: NanudaUserDto[] = [];
  private nanudaUserSearchDto = new NanudaUserListDto();
  private nanudaUserListCount = 0;
  private selectedUser: NanudaUserDto = new NanudaUserDto(BaseUser);
  private pagination = new Pagination();

  search(isPagination?: boolean) {
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.pagination.limit = 5;
    NanudaUserService.findAll(
      this.nanudaUserSearchDto,
      this.pagination,
    ).subscribe(res => {
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

  cancelSelection() {
    this.selectedUser = new NanudaUserDto(BaseUser);
    this.clearOut();
  }

  paginateSearch() {
    this.search(true);
  }

  // 사용자 추가
  selectUser(user: NanudaUserDto) {
    this.selectedUser = user;
  }

  findNanudaUser() {
    if (this.selectedUser) {
      this.$root.$emit('select_nanuda_user', this.selectedUser);
    }
  }

  created() {
    this.search();
  }

  mounted() {
    this.$root.$on('find_nanuda_user', () => {
      this.search();
    });
  }
}
</script>
