<template>
  <section v-if="consultResponseV3Dto">
    <SectionTitle title="상담 신청" divider>
      <template v-slot:rightArea>
        <router-link
          to="/pickcook/consult-response-v3"
          class="btn btn-secondary"
          >목록으로</router-link
        >
      </template>
    </SectionTitle>
    <b-row v-on:keyup.enter="updateConsultResponse()">
      <b-col lg="6" class="my-3">
        <BaseCard title="사용자 정보">
          <template v-slot:head>
            <div v-if="consultResponseV3Dto">
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
            <div v-if="consultResponseV3Dto">
              <ul class="u-list">
                <li v-if="consultResponseV3Dto && consultResponseV3Dto.name">
                  사용자명 : {{ consultResponseV3Dto.name }}
                </li>
                <li v-if="consultResponseV3Dto.phone">
                  휴대폰 번호 :
                  <span>{{
                    consultResponseV3Dto.phone | phoneTransformer
                  }}</span>
                </li>
                <li>
                  창업자 유형:
                  {{
                    consultResponseV3Dto.proformaConsultResult.fnbOwnerStatus
                      | enumTransformer
                  }}
                </li>
                <li
                  v-if="
                    consultResponseV3Dto.proformaConsultResult &&
                      consultResponseV3Dto.proformaConsultResult.hdong
                  "
                >
                  운영/희망 주소:
                  {{
                    consultResponseV3Dto.proformaConsultResult.hdong.sidoName
                  }}
                  {{ consultResponseV3Dto.proformaConsultResult.hdong.guName }}
                  {{
                    consultResponseV3Dto.proformaConsultResult.hdong.hdongName
                  }}
                </li>
              </ul>
              <!-- 지도 노출 -->
              <!-- <div id="map" style="width:100%; height:300px"></div> -->
            </div>
          </template>
        </BaseCard>
      </b-col>
      <b-col lg="6" class="my-3">
        <BaseCard title="관리자 정보">
          <template v-slot:head>
            <div>
              <b-button
                v-if="!consultResponseV3Dto.adminId"
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
            <div v-if="consultResponseV3Dto.admin">
              <ul>
                <li>
                  관리자 ID :
                  <span>
                    {{ consultResponseV3Dto.admin.no }}
                  </span>
                </li>
                <li>
                  관리자명 :
                  <span>
                    {{ consultResponseV3Dto.admin.name }}
                  </span>
                </li>
                <li>
                  휴대폰 번호 :
                  {{ consultResponseV3Dto.admin.phone | phoneTransformer }}
                </li>
              </ul>
            </div>
            <div v-else class="empty-data">관리자 없음</div>
          </template>
        </BaseCard>
      </b-col>
      <b-col lg="6" class="my-3">
        <BaseCard title="상담 상세 정보">
          <template v-slot:head>
            <div>
              <b-button variant="primary" @click="updateConsultResponse()">
                수정하기
              </b-button>
            </div>
          </template>
          <template v-slot:body>
            <b-row>
              <!-- <b-col lg="6" v-if="consultResponseV3Dto.proformaConsultResult">
                <div class="mt-2">
                  <div
                    class="card border p-3 mt-2"
                    v-if="
                      consultResponseV3Dto.proformaConsultResult.fnbOwnerStatus
                    "
                  >
                    <p>Q. 창업자 유형</p>
                    <p class="mt-2 text-primary">
                      A.
                      {{
                        consultResponseV3Dto.proformaConsultResult
                          .fnbOwnerStatus | enumTransformer
                      }}
                    </p>
                  </div>
                </div>
                <div
                  v-if="consultResponseV3Dto.proformaConsultResult"
                  class="mt-2"
                >
                  <div
                    v-for="question in consultResponseV3Dto
                      .proformaConsultResult.questions"
                    :key="question.id"
                    class="card border p-3 mt-2"
                  >
                    <p>Q. {{ question.question }}</p>
                    <p class="mt-2 text-primary">
                      A.
                      <span v-for="given in question.givens" :key="given.id">
                        {{ given.given }}
                      </span>
                    </p>
                  </div>
                </div>
              </b-col> -->
              <b-col lg="12">
                <div class="my-2">
                  <b-form-group label="신청상태">
                    <b-form-select
                      class="custom-select"
                      v-model="consultResponseUpdateDto.consultStatus"
                    >
                      <b-form-select-option
                        v-for="status in brandConsultStatus"
                        :key="status.key"
                        :value="status.value"
                        >{{ status.comment }}</b-form-select-option
                      >
                    </b-form-select>
                  </b-form-group>
                  <p
                    class="text-right mt-1"
                    v-if="consultResponseV3Dto.updated"
                  >
                    ({{ consultResponseV3Dto.updated | dateTransformer }})
                  </p>
                </div>
                <!-- <div class="my-2">
                  <b-form-group
                    label="
                      미팅 예약 코드
                    "
                    v-if="consultResponseV3Dto.reservationCode"
                  >
                    <b-form-input
                      v-model="consultResponseV3Dto.reservationCode"
                      disabled
                    >
                    </b-form-input>
                  </b-form-group>
                  <template v-if="consultResponseV3Dto.reservation">
                    <template
                      v-if="consultResponseV3Dto.reservation.isCancelYn !== 'Y'"
                    >
                      <b-form-row>
                        <b-col cols="6">
                          <b-form-group label="미팅 예약 날짜">
                            <b-form-datepicker
                              v-model="reservationUpdateDto.reservationDate"
                              @input="getReservationTimes($event)"
                            >
                            </b-form-datepicker>
                          </b-form-group>
                        </b-col>
                        <b-col cols="6">
                          <b-form-group label="미팅 예약 시간">
                            <b-form-select
                              v-model="reservationUpdateDto.reservationTime"
                            >
                              <b-form-select-option
                                :key="index"
                                :value="time.value"
                                v-for="(time, index) in reservationTimes"
                                :disabled="!time.available"
                              >
                                {{ time.value }}
                              </b-form-select-option>
                            </b-form-select>
                          </b-form-group>
                        </b-col>
                      </b-form-row>
                      <div class="mt-2 text-right">
                        <b-button variant="info" @click="updateReservation()">
                          예약 변경
                        </b-button>
                        <b-button variant="danger" v-b-modal.cancel_reservation>
                          예약 취소
                        </b-button>
                      </div>
                    </template>
                    <template v-else>
                      <p class="red-text">
                        <b-badge variant="danger">취소</b-badge>
                        <template
                          v-if="consultResponseV3Dto.reservation.deleteReasonEtc"
                        >
                          {{ consultResponseV3Dto.reservation.deleteReasonEtc }}
                        </template>
                        <template v-else>
                          {{ consultResponseV3Dto.reservation.deleteReason }}
                        </template>
                      </p>
                    </template>
                  </template>
                  <template v-else>
                    <b-form-row>
                      <b-col cols="6">
                        <b-form-group label="미팅 예약 날짜">
                          <b-form-datepicker
                            v-model="reservationCreateDto.reservationDate"
                            @input="getReservationTimes($event)"
                          >
                          </b-form-datepicker>
                        </b-form-group>
                      </b-col>
                      <b-col cols="6">
                        <b-form-group label="미팅 예약 시간">
                          <b-form-select
                            v-model="reservationCreateDto.reservationTime"
                          >
                            <b-form-select-option
                              :key="index"
                              :value="time.value"
                              v-for="(time, index) in reservationTimes"
                              :disabled="!time.available"
                            >
                              {{ time.value }}
                            </b-form-select-option>
                          </b-form-select>
                        </b-form-group>
                      </b-col>
                    </b-form-row>
                    <div class="mt-2 text-right">
                      <b-button variant="primary" @click="createReservation()">
                        예약 추가
                      </b-button>
                    </div>
                  </template>
                </div> -->
                <div class="my-4">
                  <label for="productConsultEtc">비고 내용</label>
                  <b-form-textarea
                    id="productConsultEtc"
                    v-model="consultResponseUpdateDto.description"
                    placeholder="내용 입력해주세요"
                    rows="10"
                    max-rows="20"
                    style="height:240px"
                  ></b-form-textarea>
                </div>
              </b-col>
            </b-row>
          </template>
        </BaseCard>
      </b-col>
    </b-row>
    <!-- 문자 전송 모달 -->
    <!-- <b-modal
      v-if="consultResponseV3Dto || consultResponseV3Dto.nonUserName"
      id="send_message"
      ok-title="전송"
      cancel-title="취소"
      :title="
        consultResponseV3Dto
          ? `${consultResponseV3Dto.name} 사용자에게 문자하기`
          : `${consultResponseV3Dto.nonUserName} (비회원) 사용자에게 문자하기`
      "
      @ok="sendMessage()"
    >
      <p class="mb-2">
        휴대폰 번호 :
        <b class="text-primary">
          <template v-if="consultResponseV3Dto">
            {{ consultResponseV3Dto.phone | phoneTransformer }}
          </template>
          <template v-else-if="consultResponseV3Dto.nonUserPhone">
            {{ consultResponseV3Dto.nonUserPhone | phoneTransformer }}
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
    <b-modal
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
        v-model="paginationAdmin.page"
        v-if="adminTotalCount"
        pills
        :total-rows="adminTotalCount"
        :per-page="paginationAdmin.limit"
        @input="paginateSearch()"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </b-modal>
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
    <!-- 예약 변경 모달 -->
    <!-- <b-modal
      id="update_reservation"
      title="미팅 예약 변경"
      header-bg-variant="info"
      header-text-variant="light"
      hide-footer
    >
      <div class="text-center">
        <div class="mt-2 text-right">
          <b-button variant="primary" @click="updateReservation()"
            >예약변경</b-button
          >
        </div>
      </div>
    </b-modal> -->
    <!-- 예약 취소 모달 -->
    <b-modal
      id="cancel_reservation"
      title="미팅 예약 취소"
      header-bg-variant="danger"
      header-text-variant="light"
      hide-footer
    >
      <div class="text-center mb-2">
        <p>
          <b>정말로 취소하시겠습니까?</b>
        </p>
      </div>
      <div class="mt-3">
        <b-form-group
          v-for="(reason, index) in reservationDeleteReasons"
          :key="index"
        >
          <b-form-radio
            v-model="reservationDeleteReasonDto.deleteReason"
            :value="reason"
            name="delete_reason"
            @input="onSelectDeleteReason($event)"
          >
            {{ reason }}
          </b-form-radio>
        </b-form-group>
        <b-form-group>
          <b-form-input
            v-model="reservationDeleteReasonDto.deleteReasonEtc"
            :disabled="reservationDeleteReasonDto.deleteReason !== '기타'"
            @input="onSelectOtherReason($event)"
            class="mt-2"
          >
          </b-form-input>
        </b-form-group>
      </div>
      <div class="mt-2 text-right">
        <b-button
          variant="danger"
          @click="cancelReservation()"
          :disabled="!deleteReasonText.length"
          >예약취소</b-button
        >
      </div>
    </b-modal>
  </section>
