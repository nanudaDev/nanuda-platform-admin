<template>
  <section v-if="popupDto">
    <SectionTitle title="팝업 관리" divider>
      <template v-slot:rightArea>
        <router-link to="/popup" class="btn btn-secondary"
          >목록으로</router-link
        >
      </template>
    </SectionTitle>
    <b-row>
      <b-col cols="12" lg="4">
        <b-card no-body>
          <b-tabs card fill>
            <b-tab title="이미지" active v-if="popupDto.popupType === 'IMAGE'">
              <template v-if="!imageChanged">
                <b-img-lazy
                  :src="popupDto.images[0].endpoint"
                  v-if="popupDto.images && popupDto.images.length > 0"
                  style="width:100%"
                />
                <b-img-lazy
                  :src="
                    require('@/assets/images/general/common/img_placeholder.jpg')
                  "
                  v-else
                ></b-img-lazy>
              </template>
              <template
                v-if="newPopupImage && newPopupImage.length > 0 && imageChanged"
              >
                <b-img-lazy
                  :src="attachment.endpoint"
                  v-for="attachment in newPopupImage"
                  :key="attachment.endpoint"
                  style="width:100%"
                />
                <div class="text-center mt-2">
                  <b-button variant="danger" @click="removePopupImage()"
                    >이미지 제거</b-button
                  >
                </div>
              </template>

              <div class="mt-2">
                <b-form-file
                  placeholder="파일 첨부"
                  ref="fileInput"
                  @input="uploadPopup($event)"
                ></b-form-file>
              </div>
            </b-tab>
            <b-tab title="미리보기" active v-else>
              <h3>
                {{ popupUpdateDto.title }}
              </h3>
              <h4 class="my-3">
                {{ popupUpdateDto.subTitle }}
              </h4>
              <div v-html="popupUpdateDto.content">
                {{ popupUpdateDto.content }}
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
              v-model="popupUpdateDto.showYn"
              :value="showYn[0]"
              :unchecked-value="showYn[1]"
            ></b-form-checkbox>
          </b-form-group>
        </b-row>
        <b-form-row>
          <b-col cols="12" lg="12" class="mb-3">
            <label>
              팝업 타입
            </label>
            <b-form-select
              id="update_popup_type"
              v-model="popupUpdateDto.popupType"
              disabled
            >
              <b-form-select-option
                v-for="type in popupTypeSelect"
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
            <b-form-input v-model="popupUpdateDto.title"></b-form-input>
          </b-col>
          <template v-if="popupUpdateDto.popupType === 'NOTIFICATION'">
            <b-col cols="12" class="mb-3">
              <b-form-group label="서브 타이틀">
                <b-form-input v-model="popupUpdateDto.subTitle"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="12" class="mb-3">
              <b-form-group label="내용">
                <vue-editor
                  id="update_content"
                  class="bg-white"
                  v-model="popupUpdateDto.content"
                  :editorToolbar="editorToolbar"
                ></vue-editor>
              </b-form-group>
            </b-col>
          </template>
          <b-col cols="12" md="6" class="mb-3">
            <div>
              <label for="ended">시작 날짜</label>
              <b-form-datepicker
                id="started"
                v-model="popupUpdateDto.started"
              ></b-form-datepicker>
            </div>
          </b-col>
          <b-col cols="12" md="6" class="mb-3">
            <div>
              <label for="ended">종료 날짜</label>
              <b-form-datepicker
                id="ended"
                v-model="popupUpdateDto.ended"
                :disabled="popupUpdateDto.started ? false : true"
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
              v-model="popupUpdateDto.linkType"
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
              <b-input-group
                :prepend="popupUpdateDto.linkType === 'EXTERNAL' ? null : '/'"
              >
                <b-form-input
                  v-model="popupUpdateDto.link"
                  :placeholder="
                    popupUpdateDto.linkType === 'EXTERNAL' ? 'https://' : null
                  "
                ></b-form-input>
              </b-input-group>
              <a
                :href="getLinkUrl(popupUpdateDto.link)"
                target="_blank"
                class="btn btn-lg  btn-info text-nowrap ml-2"
                >링크 확인</a
              >
            </b-row>
          </b-col>
        </b-form-row>
        <div class="text-right">
          <b-button variant="danger" v-b-modal.delete_popup>삭제하기</b-button>
          <b-button variant="primary" @click="updatePopup()">수정하기</b-button>
        </div>
      </b-col>
    </b-row>
    <!-- 팝업 삭제하기 -->
    <b-modal
      id="delete_popup"
      title="팝업 삭제"
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
import { PopupDto } from '@/dto';
import PopupService from '../../../services/popup.service';
import { FileAttachmentDto } from '@/services/shared/file-upload';
import FileUploadService from '../../../services/shared/file-upload/file-upload.service';
import { UPLOAD_TYPE } from '../../../services/shared/file-upload/file-upload.service';
import { ATTACHMENT_REASON_TYPE } from '@/services/shared/file-upload';
import { CONST_YN, YN } from '@/common';
import { CodeManagementDto } from '@/services/init/dto';
import CodeManagementService from '../../../services/code-management.service';
import { LINK_TYPE } from '@/services/shared';
import { EditorConfig } from '@/config';
import { VueEditor } from 'vue2-editor';
import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'PopupDetail',
  components: {
    VueEditor,
  },
})
export default class PopupDetail extends BaseComponent {
  private popupDto = new PopupDto();
  private popupUpdateDto = new PopupDto();

