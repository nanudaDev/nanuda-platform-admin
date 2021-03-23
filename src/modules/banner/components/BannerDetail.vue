<template>
  <section v-if="bannerDto">
    <SectionTitle title="배너 관리" divider>
      <template v-slot:rightArea>
        <router-link to="/banner" class="btn btn-secondary"
          >목록으로</router-link
        >
      </template>
    </SectionTitle>
    <b-row>
      <b-col cols="12" class="my-3">
        <BaseCard title="배너 정보">
          <template v-slot:head>
            <div>
              <b-button variant="danger" v-b-modal.delete_banner
                >삭제하기</b-button
              >
              <b-button
                variant="primary"
                v-b-modal.update_banner
                @click="showUpdateModal()"
                >수정하기</b-button
              >
            </div>
          </template>
          <template v-slot:body>
            <b-row aligh-h="start" align-v="start">
              <b-col cols="12" md="8">
                <p class="text-center mb-4">PC 배너</p>
                <div
                  v-if="bannerDto.image && bannerDto.image.length > 0"
                  class="mb-4"
                >
                  <div v-for="image in bannerDto.image" :key="image.endpoint">
                    <b-img-lazy
                      :src="image.endpoint"
                      class="rounded mx-auto d-block banner-image"
                      style="max-height:200px"
                    />
                  </div>
                </div>
              </b-col>
              <b-col cols="12" md="4">
                <p class="text-center mb-4">모바일 배너</p>
                <div
                  v-if="
                    bannerDto.mobileImage && bannerDto.mobileImage.length > 0
                  "
                  class="mb-4"
                >
                  <div
                    v-for="image in bannerDto.mobileImage"
                    :key="image.endpoint"
                  >
                    <b-img-lazy
                      :src="image.endpoint"
                      class="rounded mx-auto d-block banner-image"
                      style="max-height:200px"
                    />
                  </div>
                </div>
              </b-col>
              <b-col cols="12">
                <div>
                  <ul class="u-lsit">
                    <li>
                      배너 타입 :
                      <b-badge variant="warning" class="badge-pill p-2">{{
                        bannerDto.codeManagement.value
                      }}</b-badge>
                    </li>
                    <li>제목 : {{ bannerDto.title }}</li>
                    <li>
                      개제 기간 : {{ bannerDto.started | dateTransformer }} ~
                      {{ bannerDto.ended | dateTransformer }}
                    </li>
                    <li>
                      URL :
                      <a :href="bannerDto.url" target="_blank">
                        {{ bannerDto.url }}
                      </a>
                    </li>
                    <li>
                      노출 여부 :
                      <b-badge
                        :variant="
                          bannerDto.showYn === 'Y' ? 'success' : 'danger'
                        "
                        >{{ bannerDto.showYn }}</b-badge
                      >
                    </li>
                  </ul>
                </div>
              </b-col>
            </b-row>
          </template>
        </BaseCard>
      </b-col>
    </b-row>
    <!-- 배너 수정 모달 -->
    <b-modal
      id="update_banner"
      title="배너 수정"
      ok-title="수정"
      cancel-title="취소"
      @ok="updateBanner()"
      size="lg"
    >
      <b-row no-gutters align-h="end">
        <b-form-group
          label="노출 여부"
          label-size="sm"
          label-text-align="right"
          label-cols="8"
        >
          <b-form-checkbox
            switch
            size="lg"
            v-model="bannerUpdateDto.showYn"
            :value="showYn[0]"
            :unchecked-value="showYn[1]"
          ></b-form-checkbox>
        </b-form-group>
      </b-row>
      <b-form-row>
        <b-col cols="6" class="mb-3">
          <label>배너 이미지</label>
          <div class="my-2">
            <div
              v-if="
                bannerDto.image && bannerDto.image.length > 0 && !imageChanged
              "
              class="mb-4"
            >
              <div v-for="image in bannerDto.image" :key="image.endpoint">
                <b-img-lazy
                  :src="image.endpoint"
                  class="rounded mx-auto d-block banner-image"
                  style="max-height:100px"
                />
              </div>
            </div>
            <div v-if="!bannerDto.image && !newBannerImage" class="mb-4">
              <b-img-lazy
                class="rounded mx-auto d-block banner-image"
                :src="
                  require('@/assets/images/general/common/img_placeholder.jpg')
                "
                rounded
                style="max-height:100px"
              />
            </div>
            <div
              v-if="newBannerImage && newBannerImage.length > 0 && imageChanged"
              class="mb-4"
            >
              <div v-for="image in newBannerImage" :key="image.endpoint">
                <b-img-lazy
                  :src="image.endpoint"
                  class="rounded mx-auto d-block banner-image"
                  style="max-height:100px"
                />
              </div>
              <div class="text-center mt-2">
                <b-button variant="danger" @click="removeBannerImage()"
                  >이미지 제거</b-button
                >
              </div>
            </div>
          </div>
          <div class="custom-file">
            <b-form-file
              placeholder="파일 첨부"
              ref="fileInput"
              @input="upload($event)"
            ></b-form-file>
          </div>
        </b-col>
        <b-col cols="6" class="mb-3">
          <label>배너 이미지 (모바일)</label>
          <div class="my-2">
            <div
              v-if="
                bannerDto.mobileImage &&
                  bannerDto.mobileImage.length > 0 &&
                  !mobileImageChanged
              "
              class="mb-4"
            >
              <div v-for="image in bannerDto.mobileImage" :key="image.endpoint">
                <b-img-lazy
                  :src="image.endpoint"
                  class="rounded mx-auto d-block banner-image"
                  style="max-height:100px"
                />
              </div>
            </div>
            <div
              v-if="!bannerDto.mobileImage && !newBannerMobileImage"
              class="mb-4"
            >
              <b-img-lazy
                class="rounded mx-auto d-block banner-image"
                :src="
                  require('@/assets/images/general/common/img_placeholder.jpg')
                "
                rounded
                style="max-height:100px"
              />
            </div>
            <div
              v-if="
                newBannerMobileImage &&
                  newBannerMobileImage.length > 0 &&
                  mobileImageChanged
              "
              class="mb-4"
            >
              <div v-for="image in newBannerMobileImage" :key="image.endpoint">
                <b-img-lazy
                  :src="image.endpoint"
                  class="rounded mx-auto d-block banner-image"
                  style="max-height:100px"
                />
              </div>
              <div class="text-center mt-2">
                <b-button variant="danger" @click="removeBannerMobileImage()"
                  >이미지 제거</b-button
                >
              </div>
            </div>
          </div>
          <div class="custom-file">
            <b-form-file
              placeholder="파일 첨부"
              ref="fileInputMobile"
              @input="uploadMobile($event)"
            ></b-form-file>
          </div>
        </b-col>
        <b-col cols="3" class="mb-3">
          <label>
            배너 타입
            <span class="red-text">*</span>
          </label>
          <b-form-select
            id="update_banner_type"
            v-model="bannerUpdateDto.bannerType"
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
            제목
            <span class="red-text">*</span>
          </label>
          <b-form-input v-model="bannerUpdateDto.title"></b-form-input>
        </b-col>
        <b-col cols="12" md="6" class="mb-3">
          <div>
            <label for="ended">시작 날짜</label>
            <b-form-datepicker
              id="started"
              v-model="bannerUpdateDto.started"
            ></b-form-datepicker>
          </div>
        </b-col>
        <b-col cols="12" md="6" class="mb-3">
          <div>
            <label for="ended">종료 날짜</label>
            <b-form-datepicker
              id="ended"
              v-model="bannerUpdateDto.ended"
              :disabled="bannerUpdateDto.started ? false : true"
            ></b-form-datepicker>
          </div>
        </b-col>
        <b-col cols="9" class="mb-3">
          <label>
            URL
            <span class="red-text">*</span>
          </label>
          <b-form-input v-model="bannerUpdateDto.url"></b-form-input>
        </b-col>
        <b-col cols="3" class="mb-3">
          <label>
            링크 타입
            <span class="red-text">*</span>
          </label>
          <b-form-select
            id="update_link_type"
            v-model="bannerUpdateDto.linkType"
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
    </b-modal>
    <!-- 배너 삭제하기 -->
    <b-modal
      id="delete_banner"
      title="배너 삭제"
      header-bg-variant="danger"
      header-text-variant="light"
      hide-footer
    >
      <div class="text-center">
        <p>
          <b>정말로 삭제하시겠습니까?</b>
        </p>
        <div class="mt-2 text-right">
          <b-button variant="danger" @click="deleteOne()">삭제</b-button>
        </div>
      </div>
    </b-modal>
  </section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { BannerDto } from '@/dto';
