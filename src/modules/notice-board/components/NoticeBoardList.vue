<template>
  <section>
    <SectionTitle title="공지사항" divider />
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col cols="12" md="2">
          <b-form-group label="카테고리">
            <b-form-select
              class="custom-select"
              v-model="noticeBoardSearchDto.noticeBoardType"
            >
              <b-form-select-option value>전체</b-form-select-option>
              <b-form-select-option
                v-for="noticeBoardType in noticeBoardTypes"
                :key="noticeBoardType"
                :value="noticeBoardType"
                >{{ noticeBoardType | enumTransformer }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="8">
          <label for>제목</label>
          <input
            type="text"
            class="form-control"
            v-model="noticeBoardSearchDto.title"
          />
        </b-col>
        <b-col cols="12" md="2">
          <label for>관리자명</label>
          <template>
            <b-form-input
              list="food-category-list"
              id="hope_food_category"
              v-model="noticeBoardSearchDto.adminName"
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
          <strong class="text-primary">
            {{ noticeBoardTotalCount }}
          </strong>
        </h5>
      </div>
      <div class="text-right">
        <b-button variant="primary" :to="{ path: '/notice-board/create' }"
          >공지사항 등록</b-button
        >
      </div>
    </div>
    <template v-if="!dataLoading">
      <div class="bg-white table-responsive">
        <table
          class="table table-hover table-sm table-nowrap text-center"
          v-if="noticeBoardTotalCount"
        >
          <colgroup>
            <col width="80" />
            <col width="200" />
            <col width="auto" />
            <col width="400" />
            <col width="200" />
            <col width="200" />
          </colgroup>
          <thead>
            <tr>
              <th
                scope="col"
                v-bind:class="{ highlighted: noticeBoardSearchDto.no }"
              >
                NO
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: noticeBoardSearchDto.noticeBoardType,
                }"
              >
                카테고리
              </th>
              <th
                scope="col"
                v-bind:class="{ highlighted: noticeBoardSearchDto.title }"
              >
                제목
              </th>
              <th
                scope="col"
                v-bind:class="{ highlighted: noticeBoardSearchDto.url }"
              >
                URL
              </th>
              <th
                scope="col"
                v-bind:class="{ highlighted: noticeBoardSearchDto.adminName }"
              >
                관리자
              </th>
              <th scope="col">
                등록일
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="noticeBoard in noticeBoardList"
              :key="noticeBoard.no"
              @click="
                $router.push({
                  name: 'NoticeBoardDetail',
                  params: {
                    id: noticeBoard.no,
                  },
                })
              "
              style="cursor:pointer"
            >
              <th scope="row">{{ noticeBoard.no }}</th>
              <td v-if="noticeBoard.codeManagement">
                {{ noticeBoard.codeManagement.value }}
              </td>
              <td class="text-left">
                <b-badge
                  variant="info"
                  v-if="
                    noticeBoard.tempSaveYn && noticeBoard.tempSaveYn === 'Y'
                  "
                >
                  임시저장
                </b-badge>
                {{ noticeBoard.title }}
              </td>
              <td>{{ noticeBoard.url }}</td>
              <td v-if="noticeBoard.admin">
                {{ noticeBoard.admin.name }}
              </td>
              <td>
                {{ noticeBoard.createdAt | dateTransformer }}
                <p
                  v-if="noticeBoard.createdAt !== noticeBoard.updatedAt"
                  class="text-secondary"
                >
                  <small
                    >(수정일 :
                    {{ noticeBoard.updatedAt | dateTransformer }})</small
                  >
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="empty-data border">검색결과가 없습니다.</div>
      </div>
      <b-pagination
        v-model="pagination.page"
        v-if="noticeBoardTotalCount"
        pills
        :total-rows="noticeBoardTotalCount"
        :per-page="pagination.limit"
        @input="paginateSearch"
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
import {
  ClearOutQueryParamMapper,
  ReverseQueryParamMapper,
  RouterQueryParamMapper,
} from '@/core';

@Component({
  name: 'NoticeBoardList',
})
export default class NoticeBoardList extends BaseComponent {
  private noticeBoardSearchDto = new NoticeBoardListDto();
  private pagination = new Pagination();
  private noticeBoardTypes: NOTICE_BOARD[] = [...CONST_NOTICE_BOARD];
  private noticeBoardTotalCount = null;
  private noticeBoardList: NoticeBoardDto[] = null;
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
    if (location.search) {
      ClearOutQueryParamMapper();
    } else {
      this.noticeBoardSearchDto = new NoticeBoardListDto();
      this.findAll();
    }
  }

  paginateSearch() {
    this.findAll(true);
  }

  search() {
    this.findAll(true, true);
  }

  findAll(isPagination?: boolean, isSearch?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    } else {
      if (isSearch) this.pagination.page = 1;
      RouterQueryParamMapper(this.noticeBoardSearchDto, this.pagination);
    }
    NoticeBoardService.findAll(
      this.noticeBoardSearchDto,
      this.pagination,
    ).subscribe(res => {
      if (res) {
        this.dataLoading = false;
        this.noticeBoardList = res.data.items;
        this.noticeBoardTotalCount = res.data.totalCount;
      }
    });
  }

  created() {
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.noticeBoardSearchDto = query;
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
    this.findAdmin();
  }
}
</script>
