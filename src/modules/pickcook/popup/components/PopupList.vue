<template>
  <section>
    <SectionTitle title="팝업 관리" divider></SectionTitle>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col cols="2" class="mb-3">
          <label>팝업 타입</label>
          <b-form-select
            id="create_popup_type"
            v-model="popupSearchDto.popupType"
          >
            <b-form-select-option value>전체</b-form-select-option>
            <b-form-select-option
              v-for="type in popupTypeSelect"
              :key="type.code"
              :value="type.key"
              >{{ type.value }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
        <b-col cols="8" class="mb-3">
          <label>제목</label>
          <b-form-input v-model="popupSearchDto.title"></b-form-input>
        </b-col>
        <b-col cols="2" class="mb-3">
          <label>노출 여부</label>
          <select class="custom-select" v-model="popupSearchDto.inUse">
            <option value>전체</option>
            <option v-for="yn in ynSelect" :key="yn" :value="yn">{{
              yn | stringShowTransformer
            }}</option>
          </select>
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
          <strong class="text-primary">{{ popupTotalCount }}</strong>
        </h5>
      </div>
      <b-button variant="primary" v-b-modal.add_popup>팝업 추가</b-button>
    </div>
    <template v-if="!dataLoading">
      <div class="bg-white table-responsive">
        <table
          class="table table-sm table-hover table-nowrap"
          v-if="popupTotalCount"
        >
          <thead>
            <th scope="row">ID</th>
            <th
              scope="row"
              v-bind:class="{
                highlighted: popupSearchDto.popupType,
              }"
            >
              팝업 타입
            </th>
            <th scope="row">
              이미지
            </th>
            <th
              scope="row"
              v-bind:class="{
                highlighted: popupSearchDto.title,
              }"
            >
              제목
            </th>
            <th
              scope="row"
              v-bind:class="{
                highlighted: popupSearchDto.started,
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
                highlighted: popupSearchDto.inUse,
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
              v-for="popup in popupList"
              :key="popup.key"
              @click="
                $router.push({
                  name: 'PopupDetail',
                  params: {
                    id: popup.no,
                  },
                })
              "
              style="cursor:pointer"
            >
              <td>{{ popup.no }}</td>
              <td>
                <template v-if="popup.codeManagement">
                  {{ popup.codeManagement.value }}
                </template>
              </td>
              <td>
                <b-img-lazy
                  v-if="popup.images && popup.images[0]"
                  :src="popup.images[0].endpoint"
                  class="mx-auto d-block article-image"
                  style="max-height:60px; max-width:none;"
                />
              </td>
              <td>{{ popup.title }}</td>
              <td>
                <div v-if="popup.started">
                  {{ popup.started | dateTransformer }} ~
                  {{ popup.ended | dateTransformer }}
                </div>
              </td>
              <td>
                <div v-if="popup.link">
                  {{ popup.link }}
                </div>
              </td>
              <td>
                <b-badge
                  :variant="popup.inUse === 'Y' ? 'success' : 'danger'"
                  >{{ popup.inUse }}</b-badge
                >
              </td>
              <td>
                {{ popup.createdAt | dateTransformer }}
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="empty-data border">검색결과가 없습니다.</div>
      </div>
      <b-pagination
        v-model="pagination.page"
        v-if="popupTotalCount"
        pills
        :total-rows="popupTotalCount"
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
    <!-- 팝업 추가 모달 -->
    <b-modal
      id="add_popup"
      title="팝업 추가"
      header-bg-variant="primary"
      header-text-variant="light"
      hide-footer
      size="lg"
      @close="clearOutPopupCreateDto()"
    >
      <b-form @submit.stop.prevent="createPopup()">
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
                  v-model="popupCreateDto.inUse"
                  :value="ynSelect[1]"
                  :unchecked-value="ynSelect[0]"
                ></b-form-checkbox>
              </b-form-group>
            </b-row>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col cols="3" class="mb-3">
            <label>
              팝업 타입
              <span class="red-text">*</span>
            </label>
            <b-form-select
              id="create_popup_type"
              v-model="popupCreateDto.popupType"
              required
            >
              <b-form-select-option
                v-for="type in popupTypeSelect"
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
              v-model="popupCreateDto.title"
              required
            ></b-form-input>
          </b-col>
          <b-col
            cols="12"
            class="mb-3"
            v-if="
              popupCreateDto.popupType !== 'REG_SERVICE_UPDATE' &&
                popupCreateDto.popupType === 'EVENT'
            "
          >
            <div v-if="popupImage && popupImage.length > 0" class="mb-4">
              <div v-for="image in popupImage" :key="image.endpoint">
                <b-img-lazy
                  :src="image.endpoint"
                  class="rounded mx-auto d-block article-image"
                  style="max-height:80px"
                />
              </div>
            </div>
            <label>
              팝업 이미지
              <span class="red-text">*</span>
            </label>
            <b-form-file
              placeholder="파일 선택"
              ref="fileInput"
              @input="upload($event)"
              required
            ></b-form-file>
          </b-col>
          <template v-if="popupCreateDto.popupType === 'NOTIFICATION'">
            <b-col cols="12" class="mb-3">
              <label>
                서브 타이틀
              </label>
              <b-form-input v-model="popupCreateDto.subTitle"></b-form-input>
            </b-col>
            <b-col cols="12" class="mb-3">
              <label>
                내용
                <span class="red-text">*</span>
              </label>
              <b-form-textarea
                v-model="popupCreateDto.content"
                style="height:200px;"
                required
              ></b-form-textarea>
            </b-col>
          </template>
          <b-col cols="12" md="6" class="mb-3">
            <div>
              <label for="ended"
                >시작 날짜 <span class="red-text">*</span></label
              >
              <b-form-datepicker
                id="started"
                required
                v-model="startedDate"
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
                required
                v-model="endedDate"
                :disabled="startedDate ? false : true"
              ></b-form-datepicker>
            </div>
          </b-col>
          <b-col cols="3" class="mb-3">
            <label>링크 타입</label>
            <b-form-select
              id="create_link_type"
              v-model="popupCreateDto.linkType"
            >
              <b-form-select-option
                v-for="type in linkTypeSelect"
                :key="type.code"
                :value="type.key"
                >{{ type.value }}</b-form-select-option
              >
            </b-form-select>
          </b-col>
          <b-col cols="9" class="mb-3">
            <label>
              URL
            </label>
            <b-row no-gutters align-v="center" style="flex-wrap:nowrap">
              <b-input-group>
                <b-form-input
                  v-model="popupCreateDto.link"
                  placeholder="https://"
                ></b-form-input>
              </b-input-group>
              <a
                :href="getLinkUrl(popupCreateDto.link)"
                target="_blank"
                class="btn btn-lg  btn-info text-nowrap text-white ml-2"
                >링크 확인</a
              >
            </b-row>
          </b-col>
        </b-form-row>
        <div class="text-right pt-3 mt-4 border-top">
          <b-button variant="secondary" @click="clearOutPopupCreateDto()"
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
import PickcookPopupService from '@/services/pickcook/pickcook-popup.service';
import { PickcookPopupDto } from '@/dto';
import { CONST_YN, Pagination, YN } from '@/common';
import toast from '../../../../../resources/assets/js/services/toast.js';
import { FileAttachmentDto } from '@/services/shared/file-upload';
import FileUploadService from '../../../../services/shared/file-upload/file-upload.service';
import { UPLOAD_TYPE } from '../../../../services/shared/file-upload/file-upload.service';
import { ATTACHMENT_REASON_TYPE } from '@/services/shared/file-upload';
import {
  ClearOutQueryParamMapper,
  ReverseQueryParamMapper,
  RouterQueryParamMapper,
} from '@/core';
import { PickcookCodeManagementDto } from '@/services/init/dto';
import CommonCodeService from '@/services/pickcook/common-code.service';
import { POPUP } from '@/services/shared';

