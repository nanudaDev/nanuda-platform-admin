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
                <li
                  v-if="
                    consultResponseV3Dto.proformaConsultResult &&
                      consultResponseV3Dto.proformaConsultResult.fnbOwnerStatus
                  "
                >
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
      <b-col lg="6" class="my-3">
        <BaseCard title="배민 리포트 정보">
          <template v-slot:body>
            <!-- 배민 리포트 수정 폼 -->
            <template v-if="consultResponseV3Dto.consultBaeminReport">
              <b-form-row>
                <template>
                  <b-col cols="12">
                    <b-form-group label="창업 지역">
                      <b-form-input
                        :value="codeHdongAddress"
                        @click="showAddressModal()"
                        readonly
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </template>
                <b-col cols="6">
                  <b-form-group label="창업 업종">
                    <b-form-select
                      class="custom-select"
                      v-model="baeminReportUpdateDto.mediumCategoryCode"
                    >
                      <b-form-select-option
                        v-for="(category, index) in kbMediumCategories"
                        :key="index"
                        :value="category"
                        >{{
                          category | kbCategoryTransformer
                        }}</b-form-select-option
                      >
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group label="배민 카테고리">
                    <b-form-select
                      class="custom-select"
                      v-model="baeminReportUpdateDto.baeminCategoryCode"
                    >
                      <b-form-select-option
                        v-for="(value, index) in baeminCategories"
                        :key="index"
                        :value="value"
                        >{{
                          value | baeminCategoryTransformer
                        }}</b-form-select-option
                      >
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <label for="average_score">평점</label>
                  <b-form-input
                    v-model="baeminReportUpdateDto.averageScore"
                    id="average_score"
                    number
                  ></b-form-input>
                </b-col>
                <b-col cols="6">
                  <b-form-group label="평균 주문수">
                    <b-form-input
                      v-model="baeminReportUpdateDto.averageOrderRate"
                      id="average_order_rate"
                      number
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group label="월 평균 주문수">
                    <b-form-input
                      v-model="baeminReportUpdateDto.averageMonthlyOrderRate"
                      id="average_monthly_order_rate"
                      number
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group label="최소 주문금액">
                    <b-form-input
                      v-model="baeminReportUpdateDto.minimumOrderPrice"
                      number
                      id="minimum_order_price"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <label for="average_delivery_tip">배달 팁</label>
                  <b-form-input
                    v-model="baeminReportUpdateDto.averageDeliveryTip"
                    id="average_delivery_tip"
                    number
                  ></b-form-input>
                </b-col>
                <b-col cols="6">
                  <label for="average_like_rate">찜 수</label>
                  <b-form-input
                    v-model="baeminReportUpdateDto.averageLikeRate"
                    id="average_like_rate"
                    number
                  ></b-form-input>
                </b-col>
              </b-form-row>
              <div class="text-right mt-4">
                <b-btn size="lg" variant="primary" @click="updateBaeminReport()"
                  >수정하기</b-btn
                >
              </div>
            </template>
            <template v-else>
              <!-- 배민 리포트 추가 폼 -->
              <b-form-row>
                <b-col cols="12">
                  <b-row align-v="end" no-gutters>
                    <b-col cols="9">
                      <b-form-group label="창업 지역">
                        <b-form-input
                          :value="codeHdongAddress"
                          @click="showAddressModal()"
                          readonly
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col cols="3">
                      <b-btn
                        size="lg"
                        variant="secondary"
                        block
                        @click="showAddressModal()"
                        style="margin-bottom:1.5em; margin-left:0.5em;"
                        >주소입력</b-btn
                      >
                    </b-col>
                    <b-col cols="12">
                      <b-alert variant="danger" show>
                        <p>(*서울,경기,인천,부산,제주 외 불가능)</p>
                      </b-alert>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col cols="6">
                  <b-form-group label="창업 업종">
                    <b-form-select
                      class="custom-select"
                      v-model="baeminReportCreateDto.mediumCategoryCode"
                    >
                      <b-form-select-option
                        v-for="(category, index) in kbMediumCategories"
                        :key="index"
                        :value="category"
                        >{{
                          category | kbCategoryTransformer
                        }}</b-form-select-option
                      >
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group label="배민 카테고리">
                    <b-form-select
                      class="custom-select"
                      v-model="baeminReportCreateDto.baeminCategoryCode"
                    >
                      <b-form-select-option
                        v-for="(value, index) in baeminCategories"
                        :key="index"
                        :value="value"
                        >{{
                          value | baeminCategoryTransformer
                        }}</b-form-select-option
                      >
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <label for="average_score">평점</label>
                  <b-form-input
                    v-model="baeminReportCreateDto.averageScore"
                    id="average_score"
                    number
                  ></b-form-input>
                </b-col>
                <b-col cols="6">
                  <b-form-group label="평균 주문수">
                    <b-form-input
                      v-model="baeminReportCreateDto.averageOrderRate"
                      id="average_order_rate"
                      number
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group label="월 평균 주문수">
                    <b-form-input
                      v-model="baeminReportCreateDto.averageMonthlyOrderRate"
                      id="average_monthly_order_rate"
                      number
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group label="최소 주문금액">
                    <b-form-input
                      v-model="baeminReportCreateDto.minimumOrderPrice"
                      number
                      id="minimum_order_price"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <label for="average_delivery_tip">배달 팁</label>
                  <b-form-input
                    v-model="baeminReportCreateDto.averageDeliveryTip"
                    id="average_delivery_tip"
                    number
                  ></b-form-input>
                </b-col>
                <b-col cols="6">
                  <label for="average_like_rate">찜 수</label>
                  <b-form-input
                    v-model="baeminReportCreateDto.averageLikeRate"
                    id="average_like_rate"
                    number
                  ></b-form-input>
                </b-col>
              </b-form-row>
              <div class="text-right mt-4">
                <b-btn size="lg" variant="primary" @click="createBaeminReport()"
                  >추가하기</b-btn
                >
              </div>
            </template>
          </template>
        </BaseCard>
      </b-col>
      <b-col cols="12">
        <b-btn
          variant="info"
          block
          size="lg"
          style="height:4em"
          @click="getConsultReport()"
          >상권분석 리포트</b-btn
        >
      </b-col>
    </b-row>
    <!-- 문자 전송 모달 -->
    <b-modal
      v-if="consultResponseV3Dto"
      id="send_message"
      :title="`${consultResponseV3Dto.name} 사용자에게 문자하기`"
      hide-footer
    >
      <p class="mb-2">
        휴대폰 번호 :
        <b class="text-primary">
          <template v-if="consultResponseV3Dto">
            {{ consultResponseV3Dto.phone | phoneTransformer }}
          </template>
        </b>
      </p>
      <div>
        <b-form-group>
          <b-form-radio
            v-model="selectedTemplateType"
            v-for="(type, name, index) in messageTemplateTypes"
            :key="index"
            :value="type"
            >{{ type }}</b-form-radio
          >
        </b-form-group>
        <b-form-group label="상담시간대">
          <b-form-input v-model="availableTime" placeholder=""></b-form-input>
        </b-form-group>
        <template v-if="selectedTemplateType === '미팅용'">
          <b-form-group label="구글 미트 URL">
            <b-form-input
              v-model="consultResponseV3SendMessageDto.googleMeetUrl"
            ></b-form-input>
          </b-form-group>
        </template>
        <b-form-textarea
          v-html="messageTemplate"
          v-model="messageTemplate"
          rows="10"
          max-rows="20"
          style="height:300px"
          readonly
        >
        </b-form-textarea>
      </div>
      <div
        class="mt-2 text-right"
        v-if="
          consultResponseV3Dto.messages &&
            consultResponseV3Dto.messages.length > 0
        "
      >
        <b-button variant="outline-info" v-b-modal.messages_log
          >문자 전송 내역</b-button
        >
      </div>
      <div class="border-top pt-2 mt-4 text-right">
        <b-button variant="primary" @click="sendMessage()">
          전송
        </b-button>
      </div>
    </b-modal>
    <!-- 메세지 전송 내역 모달 -->
    <b-modal id="messages_log" title="문자 전송 내역" hide-footer>
      <template v-if="consultResponseV3Dto.messages">
        <div
          class="border rounded p-3 mt-2"
          v-for="messageLog in consultResponseV3Dto.messages"
          :key="messageLog.id"
        >
          <p class="text-secondary">
            <small v-if="messageLog.created">
              {{ messageLog.created | dateTransformer }}
            </small>
          </p>
          <p v-if="messageLog.message" class="mt-2">
            {{ messageLog.message }}
          </p>
        </div>
      </template>
    </b-modal>
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
    <!-- 주소 검색 모달 -->
    <b-modal id="postcode" title="주소 검색" hide-footer>
      <vue-daum-postcode
        style="height:500px; overflow-y:auto;"
        @complete="setAddress($event)"
      />
    </b-modal>
  </section>
