<template>
  <div class="board-view" v-if="inquiryDto">
    <div class="board-view-header">
      <div class="board-view-title">
        <b-badge
          variant="warning"
          class="board-view-category"
          v-if="inquiryDto.codeManagement && inquiryDto.codeManagement.value"
          >{{ inquiryDto.codeManagement.value }}</b-badge
        >
        <h3>{{ inquiryDto.title }}</h3>
      </div>
      <div
        class="board-view-info"
        v-if="inquiryDto.companyUser && inquiryDto.company"
      >
        <span clsas="board-user-name"
          >{{ inquiryDto.companyUser.name }} ({{
            inquiryDto.company.nameKr
          }})</span
        >
        <span class="baord-view-date">
          {{ inquiryDto.createdAt | dateTransformer }}</span
        >
      </div>
    </div>
    <div class="board-view-body">
      <div v-html="inquiryDto.content" class="board-view-content">
        {{ inquiryDto.content }}
      </div>
    </div>
    <div class="board-view-footer">
      <b-row no-gutters align-h="end" align-v="center">
        <router-link to="/inquiry" class="btn btn-secondary text-center"
          >목록으로</router-link
        >
        <b-button
          variant="success"
          @click="updateClosed()"
          v-if="inquiryDto.isClosed === 'N' && inquiryReplyListCount > 0"
          >답변 완료 처리</b-button
        >
      </b-row>
    </div>
    <!-- 답변 리스트 -->
    <b-alert
      variant="success"
      show
      v-if="inquiryDto.isClosed == 'Y'"
      class="my-4"
    >
      <p class="text-center">
        답변이 완료된 문의 글입니다.
      </p>
    </b-alert>
    <InquiryReplyList :admin="admin" :isClosed="inquiryDto.isClosed" />
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
  InquiryUpdateClosedDto,
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
  private inquiryDto = new InquiryDto();
  private inquiryUpdateDto = new InquiryDto();
  private pagination = new Pagination();
  private admin = new AdminDto(BaseUser);
  private inquiryReplyListDto = new InquiryReplyListDto();
  private inquiryReplyListCount = 0;
  private inquiryUpdateClosedDto = new InquiryUpdateClosedDto();

  // 문의 상세
  findOne(id) {
    InquiryService.findOne(id).subscribe(res => {
      this.inquiryDto = res.data;
    });
  }

  getReplyCount() {
    InquiryService.findForReply(
      this.$route.params.id,
      this.inquiryReplyListDto,
      this.pagination,
    ).subscribe(res => {
      this.inquiryReplyListCount = res.data.totalCount;
    });
  }

  // 답변 완료 처리
  updateClosed() {
    this.inquiryDto.isClosed = YN.YES;
    InquiryService.updateClosed(
      this.$route.params.id,
      this.inquiryUpdateClosedDto,
    ).subscribe(res => {
      if (res) {
        this.findOne(this.$route.params.id);
        toast.success('답변 완료 처리 되었습니다');
      }
    });
  }

  created() {
    const id = this.$route.params.id;
    this.findOne(id);
    this.getReplyCount();
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
