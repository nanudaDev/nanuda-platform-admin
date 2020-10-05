<template>
  <section v-if="articleDto">
    <SectionTitle title="기사 관리" divider>
      <template v-slot:rightArea>
        <router-link to="/article" class="btn btn-secondary">목록으로</router-link>
      </template>
    </SectionTitle>
    <b-row>
      <b-col cols="12" class="my-3">
        <BaseCard title="기사 정보">
          <template v-slot:head>
            <div>
              <b-button variant="danger" v-b-modal.delete_article>삭제하기</b-button>
              <b-button variant="primary" v-b-modal.update_article @click="showUpdateModal()">수정하기</b-button>
            </div>
          </template>
          <template v-slot:body>
            <b-row aligh-h="start" align-v="start">
              <b-col cols="12" md="4">
                <div v-if="articleDto.image && articleDto.image.length > 0" class="mb-4">
                  <div v-for="image in articleDto.image" :key="image.endpoint">
                    <b-img-lazy
                      :src="image.endpoint"
                      class="rounded mx-auto d-block article-image"
                      style="max-height:300px"
                    />
                  </div>
                </div>
              </b-col>
              <b-col cols="12" md="4">
                <div>
                  <ul class="u-lsit">
                    <li>제목 : {{ articleDto.title }}</li>
                    <li>언론사 :{{ articleDto.mediaName }}</li>
                    <li>
                      URL :
                      <a :href="articleDto.url" target="_blank">
                        {{
                        articleDto.url
                        }}
                      </a>
                    </li>
                    <li>설명글 : {{ articleDto.desc }}</li>
                  </ul>
                </div>
              </b-col>
            </b-row>
          </template>
        </BaseCard>
      </b-col>
    </b-row>
    <!-- 기사 수정 모달 -->
    <b-modal
      id="update_article"
      title="기사 수정"
      ok-title="수정"
      cancel-title="취소"
      @ok="updateArticle()"
      size="lg"
    >
      <b-row no-gutters align-h="end">
        <b-form-group label="노출 여부" label-size="sm" label-text-align="right" label-cols="8">
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
        <b-col cols="12" md="6" class="mb-3 offset-3">
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
            <div v-if="!articleDto.image && !newArticleImage" class="mb-4">
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
                <b-button variant="danger" @click="removeArticleImage()">이미지 제거</b-button>
              </div>
            </div>
          </div>
          <div class="custom-file">
            <b-form-file placeholder="파일 첨부" ref="fileInput" @input="upload($event)"></b-form-file>
          </div>
        </b-col>
        <b-col cols="12" md="12" class="mb-3">
          <label>
            언론사
            <span class="red-text">*</span>
          </label>
          <b-form-input v-model="articleUpdateDto.mediaName"></b-form-input>
        </b-col>
        <b-col cols="12" class="mb-3">
          <label>
            제목
            <span class="red-text">*</span>
          </label>
          <b-form-input v-model="articleUpdateDto.title"></b-form-input>
        </b-col>
        <b-col cols="12" class="mb-3">
          <label>
            URL
            <span class="red-text">*</span>
          </label>
          <b-form-input v-model="articleUpdateDto.url"></b-form-input>
        </b-col>
        <b-col cols="12" class="mb-3">
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
            <b class="text-primary">{{ articleUpdateDto.desc.length }}</b> / 100
          </p>
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
import { ArticleUpdateDto } from '@/dto/article/article-update.dto';
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
    console.log('ss', this.articleUpdateDto.image);
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