import BannerService from '../../../services/banner.service';
import Component from 'vue-class-component';
import { FileAttachmentDto } from '@/services/shared/file-upload';
import FileUploadService from '../../../services/shared/file-upload/file-upload.service';
import { UPLOAD_TYPE } from '../../../services/shared/file-upload/file-upload.service';
import { ATTACHMENT_REASON_TYPE } from '@/services/shared/file-upload';

import toast from '../../../../resources/assets/js/services/toast.js';
import { CONST_YN, YN } from '@/common';
import { CodeManagementDto } from '@/services/init/dto';
import CodeManagementService from '../../../services/code-management.service';

@Component({
  name: 'BannerDetail',
})
export default class BannerDetail extends BaseComponent {
  private bannerDto = new BannerDto();
  private bannerUpdateDto = new BannerDto();

  private showYn: YN[] = [...CONST_YN];
  private bannerTypeSelect: CodeManagementDto[] = [];
  private linkTypeSelect: CodeManagementDto[] = [];
  private imageChanged = false;
  private newBannerImage: FileAttachmentDto[] = [];
  private mobileImageChanged = false;
  private newBannerMobileImage: FileAttachmentDto[] = [];

  getTypeCodes() {
    CodeManagementService.findAnyCode('BANNER_TYPE').subscribe(res => {
      this.bannerTypeSelect = res.data;
    });
    CodeManagementService.findAnyCode('LINK_TYPE').subscribe(res => {
      this.linkTypeSelect = res.data;
    });
  }

