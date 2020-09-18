<template>
  <section>
    <SectionTitle title="기사 관리" divider></SectionTitle>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col cols="2" class="mb-3">
          <label>언론사</label>
          <b-form-input v-model="articleSearchDto.mediaName"></b-form-input>
        </b-col>
        <b-col cols="8" class="mb-3">
          <label>제목</label>
          <b-form-input v-model="articleSearchDto.title"></b-form-input>
        </b-col>
        <b-col cols="2" class="mb-3">
          <label>노출 여부</label>
          <select class="custom-select" v-model="articleSearchDto.showYn">
            <option value>전체</option>
            <option v-for="yn in showYn" :key="yn" :value="yn">{{
              yn | enumTransformer
            }}</option>
          </select>
        </b-col>
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
          <strong class="text-primary">{{ articleListCount }}</strong>
        </h5>
      </div>
      <b-button variant="primary" v-b-modal.add_article>기사 추가</b-button>
    </div>
    <div v-if="!dataLoading" class="table-bordered table-responsive">
      <table class="table table-sm table-hover" v-if="articleListCount">
        <thead>
          <th scope="row">NO</th>
          <th
            scope="row"
            v-bind:class="{
              highlighted: articleSearchDto.mediaName,
            }"
          >
            언론사
          </th>
          <th scope="row">
            이미지
          </th>
          <th
            scope="row"
            v-bind:class="{
              highlighted: articleSearchDto.title,
            }"
          >
            제목
          </th>
          <th
            scope="row"
            v-bind:class="{
              highlighted: articleSearchDto.url,
            }"
          >
            링크
          </th>
          <th
            scope="row"
            v-bind:class="{
              highlighted: articleSearchDto.showYn,
            }"
          >
            노출여부
          </th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="article in articleList" :key="article.no">
            <td>{{ article.no }}</td>
            <td>{{ article.mediaName }}</td>
            <td></td>
            <td>{{ article.title }}</td>
            <td>{{ article.url }}</td>
            <td>
              <b-badge
                :variant="article.showYn === 'Y' ? 'success' : 'danger'"
                >{{ article.showYn }}</b-badge
              >
            </td>
            <td>
              <router-link
                class="btn btn-sm btn-secondary text-nowrap"
                :to="{
                  name: 'ArticleDetail',
                  params: {
                    id: article.no,
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
      v-if="articleListCount"
      pills
      :total-rows="articleListCount"
      :per-page="pagination.limit"
      @input="paginateSearch()"
      class="mt-4 justify-content-center"
    ></b-pagination>
    <div class="half-circle-spinner mt-5" v-if="dataLoading">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
    <!-- 기사 추가 모달 -->
    <b-modal
      id="add_article"
      title="기사 추가"
      ok-title="추가"
      cancel-title="취소"
      size="lg"
      @hide="clearOutArticleCreateDto()"
      @cancel="clearOutArticleCreateDto()"
      @ok="createArticle()"
    >
      <b-form-row>
        <b-col lg="12" class="text-right mb-3">
          <b-row no-gutters align-h="end">
            <b-form-group
              label="노출 활성화"
              label-size="sm"
              label-text-align="right"
              label-cols="8"
            >
              <b-form-checkbox
                switch
                size="lg"
                v-model="articleCreateDto.showYn"
                :value="showYn[1]"
                :unchecked-value="showYn[0]"
              ></b-form-checkbox>
            </b-form-group>
          </b-row>
        </b-col>
      </b-form-row>
      <div v-if="articleImage && articleImage.length > 0" class="mb-4">
        <div v-for="image in articleImage" :key="image.endpoint">
          <img
            :src="image.endpoint"
            class="rounded mx-auto d-block article-image"
            style="max-height:80px"
          />
        </div>
      </div>
      <b-form-row>
        <b-col cols="12" md="6" class="mb-3">
          <label>
            언론사
            <span class="red-text">*</span>
          </label>
          <b-form-input
            v-model="articleCreateDto.mediaName"
            required
          ></b-form-input>
        </b-col>
        <b-col cols="12" md="6" class="mb-3">
          <label>
            기사 이미지
            <span class="red-text">*</span>
          </label>
          <b-form-file
            placeholder="파일 선택"
            ref="fileInput"
            @input="upload($event)"
            required
          ></b-form-file>
        </b-col>
        <b-col cols="12" md="12" class="mb-3">
          <label>
            타이틀
            <span class="red-text">*</span>
          </label>
          <b-form-input
            v-model="articleCreateDto.title"
            required
          ></b-form-input>
        </b-col>
        <b-col cols="12" md="12" class="mb-3">
          <label>
            URL
            <span class="red-text">*</span>
          </label>
          <b-form-input v-model="articleCreateDto.url" required></b-form-input>
        </b-col>
        <b-col cols="12" md="12" class="mb-3">
          <label>
            설명글
            <span class="red-text">*</span>
          </label>
          <textarea
            class="form-control"
            maxlength="100"
            style="min-height:100px"
            v-model="articleCreateDto.desc"
          ></textarea>
          <p
            class="text-length text-right"
            v-if="articleCreateDto.desc && articleCreateDto.desc.length"
          >
            <b class="text-primary">{{ articleCreateDto.desc.length }}</b> / 100
          </p>
        </b-col>
      </b-form-row>
    </b-modal>
  </section>
</template>
<script lang="ts">
import { CONST_YN, Pagination, YN } from '@/common';
import { Component, Vue } from 'vue-property-decorator';
import { ArticleDto, ArticleListDto } from '@/dto';
import { component } from 'vue/types/umd';
import ArticleService from '../../../services/article.service';
import BaseComponent from '@/core/base.component';
import { FileAttachmentDto } from '@/services/shared/file-upload';
import FileUploadService from '../../../services/shared/file-upload/file-upload.service';
import { UPLOAD_TYPE } from '../../../services/shared/file-upload/file-upload.service';
import { ATTACHMENT_REASON_TYPE } from '@/services/shared/file-upload';

import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'ArticleList',
})
export default class ArticleList extends BaseComponent {
  private articleList: ArticleDto[] = [];
  private articleListCount = null;
  private articleSearchDto = new ArticleListDto();
  private pagination = new Pagination();
  private dataLoading = false;
  private showYn: YN[] = [...CONST_YN];

  private articleCreateDto = new ArticleDto();
  private articleImage: FileAttachmentDto[] = [];

  search(isPagination?: boolean) {
    this.dataLoading = true;
    ArticleService.findAll(this.articleSearchDto, this.pagination).subscribe(
      res => {
        if (res) {
          this.dataLoading = false;
          this.articleList = res.data.items;
          this.articleListCount = res.data.totalCount;
        }
      },
    );
  }

  paginateSearch() {
    this.search(true);
  }

  clearOut() {
    this.pagination.page = 1;
    this.articleSearchDto = new ArticleListDto();
    this.search();
  }

  createArticle() {
    this.articleCreateDto.image = this.articleImage;
    ArticleService.create(this.articleCreateDto).subscribe(res => {
      if (res) {
        toast.success('추가완료');
        this.search();
      }
    });
  }

  // upload article image
  async upload(file: File) {
    if (file) {
      const attachments = await FileUploadService.upload(UPLOAD_TYPE.ARTICLE, [
        file,
      ]);
      this.articleImage = [];
      this.articleImage.push(
        ...attachments.filter(
          fileUpload =>
            fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
        ),
      );
    }
  }

  clearOutArticleCreateDto() {
    this.articleImage = [];
    this.articleCreateDto = new ArticleDto();
  }

  created() {
    this.pagination.page = 1;
    this.search();
  }
}
</script>
