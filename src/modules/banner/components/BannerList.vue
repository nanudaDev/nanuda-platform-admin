<template>
  <section>
    <SectionTitle title="배너 관리" divider></SectionTitle>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col cols="2" class="mb-3">
          <label>배너 타입</label>
          <b-form-select
            id="create_banner_type"
            v-model="bannerSearchDto.bannerType"
          >
            <option value selected>전체</option>
            <b-form-select-option
              v-for="type in bannerTypeSelect"
              :key="type.code"
              :value="type.key"
              >{{ type.value }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
        <b-col cols="8" class="mb-3">
          <label>제목</label>
          <b-form-input v-model="bannerSearchDto.title"></b-form-input>
        </b-col>
        <b-col cols="2" class="mb-3">
          <label>노출 여부</label>
          <select class="custom-select" v-model="bannerSearchDto.showYn">
            <option value>전체</option>
            <option v-for="yn in ynSelect" :key="yn" :value="yn">{{
              yn | stringShowTransformer
            }}</option>
          </select>
        </b-col>
        <!-- <b-col cols="6" md="4" class="mb-3">
          <div>
            <label for="ended">시작 날짜</label>
            <b-form-datepicker
              id="started"
              v-model="bannerSearchDto.started"
            ></b-form-datepicker>
          </div>
        </b-col>
        <b-col cols="6" md="4" class="mb-3">
          <div>
            <label for="ended">종료 날짜</label>
            <b-form-datepicker
              id="ended"
              v-model="bannerSearchDto.ended"
              :disabled="bannerSearchDto.started ? false : true"
            ></b-form-datepicker>
          </div>
        </b-col> -->
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
          <strong class="text-primary">{{ bannerTotalCount }}</strong>
        </h5>
      </div>
      <b-button variant="primary" v-b-modal.add_banner>배너 추가</b-button>
    </div>
    <template v-if="!dataLoading">
      <div class="bg-white table-responsive">
        <table
          class="table table-sm table-hover table-nowrap"
          v-if="bannerTotalCount"
        >
          <thead>
            <th scope="row">ID</th>
            <th
              scope="row"
              v-bind:class="{
                highlighted: bannerSearchDto.bannerType,
              }"
            >
              배너 타입
            </th>
            <th scope="row">
              이미지 (PC)
            </th>
            <th scope="row">
              이미지 (모바일)
            </th>
            <th
              scope="row"
              v-bind:class="{
                highlighted: bannerSearchDto.title,
              }"
            >
              제목
            </th>
            <th
              scope="row"
              v-bind:class="{
                highlighted: bannerSearchDto.started,
              }"
            >
              개제 기간
            </th>
            <th scope="row">
              URL
            </th>
            <th
              scope="row"
              v-bind:class="{
                highlighted: bannerSearchDto.showYn,
              }"
            >
              노출여부
            </th>
            <th>
              등록일
            </th>
          </thead>
          <tbody>
            <tr
              v-for="banner in bannerList"
              :key="banner.key"
              @click="
                $router.push({
                  name: 'BannerDetail',
                  params: {
                    id: banner.no,
                  },
                })
              "
              style="cursor:pointer"
            >
              <td>{{ banner.no }}</td>
              <td>
                <div v-if="banner.codeManagement">
                  {{ banner.codeManagement.value }}
                </div>
              </td>
              <td>
                <b-img-lazy
                  v-if="banner.image && banner.image[0]"
                  :src="banner.image[0].endpoint"
                  class="mx-auto d-block article-image"
                  style="max-height:60px; max-width:none;"
                />
              </td>
              <td>
                <b-img-lazy
                  v-if="banner.mobileImage && banner.mobileImage[0]"
                  :src="banner.mobileImage[0].endpoint"
                  class="mx-auto d-block article-image"
                  style="max-height:60px; max-width:none;"
                />
              </td>
              <td>{{ banner.title }}</td>
              <td>
                <div v-if="banner.started">
                  {{ banner.started | dateTransformer }} ~
                  {{ banner.ended | dateTransformer }}
                </div>
              </td>
              <td>
                <div v-if="banner.url">
                  {{ banner.url }}
                </div>
              </td>
              <td>
                <b-badge
                  :variant="banner.showYn === 'Y' ? 'success' : 'danger'"
                  >{{ banner.showYn }}</b-badge
                >
              </td>
              <td>
                {{ banner.createdAt | dateTransformer }}
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="empty-data border">검색결과가 없습니다.</div>
      </div>
      <b-pagination
        v-model="pagination.page"
        v-if="bannerTotalCount"
        pills
        :total-rows="bannerTotalCount"
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
    <!-- 배너 추가 모달 -->
    <b-modal
      id="add_banner"
      title="배너 추가"
      header-bg-variant="primary"
      header-text-variant="light"
      hide-footer
      size="lg"
      @close="clearOutBannerCreateDto()"
    >
      <b-form @submit.stop.prevent="createBanner()">
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
                  v-model="bannerCreateDto.showYn"
                  :value="ynSelect[1]"
                  :unchecked-value="ynSelect[0]"
                ></b-form-checkbox>
              </b-form-group>
            </b-row>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col cols="12" md="6" class="mb-3">
            <div v-if="bannerImage && bannerImage.length > 0" class="mb-4">
              <div v-for="image in bannerImage" :key="image.endpoint">
                <b-img-lazy
                  :src="image.endpoint"
                  class="rounded mx-auto d-block article-image"
                  style="max-height:80px"
                />
              </div>
            </div>
            <label>
              배너 이미지
              <span class="red-text">*</span>
            </label>
            <b-form-file
              placeholder="파일 선택"
              ref="fileInput"
              @input="upload($event)"
              required
            ></b-form-file>
          </b-col>
          <b-col cols="12" md="6" class="mb-3">
            <div
              v-if="bannerMobileImage && bannerMobileImage.length > 0"
              class="mb-4"
            >
              <div v-for="image in bannerMobileImage" :key="image.endpoint">
                <b-img-lazy
                  :src="image.endpoint"
                  class="rounded mx-auto d-block article-image"
                  style="max-height:80px"
                />
              </div>
            </div>
            <label>
              배너 이미지 (모바일)
              <span class="red-text">*</span>
            </label>
            <b-form-file
              placeholder="파일 선택"
              ref="fileInputMobile"
              @input="uploadMobile($event)"
              required
            ></b-form-file>
          </b-col>
          <b-col cols="3" class="mb-3">
            <label>
              배너 타입
              <span class="red-text">*</span>
            </label>
            <b-form-select
              id="create_banner_type"
              v-model="bannerCreateDto.bannerType"
              required
            >
              <b-form-select-option
                v-for="type in bannerTypeSelect"
                :key="type.code"
                :value="type.key"
                >{{ type.value }}</b-form-select-option
              >
            </b-form-select>
          </b-col>
          <b-col cols="9" class="mb-3">
            <label>
              타이틀
              <span class="red-text">*</span>
            </label>
            <b-form-input
              v-model="bannerCreateDto.title"
              required
            ></b-form-input>
          </b-col>
          <b-col cols="12" md="6" class="mb-3">
            <div>
              <label for="ended"
                >시작 날짜 <span class="red-text">*</span></label
              >
              <b-form-datepicker
                id="started"
                v-model="bannerCreateDto.started"
                required
              ></b-form-datepicker>
            </div>
          </b-col>
          <b-col cols="12" md="6" class="mb-3">
            <div>
              <label for="ended"
                >종료 날짜 <span class="red-text">*</span></label
              >
              <b-form-datepicker
                id="ended"
                v-model="bannerCreateDto.ended"
                :disabled="bannerCreateDto.started ? false : true"
                required
              ></b-form-datepicker>
            </div>
          </b-col>
          <b-col cols="9" class="mb-3">
            <label>
              URL
            </label>
            <b-form-input
              v-model="bannerCreateDto.url"
              placeholder="https://"
            ></b-form-input>
          </b-col>
          <b-col cols="3" class="mb-3">
            <label>링크 타입</label>
            <b-form-select
              id="create_link_type"
              v-model="bannerCreateDto.linkType"
            >
              <b-form-select-option
                v-for="type in linkTypeSelect"
                :key="type.code"
                :value="type.key"
                >{{ type.value }}</b-form-select-option
              >
            </b-form-select>
          </b-col>
        </b-form-row>
        <div class="text-right pt-3 mt-4 border-top">
          <b-button variant="secondary" @click="clearOutBannerCreateDto()"
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
import BannerService from '@/services/banner.service';
import { BannerDto } from '@/dto';
import { CONST_YN, Pagination, YN } from '@/common';
import toast from '../../../../resources/assets/js/services/toast.js';
import { FileAttachmentDto } from '@/services/shared/file-upload';
import FileUploadService from '../../../services/shared/file-upload/file-upload.service';
import { UPLOAD_TYPE } from '../../../services/shared/file-upload/file-upload.service';
import { ATTACHMENT_REASON_TYPE } from '@/services/shared/file-upload';
import {
  BANNER_TYPE,
  CONST_BANNER_TYPE,
  CONST_LINK_TYPE,
  LINK_TYPE,
} from '../../../services/shared';
import {
  ClearOutQueryParamMapper,
  ReverseQueryParamMapper,
  RouterQueryParamMapper,
} from '@/core';
import { CodeManagementDto } from '@/services/init/dto/index.js';
import CodeManagementService from '../../../services/code-management.service';

