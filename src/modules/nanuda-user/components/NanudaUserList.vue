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
        </b-col>-->
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
      <div>
        <b-button variant="primary" v-b-modal.add_user>
          사용자 추가
        </b-button>
      </div>
    </div>
    <div v-if="!dataLoading" class="border table-responsive">
      <table class="table table-hover table-sm text-center table-nowrap">
        <colgroup>
          <col width="60" />
          <col width="auto" />
          <col width="auto" />
          <col width="200" />
          <col width="150" />
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
              사용자명
            </th>
            <th
              scope="col"
              v-bind:class="{ highlighted: nanudaUserSearchDto.phone }"
            >
              휴대폰 번호
            </th>
            <th scope="col">가입일</th>
            <!-- <th scope="col"></th> -->
          </tr>
        </thead>
        <tbody v-if="nanudaUserListCount">
          <tr
            v-for="user in nanudaUserList"
            :key="user.no"
            @click="$router.push(`/nanuda-user/${user.no}`)"
            style="cursor:pointer;"
          >
            <th scope="row">{{ user.no }}</th>
            <td>{{ user.name }}</td>
            <td>{{ user.phone | phoneTransformer }}</td>
            <td>{{ user.createdAt | dateTransformer }}</td>
            <!-- <td>
              <router-link
                class="btn btn-sm btn-secondary text-nowrap"
                :to="{
                  name: 'NanudaUserDetail',
                  params: {
                    id: user.no,
                  },
                }"
                >상세보기</router-link
              >
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>
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
    <b-modal
      id="add_user"
      title="사용자 추가"
      ok-title="추가"
      cancel-title="취소"
      @ok="createUser()"
      @cancel="clearOutCreateDto()"
      @hide="clearOutCreateDto()"
    >
      <b-form-row>
        <b-col cols="6" class="mt-2">
          <label>
            이름
            <span class="red-text">*</span>
          </label>
          <input
            type="text"
            v-model="nanudaUserCreateDto.name"
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
            v-model="nanudaUserCreateDto.phone"
            class="form-control"
          />
        </b-col>
        <b-col cols="12" class="mt-2">
          <b-form-checkbox
            v-model="nanudaUserCreateDto.infoYn"
            :value="yn[0]"
            :unchecked-value="yn[1]"
            >개인정보 취급방침 동의</b-form-checkbox
          >
        </b-col>
        <b-col cols="12" class="mt-2">
          <b-form-checkbox
            v-model="nanudaUserCreateDto.serviceYn"
            :value="yn[0]"
            :unchecked-value="yn[1]"
            >이용약관 동의</b-form-checkbox
          >
        </b-col>
        <b-col cols="12" class="mt-2">
          <b-form-checkbox
            v-model="nanudaUserCreateDto.marketYn"
            :value="yn[0]"
            :unchecked-value="yn[1]"
            >마케팅활용 동의</b-form-checkbox
          >
        </b-col>
      </b-form-row>
    </b-modal>
  </section>
</template>
<script lang="ts">
import Component from 'vue-class-component';
import BaseComponent from '@/core/base.component';
import { NanudaUserDto, NanudaUserListDto } from '@/dto';
import NanudaUserService from '../../../services/nanuda-user.service';
import { CONST_YN, Pagination, YN } from '@/common';
import { BaseUser } from '@/services/shared/auth';
import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'NanudaUserList',
})
export default class NanudaUserList extends BaseComponent {
  private nanudaUserList: NanudaUserDto[] = [];
  private nanudaUserListCount = 0;
  private nanudaUserSearchDto = new NanudaUserListDto();
  private nanudaUserCreateDto = new NanudaUserDto(BaseUser);
  private pagination = new Pagination();
  private dataLoading = false;
  private yn: YN[] = [...CONST_YN];

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

  createUser() {
    NanudaUserService.create(this.nanudaUserCreateDto).subscribe(res => {
      if (res) {
        toast.success('추가완료');
        this.search();
      }
    });
  }

  clearOutCreateDto() {
    this.nanudaUserCreateDto = new NanudaUserDto(BaseUser);
  }

  created() {
    this.search();
  }
}
</script>
