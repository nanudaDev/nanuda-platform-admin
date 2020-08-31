<template>
  <section v-if="deliveryFounderConsult">
    <SectionTitle
      v-if="deliveryFounderConsult.deliverySpaces"
      :title="
        `${deliveryFounderConsult.deliverySpaces.typeName} - 상담
          신청`
      "
    >
      <template v-slot:rightArea>
        <router-link to="/delivery-founder-consult" class="btn btn-secondary text-center">목록으로</router-link>
      </template>
    </SectionTitle>
    <b-row align-h="start" align-v="stretch">
      <b-col md="4" class="my-3" v-if="deliveryFounderConsult.nanudaUser">
        <BaseCard title="사용자 정보">
          <template v-slot:head>
            <div v-if="deliveryFounderConsult.status !== 'F_DIST_COMPLETE'">
              <b-button variant="primary" @click="updateNanudaUser()" v-b-modal.nanuda_user>수정하기</b-button>
            </div>
          </template>
          <template v-slot:body>
            <div v-if="deliveryFounderConsult.nanudaUser">
              <ul>
                <li>
                  사용자 ID :
                  <b>{{ deliveryFounderConsult.nanudaUser.no }}</b>
                </li>
                <li>
                  사용자명 :
                  <b>{{ deliveryFounderConsult.nanudaUser.name }}</b>
                </li>
                <li>
                  휴대폰 번호 :
                  <span>
                    <b>
                      {{
                      deliveryFounderConsult.nanudaUser.phone
                      | phoneTransformer
                      }}
                    </b>
                    <b-button size="sm" variant="info" pill v-b-modal.send_message class="mx-2 p-1">
                      <b-icon icon="envelope"></b-icon>
                      <span class="d-none">문자전송</span>
                    </b-button>
                  </span>
                </li>
                <li v-if="deliveryFounderConsult.nanudaUser.genderInfo">
                  성별 :
                  <b>{{ deliveryFounderConsult.nanudaUser.genderInfo.value }}</b>
                </li>
                <li v-if="deliveryFounderConsult.nanudaUser.remainVisitCount">
                  남은 공간 신청 횟수 :
                  <b>
                    {{
                    deliveryFounderConsult.nanudaUser.remainVisitCount
                    }}
                  </b>
                </li>
                <li v-if="deliveryFounderConsult.nanudaUser.lastLoginAt">
                  마지막 로그인 날짜:
                  <b>
                    {{
                    deliveryFounderConsult.nanudaUser.lastLoginAt
                    | dateTransformer
                    }}
                  </b>
                </li>
              </ul>
            </div>
            <div v-else>사용자 없음</div>
            <b-alert
              show
              variant="danger"
              v-if="!deliveryFounderConsult.nanudaUser.genderInfo"
              class="mt-3"
            >성별 미입력 상태</b-alert>
          </template>
        </BaseCard>
      </b-col>
      <b-col md="4" class="my-3">
        <BaseCard title="관리자 정보">
          <template v-slot:head>
            <div>
              <b-button variant="primary" @click="findAdmin()" v-b-modal.admin_list>수정하기</b-button>
            </div>
          </template>
          <template v-slot:body>
            <div v-if="deliveryFounderConsult.admin">
              <ul>
                <li>
                  관리자 ID :
                  <span>
                    <b>{{ deliveryFounderConsult.admin.no }}</b>
                  </span>
                </li>
                <li>
                  관리자명 :
                  <span>
                    <b>{{ deliveryFounderConsult.admin.name }}</b>
                  </span>
                </li>
                <li>
                  휴대폰 번호 :
                  <b>{{ deliveryFounderConsult.admin.phone | phoneTransformer }}</b>
                </li>
              </ul>
            </div>
            <div v-else class="empty-data">관리자 없음</div>
          </template>
        </BaseCard>
      </b-col>
      <b-col md="4" class="my-3">
        <BaseCard title="업체 정보">
          <template v-slot:body>
            <div v-if="deliveryFounderConsult.deliverySpaces">
              <ul>
                <li>
                  업체명 :
                  <router-link
                    :to="{
                      name: 'CompanyDetail',
                      params: {
                        id:
                          deliveryFounderConsult.deliverySpaces.companyDistrict
                            .company.no,
                      },
                    }"
                  >
                    <b>
                      {{
                      deliveryFounderConsult.deliverySpaces.companyDistrict
                      .company.nameKr
                      }}
                    </b>
                  </router-link>
                </li>
                <li
                  v-if="
                    deliveryFounderConsult.deliverySpaces.companyDistrict
                      .company.phone
                  "
                >
                  전화번호 :
                  <b>
                    {{
                    deliveryFounderConsult.deliverySpaces.companyDistrict
                    .company.phone
                    }}
                  </b>
                </li>
                <li
                  v-if="
                    deliveryFounderConsult.deliverySpaces.companyDistrict
                      .company.email
                  "
                >
                  이메일 :
                  <b>
                    {{
                    deliveryFounderConsult.deliverySpaces.companyDistrict
                    .company.email
                    }}
                  </b>
                </li>
                <li
                  v-if="
                    deliveryFounderConsult.deliverySpaces.companyDistrict.nameKr
                  "
                >
                  지점명 :
                  <router-link
                    :to="{
                      name: 'CompanyDistrictDetail',
                      params: {
                        id:
                          deliveryFounderConsult.deliverySpaces.companyDistrict
                            .no,
                      },
                    }"
                  >
                    <b>
                      {{
                      deliveryFounderConsult.deliverySpaces.companyDistrict
                      .nameKr
                      }}
                    </b>
                  </router-link>
                </li>
                <li>
                  지점 주소 :
                  <b>
                    {{
                    deliveryFounderConsult.deliverySpaces.companyDistrict
                    .address
                    }}
                  </b>
                </li>
                <li>
                  승인 상태 :
                  <b-badge
                    :variant="
                      getStatusColor(
                        deliveryFounderConsult.deliverySpaces.companyDistrict
                          .companyDistrictStatus,
                      )
                    "
                    class="badge-pill p-2 mr-2"
                  >
                    {{
                    deliveryFounderConsult.deliverySpaces.companyDistrict
                    .companyDistrictStatus | enumTransformer
                    }}
                  </b-badge>
                </li>
              </ul>
            </div>
            <div v-else class="empty-data">업체 정보 없음</div>
          </template>
        </BaseCard>
      </b-col>
      <b-col md="4" class="my-3">
        <BaseCard title="타입 정보">
          <template v-slot:head>
            <router-link
              v-if="deliveryFounderConsult.deliverySpaces"
              variant="outline-info"
              :to="{
                name: 'DeliverySpaceDetail',
                params: {
                  id: deliveryFounderConsult.deliverySpaces.no,
                },
              }"
              class="btn btn-outline-info"
            >상세보기</router-link>
          </template>
          <template v-slot:body>
            <div v-if="deliveryFounderConsult.deliverySpaces">
              <ul>
                <li v-if="deliveryFounderConsult.deliverySpaces.no">
                  타입 ID :
                  <b>{{ deliveryFounderConsult.deliverySpaces.no }}</b>
                </li>
                <li v-if="deliveryFounderConsult.deliverySpaces.typeName">
                  타입명 :
                  <b>{{ deliveryFounderConsult.deliverySpaces.typeName }}</b>
                </li>
                <li v-if="deliveryFounderConsult.deliverySpaces.deposit">
                  보증금 :
                  <b>{{ deliveryFounderConsult.deliverySpaces.deposit }} 만원</b>
                </li>
                <li v-if="deliveryFounderConsult.deliverySpaces.monthlyRentFee">
                  월 임대료 :
                  <b>
                    {{ deliveryFounderConsult.deliverySpaces.monthlyRentFee }}
                    만원
                  </b>
                </li>
                <li v-if="deliveryFounderConsult.deliverySpaces.monthlyUtilityFee">
                  월 관리비 :
                  <b>
                    {{
                    deliveryFounderConsult.deliverySpaces.monthlyUtilityFee
                    }}
                    만원
                  </b>
                </li>
                <li
                  v-if="
                    deliveryFounderConsult.deliverySpaces &&
                      deliveryFounderConsult.deliverySpaces.contracts
                  "
                >
                  공실 수:
                  <b>
                    {{
                    deliveryFounderConsult.deliverySpaces.quantity -
                    deliveryFounderConsult.deliverySpaces.contracts.length
                    }}/{{ deliveryFounderConsult.deliverySpaces.quantity }}
                  </b>
                </li>
                <li
                  v-if="
                    deliveryFounderConsult.deliverySpaces.amenities.length > 0
                  "
                >
                  주방시설 :
                  <b-badge
                    variant="info"
                    v-for="amenity in deliveryFounderConsult.deliverySpaces
                      .amenities"
                    :key="amenity.no"
                    class="m-1"
                  >{{ amenity.amenityName }}</b-badge>
                </li>
                <li
                  v-if="
                    deliveryFounderConsult.deliverySpaces &&
                      deliveryFounderConsult.deliverySpaces.deliverySpaceOptions
                        .length > 0
                  "
                >
                  공간옵션 :
                  <b-badge
                    variant="info"
                    v-for="option in deliveryFounderConsult.deliverySpaces
                      .deliverySpaceOptions"
                    :key="option.no"
                    class="m-1"
                  >{{ option.deliverySpaceOptionName }}</b-badge>
                </li>
              </ul>
            </div>
            <div v-else class="empty-data">공간 정보 없음</div>
          </template>
        </BaseCard>
      </b-col>
      <b-col md="8" class="my-3">
        <BaseCard title="상담 상세 정보">
          <template v-slot:head>
            <div v-if="deliveryFounderConsult.createdAt">
              <b-button
                variant="danger"
                @click="updateConsultInfo()"
                v-b-modal.reverse-read
                v-if="deliveryFounderConsult.viewCount === 'Y'"
              >미열람 처리</b-button>
              <b-button
                variant="primary"
                @click="updateConsultInfo()"
                v-b-modal.consult_info
                v-if="deliveryFounderConsult.status !== 'F_DIST_COMPLETE'"
              >수정하기</b-button>
            </div>
          </template>
          <template v-slot:body>
            <div
              v-if="
                deliveryFounderConsult && deliveryFounderConsult.codeManagement
              "
            >
              <b-row no-gutters>
                <ul class="col-12 col-md-6">
                  <li>
                    상담 신청일 :
                    <b>{{ deliveryFounderConsult.createdAt | dateTransformer }}</b>
                  </li>
                  <li>
                    통화 가능 시간 :
                    <b>{{ deliveryFounderConsult.availableTime.value }}</b>
                  </li>
                  <li v-if="deliveryFounderConsult.changUpExpYn">
                    창업 경험 유무 :
                    <b-badge
                      :variant="
                        deliveryFounderConsult.changUpExpYn === 'Y'
                          ? 'success'
                          : 'danger'
                      "
                    >
                      {{
                      deliveryFounderConsult.changUpExpYn | enumTransformer
                      }}
                    </b-badge>
                  </li>
                  <li>
                    공간 소유 유무 :
                    <b-badge
                      :variant="
                        deliveryFounderConsult.spaceOwnYn === 'Y'
                          ? 'success'
                          : 'danger'
                      "
                    >{{ deliveryFounderConsult.spaceOwnYn }}</b-badge>
                  </li>
                  <li v-if="deliveryFounderConsult.hopeFoodCategory">
                    희망 업종 :
                    <b>{{ deliveryFounderConsult.hopeFoodCategory }}</b>
                  </li>
                  <li
                    v-if="deliveryFounderConsult.spaceConsultEtc"
                  >문의 내용 : {{ deliveryFounderConsult.spaceConsultEtc }}</li>
                  <li>
                    신청 상태 :
                    <b-badge
                      :variant="
                        getStatusColor(
                          deliveryFounderConsult.codeManagement.key,
                        )
                      "
                      class="badge-pill p-2 mr-2"
                    >
                      {{
                      deliveryFounderConsult.codeManagement.value
                      }}
                    </b-badge>
                    <span class="ml-1" v-if="deliveryFounderConsult.deliveredAt">
                      ({{
                      deliveryFounderConsult.deliveredAt | dateTransformer
                      }})
                    </span>
                  </li>
                  <li v-if="elapsedTime">
                    경과 시간 :
                    {{ elapsedTime }}
                  </li>
                </ul>
                <ul class="col-12 col-md-6">
                  <li>
                    열람 상태 :
                    <b-badge
                      :variant="
                        deliveryFounderConsult.viewCount === 'Y'
                          ? 'success'
                          : 'danger'
                      "
                    >{{ deliveryFounderConsult.viewCount | enumTransformer }}</b-badge>
                  </li>
                  <li v-if="deliveryFounderConsult.openedAt">
                    열람 시간 :
                    <b>{{ deliveryFounderConsult.openedAt | dateTransformer }}</b>
                  </li>
                  <li v-if="deliveryFounderConsult.companyUser">
                    열람한 사용자 :
                    <b>{{ deliveryFounderConsult.companyUser.name }}</b>
                  </li>
                  <li v-if="deliveryFounderConsult.companyDecisionStatusCode">
                    업체 지정 상태 :
                    <b-badge
                      :variant="
                        getStatusColor(
                          deliveryFounderConsult.companyDecisionStatusCode.key,
                        )
                      "
                      class="badge-pill p-2 mr-2"
                    >
                      {{
                      deliveryFounderConsult.companyDecisionStatusCode.value
                      }}
                    </b-badge>
                  </li>
                  <li
                    v-if="
                      deliveryFounderConsultManagements &&
                        deliveryFounderConsultManagements.memo
                    "
                  >
                    업체 메모
                    <div class="mt-2">
                      <div class="bg-light border rounded p-3">
                        <b-row no-gutters align-h="between" align-v="end">
                          <div v-if="deliveryFounderConsultManagements.companyUser">
                            <span>
                              <strong class="user-name">
                                {{
                                deliveryFounderConsultManagements.companyUser
                                .name
                                }}
                              </strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {{
                              deliveryFounderConsultManagements.createdAt
                              | dateTransformer
                              }}
                            </span>
                          </div>
                        </b-row>
                        <div
                          class="mt-2 pt-1 border-top"
                          v-if="deliveryFounderConsultManagements.memo"
                        >{{ deliveryFounderConsultManagements.memo }}</div>
                      </div>
                    </div>
                    <div class="mt-2 text-right">
                      <b-button
                        variant="outline-info"
                        size="sm"
                        v-b-modal.managemnt_history
                      >메모 이력 보기</b-button>
                    </div>
                  </li>
                </ul>
              </b-row>
            </div>
            <div v-else class="empty-data">상담 내역 없음</div>
          </template>
        </BaseCard>
      </b-col>
    </b-row>
    <!-- for the text message -->
    <b-modal id="managemnt_history" title="업체 메모 이력" hide-footer>
      <div>
        <FounderConsultManagementHistory />
      </div>
    </b-modal>
    <b-modal id="nanuda_user" title="사용자정보 수정" @ok="updateFounderConsult()">
      <div class="form-row">
        <div class="mb-3">
          <b-form-group label="사용자 성별">
            <b-form-radio
              v-model="deliveryFounderConsultUpdateDto.gender"
              v-for="gender in genderSelect"
              :key="gender.no"
              :value="gender.key"
              name="gender"
            >{{ gender.value }}</b-form-radio>
          </b-form-group>
        </div>
      </div>
    </b-modal>
    <b-modal id="consult_info" title="상담 내용 수정" @ok="updateFounderConsult()">
      <div class="form-row">
        <div class="col-12 mb-3">
          <label>신청 상태</label>
          <select class="custom-select" v-model="deliveryFounderConsultUpdateDto.status">
            <option value selected>전체</option>
            <option
              v-for="status in deliveryFounderConsultStatusSelect"
              :key="status.no"
              :value="status.key"
            >{{ status.value }}</option>
          </select>
        </div>
        <div class="col-12 mb-3">
          <label for="changup_exp_yn">창업 경험 유무</label>
          <b-form-radio
            v-model="deliveryFounderConsultUpdateDto.changUpExpYn"
            v-for="yn in delYn"
            :key="yn"
            :value="yn"
            name="changup_exp_yn"
            :id="`changup_exp_yn_${yn}`"
          >{{ yn | enumTransformer }}</b-form-radio>
        </div>
        <div class="col-12 mb-3">
          <label for="hope_food_category">희망 업종</label>
          <template>
            <b-form-input
              list="food-category-list"
              id="hope_food_category"
              v-model="deliveryFounderConsultUpdateDto.hopeFoodCategory"
            ></b-form-input>
            <datalist id="food-category-list">
              <option
                v-for="category in foodCategorySelect"
                :key="category.code"
                :value="category.nameKr"
              >{{ category.nameKr }}</option>
            </datalist>
          </template>
        </div>
      </div>
    </b-modal>
    <b-modal
      v-if="deliveryFounderConsult.nanudaUser"
      id="send_message"
      ok-title="전송"
      cancel-title="취소"
      :title="`${deliveryFounderConsult.nanudaUser.name} 사용자에게 문자하기`"
    >
      <p class="mb-2">
        휴대폰 번호 :
        <b
          class="text-primary"
        >{{ deliveryFounderConsult.nanudaUser.phone | phoneTransformer }}</b>
      </p>
      <b-form-textarea id="message" placeholder="메세지를 입력해주세요.." rows="3" max-rows="6"></b-form-textarea>
    </b-modal>

    <!-- 열람 상태 미열람 모달 -->
    <b-modal
      id="reverse-read"
      title="상담 미열람 처리"
      header-bg-variant="danger"
      header-text-variant="light"
      ok-title="미열람 처리하기"
      cancel-title="취소"
      ok-variant="danger"
      @ok="reverseReadStatus()"
    >
      <b-container>
        <p class="text-center">
          <b>미열람 처리하시겠습니까?</b>
        </p>
      </b-container>
    </b-modal>
    <!-- 관리자 수정하기 -->
    <b-modal
      id="admin_list"
      title="관리자 수정하기"
      @cancel="cancelSelection()"
      @hide="cancelSelection()"
      @ok="updateFounderConsult()"
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
              <button class="btn btn-primary" @click="selectAdmin(admin)">선택</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="selectedAdmin.name" class="py-2 px-4 rounded" style="background-color:#f1f1f1">
        선택한 관리자 :
        <b>{{ selectedAdmin.name }}</b>
      </div>
      <b-pagination
        v-model="pagination.page"
        v-if="adminListCount"
        pills
        :total-rows="adminListCount"
        :per-page="pagination.limit"
        @input="paginateSearch"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </b-modal>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import { CodeManagementDto } from '../../../services/init/dto';
