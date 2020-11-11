<template>
  <section v-if="productConsultDto">
    <SectionTitle title="상품 상담 신청" divider>
      <template v-slot:rightArea>
        <router-link to="/product-consult" class="btn btn-secondary"
          >목록으로</router-link
        >
      </template>
    </SectionTitle>
    <b-row v-on:keyup.enter="updateProductConsult()">
      <b-col lg="6" class="my-3">
        <BaseCard title="사용자 정보">
          <template v-slot:head>
            <div v-if="productConsultDto.nanudaUser">
              <b-button variant="outline-info" v-b-modal.send_message>
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
            <div v-else>
              <b-button variant="outline-info" v-b-modal.non_user_send_message>
                <b-icon icon="envelope"></b-icon>
                <span class="ml-2">문자전송</span>
              </b-button>
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
                        v-model="productConsultDto.nonUserName"
                      ></b-form-input>
                      <!-- <template #append>
                        <b-button
                          variant="primary"
                          @click="updateProductConsult()"
                          >수정</b-button
                        >
                      </template> -->
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
                        v-model="productConsultDto.nonUserPhone"
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
        <BaseCard title="관리자 정보">
          <template v-slot:head>
            <div>
              <b-button
                v-if="!productConsultDto.pConsultManager"
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
            <b-button variant="primary" @click="updateProductConsult()">
              수정하기
            </b-button>
          </template>
          <template v-slot:body>
            <b-row>
              <b-col lg="6">
                <ul class="u-list">
                  <li v-if="productConsultDto.spaceType">
                    관심 공간 유형 :
                    {{ productConsultDto.spaceType.displayName }}
                  </li>
                  <li v-else>
                    관심 상담: 일반/창업 문의
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
                  <!-- <li>
                    확정 방문 일자 :
                    <span v-if="productConsultDto.confirmDate">
                      {{ productConsultDto.confirmDate | dateTransformer }}
                    </span>
                    <span v-else>
                      미정
                    </span>
                  </li> -->
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
                  <li>
                    <label for="product_consult_brand">관심 브랜드</label>
                    <b-form-select
                      id="product_consult_brand"
                      v-model="productConsultDto.brandNo"
                    >
                      <b-form-select-option
                        v-for="brand in brandList"
                        :key="brand.no"
                        :value="brand.no"
                        >{{ brand.nameKr }}</b-form-select-option
                      >
                      <b-form-select-option :value="0"
                        >기타</b-form-select-option
                      >
                      <b-form-select-option :value="-1"
                        >미정</b-form-select-option
                      >
                      <b-form-select-option :value="null"
                        >없음</b-form-select-option
                      >
                    </b-form-select>
                  </li>
                  <li v-if="productConsultDto.codeManagement">
                    <label for="product_approve_status">신청 상태</label>
                    <b-form-select
                      id="product_approve_status"
                      v-model="productConsultDto.status"
                    >
                      <b-select-option value>전체</b-select-option>
                      <b-form-select-option
                        v-for="status in statusSelect"
                        :key="status.no"
                        :value="status.key"
                        >{{ status.value }}</b-form-select-option
                      >
                    </b-form-select>
                    <p class="mt-1" v-if="productConsultDto.updatedAt">
                      ({{ productConsultDto.updatedAt | dateTransformer }})
                    </p>
                  </li>
                </ul>
              </b-col>
              <b-col lg="6">
                <label for="productConsultEtc">비고 내용</label>
                <b-form-textarea
                  id="productConsultEtc"
                  v-model="productConsultDto.pConsultEtc"
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
    <!-- 비회원 문자 -->
    <b-modal
      id="non_user_send_message"
      ok-title="전송"
      cancel-title="취소"
      :title="`${productConsultDto.nonUserName} (비회원) 사용자에게 문자하기`"
      @ok="sendMessage()"
    >
      <p class="mb-2">
        휴대폰 번호 :
        <b class="text-primary">
          {{ productConsultDto.nonUserPhone | phoneTransformer }}
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
  BrandDto,
  BrandListDto,
  ProductConsultDto,
  ProductConsultUpdateDto,
} from '@/dto';
import ProductConsultService from '@/services/product-consult.service';
import { APPROVAL_STATUS, PRODUCT_CONSULT } from '@/services/shared';
import { Component, Vue } from 'vue-property-decorator';
import { getStatusColor } from '@/core/utils/status-color.util';
import SmsService from '@//services/sms.service';
import toast from '../../../../resources/assets/js/services/toast.js';
import { BaseUser } from '@/services/shared/auth';
import AdminService from '@/services/admin.service';
import { CONST_YN, Pagination, YN } from '@/common';
import { CodeManagementDto } from '@/services/init/dto';
import BrandService from '@/services/brand.service';
import CodeManagementService from '@/services/code-management.service';

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
  private brandDto = new BrandListDto();
  private brandList: BrandDto[] = [];

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

  assignYourselfAdmin() {
    ProductConsultService.assignAdmin(this.productConsultDto.no).subscribe(
      res => {
        this.findOne(this.productConsultDto.no);
      },
    );
  }

  findOne(id) {
    ProductConsultService.findOne(id).subscribe(res => {
      if (res) {
        BrandService.findNanudaBrand().subscribe(res => {
          this.brandList = res.data;
        });
        this.productConsultDto = res.data;
        this.getProductConsultCodes();
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
      this.productConsultDto.pConsultManager = this.selectedAdmin.no;
    }
    if (this.confirmDate) {
      this.productConsultDto.confirmDate = this.confirmDate;
    }

    ProductConsultService.update(
      this.productConsultDto.no,
      this.productConsultDto,
    ).subscribe(res => {
      if (res) {
        toast.success('수정완료');
        this.findOne(this.productConsultDto.no);
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
