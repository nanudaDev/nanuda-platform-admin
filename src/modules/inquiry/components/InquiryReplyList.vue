<template>
  <section>
    <div class="reply-write my-4" v-if="isClosed == 'N'">
      <div class="mb-2">
        <span v-if="admin"
          >관리자 : <strong>{{ admin.name }}</strong></span
        >
      </div>
      <div>
        <b-form-textarea
          style="height:100px;"
          v-model="inquiryReplyCreateDto.content"
        ></b-form-textarea>
        <div class="text-right mt-2">
          <b-button variant="primary" v-b-modal.add_reply>답변 작성</b-button>
        </div>
      </div>
    </div>
    <b-modal id="add_reply" title="답변 작성하기" @ok="createReply()">
      <div class="text-center">
        <p><b>답변을 작성하시겠습니까?</b></p>
      </div>
    </b-modal>
    <div class="board-reply" v-if="inquiryReplyListCount">
      <div class="reply-header">
        <h4 class="reply-title">답변 리스트</h4>
        <div class="reply-count">
          <span class="mr-2">TOTAL</span>
          <strong class="text-primary">{{ inquiryReplyListCount }}</strong>
        </div>
      </div>
      <div class="reply-body">
        <div class="reply-list">
          <div
            v-for="reply in inquiryReplyList"
            :key="reply.no"
            class="reply-item-wrap"
            :class="[reply.companyUserNo ? 'company-user' : 'admin']"
          >
            <div class="reply-item">
              <template v-if="reply.companyUserNo">
                <div class="reply-user">
                  <span class="user-icon">
                    <b-avatar variant="warning" size="4em">
                      <strong>{{ reply.companyUser.name }}</strong>
                    </b-avatar>
                    <!-- <b-avatar
                      size="4em"
                      v-if="reply.company && reply.company.logo[0]"
                      :src="reply.company.logo[0].endpoint"
                      variant="light"
                    ></b-avatar>
                    <b-avatar size="4em" v-else></b-avatar> -->
                  </span>
                  <!-- <span class="user-name" v-if="reply.companyUser"
                    >{{ reply.companyUser.name }}
                  </span> -->
                  <span class="user-company" v-if="reply.company">
                    <router-link
                      :to="{
                        name: 'CompanyDetail',
                        params: {
                          id: reply.company.no,
                        },
                      }"
                      >{{ reply.company.nameKr }}
                    </router-link>
                  </span>
                </div>
                <div class="reply-area">
                  <div class="reply-content">
                    <div>
                      {{ reply.content }}
                    </div>
                  </div>
                  <div class="mt-1">
                    <span class="reply-date">{{
                      reply.updatedAt | dateTransformer
                    }}</span>
                    <span class="reply-eidted" v-if="reply.isEdited === 'Y'"
                      >(edited)</span
                    >
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="reply-user">
                  <span class="user-icon">
                    <b-avatar variant="warning" size="4em">
                      <strong>NND</strong>
                    </b-avatar>
                  </span>
                  <span class="user-name" v-if="reply.admin"
                    >{{ reply.admin.name }}
                  </span>
                </div>
                <div class="reply-area">
                  <div class="reply-content">
                    <div>
                      {{ reply.content }}
                    </div>
                    <div class="mt-2" v-if="admin.no === reply.adminNo">
                      <b-button
                        variant="link"
                        size="sm"
                        v-b-modal.update_reply
                        @click="selectReply(reply)"
                        class="btn-edit"
                        v-if="isClosed == 'N'"
                        >수정</b-button
                      >
                    </div>
                  </div>
                  <div class="mt-1">
                    <span class="reply-date">{{
                      reply.updatedAt | dateTransformer
                    }}</span>
                    <span class="reply-eidted" v-if="reply.isEdited === 'Y'"
                      >(edited)</span
                    >
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-pagination
      v-model="pagination.page"
      v-if="inquiryReplyListCount"
      pills
      :total-rows="inquiryReplyListCount"
      :per-page="pagination.limit"
      @input="paginateSearch"
      class="mt-4 justify-content-center"
    ></b-pagination>
    <!-- 답글 수정 모달 -->
    <b-modal id="update_reply" title="답글 수정하기" hide-footer>
      <div>
        <b-form-textarea
          name="update_reply"
          v-model="selectedReplyContent"
        ></b-form-textarea>
        <div class="text-right mt-2">
          <b-button variant="primary" @click="updateReply()">수정</b-button>
        </div>
      </div>
    </b-modal>
    <!-- 답글 완료 처리 모달 -->
    <b-modal
      id="complete_reply"
      title="답글 완료 처리"
      @click="completeReply()"
    >
      <div class="text-center">
        <p><b>문의글에 대한 답변 완료 처리하시겠습니까?</b></p>
      </div>
    </b-modal>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { BaseUser } from '../../../services/shared/auth';