import { GENDER, CONST_GENDER } from '../../../services/shared';
import CodeManagementService from '../../../services/code-management.service';
import FounderConsultService from '../../../services/founder-consult.service';
import DeliveryFounderConsultService from '../../../services/delivery-founder-consult.service';
import AdminService from '../../../services/admin.service';
import FoodCategoryService from '../../../services/food-category.service';
import FounderConsultManagementService from '../../../services/founder-consult-management.service';
import {
  AdminDto,
  AdminListDto,
  DeliveryFounderConsultDto,
  DeliveryFounderConsultUpdateDto,
  FounderConsultManagementDto,
} from '../../../dto';
import {
  FoodCategoryDto,
  FoodCategoryListDto,
} from '../../../dto/food-category';
import { Pagination, YN, CONST_YN } from '../../../common';
import { BaseUser } from '../../../services/shared/auth';
import BaseCard from '../../_components/BaseCard.vue';
import FounderConsultManagementHistory from './FounderConsultManagementHistory.vue';
import toast from '../../../../resources/assets/js/services/toast.js';
import {
  FOUNDER_CONSULT,
  CONST_FOUNDER_CONSULT,
} from '../../../services/shared';

import { getStatusColor } from '../../../core/utils/status-color.util';

@Component({
  name: 'DeliveryFounderConsultDetail',
  components: {
    BaseCard,
    FounderConsultManagementHistory,
  },
})
export default class FounderConsultDetail extends BaseComponent {
  /* global kakao */

