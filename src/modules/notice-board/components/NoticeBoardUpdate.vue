<template>
  <section>
    <SectionTitle title="공지사항 수정" divider>
      <template v-slot:rightArea>
        <b-button @click="cancelUpdate()">수정취소</b-button>
      </template>
    </SectionTitle>
    <div class="mt-3">
      <div class="form-row">
        <div class="col-md-2 mb-3">
          <label for="create_board_type">
            카테고리
            <span class="red-text">*</span>
          </label>
          <select
            class="custom-select"
            id="create_board_type"
            v-model="noticeBoardUpdateDto.noticeBoardType"
          >
            <option
              v-for="noticeBoardType in noticeBoardTypes"
              :key="noticeBoardType"
              :value="noticeBoardType"
              >{{ noticeBoardType | enumTransformer }}</option
            >
          </select>
        </div>
        <div class="col-md-10 mb-3">
          <label for="create_title">
            제목
            <span class="red-text">*</span>
          </label>
          <input
            class="form-control"
            id="create_title"
            v-model="noticeBoardUpdateDto.title"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-12 mb-3">
          <label for="create_content">
            내용
            <span class="red-text">*</span>
          </label>
          <vue-editor
            id="create_content"
            class="bg-white"
            v-model="noticeBoardUpdateDto.content"
            :editorToolbar="editorToolbar"
          ></vue-editor>
        </div>
      </div>
      <div class="form-row">
        <div class="col-12 mb-3">
          <label for="create_url">
            URL
          </label>
          <input
            class="form-control"
            id="create_url"
            v-model="noticeBoardUpdateDto.url"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="col-12 mb-3">
          <label for="">파일첨부</label>
          <div class="custom-file">
            <input
              type="file"
              class="custom-file-input"
              id="customFileLang"
              lang="kr"
              v-on:change="upload($event.target.files)"
              multiple
            />
            <label class="custom-file-label" for="customFileLang"
              >파일 첨부</label
            >
          </div>
        </div>
      </div>
      <div class="board-view-attatchments">
        <div class="attatchments-list">
          <template v-if="oldAttachments && oldAttachments.length > 0">
            <span
              v-for="(attachment, index) in oldAttachments"
              :key="attachment.originFileName"
              class="attatchments-list-item m-1"
            >
              <a
                :href="attachment.endpoint"
                target="_blank"
                download
                class="btn btn-sm btn-outline-info"
                >{{ attachment.originFilename }}
                <b-icon icon="cloud-download" class="ml-2"></b-icon>
              </a>
              <b-icon
                icon="x-circle-fill"
                variant="info"
                class="btn-delete-item"
                @click="deleteOldAttachment(attachment, index)"
              ></b-icon>
            </span>
          </template>
          <template v-if="newAttachments && newAttachments.length > 0">
            <span
              v-for="(attachment, index) in newAttachments"
              :key="attachment.originFileName"
              class="attatchments-list-item m-1"
            >
              <a
                :href="attachment.endpoint"
                target="_blank"
                download
                class="btn btn-sm btn-outline-info"
                >{{ attachment.originFilename }}
                <b-icon icon="cloud-download" class="ml-2"></b-icon>
              </a>
              <b-icon
                icon="x-circle-fill"
                variant="info"
                class="btn-delete-item"
                @click="deleteNewAttachment(attachment, index)"
              ></b-icon>
            </span>
          </template>
        </div>
      </div>
      <div class="clearfix my-4" v-if="noticeBoardUpdateDto.content">
        <div class="float-left">
          <b-button variant="secondary" @click="clearedOut()">초기화</b-button>
        </div>
        <div class="float-right">
          <b-button variant="info" @click="update('Y')">임시저장</b-button>
          <b-button v-b-modal.confirm-notice variant="primary"
            >등록완료</b-button
          >
        </div>
      </div>
    </div>
    <b-modal
      id="confirm-notice"
      title="공지사항 미리보기"
      size="xl"
      header-bg-variant="success"
      header-text-variant="light"
      ok-title="등록하기"
      cancel-title="취소하기"
      ok-variant="success"
      @ok="update('N')"
    >
      <div class="container ql-editor">
        <h3>{{ noticeBoardUpdateDto.title }}</h3>
        <div class="divider mt-2"></div>
        <span v-html="noticeBoardUpdateDto.content"></span>
        <p class="mt-4 text-right" style="font-size:11px">
          <i
            >사용자들이 보는 공지사항과 하단에 표시된 내용이 사용자 컴퓨터나
            브라우저 따라 다소 차이가 있을 수 있습니다.</i
          >
        </p>
      </div>
    </b-modal>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BaseComponent from '@/core/base.component';