</template>
<script lang="ts">
import { Pagination } from '@/common';
import { getStatusColor } from '@/core';
import BaseComponent from '@/core/base.component';
import {
  ConsultResponseV3Dto,
  ConsultResponseV3UpdateDto,
  AdminSendMessageDto,
  ReservationCreateDto,
  ReservationUpdateDto,
  ReservationDeleteReasonDto,
  ReservationCheckTimeDto,
  AdminDto,
  AdminListDto,
} from '@/dto';
import { PickcookCodeManagementDto } from '@/services/init/dto';
import {
  BEST_FOOD_CATEGORY,
  CONST_BEST_FOOD_CATEGORY,
  RESERVATION_DELETE_REASON,
  CONST_RESERVATION_DELETE_REASON,
  BRAND_CONSULT,
} from '@/services/shared';
import { BaseUser } from '@/services/shared/auth';
import { Component } from 'vue-property-decorator';
import CommonCodeService from '@/services/pickcook/common-code.service';
import ConsultResponseV3Service from '@/services/pickcook/consult-response-v3.service';
import toast from '../../../../../resources/assets/js/services/toast.js';
import AdminService from '@/services/admin.service';

@Component({
  name: 'ConsultResponseV3Detail',
})
export default class ConsultResponseV3Detail extends BaseComponent {
  private consultResponseV3Dto = new ConsultResponseV3Dto();
  private consultResponseUpdateDto = new ConsultResponseV3UpdateDto();
  private adminSendMessageDto = new AdminSendMessageDto();
  private brandConsultStatus: PickcookCodeManagementDto[] = [];
  private codeManagementDto = new PickcookCodeManagementDto();
  private paginationCode = new Pagination();
  private locationDetailInfo: any = [];
  private selectedFoodCategory = '';
  private bestFoodCategory: BEST_FOOD_CATEGORY[] = [
    ...CONST_BEST_FOOD_CATEGORY,
  ];

