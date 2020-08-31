<template>
  <section>
    <div class="title pb-2 mb-2">
      <h3>공지사항 관리</h3>
    </div>
    <div class="divider"></div>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <div class="form-row">
        <div class="col-6 col-md-1 mb-3">
          <label for>공지사항 ID</label>
          <input
            type="text"
            class="form-control"
            v-model="noticeBoardListDto.no"
          />
        </div>
        <div class="col-6 col-md-2 mb-3">
          <label for>카테고리</label>
          <select
            class="custom-select"
            v-model="noticeBoardListDto.noticeBoardType"
          >
            <option
              v-for="noticeBoardType in noticeBoardTypes"
              :key="noticeBoardType"
              :value="noticeBoardType"
              >{{ noticeBoardType | enumTransformer }}</option
            >
          </select>
        </div>
        <div class="col-md-7 mb-3">
          <label for>제목</label>
          <input
            type="text"
            class="form-control"
            v-model="noticeBoardListDto.title"
          />
        </div>
        <!-- <div class="col-md-4 mb-3">
          <label for>URL</label>
          <input
            type="text"
            class="form-control"
            v-model="noticeBoardListDto.url"
          />
        </div> -->
        <div class="col-md-2 mb-3">
          <label for>관리자명</label>
          <template>
            <b-form-input
              list="food-category-list"
              id="hope_food_category"
              v-model="noticeBoardListDto.adminName"
            ></b-form-input>
            <datalist id="food-category-list">
              <option
                v-for="admin in adminList.items"
                :key="admin.no"
                :value="admin.name"
                >{{ admin.name }}</option
              >
            </datalist>
          </template>
        </div>
      </div>
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
          <strong class="text-primary">
            {{ noticeBoardListCount }}
          </strong>
        </h5>
      </div>
      <b-button variant="primary" :to="{ path: '/notice-board/create' }"
        >공지사항 등록</b-button
      >
    </div>
    <div v-if="!dataLoading" class="table-bordered table-responsive">
      <table
        class="table  table-hover table-sm table-nowrap text-center"
        v-if="noticeBoardListCount"
      >
        <colgroup>
          <col width="40" />
          <col width="100" />
          <col width="auto" />
          <col width="200" />
          <col width="100" />
          <col width="100" />
        </colgroup>
        <thead>
          <tr>
            <th
              scope="col"
              v-bind:class="{ highlighted: noticeBoardListDto.no }"
            >
              NO
            </th>
            <th
              scope="col"
              v-bind:class="{ highlighted: noticeBoardListDto.noticeBoardType }"
            >
              카테고리
            </th>
            <th
              scope="col"
              v-bind:class="{ highlighted: noticeBoardListDto.title }"
            >
              제목
            </th>
            <th
              scope="col"
              v-bind:class="{ highlighted: noticeBoardListDto.url }"
            >
              URL
            </th>
            <th
              scope="col"
              v-bind:class="{ highlighted: noticeBoardListDto.adminName }"
            >
              관리자
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="noticeBoard in noticeBoards"
            :key="noticeBoard.no"
            @click="findOne(noticeBoard.no)"
          >
            <th scope="row">{{ noticeBoard.no }}</th>
            <td v-if="noticeBoard.codeManagement">
              {{ noticeBoard.codeManagement.value }}
            </td>
            <td class="text-left">{{ noticeBoard.title }}</td>
            <td>{{ noticeBoard.url }}</td>
            <td v-if="noticeBoard.admin">
              {{ noticeBoard.admin.name }}
            </td>
            <td>
              <router-link
                v-if="noticeBoard.no"
                class="btn btn-sm btn-secondary"
                :to="{
                  name: 'NoticeBoardDetail',
                  params: {
                    id: noticeBoard.no,
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
      v-if="noticeBoardListCount"
      pills
      :total-rows="noticeBoardListCount"
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
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '@/core/base.component';
import { NOTICE_BOARD, CONST_NOTICE_BOARD } from '@/services/shared';
import { NoticeBoardListDto, NoticeBoardDto, AdminDto } from '@/dto';
import { Pagination } from '@/common';
import AdminService from '../../../services/admin.service';
import NoticeBoardService from '../../../services/notice-board.service';

@Component({
  name: 'NoticeBoardList',
})
export default class NoticeBoardList extends BaseComponent {
  private noticeBoardListDto = new NoticeBoardListDto();
  private pagination = new Pagination();
  private noticeBoardTypes: NOTICE_BOARD[] = [...CONST_NOTICE_BOARD];
  private noticeBoardListCount = null;
  private noticeBoards: NoticeBoardDto[] = null;
  private totalPage = null;
  private dataLoading = false;

  private adminList: AdminDto[] = [];

  findAdmin() {
    AdminService.findForSelect().subscribe(res => {
      if (res) {
        this.adminList = res.data;
      }
    });
  }

  clearOut() {
    this.pagination.page = 1;
    this.noticeBoardListDto = new NoticeBoardListDto();
    this.search();
  }

  paginateSearch() {
    this.search(true);
  }

  search(isPagination?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    }
    NoticeBoardService.findAll(
      this.noticeBoardListDto,
      this.pagination,
    ).subscribe(res => {
      this.dataLoading = false;
      this.noticeBoardListCount = res.data.totalCount;
      this.noticeBoards = res.data.items;
      this.totalPage = Math.ceil(
        this.noticeBoardListCount / this.pagination.limit,
      );
    });
    window.scrollTo(0, 0);
  }

  // 상세보기
  findOne(boardId) {
    this.$router.push(`/notice-board/${boardId}`);
  }

  created() {
    this.pagination.page = 1;
    this.search();
    this.findAdmin();
  }
}
</script>
