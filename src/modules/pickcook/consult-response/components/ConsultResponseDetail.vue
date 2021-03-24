<template>
  <section v-if="consultResponseDto">
    <SectionTitle title="픽쿡 상담 신청" divider>
      <template v-slot:rightArea>
        <router-link to="/consult-response" class="btn btn-secondary"
          >목록으로</router-link
        >
      </template>
    </SectionTitle>
    <b-row v-on:keyup.enter="updateProductConsult()">
      <b-col lg="6" class="my-3">
        <BaseCard title="사용자 정보">
          <template v-slot:head>
            <div v-if="consultResponseDto">
              <!-- <b-button variant="outline-info" v-b-modal.send_message>
                <b-icon icon="envelope"></b-icon>
                <span class="ml-2">문자전송</span>
              </b-button> -->
              <b-button
                variant="primary"
                @click="updateNanudaUser()"
                v-b-modal.nanuda_user
                >수정하기</b-button
              >
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
                <li v-if="consultResponseDto.no">
                  사용자 ID : {{ consultResponseDto.no }}
                </li>
                <li v-if="consultResponseDto && consultResponseDto.name">
                  사용자명 : {{ consultResponseDto.name }}
                </li>
                <li v-if="consultResponseDto.phone">
                  휴대폰 번호 :
                  <span>{{ consultResponseDto.phone | phoneTransformer }}</span>
                </li>
                <li v-if="consultResponseDto.gender">
                  성별 :
                  {{ consultResponseDto.gender | enumTransformer }}
                </li>
              </ul>
            </div>
            <div v-else>
              <ul class="u-list">
                <li>
                  <div>
                    <b-input-group>
                      <template #prepend>
                        <b-input-group-text
                          ><span class="red-text"
                            >비회원명</span
                          ></b-input-group-text
                        >
                      </template>
                      <b-form-input
                        v-model="consultResponseDto.nonUserName"
                      ></b-form-input>
                    </b-input-group>
                  </div>
                </li>
                <li>
                  <div>
                    <b-input-group>
                      <template #prepend>
                        <b-input-group-text>휴대번호</b-input-group-text>
                      </template>
                      <b-form-input
                        disabled
                        v-model="consultResponseDto.nonUserPhone"
                      ></b-form-input>
                    </b-input-group>
                  </div>
                </li>
              </ul>
            </div>
          </template>
        </BaseCard>
      </b-col>
      <b-col lg="6" class="my-3">
        <!-- <BaseCard title="관리자 정보">
          <template v-slot:head>
            <div>
              <b-button
                v-if="!consultResponseDto.pConsultManager"
                variant="info"
                @click="assignYourselfAdmin()"
                >본인으로 정하기</b-button
              >
              <b-button
                variant="primary"
                @click="findAdmin()"
                v-b-modal.admin_list
                >수정하기</b-button
              >
            </div>
          </template>
          <template v-slot:body>
            <div v-if="consultResponseDto.admin">
              <ul>
                <li>
                  관리자 ID :
                  <span>
                    {{ consultResponseDto.admin.no }}
                  </span>
                </li>
                <li>
                  관리자명 :
                  <span>
                    {{ consultResponseDto.admin.name }}
                  </span>
                </li>
                <li>
                  휴대폰 번호 :
                  {{ consultResponseDto.admin.phone | phoneTransformer }}
                </li>
              </ul>
            </div>
            <div v-else class="empty-data">관리자 없음</div>
          </template>
        </BaseCard> -->
      </b-col>
      <b-col lg="12" class="my-3">
        <BaseCard title="상담 상세 정보">
          <template v-slot:head>
            <b-button variant="primary" @click="updateProductConsult()">
              수정하기
            </b-button>
          </template>
          <template v-slot:body>
            <b-row>
              <b-col lg="6">
                <ul class="u-list">
                  <li v-if="consultResponseDto.spaceType">
                    관심 공간 유형 :
                    {{ consultResponseDto.spaceType.displayName }}
                  </li>
                  <li v-else>
                    관심 상담: 일반/창업 문의
                  </li>
                  <li
                    v-if="
                      consultResponseDto.addressInfo &&
                        consultResponseDto.addressInfo.name
                    "
                  >
                    관심 창업 지역 :
                    {{ consultResponseDto.addressInfo.name }}
                  </li>
                  <li v-if="consultResponseDto.availableTime">
                    통화 가능 시간 :
                    {{ consultResponseDto.availableTime.value }}
                  </li>
                  <li v-if="consultResponseDto.hopeDate">
                    희망 방문 일자 :
                    {{ consultResponseDto.hopeDate }}
                  </li>
                  <li>
                    창업 경험 유무 :
                    <b-badge
                      :variant="
                        consultResponseDto.changUpExpYn === 'Y'
                          ? 'success'
                          : 'danger'
                      "
                      >{{
                        consultResponseDto.changUpExpYn | enumTransformer
                      }}</b-badge
                    >
                  </li>
                  <li v-if="consultResponseDto.codeManagement">
                    <label for="product_approve_status">신청 상태</label>
                    <b-form-select
                      id="product_approve_status"
                      v-model="consultResponseDto.status"
                    >
                      <b-select-option value>전체</b-select-option>
                      <b-form-select-option
                        v-for="status in statusSelect"
                        :key="status.no"
                        :value="status.key"
                        >{{ status.value }}</b-form-select-option
                      >
                    </b-form-select>
                    <p class="mt-1" v-if="consultResponseDto.updatedAt">
                      ({{ consultResponseDto.updatedAt | dateTransformer }})
                    </p>
                  </li>
                </ul>
              </b-col>
              <b-col lg="6">
                <label for="productConsultEtc">비고 내용</label>
                <b-form-textarea
                  id="productConsultEtc"
                  v-model="consultResponseDto.pConsultEtc"
                  placeholder="내용 입력해주세요"
                  rows="7"
                  max-rows="12"
                ></b-form-textarea>
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
      @ok="updateProductConsult()"
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
      @ok="updateProductConsult()"
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
import { APPROVAL_STATUS, PRODUCT_CONSULT } from '@/services/shared';
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

  findOne(id) {
    ConsultResponseService.findOne(id).subscribe(res => {
      if (res) {
        this.consultResponseDto = res.data;
      }
    });
  }

  // update product consult
  updateProductConsult() {
    console.log('update');
  }

  created() {
    const id = this.$route.params.id;
    this.findOne(id);
  }
}
</script>