  private showYn: YN[] = [...CONST_YN];
  private popupTypeSelect: CodeManagementDto[] = [];
  private linkTypeSelect: CodeManagementDto[] = [];
  private imageChanged = false;
  private newPopupImage: FileAttachmentDto[] = [];
  private newPopupMobileImage: FileAttachmentDto[] = [];

  private editorToolbar = EditorConfig;

  @Watch('popupUpdateDto.linkType')
  resetLink() {
    this.popupUpdateDto.link = '';
  }

  getLinkUrl(linkUrl: string) {
    if (linkUrl) {
      if (this.popupUpdateDto.linkType === LINK_TYPE.EXTERNAL) {
        return linkUrl.includes('//') ? linkUrl : `//${linkUrl}`;
      } else {
        return `${this.env.homepageSiteUrl}${linkUrl}`;
      }
    }
  }

  getTypeCodes() {
    CodeManagementService.findAnyCode('POPUP').subscribe(res => {
      this.popupTypeSelect = res.data;
    });
    CodeManagementService.findAnyCode('LINK_TYPE').subscribe(res => {
      this.linkTypeSelect = res.data;
    });
  }

  findOne(id) {
    PopupService.findOne(id).subscribe(res => {
      if (res) {
        this.popupDto = res.data;
        this.popupUpdateDto = this.popupDto;
      }
    });
  }

  showUpdateModal() {
    this.popupUpdateDto = this.popupDto;
    this.findOne(this.$route.params.id);
  }

  // upload popup image
  async uploadPopup(file: File) {
    if (file) {
      const attachments = await FileUploadService.upload(UPLOAD_TYPE.BANNER, [
        file,
      ]);
      this.newPopupImage = [];
      this.newPopupImage.push(
        ...attachments.filter(
          fileUpload =>
            fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
        ),
      );
      this.imageChanged = true;
      console.log(this.newPopupImage);
    }
  }

  removePopupImage() {
    this.newPopupImage = [];
    this.$refs['fileInput'].reset();
    this.imageChanged = false;
  }

  updatePopup() {
    if (this.newPopupImage.length > 0) {
      this.popupUpdateDto.images = this.newPopupImage;
    } else {
      delete this.popupUpdateDto.images;
    }

    PopupService.update(this.$route.params.id, this.popupUpdateDto).subscribe(
      res => {
        if (res) {
          toast.success('수정완료');
          this.findOne(this.$route.params.id);
        }
      },
    );
  }

  deleteOne() {
    PopupService.deleteOne(this.$route.params.id).subscribe(res => {
      if (res) {
        toast.success('삭제완료');
        this.$router.push('/popup');
      }
    });
  }

  created() {
    this.findOne(this.$route.params.id);
    this.getTypeCodes();
  }
}
</script>