  private adminList: AdminDto[] = [];
  private adminListDto = new AdminListDto();
  private adminListCount = 0;
  private availableTimesSelect: CodeManagementDto[] = [];
  private delYn: YN[] = [...CONST_YN];
  private deliveryFounderConsult = new DeliveryFounderConsultDto();
  private deliveryFounderConsultUpdateDto = new DeliveryFounderConsultUpdateDto();
  private deliveryFounderConsultStatusSelect: CodeManagementDto[] = [];
  private genderSelect: CodeManagementDto[] = [];
  private foodCategorySelect: FoodCategoryDto[] = [];
  private pagination = new Pagination();
  private selectedAdmin: AdminDto = new AdminDto(BaseUser);
  private deliveryFounderConsultManagements: FounderConsultManagementDto[] = [];
  private elapsedTime = null;
  private deliveredTime = new Date();
  private createdTime = new Date();

  // get status color
  getStatusColor(status) {
    return getStatusColor(status);
  }

  // 사용자 정보 수정
  updateNanudaUser() {
    if (this.deliveryFounderConsult.nanudaUser.gender) {
      this.deliveryFounderConsultUpdateDto.gender = this.deliveryFounderConsult.nanudaUser.gender;
    }
    this.getGender();
  }

  // 상담 내용 수정
  updateConsultInfo() {
    this.deliveryFounderConsultUpdateDto = this.deliveryFounderConsult;
    this.getFounderConsultCodes();
    this.getAvailableTimes();
    this.getFoodCategories();
    this.getGender();
  }