@Component
export default class PickcookPopupList extends BaseComponent {
  private popupList: PickcookPopupDto[] = [];
  private popupSearchDto = new PickcookPopupDto();
  private popupCreateDto = new PickcookPopupDto();
  private pagination = new Pagination();
  private dataLoading = false;
  private popupTotalCount = null;
  private ynSelect: YN[] = [...CONST_YN];
  private popupTypeSelect: PickcookCodeManagementDto[] = [];
  private linkTypeSelect: PickcookCodeManagementDto[] = [];
  private codeManagementDto = new PickcookCodeManagementDto();
  private paginationCode = new Pagination();
  private popupImage: FileAttachmentDto[] = [];
  private startedDate: Date = null;
  private endedDate: Date = null;

  getLinkUrl(linkUrl: string) {
    if (linkUrl) {
      return linkUrl.includes('//') ? linkUrl : `//${linkUrl}`;
    }
  }

  getTypeCodes() {
    this.codeManagementDto.category = 'POPUP';
    CommonCodeService.findAll(
      this.codeManagementDto,
      this.paginationCode,
    ).subscribe(res => {
      this.popupTypeSelect = res.data.items;
    });

    this.codeManagementDto.category = 'LINK_TYPE';
    CommonCodeService.findAll(
      this.codeManagementDto,
      this.paginationCode,
    ).subscribe(res => {
      this.linkTypeSelect = res.data.items;
    });
  }

  findAll(isPagination?: boolean, isSearch?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    } else {
      if (isSearch) this.pagination.page = 1;
      RouterQueryParamMapper(this.popupSearchDto, this.pagination);
    }
    PickcookPopupService.findAll(
      this.popupSearchDto,
      this.pagination,
    ).subscribe(res => {
      if (res) {
        this.dataLoading = false;
        this.popupList = res.data.items;
        this.popupTotalCount = res.data.totalCount;
      }
    });
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
      this.popupSearchDto = new PickcookPopupDto();
      this.findAll();
    }
  }

  // create popup
  createPopup() {
    if (this.popupCreateDto.popupType === POPUP.IMAGE) {
      if (this.popupImage.length > 0) {
        this.popupCreateDto.images = this.popupImage;
      } else {
        toast.error('이미지를 등록해주세요!');
        return;
      }
    }

    this.popupCreateDto.started = new Date(`${this.startedDate} 00:00:00`);
    this.popupCreateDto.ended = new Date(`${this.endedDate} 23:59:59`);

    PickcookPopupService.create(this.popupCreateDto).subscribe(res => {
      if (res) {
        toast.success('추가완료');
        this.clearOut();
        this.$bvModal.hide('add_popup');
      }
    });
  }

  // upload popup image
  async upload(file: File) {
    if (file) {
      const attachments = await FileUploadService.upload(UPLOAD_TYPE.POPUP, [
        file,
      ]);
      this.popupImage = [];
      this.popupImage.push(
        ...attachments.filter(
          fileUpload =>
            fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
        ),
      );
    }
  }

  clearOutPopupCreateDto() {
    this.popupImage = [];
    this.popupCreateDto = new PickcookPopupDto();
    this.$bvModal.hide('add_popup');
  }

  created() {
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.popupSearchDto = query;
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