</template>
<script lang="ts">
import { Pagination, MESSAGE_TEMPLATE_TYPE } from '@/common';
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
  ConsultResponseV3SendMessageDto,
  SalesRequestDto,
  SalesResponseDto,
  BaeminReportCreateDto,
  BaeminReportUpdateDto,
  CodeHdongDto,
} from '@/dto';
import { PickcookCodeManagementDto } from '@/services/init/dto';
import {
  BEST_FOOD_CATEGORY,
  CONST_BEST_FOOD_CATEGORY,
  RESERVATION_DELETE_REASON,
  CONST_RESERVATION_DELETE_REASON,
  BRAND_CONSULT,
  CONST_KB_MEDIUM_CATEGORY,
  KB_MEDIUM_CATEGORY_KOREAN,
  CONST_BAEMIN_CATEGORY_CODE,
  BAEMIN_CATEGORY_CODE,
  KB_MEDIUM_CATEGORY,
} from '@/services/shared';
import { BaseUser } from '@/services/shared/auth';
import { Component } from 'vue-property-decorator';
import CommonCodeService from '@/services/pickcook/common-code.service';
import ConsultResponseV3Service from '@/services/pickcook/consult-response-v3.service';
import toast from '../../../../../resources/assets/js/services/toast.js';
import AdminService from '@/services/admin.service';
import consultResponseService from '@/services/pickcook/consult-response.service.js';
import CodeHdongService from '@/services/pickcook/code-hdong.service';