  reverseReadStatus() {
    DeliveryFounderConsultService.reverseReadStatus(
      this.$route.params.id,
    ).subscribe(res => {
      this.findOne(this.$route.params.id);
    });
  }

  // 성별
  getGender() {
    CodeManagementService.findGender().subscribe(res => {
      this.genderSelect = res.data;
    });
  }

  // 희망 상담 시간
  getAvailableTimes() {
    CodeManagementService.findAvailableTimes().subscribe(res => {
      this.availableTimesSelect = res.data;
    });
  }

  // 신청 상태 코드
  getFounderConsultCodes() {
    CodeManagementService.findCodesFounderConsult().subscribe(res => {
      this.deliveryFounderConsultStatusSelect = res.data;
    });
  }

  // // 상담 메모 management
  // getFounderConsultManagements(id) {
  //   FounderConsultManagementService.findForManagement(id).subscribe(res => {
  //     if (res) {
  //       this.deliveryFounderConsultManagements = res.data;
  //     }
  //   });
  // }

  findOne(id) {
    // find founder consult detail
    DeliveryFounderConsultService.findOne(id).subscribe(res => {
      this.deliveryFounderConsult = res.data;
      this.deliveredTime = res.data.deliveredAt;
      if (this.deliveredTime) {
        this.createdTime = new Date(res.data.createdAt);
        this.deliveredTime = new Date(res.data.deliveredAt);
        this.getElapsedTime(this.createdTime, this.deliveredTime);
      }
    });
  }