  findOne(id) {
    BannerService.findOne(id).subscribe(res => {
      if (res) {
        this.bannerDto = res.data;
      }
    });
  }

  showUpdateModal() {
    this.bannerUpdateDto = this.bannerDto;
    this.findOne(this.$route.params.id);
  }

  // upload banner image
  async upload(file: File) {
    if (file) {
      const attachments = await FileUploadService.upload(UPLOAD_TYPE.BANNER, [
        file,
      ]);
      this.newBannerImage = [];
      this.newBannerImage.push(
        ...attachments.filter(
          fileUpload =>
            fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
        ),
      );
      this.imageChanged = true;
      console.log(this.newBannerImage);
    }
  }

  removeBannerImage() {
    this.newBannerImage = [];
    this.$refs['fileInput'].reset();
    this.imageChanged = false;
  }

  // upload banner mobile image
  async uploadMobile(file: File) {
    if (file) {
      const attachments = await FileUploadService.upload(UPLOAD_TYPE.BANNER, [
        file,
      ]);
      this.newBannerMobileImage = [];
      this.newBannerMobileImage.push(
        ...attachments.filter(
          fileUpload =>
            fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
        ),
      );
      this.mobileImageChanged = true;
    }
  }

  removeBannerMobileImage() {
    this.newBannerMobileImage = [];
    this.$refs['fileInputMobile'].reset();
    this.mobileImageChanged = false;
  }

  updateBanner() {
    if (this.newBannerImage.length > 0) {
      this.bannerUpdateDto.image = this.newBannerImage;
    } else {
      delete this.bannerUpdateDto.image;
    }

    if (this.newBannerMobileImage.length > 0) {
      this.bannerUpdateDto.mobileImage = this.newBannerMobileImage;
    } else {
      delete this.bannerUpdateDto.mobileImage;
    }

    BannerService.update(this.$route.params.id, this.bannerUpdateDto).subscribe(
      res => {
        if (res) {
          toast.success('수정완료');
          this.findOne(this.$route.params.id);
        }
      },
    );
  }

  deleteOne() {
    BannerService.deleteOne(this.$route.params.id).subscribe(res => {
      if (res) {
        toast.success('삭제완료');
        this.$router.push('/banner');
      }
    });
  }

  created() {
    this.findOne(this.$route.params.id);
    this.getTypeCodes();
  }
}
</script>