@Component({
  name: 'ConsultResponseV3Detail',
})
export default class ConsultResponseV3Detail extends BaseComponent {
  private consultResponseV3Dto = new ConsultResponseV3Dto();
  private consultResponseUpdateDto = new ConsultResponseV3UpdateDto();

  private consultResponseV3SendMessageDto = new ConsultResponseV3SendMessageDto();
  private adminSendMessageDto = new AdminSendMessageDto();
  private messageTemplateTypes = MESSAGE_TEMPLATE_TYPE;
  private availableTime = '';
  private selectedTemplateType = MESSAGE_TEMPLATE_TYPE.CONSULT;

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

  private salesRequestDto = new SalesRequestDto();
  private salesResponseDto = new SalesResponseDto();
  private kbMediumCategories: KB_MEDIUM_CATEGORY[] = [
    ...CONST_KB_MEDIUM_CATEGORY,
  ];

  // 배민카테고리
  private baeminReportCreateDto = new BaeminReportCreateDto();
  private baeminReportUpdateDto = new BaeminReportUpdateDto();
  private baeminCategories: BAEMIN_CATEGORY_CODE[] = [
    ...CONST_BAEMIN_CATEGORY_CODE,
  ];

  // hdong code
  private hdongCode;
  private codeHdongAddress = '';
  private codeHdongDto = new CodeHdongDto();