import { VueEditor } from 'vue2-editor';
import { EditorConfig } from '../../../config';
import { NoticeBoardDto } from '@/dto';
import { NOTICE_BOARD, CONST_NOTICE_BOARD } from '@/services/shared';
import toast from '../../../../resources/assets/js/services/toast.js';

import {
  ATTACHMENT_REASON_TYPE,
  FileAttachmentDto,
} from '../../../services/shared/file-upload';
import FileUploadService from '../../../services/shared/file-upload/file-upload.service';
import NoticeBoardService from '../../../services/notice-board.service';
import { UPLOAD_TYPE } from '../../../services/shared/file-upload/file-upload.service';
import { YN } from '@/common';

@Component({
  name: 'NoticeBoardUpdate',
  components: {
    VueEditor,
  },
})
export default class NoticeBoardUpdate extends BaseComponent {
  @Prop() editMode: boolean;
  @Prop() uploadedAttachments: FileAttachmentDto[];
  private noticeBoardDto = new NoticeBoardDto();
  private noticeBoardUpdateDto = new NoticeBoardDto();
  private htmlContent = null;
  private noticeBoardTypes: NOTICE_BOARD[] = [...CONST_NOTICE_BOARD];
  private editorToolbar = EditorConfig;
  private startDate = new Date();
  private endDate = new Date();
  private oldAttachments = this.uploadedAttachments;
  private newAttachments: FileAttachmentDto[] = [];

  // 수정 취소
  cancelUpdate() {
    this.$emit('cancelUpdate');
  }

  // 수정
  update(isTempSaveYn?: YN) {
    if (isTempSaveYn === YN.NO) {
      this.noticeBoardUpdateDto.tempSaveYn = YN.NO;
    } else {
      this.noticeBoardUpdateDto.tempSaveYn = YN.YES;
    }
    if (this.uploadedAttachments && this.uploadedAttachments.length > 0) {
      this.noticeBoardUpdateDto.attachments = this.uploadedAttachments;
      this.noticeBoardUpdateDto.newAttachments = this.newAttachments;
    }

    if (
      this.uploadedAttachments &&
      this.uploadedAttachments.length < 1 &&
      this.newAttachments &&
      this.newAttachments.length > 0
    ) {
      this.noticeBoardUpdateDto.attachments = [];
      this.noticeBoardUpdateDto.newAttachments = this.newAttachments;
    }
    if (
      this.uploadedAttachments &&
      this.uploadedAttachments.length < 1 &&
      this.newAttachments &&
      this.newAttachments.length < 1
    ) {
      this.noticeBoardUpdateDto.newAttachments = [];
      this.noticeBoardUpdateDto.attachments = [];
    }
    NoticeBoardService.update(
      this.$route.params.id,
      this.noticeBoardUpdateDto,
    ).subscribe(res => {
      if (res) {
        this.$router.push('/notice-board');
        toast.success('수정완료');
      }
    });
  }

  async upload(files: FileList) {
    const attachments = await FileUploadService.upload(
      UPLOAD_TYPE.NOTICE_BOARD,
      files,
    );
    this.newAttachments = [];
    this.newAttachments.push(
      ...attachments.filter(
        fileAttachment =>
          fileAttachment.attachmentReasonType ===
          ATTACHMENT_REASON_TYPE.SUCCESS,
      ),
    );
  }

  deleteOldAttachment(attachemnt, index) {
    if (this.oldAttachments.includes(attachemnt)) {
      index = this.oldAttachments.indexOf(attachemnt);
      if (index > -1) {
        this.oldAttachments.splice(index, 1);
      }
    }
  }

  deleteNewAttachment(attachemnt, index) {
    if (this.newAttachments.includes(attachemnt)) {
      index = this.newAttachments.indexOf(attachemnt);
      if (index > -1) {
        this.newAttachments.splice(index, 1);
      }
    }
  }

  created() {
    const id = this.$route.params.id;
    NoticeBoardService.findOne(id).subscribe(res => {
      if (res) {
        this.noticeBoardUpdateDto = res.data;
      }
    });
  }
}
</script>
