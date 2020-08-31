<template>
  <section>
    <SectionTitle
      v-if="companyUserDto && companyUserDto.name"
      :title="`${companyUserDto.name} - 사용자 정보`"
      divider
    >
      <template v-slot:rightArea>
        <router-link
          to="/company/company-user"
          class="btn btn-secondary text-center"
          >목록으로</router-link
        >
      </template>
    </SectionTitle>
    <div class="row d-flex align-items-stretch">
      <div class="col col-12 col-lg-6 my-3">
        <BaseCard title="사용자 정보">
          <template v-slot:head>
            <div>
              <b-button variant="danger" v-b-modal.delete_company_user
                >삭제하기</b-button
              >
              <b-button
                variant="primary"
                v-b-modal.update_company_user
                @click="showUpdateModal()"
                >수정하기</b-button
              >
            </div>
          </template>
          <template v-slot:body>
            <div v-if="companyUserDto">
              <ul>
                <li>
                  사용자 ID :
                  <b>{{ companyUserDto.no }}</b>
                </li>
                <li>
                  사용자명 :
                  <b>{{ companyUserDto.name }}</b>
                </li>
                <li v-if="companyUserDto.company">
                  업체명 :
                  <router-link
                    :to="{
                      name: 'CompanyDetail',
                      params: {
                        id: companyUserDto.company.no,
                      },
                    }"
                  >
                    <b>{{ companyUserDto.company.nameKr }}</b>
                  </router-link>
                </li>
                <li>
                  휴대폰 번호 :
                  <b>{{ companyUserDto.phone | phoneTransformer }} </b>
                  <b-button
                    size="sm"
                    variant="info"
                    pill
                    v-b-modal.send_message
                    class="mx-2 p-1"
                  >
                    <b-icon icon="envelope"></b-icon>
                    <span class="d-none">문자전송</span>
                  </b-button>
                </li>
                <li>이메일 : {{ companyUserDto.email }}</li>
                <li>
                  관리자 등급 : {{ companyUserDto.authCode | enumTransformer }}
                </li>
                <li v-if="companyUserDto.createdAt">
                  등록일 : {{ companyUserDto.createdAt | dateTransformer }}
                </li>
                <li v-if="companyUserDto.companyUserStatus">
                  승인 상태 :
                  <b-badge
                    :variant="getStatusColor(companyUserDto.companyUserStatus)"
                    class="badge-pill p-2 mr-2"
                  >
                    {{ companyUserDto.companyUserStatus | enumTransformer }}
                  </b-badge>
                  <span v-if="companyUserDto.updatedAt" class="d-inline-block"
                    >({{ companyUserDto.updatedAt | dateTransformer }})</span
                  >
                </li>
              </ul>
            </div>
            <ApprovalCard
              :data="companyUserDto"
              :dto="companyUserUpdateRefusalDto"
              :reasonDto="companyUserUpdateRefusalReasonDto"
              status="companyUserStatus"
              histories="companyUserUpdateHistories"
              @approval="updateApproval()"
              @refusal="updateRefusal()"
            />
          </template>
        </BaseCard>
      </div>
    </div>
    <!-- 사용자 삭제 모달 -->
    <b-modal
      id="delete_company_user"
      title="사용자 삭제"
      header-bg-variant="danger"
      header-text-variant="light"
      hide-footer
    >
      <div class="text-center">
        <p>
          <b>정말로 삭제하시겠습니까?</b>
        </p>
        <div class="mt-3">
          <input
            type="text"
            placeholder="사용자 이름을 입력해주세요"
            name="delete_name"
            class="form-control"
            id="delete_user_name"
            v-model="deleteUserName"
          />
        </div>
        <div class="mt-2 text-right">
          <b-button variant="danger" @click="deleteCompanyUser()"
            >삭제</b-button
          >
        </div>
      </div>
    </b-modal>
    <!-- 사용자 수정 모달 -->
    <b-modal
      id="update_company_user"
      title="사용자 정보 수정"
      ok-title="수정"
      cancel-title="취소"
      @ok="updateCompanyUser()"
    >
      <b-form-row>
        <b-col cols="12" lg="6">
          <b-form-group label="사용자명">
            <b-form-input
              v-model="companyUserUpdateDto.name"
              disabled
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" lg="6">
          <b-form-group label="휴대폰 번호">
            <b-form-input
              v-model="companyUserUpdateDto.phone"
              disabled
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" lg="6">
          <b-form-group label="이메일">
            <b-form-input
              v-model="companyUserUpdateDto.email"
              disabled
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" lg="6">
          <label>관리자 등급</label>
          <select class="custom-select" v-model="companyUserUpdateDto.authCode">
            <option
              v-for="role in companyUserAdminRole"
              :key="role"
              :value="role"
              >{{ role | enumTransformer }}</option
            >
          </select>
        </b-col>
      </b-form-row>
    </b-modal>
    <!-- 문자 전송 모달 -->
    <b-modal
      v-if="companyUserDto"
      id="send_message"
      ok-title="전송"
      cancel-title="취소"
      :title="`${companyUserDto.name} 사용자에게 문자하기`"
    >
      <p class="mb-2">
        휴대폰 번호 :
        <b class="text-primary">{{
          companyUserDto.phone | phoneTransformer
        }}</b>
      </p>
      <b-form-textarea
        id="message"
        placeholder="메세지를 입력해주세요.."
        rows="3"
        max-rows="6"
      ></b-form-textarea>
    </b-modal>
  </section>