  // 상권분석 리포트 보기
  getConsultReport() {
    let params = {};
    if (this.consultResponseV3Dto.consultBaeminReport) {
      params = {
        hdongCode: String(
          this.consultResponseV3Dto.consultBaeminReport.hdongCode,
        ),
        kbMediumCategory: this.consultResponseV3Dto.consultBaeminReport
          .mediumCategoryCode,
      };
    }
    const routeData = this.$router.resolve({
      name: 'ConsultReportDetail',
      params: {
        ...params,
      },
    });
    // 새탭으로 열기
    window.open(routeData.href, '_blank');
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
        if (
          this.consultResponseV3Dto.consultBaeminReport &&
          this.consultResponseV3Dto.consultBaeminReport.hdongCode
        ) {
          this.baeminReportUpdateDto = this.consultResponseV3Dto.consultBaeminReport;
          this.getHdong(
            this.consultResponseV3Dto.consultBaeminReport.hdongCode.toString(),
          );
        }

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

  get messageTemplate() {
    if (this.selectedTemplateType === MESSAGE_TEMPLATE_TYPE.CONSULT) {
      return `[픽쿡 상담안내]\n안녕하세요 ${this.consultResponseV3Dto.name} 창업자님!\n데이터로 창업의 시작과 매출을올려드리는 픽쿡입니다.\n픽쿡을 신청해 주셔서 감사합니다.\n오늘 "${this.availableTime}" 사이에 상담전화를 드리겠습니다.\n감사합니다.`;
    } else if (
      this.selectedTemplateType === MESSAGE_TEMPLATE_TYPE.ONLINE_MEETING
    ) {
      return `[픽쿡 상권분석 일정안내]\n안녕하세요 ${
        this.consultResponseV3Dto.name
      } 창업자님!\n오늘 "${
        this.availableTime
      }"에 픽쿡 상권분석 미팅이 예정되어 있어서 문자드립니다!\n구글 미트로 화상미팅이 진행될 예정이며, 아래 첨부된 링크로 접속이 가능하며, 앱 다운로드가있을 수 있습니다. \n해당 시간에 링크에 입장 하시면 담당자분이 대기 예정입니다.\n감사합니다.\n\n구글 미트 주소: ${
        this.consultResponseV3SendMessageDto.googleMeetUrl
          ? this.consultResponseV3SendMessageDto.googleMeetUrl
          : ''
      }`;
    } else {
      return `[픽쿡 상권분석 일정안내]\n안녕하세요 ${this.consultResponseV3Dto.name} 창업자님!\n오늘 "${this.availableTime}"에 픽쿡 오프라인 미팅이 예정되어 있어서 문자드립니다!\n장소 : 서울시 서초구 강남대로 311\n\n건물에 도착하여 연락주시면 담당자분이 안내드릴 예정입니다.\n건물 내 유료주차 가능하시며, 최초 30분만 무료로 제공됩니다.\n\n감사합니다.`;
    }
  }

  // send massage
  sendMessage() {
    if (!this.availableTime) {
      toast.error('상담시간대를 입력해주세요!');
      return;
    }
    if (
      this.selectedTemplateType === MESSAGE_TEMPLATE_TYPE.ONLINE_MEETING &&
      !this.consultResponseV3SendMessageDto.googleMeetUrl
    ) {
      toast.error('구글 미트 주소를 입력해주세요!');
      return;
    }
    this.consultResponseV3SendMessageDto.message = this.messageTemplate;
    ConsultResponseV3Service.sendMessage(
      this.consultResponseV3Dto.id,
      this.consultResponseV3SendMessageDto,
    ).subscribe(res => {
      if (res) {
        this.consultResponseV3SendMessageDto = new ConsultResponseV3SendMessageDto();
        toast.success('문자가 발송 되었습니다.');
        this.findOne(this.$route.params.id);
        this.$bvModal.hide('send_message');
      } else {
        return;
      }
    });
  }

  createBaeminReport() {
    this.baeminReportCreateDto.averageScore =
      Math.round(this.baeminReportCreateDto.averageScore * 100) / 100;
    ConsultResponseV3Service.postBaeminReport(
      this.$route.params.id,
      this.baeminReportCreateDto,
    ).subscribe(res => {
      if (res) {
        toast.success('입력완료');
        this.findOne(this.$route.params.id);
      }
    });
  }

  updateBaeminReport() {
    this.baeminReportUpdateDto.averageScore =
      Math.round(this.baeminReportUpdateDto.averageScore * 100) / 100;
    ConsultResponseV3Service.updateBaeminReport(
      this.consultResponseV3Dto.consultBaeminReport.id,
      this.baeminReportUpdateDto,
    ).subscribe(res => {
      if (res) {
        toast.success('수정완료');
        this.findOne(this.$route.params.id);
      }
    });
  }

  setAddress(res) {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const callback = (results, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        // console.log('h_code', results[0].address.h_code);
        this.hdongCode = +results[0].address.h_code;
        this.baeminReportCreateDto.hdongCode = +results[0].address.h_code;
        this.baeminReportUpdateDto.hdongCode = +results[0].address.h_code;
        console.log('results', results[0].address);
        if (this.hdongCode) {
          this.codeHdongAddress = `${results[0].address.region_1depth_name} ${results[0].address.region_2depth_name} ${results[0].address.region_3depth_h_name}`;
        }
      }
    };
    geocoder.addressSearch(res.address, callback);
    this.$bvModal.hide('postcode');
  }

  getHdong(code: string) {
    CodeHdongService.getHdongCode(code).subscribe(res => {
      if (res) {
        this.codeHdongDto = res.data;
        if (this.codeHdongDto) {
          this.codeHdongAddress = `${this.codeHdongDto.sidoName} ${this.codeHdongDto.guName} ${this.codeHdongDto.hdongName}`;
        }
      }
    });
  }

  showAddressModal() {
    this.$bvModal.show('postcode');
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