@Component
export default class BannerList extends BaseComponent {
  private bannerList: BannerDto[] = [];
  private bannerSearchDto = new BannerDto();
  private bannerCreateDto = new BannerDto();
  private pagination = new Pagination();
  private dataLoading = false;
  private bannerTotalCount = null;
  private ynSelect: YN[] = [...CONST_YN];
  private bannerTypeSelect: CodeManagementDto[] = [];
  private linkTypeSelect: CodeManagementDto[] = [];
  private bannerImage: FileAttachmentDto[] = [];
  private bannerMobileImage: FileAttachmentDto[] = [];

  getTypeCodes() {
    CodeManagementService.findAnyCode('BANNER_TYPE').subscribe(res => {
      this.bannerTypeSelect = res.data;
    });
    CodeManagementService.findAnyCode('LINK_TYPE').subscribe(res => {
      this.linkTypeSelect = res.data;
    });
  }

  findAll(isPagination?: boolean, isSearch?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    } else {
      if (isSearch) this.pagination.page = 1;
      RouterQueryParamMapper(this.bannerSearchDto, this.pagination);
    }
    BannerService.findAll(this.bannerSearchDto, this.pagination).subscribe(
      res => {
        if (res) {
          this.dataLoading = false;
          this.bannerList = res.data.items;
          this.bannerTotalCount = res.data.totalCount;
        }
      },
    );
  }

  search() {
    this.findAll(true, true);
  }
  paginateSearch() {
    this.findAll(true);
  }

  clearOut() {
    if (location.search) {
      ClearOutQueryParamMapper();
    } else {
      this.bannerSearchDto = new BannerDto();
      this.findAll();
    }
  }

  // create banner
  createBanner() {
    if (this.bannerImage.length > 0) {
      this.bannerCreateDto.image = this.bannerImage;
    } else {
      delete this.bannerCreateDto.image;
    }

    if (this.bannerMobileImage.length > 0) {
      this.bannerCreateDto.mobileImage = this.bannerMobileImage;
    } else {
      delete this.bannerCreateDto.mobileImage;
    }

    BannerService.create(this.bannerCreateDto).subscribe(res => {
      if (res) {
        toast.success('추가완료');
        this.clearOut();
        this.$bvModal.hide('add_banner');
      }
    });
  }

  // upload banner image
  async upload(file: File) {
    if (file) {
      const attachments = await FileUploadService.upload(UPLOAD_TYPE.BANNER, [
        file,
      ]);
      this.bannerImage = [];
      this.bannerImage.push(
        ...attachments.filter(
          fileUpload =>
            fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
        ),
      );
    }
  }

  // upload banner image
  async uploadMobile(file: File) {
    if (file) {
      const attachments = await FileUploadService.upload(UPLOAD_TYPE.BANNER, [
        file,
      ]);
      this.bannerMobileImage = [];
      this.bannerMobileImage.push(
        ...attachments.filter(
          fileUpload =>
            fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
        ),
      );
    }
  }

  clearOutBannerCreateDto() {
    this.bannerImage = [];
    this.bannerMobileImage = [];
    this.bannerCreateDto = new BannerDto();
    this.$bvModal.hide('add_banner');
  }

  created() {
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.bannerSearchDto = query;
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
    this.getTypeCodes();
  }
}
</script>
