<template>
  <section v-if="consultResponseDto">
    <SectionTitle title="상담 신청" divider>
      <template v-slot:rightArea>
        <router-link to="/pickcook/consult-response" class="btn btn-secondary"
          >목록으로</router-link
        >
      </template>
    </SectionTitle>
    <b-row v-on:keyup.enter="updateConsultResponse()">
      <b-col lg="6" class="my-3">
        <BaseCard title="사용자 정보">
          <template v-slot:head>
            <div v-if="consultResponseDto">
              <!-- <b-button variant="outline-info" v-b-modal.send_message>
                <b-icon icon="envelope"></b-icon>
                <span class="ml-2">문자전송</span>
              </b-button> -->
              <!-- <b-button
                variant="primary"
                @click="updateNanudaUser()"
                v-b-modal.nanuda_user
                >수정하기</b-button
              > -->
            </div>
            <div v-else>
              <b-button variant="outline-info" v-b-modal.send_message>
                <b-icon icon="envelope"></b-icon>
                <span class="ml-2">문자전송</span>
              </b-button>
            </div>
          </template>
          <template v-slot:body>
            <div v-if="consultResponseDto">
              <ul class="u-list">
                <li v-if="consultResponseDto && consultResponseDto.name">
                  사용자명 : {{ consultResponseDto.name }}
                </li>
                <li v-if="consultResponseDto.phone">
                  휴대폰 번호 :
                  <span>{{ consultResponseDto.phone | phoneTransformer }}</span>
                </li>
                <li
                  v-if="
                    consultResponseDto.ageGroupCodeStatus &&
                      consultResponseDto.ageGroupCodeStatus.displayName
                  "
                >
                  연령대 :
                  {{ consultResponseDto.ageGroupCodeStatus.displayName }}
                </li>
                <li
                  v-if="
                    consultResponseDto.fnbOwnerCodeStatus &&
                      consultResponseDto.fnbOwnerCodeStatus.comment
                  "
                >
                  창업자 유형 :
                  {{ consultResponseDto.fnbOwnerCodeStatus.comment }}
                </li>
              </ul>
            </div>
          </template>
        </BaseCard>
      </b-col>
      <b-col lg="6" class="my-3">
        <BaseCard title="상담 상세 정보">
          <template v-slot:head>
            <b-button variant="primary" @click="updateConsultResponse()">
              수정하기
            </b-button>
          </template>
          <template v-slot:body>
            <b-row>
              <b-col lg="6">
                <ul class="u-list">
                  <li v-if="consultResponseDto.isReadyCode">
                    창업 진행 현황 :
                    {{ consultResponseDto.isReadyCode }}
                  </li>
                  <li v-if="consultResponseDto.selectedKbMediumCategory">
                    운영중인 업종 :
                    {{ consultResponseDto.selectedKbMediumCategory }}
                  </li>
                  <li
                    v-if="
                      consultResponseDto.operationTimes &&
                        consultResponseDto.operationTimes.length > 0
                    "
                  >
                    운영중인 시간대 :
                    <span
                      v-for="time in consultResponseDto.operationTimes"
                      :key="time"
                    >
                      {{ time }}
                    </span>
                  </li>
                  <li
                    v-if="
                      consultResponseDto.revenueRangeCodeStatus &&
                        consultResponseDto.revenueRangeCodeStatus.displayName
                    "
                  >
                    매출 범위 :
                    {{ consultResponseDto.revenueRangeCodeStatus.displayName }}
                  </li>
                </ul>
              </b-col>
              <b-col lg="6">
                <b-form-group label="신청상태">
                  <b-form-select
                    class="custom-select"
                    v-model="consultResponseDto.consultStatus"
                  >
                    <b-select-option
                      v-for="status in brandConsultStatus"
                      :key="status"
                      :value="status"
                      >{{ status }}</b-select-option
                    >
                  </b-form-select>
                </b-form-group>
                <p class="text-right mt-1" v-if="consultResponseDto.updated">
                  ({{ consultResponseDto.updated | dateTransformer }})
                </p>
                <!-- <div class="mt-2">
                  <label for="productConsultEtc">비고 내용</label>
                  <b-form-textarea
                    id="productConsultEtc"
                    v-model="consultResponseDto.pConsultEtc"
                    placeholder="내용 입력해주세요"
                    rows="7"
                    max-rows="12"
                  ></b-form-textarea>
                </div> -->
              </b-col>
            </b-row>
          </template>
        </BaseCard>
      </b-col>
    </b-row>
    <!-- 문자 전송 모달 -->
    <!-- <b-modal
      v-if="consultResponseDto || consultResponseDto.nonUserName"
      id="send_message"
      ok-title="전송"
      cancel-title="취소"
      :title="
        consultResponseDto
          ? `${consultResponseDto.name} 사용자에게 문자하기`
          : `${consultResponseDto.nonUserName} (비회원) 사용자에게 문자하기`
      "
      @ok="sendMessage()"
    >
      <p class="mb-2">
        휴대폰 번호 :
        <b class="text-primary">
          <template v-if="consultResponseDto">
            {{ consultResponseDto.phone | phoneTransformer }}
          </template>
          <template v-else-if="consultResponseDto.nonUserPhone">
            {{ consultResponseDto.nonUserPhone | phoneTransformer }}
          </template>
        </b>
      </p>
      <b-form-input
        id="title"
        placeholder="제목"
        class="mb-2"
        v-model="adminSendMessageDto.title"
      ></b-form-input>
      <b-form-textarea
        id="message"
        placeholder="메세지를 입력해주세요.."
        rows="3"
        max-rows="6"
        v-model="adminSendMessageDto.message"
      ></b-form-textarea>
    </b-modal> -->
    <!-- 관리자 수정 모달 -->
    <!-- <b-modal
      id="admin_list"
      title="관리자 수정하기"
      @cancel="cancelSelection()"
      @hide="cancelSelection()"
      @ok="updateConsultResponse()"
    >
      <table class="table table-sm tabl-bordered text-center">
        <thead>
          <tr>
            <th scope="col">NAME</th>
            <th scope="col">PHONE</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="admin in adminList" :key="admin.no">
            <td>{{ admin.name }}</td>
            <td>{{ admin.phone | phoneTransformer }}</td>
            <td class="text-center">
              <button class="btn btn-primary" @click="selectAdmin(admin)">
                선택
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="selectedAdmin.name"
        class="py-2 px-4 rounded"
        style="background-color:#f1f1f1"
      >
        선택한 관리자 :
        <b>{{ selectedAdmin.name }}</b>
      </div>
      <b-pagination
        v-model="pagination.page"
        v-if="adminListCount"
        pills
        :total-rows="adminListCount"
        :per-page="pagination.limit"
        @input="paginateSearch()"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </b-modal> -->
    <!-- 사용자 정보 수정 -->
    <!-- <b-modal
      id="nanuda_user"
      title="사용자 정보 수정"
      @ok="updateConsultResponse()"
    >
      <b-form-row>
        <b-col cols="12" class="mb-3">
          <b-form-group label="사용자 성별">
            <b-form-radio
              v-model="productConsultUpdateDto.gender"
              v-for="gender in genderSelect"
              :key="gender.no"
              :value="gender.key"
              name="gender"
              >{{ gender.value }}</b-form-radio
            >
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-modal> -->
  </section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import {
  AdminDto,
  AdminListDto,
  AdminSendMessageDto,
  BrandDto,
  BrandListDto,
  ConsultResponseDto,
  ProductConsultUpdateDto,
} from '@/dto';
import ProductConsultService from '@/services/product-consult.service';
import {
  APPROVAL_STATUS,
  BRAND_CONSULT,
  CONST_BRAND_CONSULT,
  PRODUCT_CONSULT,
} from '@/services/shared';
import { Component, Vue } from 'vue-property-decorator';
import { getStatusColor } from '@/core/utils/status-color.util';
import SmsService from '@//services/sms.service';
import toast from '../../../../../resources/assets/js/services/toast.js';
import { BaseUser } from '@/services/shared/auth';
import AdminService from '@/services/admin.service';
import { CONST_YN, Pagination, YN } from '@/common';
import { CodeManagementDto } from '@/services/init/dto';
import BrandService from '@/services/brand.service';
import CodeManagementService from '@/services/code-management.service';
import ConsultResponseService from '@/services/pickcook/consult-response.service';

@Component({
  name: 'ConsultResponseDetail',
})
export default class ConsultResponseDetail extends BaseComponent {
  private consultResponseDto = new ConsultResponseDto();
  private adminSendMessageDto = new AdminSendMessageDto();
  private brandConsultStatus: BRAND_CONSULT[] = [...CONST_BRAND_CONSULT];

  // get status color
  getStatusColor(status: BRAND_CONSULT) {
    return getStatusColor(status);
  }

  findOne(id) {
    ConsultResponseService.findOne(id).subscribe(res => {
      if (res) {
        this.consultResponseDto = res.data;
      }
    });
  }

  // update consult response
  updateConsultResponse() {
    ConsultResponseService.update(
      this.$route.params.id,
      this.consultResponseDto,
    ).subscribe(res => {
      if (res) {
        toast.success('수정완료');
        this.findOne(this.$route.params.id);
      }
    });
  }

  created() {
    const id = this.$route.params.id;
    this.findOne(id);
  }
}
</script>