  private reservationCreateDto = new ReservationCreateDto();
  private reservationUpdateDto = new ReservationUpdateDto();
  private reservationDeleteReasonDto = new ReservationDeleteReasonDto();
  private reservationCheckTimeDto = new ReservationCheckTimeDto();
  private reservationTimes: any[] = [];
  private reservationDeleteReasons: RESERVATION_DELETE_REASON[] = [
    ...CONST_RESERVATION_DELETE_REASON,
  ];
  private selectDeleteReason = '';
  private otherDeleteReason = '';
  private deleteReasonText = '';

  private adminList: AdminDto[] = [];
  private adminSearchDto = new AdminListDto();
  private adminTotalCount = null;
  private paginationAdmin = new Pagination();
  private selectedAdmin: AdminDto = new AdminDto(BaseUser);

  private configOptions: any = {
    format: 'YYYY-MM-DD hh:mm A',
    icons: {
      time: 'far fa-clock',
      date: 'far fa-calendar',
      up: 'fas fa-arrow-up',
      down: 'fas fa-arrow-down',
      previous: 'fas fa-chevron-left',
      next: 'fas fa-chevron-right',
      today: 'fas fa-calendar-check',
      clear: 'far fa-trash-alt',
      close: 'far fa-times-circle',
    },
  };

