<template>
  <section>
    <div class="board-view">
      <div class="board-view-header">
        <div class="board-view-title">
          <b-badge variant="warning" class="board-view-category">{{
            noticeBoard.noticeBoardType | enumTransformer
          }}</b-badge>
          <h3>{{ noticeBoard.title }}</h3>
        </div>
        <div class="border-view-info">
          <span class="baord-view-user">{{ noticeBoard.adminNo }}</span>
          <span class="baord-view-date">
            {{ noticeBoard.createdAt | dateTransformer }}
          </span>
        </div>
      </div>
      <div class="board-view-body">
        <div v-if="noticeBoard.started">
          <strong>이벤트 기간</strong>
          <span>{{ noticeBoard.started }}</span> ~
          <span>{{ noticeBoard.ended }}</span>
        </div>
        <div v-html="noticeBoard.content" class="board-view-content">
          {{ noticeBoard.content }}
        </div>
        <div
          v-if="noticeBoard.attachments && noticeBoard.attachments.length > 0"
          class="board-view-attachments"
        >
          <a
            :href="attachment.endpoint"
            target="_blank"
            download
            class="btn btn-outline-info btn-small m-1"
            v-for="attachment in noticeBoard.attachments"
            :key="attachment.key"
          >
            {{ attachment.originFilename }}
            <b-icon icon="cloud-download" class="ml-2"></b-icon>
          </a>
        </div>
        <div v-if="noticeBoard.url" class="board-view-url">
          <strong>URL</strong>
          <a :href="noticeBoard.url" target="_blank">{{ noticeBoard.url }}</a>
        </div>
      </div>
      <div class="board-view-footer">
        <div class="text-right">
          <router-link to="/notice-board" class="btn btn-secondary text-center"
            >목록으로</router-link
          >
          <button class="btn btn-danger text-center" v-b-modal.delete_notice>
            삭제하기
          </button>
        </div>
      </div>
    </div>
    <!-- 공지사항 삭제 -->
    <b-modal
      id="delete_notice"
      title="공지사항 삭제"
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
import Component from 'vue-class-component';
import BaseComponent from '../../../core/base.component';
import { NoticeBoardDto, FileAttachmentDto } from '../../../dto';
import NoticeBoardService from '../../../services/notice-board.service';
import FileUploadService from '../../../services/shared/file-upload/file-upload.service';
import { UPLOAD_TYPE } from '../../../services/shared/file-upload/file-upload.service';
import { ATTACHMENT_REASON_TYPE } from '../../../services/shared/file-upload/dto';
import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'NoticeBoardDetail',
})
export default class NoticeBoardDetail extends BaseComponent {
  private noticeBoard = new NoticeBoardDto();
  private environments = null;

  findOne(id) {
    NoticeBoardService.findOne(id).subscribe(res => {
      if (res) {
        this.noticeBoard = res.data;
      }
    });
  }

  deleteOne() {
    NoticeBoardService.deleteOne(this.$route.params.id).subscribe(res => {
      toast.success('공지사항 삭제했습니다');
      this.$router.push('/notice-board');
    });
  }

  created() {
    const id = this.$route.params.id;
    this.findOne(id);
  }
}
</script>
<style lang="scss">
.board-view {
  .board-view-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    .board-view-title {
      font-weight: 500;

      .board-view-category {
        display: inline-block;
        padding: 0.25rem 0.5rem;
        margin-bottom: 0.25rem;
      }
    }
    .board-view-date {
      white-space: nowrap;
    }
  }
  .board-view-body {
    padding: 1rem 0;
    margin: 1rem 0;
    border-top: 1px solid #a7a7a7;
    border-bottom: 1px solid #a7a7a7;
    .board-view-content {
      min-height: 400px;
      padding: 0.5rem;
    }
    .board-view-url {
      border-top: 1px solid #a7a7a7;
      padding: 1rem 0.5rem 0;
      line-height: 1;
      strong {
        margin-right: 1em;
      }
    }
  }
}
</style>
