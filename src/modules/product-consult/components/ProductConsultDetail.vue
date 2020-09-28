<template>
  <section v-if="productConsultDto">
    <SectionTitle title="상품 상담 상세" divider>
      <template v-slot:rightArea>
        <router-link to="/product-consult" class="btn btn-secondary"
          >목록으로</router-link
        >
      </template>
    </SectionTitle>
    <b-row>
      <b-col lg="6" class="my-3">
        <BaseCard title="사용자 정보">
          <template v-slot:head>
            <div>
              <b-button variant="outline-info" v-b-modal.nanuda_user>
                <b-icon icon="envelope"></b-icon>
                <span class="ml-2">문자전송</span>
              </b-button>
              <b-button
                variant="primary"
                @click="updateNanudaUser()"
                v-b-modal.nanuda_user
                >수정하기</b-button
              >
            </div>
          </template>
          <template v-slot:body>
            <div v-if="productConsultDto.nanudaUser">
              <ul class="u-list">
                <li v-if="productConsultDto.nanudaUser.no">
                  사용자 ID : {{ productConsultDto.nanudaUser.no }}
                </li>
                <li
                  v-if="
                    productConsultDto.nanudaUser &&
                      productConsultDto.nanudaUser.name
                  "
                >
                  사용자명 : {{ productConsultDto.nanudaUser.name }}
                </li>
                <li v-if="productConsultDto.nanudaUser.phone">
                  휴대폰 번호 :
                  <span>{{
                    productConsultDto.nanudaUser.phone | phoneTransformer
                  }}</span>
                </li>
                <li v-if="productConsultDto.nanudaUser.gender">
                  성별 :
                  {{ productConsultDto.nanudaUser.gender | enumTransformer }}
                </li>
              </ul>
            </div>
          </template>
        </BaseCard>
      </b-col>
      <b-col lg="6" class="my-3">
        <BaseCard title="관리자 정보">
          <template v-slot:head>
            <div>
              <b-button
                variant="primary"
                @click="findAdmin()"
                v-b-modal.admin_list
                >수정하기</b-button
              >
            </div>
          </template>
          <template v-slot:body>
            <div v-if="productConsultDto.admin">
              <ul>
                <li>
                  관리자 ID :
                  <span>
                    {{ productConsultDto.admin.no }}
                  </span>
                </li>
                <li>
                  관리자명 :
                  <span>
                    {{ productConsultDto.admin.name }}
                  </span>
                </li>
                <li>
                  휴대폰 번호 :
                  {{ productConsultDto.admin.phone | phoneTransformer }}
                </li>
              </ul>
            </div>
            <div v-else class="empty-data">관리자 없음</div>
          </template>
        </BaseCard>
      </b-col>
      <b-col lg="12" class="my-3">
        <BaseCard title="상담 상세 정보">
          <template v-slot:head>
            <div>
              <b-button
                variant="primary"
                v-b-modal.update_consult_info
                @click="showUpdateModal()"
              >
                수정하기
              </b-button>
            </div>
          </template>
          <template v-slot:body>
            <div>
              <ul class="u-list">
                <li v-if="productConsultDto.spaceType">
                  관심 공간 유형 :
                  {{ productConsultDto.spaceType.displayName }}
                </li>
                <li
                  v-if="
                    productConsultDto.addressInfo &&
                      productConsultDto.addressInfo.name
                  "
                >
                  관심 창업 지역 :
                  {{ productConsultDto.addressInfo.name }}
                </li>
                <li v-if="productConsultDto.availableTime">
                  통화 가능 시간 :
                  {{ productConsultDto.availableTime.value }}
                </li>
                <li v-if="productConsultDto.hopeDate">
                  희망 방문 일자 :
                  {{ productConsultDto.hopeDate }}
                </li>
                <li>
                  확정 방문 일자 :
                  <span v-if="productConsultDto.confirmDate">
                    {{ productConsultDto.confirmDate | dateTransformer }}
                  </span>
                  <span v-else>
                    미정
                  </span>
                </li>
                <li>
                  창업 경험 유무 :
                  <b-badge
                    :variant="
                      productConsultDto.changUpExpYn === 'Y'
                        ? 'success'
                        : 'danger'
                    "
                    >{{
                      productConsultDto.changUpExpYn | enumTransformer
                    }}</b-badge
                  >
                </li>
                <li v-if="productConsultDto.codeManagement">
                  신청 상태 :
                  <b-badge
                    :variant="getStatusColor(productConsultDto.status)"
                    class="badge-pill p-2"
                  >
                    {{ productConsultDto.codeManagement.value }}
                  </b-badge>
                  <span class="ml-1" v-if="productConsultDto.updatedAt">
                    ({{ productConsultDto.updatedAt | dateTransformer }})
                  </span>
                </li>
                <li v-if="productConsultDto.pConsultEtc">
                  메모 :{{ productConsultDto.pConsultEtc }}
                </li>
              </ul>
            </div>
          </template>
        </BaseCard>
      </b-col>
    </b-row>
    <!-- 문자 전송 모달 -->
    <b-modal
      v-if="productConsultDto.nanudaUser"
      id="send_message"
      ok-title="전송"
      cancel-title="취소"
      :title="`${productConsultDto.nanudaUser.name} 사용자에게 문자하기`"
      @ok="sendMessage()"
    >
      <p class="mb-2">
        휴대폰 번호 :
        <b class="text-primary">
          {{ productConsultDto.nanudaUser.phone | phoneTransformer }}
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
    </b-modal>
    <!-- 관리자 수정 모달 -->
    <b-modal
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
    </b-modal>
    <!-- 상품 상세 정보 -->
    <b-modal
      id="update_consult_info"
      title="상담 내용 수정"
      ok-title="수정"
      cancel-title="취소"
      @ok="updateProductConsult()"
      @cancel="clearOutUpdateDto()"
      @hide="clearOutUpdateDto()"
    >
      <b-form-row>
        <b-col cols="12" class="mb-3">
          <label for="update_confirm_date">확정 방문 일자</label>
          <b-form-datepicker
            id="update_confirm_date"
            v-model="confirmDate"
          ></b-form-datepicker>
        </b-col>
        <b-col cols="12" class="mb-3">
          <label for="changup_exp_yn">창업 경험 유무</label>
          <b-form-radio
            v-model="productConsultUpdateDto.changUpExpYn"
            v-for="yn in expYn"
            :key="yn"
            :value="yn"
            name="changup_exp_yn"
            :id="`changup_exp_yn_${yn}`"
            >{{ yn | enumTransformer }}</b-form-radio
          >
        </b-col>
        <b-col cols="12" class="mb-3">
          <label>신청 상태</label>
          <select
            class="custom-select"
            v-model="productConsultUpdateDto.status"
          >
            <option
              v-for="status in statusSelect"
              :key="status.no"
              :value="status.key"
              >{{ status.value }}</option
            >
          </select>
        </b-col>
      </b-form-row>
    </b-modal>
    <!-- 사용자 정보 수정 -->
    <b-modal
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
    </b-modal>
  </section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import {
  AdminDto,
  AdminListDto,
  AdminSendMessageDto,
  ProductConsultDto,
  ProductConsultUpdateDto,
} from '@/dto';
import ProductConsultService from '@/services/product-consult.service';
import { APPROVAL_STATUS, PRODUCT_CONSULT } from '@/services/shared';
import { Component, Vue } from 'vue-property-decorator';
import { getStatusColor } from '../../../core/utils/status-color.util';
import SmsService from '../../../services/sms.service';
import toast from '../../../../resources/assets/js/services/toast.js';
import { BaseUser } from '@/services/shared/auth';
import AdminService from '../../../services/admin.service';
import { CONST_YN, Pagination, YN } from '@/common';
import { CodeManagementDto } from '@/services/init/dto';
import CodeManagementService from '../../../services/code-management.service';

