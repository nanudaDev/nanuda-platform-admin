<template>
  <section v-if="!editMode">
    <div class="board-view">
      <b-alert
        variant="info"
        show
        v-if="noticeBoardDto.tempSaveYn === 'Y'"
        class="my-4"
      >
        <p class="text-center">
          <b>{{ noticeBoardDto.tempSavedAt | dateTransformer }}</b> 에 임시
          저장된 글입니다 수정하기 버튼을 클릭하여 작성 완료해주세요.
        </p>
      </b-alert>
      <div class="board-view-header">
        <div class="board-view-title">
          <b-badge variant="warning" class="board-view-category">
            {{ noticeBoardDto.noticeBoardType | enumTransformer }}
          </b-badge>
          <h3>{{ noticeBoardDto.title }}</h3>
        </div>
        <div class="board-view-info">
          <span
            class="baord-view-user"
            v-if="noticeBoardDto.admin && noticeBoardDto.admin.name"
            >{{ noticeBoardDto.admin.name }}</span
          >
          <span class="baord-view-date">{{
            noticeBoardDto.createdAt | dateTransformer
          }}</span>
        </div>
      </div>
      <div class="board-view-body">
        <div v-if="noticeBoardDto.started">
          <strong>이벤트 기간</strong>
          <span>{{ noticeBoardDto.started }}</span> ~
          <span>{{ noticeBoardDto.ended }}</span>
        </div>
        <div v-html="noticeBoardDto.content" class="board-view-content">
          {{ noticeBoardDto.content }}
        </div>
        <div
          v-if="
            noticeBoardDto.attachments && noticeBoardDto.attachments.length > 0
          "
          class="board-view-attachments"
        >
          <a
            :href="attachment.endpoint"
            target="_blank"
            download
            class="btn btn-outline-info btn-small m-1"
            v-for="attachment in noticeBoardDto.attachments"
            :key="attachment.key"
          >
            {{ attachment.originFilename }}
            <b-icon icon="cloud-download" class="ml-2"></b-icon>
          </a>
        </div>
        <div v-if="noticeBoardDto.url" class="board-view-url">
          <strong>URL</strong>
          <a :href="getLinkUrl(noticeBoardDto.url)" target="_blank">{{
            noticeBoardDto.url
          }}</a>
        </div>
      </div>
      <div class="board-view-footer clearfix">
        <div class="float-left">
          <b-button variant="danger" v-b-modal.delete_notice>삭제하기</b-button>
        </div>
        <div class="float-right">
          <router-link to="/notice-board" class="btn btn-secondary text-center"
            >목록으로</router-link
          >
          <b-button variant="primary" @click="update()">수정하기</b-button>
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
  <!-- 수정 모드 -->
  <section v-else>
    <NoticeBoardUpdate
      :editMode="editMode"
      :oldAttachments="noticeBoardDto.attachments"
      @cancelUpdate="cancelUpdate()"
    />
  </section>
</template>
<script lang="ts">
import Component from 'vue-class-component';
import BaseComponent from '../../../core/base.component';
import { NoticeBoardDto } from '../../../dto';
import NoticeBoardService from '../../../services/notice-board.service';
import { FileAttachmentDto } from '../../../services/shared/file-upload/dto';
import toast from '../../../../resources/assets/js/services/toast.js';
import NoticeBoardUpdate from '../../../modules/notice-board/components/NoticeBoardUpdate.vue';
import { ClearOutQueryParamMapper, ReverseQueryParamMapper } from '@/core';

@Component({
  name: 'NoticeBoardDetail',
  components: {
    NoticeBoardUpdate,
  },
})
export default class NoticeBoardDetail extends BaseComponent {
  private noticeBoardDto = new NoticeBoardDto();
  private editMode = false;

  getLinkUrl(linkUrl: string) {
    return linkUrl.includes('//') ? linkUrl : `//${linkUrl}`;
  }

  findOne(id) {
    NoticeBoardService.findOne(id).subscribe(res => {
      if (res) {
        this.noticeBoardDto = res.data;
      }
    });
  }

  deleteOne() {
    NoticeBoardService.deleteOne(this.$route.params.id).subscribe(res => {
      if (res) {
        toast.success('삭제 완료');
        this.$router.push('/notice-board');
      }
    });
  }

  update() {
    if (!this.$route.params.query) {
      this.editMode = true;
      this.$router.push({ query: { editMode: '1' } });
    }
  }

  cancelUpdate() {
    if (this.editMode) {
      this.editMode = false;
      ClearOutQueryParamMapper();
    }
  }

  created() {
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.editMode = Boolean(query.editMode);
    }
    const id = this.$route.params.id;
    this.findOne(id);
  }
}
</script>
<style lang="scss">
.board-view {
  background-color: #fff;
  border-radius: 0.25rem;
  padding: 2rem;

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

    .board-view-info {
      span {
        position: relative;
        + span {
          padding-left: 1em;
          margin-left: 1em;
          &:before {
            position: absolute;
            left: 0;
            top: 50%;
            margin-top: -5px;
            display: inline-block;
            content: '';
            width: 1px;
            height: 10px;
            background-color: #a7a7a7;
          }
        }

        .board-view-date {
          white-space: nowrap;
        }
      }
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
    .board-view-attachments {
      margin-bottom: 1rem;
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
  @media screen and (max-width: 1023px) {
    .board-view-header {
      display: block;
    }
    .board-view-info {
      margin-top: 1em;
    }
  }
}
</style>