import BaseComponent from '../../../core/base.component';
import AdminService from '../../../services/admin.service';
import InquiryService from '../../../services/inquiry.service';
import {
  AdminDto,
  InquiryDto,
  InquiryListDto,
  InquiryReplyListDto,
  InquiryReplyUpdateDto,
} from '../../../dto';
import { Pagination, OrderByValue } from '../../../common';
import JwtStorageService from '../../../services/shared/auth/jwt-storage.service';
import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'InquiryReplyList',
})
export default class InquiryReplyList extends BaseComponent {
  @Prop() readonly isClosed: {
    type: boolean;
  };
  private admin = new AdminDto(BaseUser);
  private inquiryReplyList: InquiryDto[] = [];
  private inquiryReplyListCount = 0;
  private inquiryReplyCreateDto = new InquiryDto();
  private inquiryReplyListDto = new InquiryReplyListDto();
  private inquiryReplyUpdateDto = new InquiryReplyUpdateDto();
  private pagination = new Pagination();
  private selectedReply: InquiryDto = new InquiryDto();
  private selectedReplyContent = null;
  private selectedReplyNo = null;

  // 답변 리스트
  findAll(isPagination?: boolean) {
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.pagination.limit = 5;

    InquiryService.findForReply(
      this.$route.params.id,
      this.inquiryReplyListDto,
      this.pagination,
    ).subscribe(res => {
      this.inquiryReplyList = res.data.items;
      this.inquiryReplyListCount = res.data.totalCount;
    });
  }

  paginateSearch() {
    this.findAll(true);
  }

  // 관리자
  findAdmin() {
    AdminService.findMe().subscribe(res => {
      this.admin = res.data;
    });
  }

  // 답변 작성
  createReply() {
    InquiryService.createReply(
      this.$route.params.id,
      this.inquiryReplyCreateDto,
    ).subscribe(res => {
      if (res) {
        this.findAll();
        this.clearOutReplyDto();
        toast.success('작성완료');
      }
    });
  }

  // 답변 작성 초기화
  clearOutReplyDto() {
    this.inquiryReplyCreateDto = new InquiryDto();
  }

  // 답변 수정
  selectReply(reply) {
    this.selectedReply = reply;
    this.selectedReplyContent = this.selectedReply.content;
    return (
      (this.selectedReplyNo = this.selectedReply.no),
      (this.selectedReplyContent = this.selectedReply.content)
    );
  }
  updateReply() {
    if (this.selectedReplyContent) {
      this.inquiryReplyUpdateDto.content = this.selectedReplyContent;
    }
    const replyId = this.selectedReplyNo;
    InquiryService.updateReply(
      this.$route.params.id,
      replyId,
      this.inquiryReplyUpdateDto,
    ).subscribe(res => {
      if (res) {
        this.$bvModal.hide('update_reply');
        this.findAll();
        toast.success('수정완료');
      }
    });
  }

  created() {
    this.pagination.page = 1;
    this.findAll();
    this.findAdmin();
  }
}
</script>
<style lang="scss">
.reply-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1rem 0;
  border-bottom: 1px solid #a7a7a7;
  margin-bottom: 2rem;
}
.reply-list {
  .reply-item-wrap {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    + .reply-item-wrap {
      margin-top: 1.5rem;
    }

    &.company-user {
      justify-content: flex-start;
      .reply-item {
        justify-content: flex-start;
        .reply-user {
          margin-right: 2rem;
        }
        .reply-area {
          text-align: right;
          .reply-content {
            text-align: left;
            &:before {
              left: -1rem;
              border-right: 2rem solid #f5f5f5;
            }
          }
        }
      }
    }

    &.admin {
      justify-content: flex-end;
      .reply-item {
        justify-content: flex-end;
        flex-direction: row-reverse;

        .reply-user {
          margin-left: 2rem;
        }

        .reply-area {
          text-align: right;
          .reply-content {
            text-align: right;
            &:before {
              right: -1rem;
              border-left: 2rem solid #f5f5f5;
            }
          }
        }
      }
    }

    .reply-item {
      display: flex;
      min-width: 60%;
      max-width: 90%;

      .reply-user {
        // min-width: 6rem;
        text-align: center;

        .user-icon {
          display: block;
          margin-bottom: 0.5rem;
        }
        .user-name {
          font-weight: 600;
          font-size: 1rem;
          color: #323232;
        }
        .user-company {
          display: block;
          color: #646464;
        }
      }

      .reply-area {
        width: calc(100% - 6rem);

        .reply-content {
          position: relative;
          width: 100%;
          border-radius: 0.25rem;
          background-color: #f5f5f5;
          padding: 1rem;
          word-break: break-all;
          // min-height: 60px;

          &:before {
            display: block;
            content: '';
            position: absolute;
            top: 0.5rem;
            width: 0;
            height: 0;
            border-top: 1rem solid transparent;
            border-bottom: 1rem solid transparent;
          }

          .btn-edit {
            position: absolute;
            right: 100%;
            margin-right: 5px;
            white-space: nowrap;
            bottom: 0;
            padding: 0;
          }
        }
        .reply-date {
        }
        .reply-eidted {
          margin-left: 0.25rem;
          color: #969696;
        }
      }
    }
  }
}
</style>