@Component({
  name: 'ProductConsultDetail',
})
export default class ProductConsultDetail extends BaseComponent {
  private productConsultDto = new ProductConsultDto();
  private adminSendMessageDto = new AdminSendMessageDto();
  private confirmDate = new Date();

  private productConsultUpdateDto = new ProductConsultUpdateDto();
  private selectedAdmin: AdminDto = new AdminDto(BaseUser);
  private adminList: AdminDto[] = [];
  private adminListDto = new AdminListDto();
  private adminListCount = null;
  private pagination = new Pagination();
  private expYn: YN[] = [...CONST_YN];
  private statusSelect: CodeManagementDto[] = [];
  private genderSelect: CodeManagementDto[] = [];

  // get status color
  getStatusColor(status: PRODUCT_CONSULT) {
    return getStatusColor(status);
  }

  // get product consult codes
  getProductConsultCodes() {
    CodeManagementService.findAnyCode('PRODUCT_CONSULT').subscribe(res => {
      this.statusSelect = res.data;
    });
  }

  // 성별
  getGender() {
    CodeManagementService.findAnyCode('GENDER').subscribe(res => {
      this.genderSelect = res.data;
    });
  }

  findOne(id) {
    ProductConsultService.findOne(id).subscribe(res => {
      if (res) {
        this.productConsultDto = res.data;
      }
    });
  }

  // 문자 전송
  sendMessage() {
    this.adminSendMessageDto.phone = this.productConsultDto.nanudaUser.phone;
    SmsService.sendMessage(this.adminSendMessageDto).subscribe(res => {
      if (res) {
        this.adminSendMessageDto = new AdminSendMessageDto();
        toast.success('문자가 발송 되었습니다.');
      } else {
        return;
      }
    });
  }
  // update Nanuda User
  updateNanudaUser() {
    if (this.productConsultDto.nanudaUser.gender) {
      this.productConsultUpdateDto.gender = this.productConsultDto.nanudaUser.gender;
    }
    this.getGender();
  }

  // show update modal
  showUpdateModal() {
    this.productConsultUpdateDto = this.productConsultDto;
    this.getProductConsultCodes();
    this.findOne(this.$route.params.id);
  }

  // update product consult
  updateProductConsult() {
    if (this.selectedAdmin) {
      this.productConsultUpdateDto.pConsultManager = this.selectedAdmin.no;
    }
    if (this.confirmDate) {
      this.productConsultUpdateDto.confirmDate = this.confirmDate;
    }

    ProductConsultService.update(
      this.$route.params.id,
      this.productConsultUpdateDto,
    ).subscribe(res => {
      if (res) {
        toast.success('수정완료');
        this.findOne(this.$route.params.id);
      }
    });
  }

  clearOutUpdateDto() {
    this.productConsultUpdateDto = new ProductConsultDto();
  }

  // 관리자 수정
  selectAdmin(admin: AdminDto) {
    this.selectedAdmin = admin;
  }

  cancelSelection() {
    this.selectedAdmin = new AdminDto(BaseUser);
  }

  findAdmin(isPagination: boolean) {
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.pagination.limit = 5;
    AdminService.findAll(this.adminListDto, this.pagination).subscribe(res => {
      this.adminList = res.data.items;
      this.adminListCount = res.data.totalCount;
    });
  }

  paginateSearch() {
    this.findAdmin(true);
  }

  created() {
    const id = this.$route.params.id;
    this.findOne(id);
  }
}
</script>