</template>
<script lang="ts">
import ApprovalCard from '../../../modules/_components/ApprovalCard.vue';
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import BaseCard from '../../_components/BaseCard.vue';
import CompanyUserService from '../../../services/company-user.service';
import {
  CompanyUserDto,
  CompanyUserUpdateDto,
  CompanyUserUpdateRefusalDto,
  CompanyUserUpdateRefusalReasonDto,
} from '../../../dto';
import { BaseUser } from '../../../services/shared/auth';
import toast from '../../../../resources/assets/js/services/toast.js';
import {
  APPROVAL_STATUS,
  CONST_APPROVAL_STATUS,
  COMPANY_USER,
  CONST_COMPANY_USER,
} from '../../../services/shared';

import { getStatusColor } from '../../../core/utils/status-color.util';

@Component({
  name: 'CompanyUserDetail',
  components: {
    ApprovalCard,
    BaseCard,
  },
})
export default class CompanyUserDetail extends BaseComponent {
  private companyUserDto = new CompanyUserDto(BaseUser);
  private companyUserUpdateDto = new CompanyUserUpdateDto();
  private companyUserUpdateRefusalDto = new CompanyUserUpdateRefusalDto();
  private companyUserUpdateRefusalReasonDto = (this.companyUserUpdateRefusalDto.refusalReasons = new CompanyUserUpdateRefusalReasonDto());
  private companyUserAdminRole: COMPANY_USER[] = [...CONST_COMPANY_USER];
  private deleteUserName = '';

  getStatusColor(status) {
    return getStatusColor(status);
  }

  findOne(id) {
    CompanyUserService.findOne(id).subscribe(res => {
      this.companyUserDto = res.data;
    });
  }

  showUpdateModal() {
    this.companyUserUpdateDto = this.companyUserDto;
    this.findOne(this.$route.params.id);
  }

  //사용자 정보 수정
  updateCompanyUser() {
    CompanyUserService.update(
      this.$route.params.id,
      this.companyUserUpdateDto,
    ).subscribe(res => {
      if (res) {
        toast.success('수정완료');
        this.findOne(this.$route.params.id);
      }
    });
  }

  // 삭제
  deleteCompanyUser() {
    if (this.deleteUserName === this.companyUserDto.name) {
      CompanyUserService.deleteCompanyUser(this.$route.params.id).subscribe(
        res => {
          if (res) {
            this.$router.push('/company/company-user');
            toast.success('삭제완료');
          }
        },
      );
    } else {
      toast.error('이름을 정확히 입력해주세요');
    }
  }

  // 승인
  updateApproval() {
    CompanyUserService.updateCompanyUserStatus(
      this.$route.params.id,
      'approve-update',
    ).subscribe(res => {
      if (res) {
        this.findOne(this.$route.params.id);
        toast.success('승인완료');
      }
    });
  }

  // 거절
  updateRefusal() {
    CompanyUserService.updateCompanyUserStatus(
      this.$route.params.id,
      'refuse-update',
      this.companyUserUpdateRefusalDto,
    ).subscribe(res => {
      if (res) {
        this.findOne(this.$route.params.id);
        toast.success('승인거절');
      }
    });
  }

  created() {
    const id = this.$route.params.id;
    this.findOne(id);
  }
}
</script>