  toggleId(index: number) {
    return 'item0' + index;
  }

  // get status color
  getStatusColor(status: BRAND_CONSULT) {
    return getStatusColor(status);
  }

  // get common codes
  getCommonCodes() {
    this.codeManagementDto.category = 'BRAND_CONSULT';
    CommonCodeService.findAll(
      this.codeManagementDto,
      this.paginationCode,
    ).subscribe(res => {
      this.brandConsultStatus = res.data.items;
    });
  }

  // get location info detail
  getLocationInfoDetail() {
    if (this.consultResponseV3Dto.proformaConsultResult.hdong) {
      ConsultResponseV3Service.getLocationInfoDetail(
        this.consultResponseV3Dto.proformaConsultResult.hdong.hdongCode,
      ).subscribe(res => {
        let filterArray = [...Object.values(res.data)];
        filterArray = filterArray.filter((arr: any) => {
          for (const filter of this.bestFoodCategory) {
            if (arr.mediumCategoryName.includes(filter)) {
              return true;
            }
          }
        });

        this.selectedFoodCategory = filterArray[0].mediumCategoryName;
        this.locationDetailInfo = filterArray.splice(0, 5);

        // console.log('this.locationDetailInfo', this.locationDetailInfo);
      });
    }
  }

  // get cateogry
  getCategory(category: string) {
    this.selectedFoodCategory = category;
  }

  findAdmin(isPagination: boolean) {
    if (!isPagination) {
      this.paginationAdmin.page = 1;
    }
    this.paginationAdmin.limit = 5;
    AdminService.findAll(this.adminSearchDto, this.paginationAdmin).subscribe(
      res => {
        this.adminList = res.data.items;
        this.adminTotalCount = res.data.totalCount;
      },
    );
  }

  selectAdmin(admin: AdminDto) {
    this.selectedAdmin = admin;
  }

  cancelSelection() {
    this.selectedAdmin = new AdminDto(BaseUser);
  }

  paginateSearch() {
    this.findAdmin(true);
  }

  // 담당자 본인으로 정하기
  assignYourselfAdmin() {
    ConsultResponseV3Service.assignAdmin(
      this.consultResponseV3Dto.id,
    ).subscribe(res => {
      this.findOne(this.consultResponseV3Dto.id);
    });
  }