  // 경과 시간
  getElapsedTime(startTime, endTime) {
    const timeDiff = Math.abs(
      (this.deliveredTime as any) - (this.createdTime as any),
    );
    const inMinutes = 60 * 1000;
    const inHours = 36e5;

    if (timeDiff > inHours) {
      this.elapsedTime = Math.ceil(timeDiff / inHours) + '시간';
    } else {
      this.elapsedTime = Math.ceil((timeDiff % inHours) / inMinutes) + '분';
    }
  }

  paginateSearch() {
    this.findAdmin(true);
  }

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

  // 음식 업종
  getFoodCategories() {
    FoodCategoryService.findForSelect().subscribe(res => {
      this.foodCategorySelect = res.data;
    });
  }

  updateFounderConsult() {
    if (this.selectedAdmin) {
      this.deliveryFounderConsultUpdateDto.spaceConsultManager = this.selectedAdmin.no;
    }

    DeliveryFounderConsultService.update(
      this.$route.params.id,
      this.deliveryFounderConsultUpdateDto,
    ).subscribe(res => {
      this.cancelSelection();
      this.deliveryFounderConsultUpdateDto = new DeliveryFounderConsultUpdateDto();
      this.findOne(this.$route.params.id);
      toast.success('수정완료');
    });
  }

  created() {
    const founderConsultId = this.$route.params.id;
    this.findOne(founderConsultId);
    // this.getFounderConsultManagements(founderConsultId);
  }
}
</script>
