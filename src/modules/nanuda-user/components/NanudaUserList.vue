<template>
  <section>
    <SectionTitle title="사용자 관리" divider></SectionTitle>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col cols="12" sm="6" md="3" class="mb-3">
          <label for="user_no">사용자 ID</label>
          <input
            type="text"
            class="form-control"
            id="user_no"
            v-model="nanudaUserSearchDto.no"
          />
        </b-col>
        <b-col cols="12" sm="6" md="3" class="mb-3">
          <label>사용자명</label>
          <input
            type="text"
            class="form-control"
            v-model="nanudaUserSearchDto.name"
          />
        </b-col>
        <b-col cols="12" sm="6" md="3" class="mb-3">
          <label>휴대폰 번호</label>
          <input
            type="text"
            class="form-control"
            v-model="nanudaUserSearchDto.phone"
          />
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
          <strong class="text-primary">{{ nanudaUserTotalCount }}</strong>
        </h5>
      </div>
      <div class="text-right">
        <b-button variant="primary" v-b-modal.add_user>
          사용자 추가
        </b-button>
      </div>
    </div>
    <template v-if="!dataLoading">
      <div class="bg-white table-responsive">
        <table
          class="table table-hover table-sm text-center table-nowrap"
          v-if="nanudaUserTotalCount"
        >
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
          <tbody>
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
        <div v-else class="empty-data border">검색결과가 없습니다.</div>
      </div>
      <b-pagination
        v-model="pagination.page"
        v-if="nanudaUserTotalCount"
        pills
        :total-rows="nanudaUserTotalCount"
        :per-page="pagination.limit"
        @input="paginateSearch"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </template>
    <template v-else>
      <div class="half-circle-spinner py-4">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
      </div>
    </template>
    <!-- 사용자 추가 모달 -->
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
import { ReverseQueryParamMapper } from '@/core';

@Component({
  name: 'NanudaUserList',
})
export default class NanudaUserList extends BaseComponent {
  private nanudaUserList: NanudaUserDto[] = [];
  private nanudaUserTotalCount = 0;
  private nanudaUserSearchDto = new NanudaUserListDto();
  private nanudaUserCreateDto = new NanudaUserDto(BaseUser);
  private pagination = new Pagination();
  private dataLoading = false;
  private yn: YN[] = [...CONST_YN];
  private searchPramsDto: any = {};

  // find All Nanuda user
  findAll(isPagination?: boolean, isSearch?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    } else {
      if (isSearch) this.pagination.page = 1;
      this.searchPramsDto = Object.assign(
        this.nanudaUserSearchDto,
        this.pagination,
      );
    }
    NanudaUserService.findAll(
      this.nanudaUserSearchDto,
      this.pagination,
    ).subscribe(res => {
      this.dataLoading = false;
      if (res) {
        this.nanudaUserList = res.data.items;
        this.nanudaUserTotalCount = res.data.totalCount;
        this.$router.push({
          query: this.searchPramsDto,
        });
      }
    });
  }

  // search nanuda user
  search() {
    this.findAll(true, true);
  }

  // clearout search dto
  clearOut() {
    this.nanudaUserSearchDto = new NanudaUserListDto();
    this.$router.push({ query: null });
  }

  // pagination
  paginateSearch() {
    this.findAll(true);
  }

  // create nanuda user
  createUser() {
    NanudaUserService.create(this.nanudaUserCreateDto).subscribe(res => {
      if (res) {
        toast.success('추가완료');
        this.clearOut();
      }
    });
  }

  // clearout create dto
  clearOutCreateDto() {
    this.nanudaUserCreateDto = new NanudaUserDto(BaseUser);
  }

  created() {
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.nanudaUserSearchDto = query;
      this.pagination.limit = +query.limit;
      this.pagination.page = +query.page;
      this.paginateSearch();
    } else {
      this.findAll();
    }
  }
}
</script>