  findOne(id) {
    ConsultResponseV3Service.findOne(id).subscribe(res => {
      if (res) {
        this.consultResponseV3Dto = res.data;
        // this.getLocationInfoDetail();
        this.consultResponseUpdateDto.consultStatus = this.consultResponseV3Dto.consultStatus;
        this.consultResponseUpdateDto.description = this.consultResponseV3Dto.description;
        // if (
        //   this.consultResponseV3Dto.reservation &&
        //   this.consultResponseV3Dto.reservation.isCancelYn !== 'Y'
        // ) {
        //   this.reservationUpdateDto.reservationDate = this.consultResponseV3Dto.reservation.formatReservationDate;
        //   this.reservationUpdateDto.reservationTime = this.consultResponseV3Dto.reservation.reservationTime;
        //   this.getReservationTimes(
        //     this.consultResponseV3Dto.reservation.reservationDate
        //       .toString()
        //       .slice(0, 10),
        //   );
        // }
      }
    });
  }

  // update consult response
  updateConsultResponse() {
    if (this.selectedAdmin) {
      this.consultResponseUpdateDto.adminId = this.selectedAdmin.no;
    }
    ConsultResponseV3Service.update(
      this.$route.params.id,
      this.consultResponseUpdateDto,
    ).subscribe(res => {
      if (res) {
        toast.success('수정완료');
        this.findOne(this.$route.params.id);
      }
    });
  }

  onSelectDeleteReason(value) {
    if (value !== RESERVATION_DELETE_REASON.ETC) {
      this.deleteReasonText = value;
      this.reservationDeleteReasonDto.deleteReasonEtc = '';
    } else {
      this.deleteReasonText = '';
    }
  }

  created() {
    const id = this.$route.params.id;
    this.findOne(id);
    this.getCommonCodes();
  }
}
</script>
<style lang="scss" scoped>
.complete-time-box {
  .row {
    > div {
      + div {
        border-left: 1px solid #004d8a;
      }
      .label-box {
        padding: 1em 0;
        font-size: 0.875em;
        color: #020202;
        text-align: center;
        border-bottom: 1px solid #004d8a;
        background-color: #f9f9f9;
      }
      .cont-box {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        height: 5.875em;
        line-height: 1.5;
        p {
          padding: 0.5em;
          font-size: 0.875em;
        }
      }
      .txt-box {
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        span {
          background: rgba(255, 255, 255, 0.95);
          padding: 0.25em 0.5em;
          border-radius: 10em;
          color: #000000;
          font-weight: 600;
        }
      }
      .percent-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 0;
        height: 100%;
        transition-duration: 1s;

        &.offline-ratio {
          background: rgb(167, 189, 211);
          background: linear-gradient(
            90deg,
            rgba(167, 189, 211, 1) 0%,
            rgba(28, 77, 134, 1) 35%
          );
          margin-left: auto;
        }
        &.delivery-ratio {
          background: rgb(221, 176, 40);
          background: linear-gradient(
            90deg,
            rgba(221, 176, 40, 1) 0%,
            rgba(232, 215, 145, 1) 35%
          );
          margin-right: auto;
        }
      }
    }
  }
}

