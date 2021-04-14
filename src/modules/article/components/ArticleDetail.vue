<template>
  <section v-if="articleDto">
    <div class="board-view">
      <div class="board-view-header">
        <div class="board-view-title">
          <b-badge variant="warning" class="board-view-category">
            {{ articleDto.mediaName }}
          </b-badge>
          <h3>{{ articleDto.title }}</h3>
        </div>
        <div class="board-view-info">
          <span
            class="baord-view-user"
            v-if="articleDto.admin && articleDto.admin.name"
            >{{ articleDto.admin.name }}</span
          >
          <span class="baord-view-date">{{
            articleDto.createdAt | dateTransformer
          }}</span>
        </div>
      </div>
      <div class="board-view-body">
        <div class="board-view-content">
          <b-row>
            <b-col
              cols="12"
              md="4"
              v-if="articleDto.image && articleDto.image[0]"
              class="mb-3"
            >
              <b-img-lazy
                :src="articleDto.image[0].endpoint"
                :alt="articleDto.title"
              ></b-img-lazy>
            </b-col>
            <b-col
              cols="12"
              :md="articleDto.image[0] ? 8 : 12"
              v-html="articleDto.desc"
            >
              {{ articleDto.desc }} ss</b-col
            >
          </b-row>
        </div>
        <div v-if="articleDto.url" class="board-view-url">
          <strong>URL</strong>
          <a :href="getLinkUrl(articleDto.url)" target="_blank">{{
            articleDto.url
          }}</a>
        </div>
      </div>
      <div class="board-view-footer clearfix">
        <div class="float-left">
          <b-button variant="danger" v-b-modal.delete_article
            >삭제하기</b-button
          >
        </div>
        <div class="float-right">
          <router-link to="/article" class="btn btn-secondary text-center"
            >목록으로</router-link
          >
          <b-button
            variant="primary"
            v-b-modal.update_article
            @click="showUpdateModal()"
            >수정하기</b-button
          >
        </div>
      </div>
    </div>
    <!-- 기사 수정 모달 -->
    <b-modal
      id="update_article"
      title="기사 수정"
      ok-title="수정"
      cancel-title="취소"
      @ok="updateArticle()"
      size="xl"
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
            v-model="articleUpdateDto.showYn"
            :value="showYn[0]"
            :unchecked-value="showYn[1]"
          ></b-form-checkbox>
        </b-form-group>
      </b-row>
      <b-form-row>
        <b-col cols="12" lg="6" class="mb-3">
          <label>기사 이미지</label>
          <div class="my-2">
            <div
              v-if="
                articleDto.image && articleDto.image.length > 0 && !imageChanged
              "
              class="mb-4"
            >
              <div v-for="image in articleDto.image" :key="image.endpoint">
                <b-img-lazy
                  :src="image.endpoint"
                  class="rounded mx-auto d-block article-image"
                  style="max-height:300px"
                />
              </div>
            </div>
            <div
              v-if="!articleDto.image.length && !newArticleImage.length"
              class="mb-4"
              style="background-color:#ddd;"
            >
              <b-img-lazy
                class="rounded mx-auto d-block article-image"
                :src="
                  require('@/assets/images/general/common/img_placeholder.jpg')
                "
                rounded
                style="max-height:300px"
              />
            </div>
            <div
              v-if="
                newArticleImage && newArticleImage.length > 0 && imageChanged
              "
              class="mb-4"
            >
              <div v-for="image in newArticleImage" :key="image.endpoint">
                <b-img-lazy
                  :src="image.endpoint"
                  class="rounded mx-auto d-block article-image"
                  style="max-height:300px"
                />
              </div>
              <div class="text-center mt-2">
                <b-button variant="danger" @click="removeArticleImage()"
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
        <b-col cols="12" lg="6">
          <b-form-group>
            <label>
              언론사
              <span class="red-text">*</span>
            </label>
            <b-form-input v-model="articleUpdateDto.mediaName"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label>
              제목
              <span class="red-text">*</span>
            </label>
            <b-form-input v-model="articleUpdateDto.title"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label>
              URL
              <span class="red-text">*</span>
            </label>
            <b-form-input v-model="articleUpdateDto.url"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label>기사 설명</label>
            <textarea
              class="form-control"
              maxlength="100"
              style="min-height:100px"
              v-model="articleUpdateDto.desc"
            ></textarea>
            <p
              class="text-length text-right"
              v-if="articleUpdateDto.desc && articleUpdateDto.desc.length"
            >
              <b class="text-primary">{{ articleUpdateDto.desc.length }}</b> /
              100
            </p>
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-modal>
    <!-- 기사 삭제하기 -->
    <b-modal
      id="delete_article"
      title="기사 삭제"
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
import { ArticleDto } from '@/dto';
import ArticleService from '../../../services/article.service';
import Component from 'vue-class-component';
import { ArticleUpdateDto } from '@/dto';
import { FileAttachmentDto } from '@/services/shared/file-upload';
import FileUploadService from '../../../services/shared/file-upload/file-upload.service';
import { UPLOAD_TYPE } from '../../../services/shared/file-upload/file-upload.service';
import { ATTACHMENT_REASON_TYPE } from '@/services/shared/file-upload';

import toast from '../../../../resources/assets/js/services/toast.js';
import { CONST_YN, YN } from '@/common';

@Component({
  name: 'ArticleDetail',
})
export default class ArticleDetail extends BaseComponent {
  private articleDto = new ArticleDto();
  private articleUpdateDto = new ArticleUpdateDto();
  private newArticleImage: FileAttachmentDto[] = [];
  private showYn: YN[] = [...CONST_YN];
  private imageChanged = false;

  getLinkUrl(linkUrl: string) {
    return linkUrl.includes('//') ? linkUrl : `//${linkUrl}`;
  }

  findOne(id) {
    ArticleService.findOne(id).subscribe(res => {
      if (res) {
        this.articleDto = res.data;
      }
    });
  }

  showUpdateModal() {
    this.articleUpdateDto = this.articleDto;
    this.findOne(this.$route.params.id);
  }

  // upload article image
  async upload(file: File) {
    if (file) {
      const attachments = await FileUploadService.upload(UPLOAD_TYPE.ARTICLE, [
        file,
      ]);
      this.newArticleImage = [];
      this.newArticleImage.push(
        ...attachments.filter(
          fileUpload =>
            fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
        ),
      );
      this.imageChanged = true;
    }
  }

  removeArticleImage() {
    this.newArticleImage = [];
    this.$refs['fileInput'].reset();
    this.imageChanged = false;
  }

  updateArticle() {
    if (this.newArticleImage.length > 0) {
      this.articleUpdateDto.image = this.newArticleImage;
    } else {
      delete this.articleUpdateDto.image;
    }
    ArticleService.update(
      this.$route.params.id,
      this.articleUpdateDto,
    ).subscribe(res => {
      if (res) {
        toast.success('수정완료');
        this.findOne(this.$route.params.id);
      }
    });
  }

  deleteOne() {
    ArticleService.deleteOne(this.$route.params.id).subscribe(res => {
      if (res) {
        toast.success('삭제완료');
        this.$router.push('/article');
      }
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
