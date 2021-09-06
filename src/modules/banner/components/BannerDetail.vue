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
      <b-col cols="12" lg="4">
        <b-card no-body>
          <b-tabs card fill>
            <b-tab title="PC 이미지" active>
              <template v-if="!imageChanged">
                <b-img-lazy
                  :src="bannerDto.image[0].endpoint"
                  v-if="bannerDto.image && bannerDto.image.length > 0"
                />
                <b-img-lazy
                  :src="
                    require('@/assets/images/general/common/img_placeholder.jpg')
                  "
                  v-else
                ></b-img-lazy>
              </template>
              <template
                v-if="
                  newBannerImage && newBannerImage.length > 0 && imageChanged
                "
              >
                <b-img-lazy
                  :src="attachment.endpoint"
                  v-for="attachment in newBannerImage"
                  :key="attachment.endpoint"
                />
                <div class="text-center mt-2">
                  <b-button variant="danger" @click="removeBannerImage()"
                    >이미지 제거</b-button
                  >
                </div>
              </template>

              <div class="mt-2">
                <b-form-file
                  placeholder="파일 첨부"
                  ref="fileInput"
                  @input="uploadBanner($event)"
                ></b-form-file>
              </div>
            </b-tab>
            <b-tab title="모바일 이미지">
              <template v-if="!mobileImageChanged">
                <b-img-lazy
                  :src="bannerDto.mobileImage[0].endpoint"
                  v-if="
                    bannerDto.mobileImage && bannerDto.mobileImage.length > 0
                  "
                />
                <b-img-lazy
                  :src="
                    require('@/assets/images/general/common/img_placeholder.jpg')
                  "
                  v-else
                ></b-img-lazy>
              </template>
              <template
                v-if="
                  newBannerMobileImage &&
                    newBannerMobileImage.length > 0 &&
                    mobileImageChanged
                "
              >
                <b-img-lazy
                  :src="attachment.endpoint"
                  v-for="attachment in newBannerMobileImage"
                  :key="attachment.endpoint"
                />
                <div class="text-center mt-2">
                  <b-button variant="danger" @click="removeBannerMobileImage()"
                    >이미지 제거</b-button
                  >
                </div>
              </template>
              <div class="mt-2">
                <b-form-file
                  placeholder="파일 첨부"
                  ref="fileInputMobile"
                  @input="uploadBannerMobileImage($event)"
                ></b-form-file>
              </div>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
      <b-col cols="12" lg="8">
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
          <b-col cols="12" lg="12" class="mb-3">
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
          <b-col cols="12" class="mb-3">
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
          <b-col cols="9" class="mb-3">
            <label>
              URL
              <span class="red-text">*</span>
            </label>
            <b-row no-gutters align-v="center" style="flex-wrap:nowrap">
              <b-form-input
                v-model="bannerUpdateDto.url"
                placeholder="https://"
              ></b-form-input>
              <a
                :href="getLinkUrl(bannerUpdateDto.url)"
                target="_blank"
                class="btn btn-lg  btn-info text-nowrap ml-2"
                >링크 확인</a
              >
            </b-row>
          </b-col>
        </b-form-row>
        <div class="text-right">
          <b-button variant="danger" v-b-modal.delete_banner>삭제하기</b-button>
          <b-button variant="primary" @click="updateBanner()"
            >수정하기</b-button
          >
        </div>
      </b-col>
    </b-row>
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
import { Component, Watch } from 'vue-property-decorator';
import { BannerDto } from '@/dto';
import BannerService from '../../../services/banner.service';
import { FileAttachmentDto } from '@/services/shared/file-upload';
import FileUploadService from '../../../services/shared/file-upload/file-upload.service';
import { UPLOAD_TYPE } from '../../../services/shared/file-upload/file-upload.service';
import { ATTACHMENT_REASON_TYPE } from '@/services/shared/file-upload';
import { CONST_YN, YN } from '@/common';
import { CodeManagementDto } from '@/services/init/dto';
import CodeManagementService from '../../../services/code-management.service';
import { LINK_TYPE } from '@/services/shared';
import toast from '../../../../resources/assets/js/services/toast.js';

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

  @Watch('bannerUpdateDto.linkType')
  resetLink() {
    this.bannerUpdateDto.url = '';
  }

  getLinkUrl(linkUrl: string) {
    return linkUrl.includes('//') ? linkUrl : `//${linkUrl}`;
  }

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
        this.bannerUpdateDto = this.bannerDto;
      }
    });
  }

  showUpdateModal() {
    this.bannerUpdateDto = this.bannerDto;
    this.findOne(this.$route.params.id);
  }

  // upload banner image
  async uploadBanner(file: File) {
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
  async uploadBannerMobileImage(file: File) {
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