.rank-item {
  font-size: 12px;
  .card {
    position: relative;
    border-radius: 1.5em;
    padding: 1.25em 1.5em;
    z-index: 1;
    .card-img-left {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 5.625em;
      height: 5.625em;
      background-color: #f5f5f5;
      border-radius: 1em;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .card-body {
      position: relative;
      width: calc(100% - 4.75em);
      padding: 0;
      margin-left: 1.25em;
      .card-badge {
        margin-bottom: 0.4em;
        font-size: 1.2em;
        line-height: 1;
        .badge {
          margin-bottom: 0.4em;
          + .badge {
            margin-left: 0.4em;
          }
        }
      }
      .card-title {
        font-size: 1.75em;
        font-weight: 600;
        line-height: 1;
        color: #707070;
        margin-bottom: 1em;
      }
      .card-text {
        font-size: 0.75em;
        font-weight: 400;
        line-height: 1;
        strong {
          font-weight: 600;
          font-family: 'YoonGothic', sans-serif;
        }
      }
      .btn-toggle {
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        color: #b1b1b1;
        line-height: 1;
        font-size: 0.75em;
        .icon-toggle-arrow {
          margin-left: 0.25em;
        }
      }
    }
  }
  .card-collapse {
    position: relative;
    top: -1.25em;
    .card-desc {
      position: relative;
      background-color: #fff;
      border-bottom-left-radius: 1.5em;
      border-bottom-right-radius: 1.5em;
      overflow: hidden;
      padding: 2.5em 1.5em 1.25em;
      min-height: 7em;
    }
  }
  @media screen and (min-width: 992px) {
    .card {
      .card-img-left {
        width: auto;
        height: 10em;
      }
      .card-body {
        width: auto;
        margin: 1em 0 0;
      }
    }
  }
}

// chart
.chart-container {
  position: relative;

  &.chart-horizontal-stacked {
    .chart-bars {
      display: flex;
      // flex-wrap: wrap;
      width: 100%;
    }
    .chart-bar {
      position: relative;
      width: 50%;
      min-width: 10%;
      &.chart-bar-restaurant {
        .bar-label {
          text-align: left;
        }
        .bar-stack {
          border-top-left-radius: 0.5rem;
          border-bottom-left-radius: 0.5rem;
          text-align: left;
          padding-right: 0.5em;
          &:before {
            left: 0;
            background-color: navy;
          }
        }
      }
      &.chart-bar-delivery {
        .bar-label {
          text-align: right;
        }
        .bar-stack {
          border-top-right-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          text-align: right;
          padding-left: 0.5em;
          &:before {
            background-color: skyblue;
            right: 0;
          }
        }
      }
      .bar-label {
        display: block;
        font-weight: 600;
        color: #707070;
        margin-bottom: 0.5em;
        white-space: nowrap;
      }
      .bar-stack {
        position: relative;
        height: 3em;
        line-height: 3em;
        padding: 0em 1em;
        overflow: hidden;
        &:before {
          display: block;
          position: absolute;
          top: 0;
          content: '';
          width: 100%;
          height: 100%;
          transition: width 1s ease 0.5s;
        }
      }
      .bar-percent {
        position: relative;
        z-index: 2;
        color: #fff;
        font-size: 1rem;
        font-weight: 600;
        white-space: nowrap;
      }
    }
  }

  &.chart-vertical-arrow {
    margin: 0 auto;
    .chart-bars {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      border-bottom: 1px solid #dcdcdc;
      height: 7em;
    }
    .chart-bar {
      position: relative;
      width: 1em;
      margin: 0 auto;

      &.bar-rank-max {
        .bar-stack {
          background-color: navy;
          border-color: navy;
          .bar-percent {
            color: navy;
          }
        }
      }
      &.bar-rank-min {
        .bar-stack {
          background-color: skyblue;
          border-color: skyblue;
          .bar-percent {
            color: skyblue;
          }
        }
      }

      .bar-stack {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        margin-top: 3em;
        width: 100%;
        height: calc(100% - 3em);
        background-color: blue;
        border-color: blue;
        transition: height 1s ease 0.5s;
        &:before {
          position: absolute;
          left: 50%;
          top: -2em;
          display: block;
          content: '';
          width: 0px;
          height: 0px;
          border-width: 1em;
          border-style: solid;
          border-top-color: transparent;
          border-left-color: transparent;
          border-right-color: transparent;
          border-bottom-color: inherit;
          margin-left: -1em;
        }
        .bar-percent {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 100%;
          margin-bottom: 1em;
          font-size: 1.2rem;
          font-weight: 600;
          line-height: 1;
          color: inherit;
          color: blue;
        }
      }
    }
    .chart-labels {
      display: flex;
      align-items: flex-start;
      justify-content: space-around;
      margin-top: 0.5em;
      .chart-label {
        flex: 1;
        text-align: center;
        font-size: 1rem;
      }
    }
  }
}

// odometer
.odometer-container {
  text-align: center;
  height: 5em;
  display: flex;
  align-items: center;
  justify-content: center;
  .odometer-box {
    display: inline-flex;
    align-items: baseline;
    .odometer-count {
      font-size: 3rem;
      font-weight: 600;
      line-height: 1;
    }
    .odometer-unit {
      font-size: 1.8rem;
      color: #707070;
      margin-left: 0.5em;
    }
  }
}
</style>
