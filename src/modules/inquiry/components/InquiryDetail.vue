<template>
  <div class="board-view" v-if="inquiry">
    <div class="board-view-header">
      <div class="board-view-title">
        <b-badge
          variant="warning"
          class="board-view-category"
          v-if="inquiry.codeManagement && inquiry.codeManagement.value"
          >{{ inquiry.codeManagement.value }}</b-badge
        >
        <h3>{{ inquiry.title }}</h3>
      </div>
      <div
        class="board-view-info"
        v-if="inquiry.companyUser && inquiry.company"
      >
        <span clsas="board-user-name"
          >{{ inquiry.companyUser.name }} ({{ inquiry.company.nameKr }})</span
        >
        <span class="baord-view-date">
          {{ inquiry.createdAt | dateTransformer }}</span
        >
      </div>
    </div>
    <div class="board-view-body">
      <div v-html="inquiry.content" class="board-view-content">
        {{ inquiry.content }}
      </div>
    </div>
    <div class="board-view-footer">
      <b-row no-gutters align-h="end" align-v="center">
        <router-link to="/inquiry" class="btn btn-secondary text-center"
          >목록으로</router-link
        >
        <!-- <b-button
          variant="success"
          @click="completeReply()"
          v-if="inquiry.isClosed == 'N' && inquiryReplyListCount > 0"
          >답변 완료 처리</b-button
        > -->
      </b-row>
    </div>
    <!-- 답변 리스트 -->
    <b-alert variant="success" show v-if="inquiry.isClosed == 'Y'" class="my-4">
      <p class="text-center">
        답변이 완료된 문의 글입니다.
      </p>
    </b-alert>
    <InquiryReplyList :admin="admin" :isClosed="inquiry.isClosed" />
  </div>
</template>
<script lang="ts">
import { BaseUser } from '../../../services/shared/auth';
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import InquiryService from '../../../services/inquiry.service';
import InquiryReplyList from '../../inquiry/components/InquiryReplyList.vue';
import {
  AdminDto,
  InquiryDto,
  InquiryListDto,
  InquiryReplyListDto,
} from '../../../dto';
import { Pagination, YN, INQUIRY } from '../../../common';

import AdminService from '../../../services/admin.service';
import JwtStorageService from '../../../services/shared/auth/jwt-storage.service';
import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'InquiryDetail',
  components: {
    InquiryReplyList,
  },
})
export default class InquiryDetail extends BaseComponent {
  private inquiry = new InquiryDto();
  private pagination = new Pagination();
  private admin = new AdminDto(BaseUser);
  // private inquiryUpdateDto = new InquiryUpdateDto();
  private inquiryReplyListDto = new InquiryReplyListDto();
  // private inquiryReplyListCount = 0;

  // 문의 상세
  findOne() {
    InquiryService.findOne(this.$route.params.id).subscribe(res => {
      this.inquiry = res.data;
    });
  }

  // getReplyCount() {
  //   InquiryService.findForReply(
  //     this.$route.params.id,
  //     this.inquiryReplyListDto,
  //     this.pagination,
  //   ).subscribe(res => {
  //     this.inquiryReplyListCount = res.data.totalCount;
  //   });
  // }

  // 답변 완료 처리
  completeReply() {
    this.inquiry.isClosed = YN.YES;
    console.log(this.inquiry.isClosed);
    toast.success('답변 완료 처리 되었습니다');
    // this.update();
  }

  // update() {
  //   InquiryService.update(this.$route.params.id).subscribe(res => {
  //     if (res) {
  //       this.findOne();
  //     }
  //   });
  // }

  created() {
    this.findOne();
    // this.getReplyCount();
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
