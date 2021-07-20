<template>
  <section>
    <SectionTitle title="상담 신청 V3" divider>
      <template v-slot:rightArea>
        <b-button
          variant="outline-info"
          @click="$router.push('/pickcook/consult-response')"
          >상담신청 V1</b-button
        >
        <b-button
          variant="outline-info"
          @click="$router.push('/pickcook/consult-response-v2')"
          >상담신청 V2</b-button
        >
      </template>
    </SectionTitle>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col cols="12" sm="6" md="3" class="mb-3">
          <label>사용자명</label>
          <input
            type="text"
            class="form-control"
            v-model="consultResponseV3SearchDto.name"
          />
        </b-col>
        <b-col cols="12" sm="6" md="3" class="mb-3">
          <label>휴대폰 번호</label>
          <input
            type="text"
            class="form-control"
            v-model="consultResponseV3SearchDto.phone"
          />
        </b-col>
        <b-col cols="12" sm="6" md="3">
          <b-form-group label="창업자 유형">
            <b-form-select
              id="space_type"
              v-model="consultResponseV3SearchDto.fnbOwnerStatus"
            >
              <b-form-select-option value>전체</b-form-select-option>
              <b-form-select-option
                v-for="status in fnbOwnerStatus"
                :key="status.key"
                :value="status.value"
                >{{ status.comment }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6" md="3">
          <b-form-group label="신청 상태">
            <b-form-select
              id="space_type"
              v-model="consultResponseV3SearchDto.consultStatus"
            >
              <b-form-select-option value>전체</b-form-select-option>
              <b-form-select-option
                v-for="status in consultStatus"
                :key="status.key"
                :value="status.value"
                >{{ status.comment }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <!-- <b-col cols="12" sm="6" md="3">
          <b-form-group label="미팅 취소사유">
            <b-form-select v-model="consultResponseV2SerchDto.deleteReason">
              <b-form-select-option value>전체</b-form-select-option>
              <b-form-select-option
                v-for="reason in reservationDeleteReasons"
                :key="reason"
                :value="reason"
                >{{ reason }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col> -->
      </b-form-row>
      <b-row align-h="center">
        <div>
          <b-button variant="secondary" @click="clearOut()">초기화</b-button>
          <b-button variant="primary" @click="search()">검색</b-button>
        </div>
      </b-row>
    </div>
    <div class="table-top">
      <div class="total-count">
        <h5>
          <span>TOTAL</span>
          <strong class="text-primary">{{ consultResponseTotalCount }}</strong>
        </h5>
        <b-form-select
          v-model="newLimit"
          size="sm"
          class="select-limit ml-3"
          @change="search()"
          v-if="consultResponseTotalCount"
        >
          <b-form-select-option
            v-for="count in paginationCount"
            :key="count"
            :value="count"
            >{{ count }}개</b-form-select-option
          >
        </b-form-select>
      </div>
      <div>
        <!-- <b-button
          variant="primary"
          v-b-modal.update_product_consult_status_nos
          v-if="selectedProductConsultNos.length > 0"
          @click="getProductConsultCodes()"
          >신청 상태 수정</b-button
        > -->
        <b-button
          variant="info"
          v-if="!isShowCalendar"
          @click="isShowCalendar = true"
        >
          <b-icon icon="calendar-date"></b-icon>
          <span class="ml-2">캘린더</span>
        </b-button>
        <b-button variant="info" v-else @click="isShowCalendar = false">
          <b-icon icon="list-ul"></b-icon>
          <span class="ml-2">리스트</span>
        </b-button>
        <download-excel
          class="btn btn-outline-success"
          :data="consultResponseV3List"
          :fields="fields"
          :stringifyLongNum="true"
          worksheet="픽쿡 상담 리스트"
          :name="`pickcook_consult_${newDate}.xls`"
          v-if="consultResponseTotalCount"
        >
          <b-icon icon="file-earmark-arrow-down"></b-icon>
          엑셀 다운로드
        </download-excel>
        <b-button
          variant="primary"
          v-b-modal.add_consult
          @click="createProforma()"
          >상담신청 추가</b-button
        >
      </div>
    </div>
    <template v-if="!dataLoading">
      <div v-if="isShowCalendar">
        <b-row class="flex-row-reverse">
          <b-col cols="12" xl="2">
            <b-card title="상담현황 요약" class="my-2">
              <b-alert variant="info" show class="text-center">
                <template show v-if="consultBetweenDatesRequestDto.startDate">
                  <p>
                    <span class="mr-2">기간</span>
                    {{ consultBetweenDatesRequestDto.startDate }} ~
                    {{ correctedEndDate }}
                  </p>
                </template>
                <template v-else>
                  <p>달력에서 날짜를 선택해주세요 <br />(드래그 가능)</p>
                </template>
              </b-alert>
              <h4 class="m-2 text-right">
                TOTAL
                <strong class="text-blue">{{
                  consultResponseV3BetweenDates.length
                }}</strong
                >건
              </h4>
              <b-list-group class="my-2">
                <b-list-group-item
                  variant="warning"
                  class="d-flex justify-content-between align-items-center"
                >
                  <h5>상담</h5>
                  <div>
                    {{
                      newConsultCount +
                        callLaterCount +
                        cannotContactCount +
                        consultCompleteCount +
                        consultDropCount
                    }}건 ({{
                      Math.round(
                        ((newConsultCount +
                          callLaterCount +
                          cannotContactCount +
                          consultCompleteCount +
                          consultDropCount) /
                          consultResponseV3BetweenDates.length) *
                          10000,
                      ) / 100 || 0
                    }}%)
                  </div>
                </b-list-group-item>
                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                  >상담예정
                  <div>
                    {{ newConsultCount }}건 ({{
                      Math.round(
                        (newConsultCount /
                          consultResponseV3BetweenDates.length) *
                          10000,
                      ) / 100 || 0
                    }}%)
                  </div>
                </b-list-group-item>
                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                >
                  재통화요청
                  <div>
                    {{ callLaterCount }}건 ({{
                      Math.round(
                        (callLaterCount /
                          consultResponseV3BetweenDates.length) *
                          10000,
                      ) / 100 || 0
                    }}%)
                  </div>
                </b-list-group-item>
                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                >
                  연락실패
                  <div>
                    {{ cannotContactCount }}건 ({{
                      Math.round(
                        (cannotContactCount /
                          consultResponseV3BetweenDates.length) *
                          10000,
                      ) / 100 || 0
                    }}%)
                  </div>
                </b-list-group-item>
                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                >
                  드랍
                  <div>
                    {{ consultDropCount }}건 ({{
                      Math.round(
                        (consultDropCount /
                          consultResponseV3BetweenDates.length) *
                          10000,
                      ) / 100 || 0
                    }}%)
                  </div>
                </b-list-group-item>
                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                >
                  상담완료
                  <div>
                    {{ consultCompleteCount }}건 ({{
                      Math.round(
                        (consultCompleteCount /
                          consultResponseV3BetweenDates.length) *
                          10000,
                      ) / 100 || 0
                    }}%)
                  </div>
                </b-list-group-item>
              </b-list-group>
              <b-list-group class="my-2">
                <b-list-group-item
                  variant="primary"
                  class="d-flex justify-content-between align-items-center"
                >
                  <h5>미팅</h5>
                  <div>
                    {{
                      willMeetCount +
                        meetingCompleteCount +
                        noShowCount +
                        meetingSecondCount
                    }}건 {{ willMeetCount }}건 ({{
                      Math.round(
                        (willMeetCount +
                          meetingCompleteCount +
                          noShowCount +
                          meetingSecondCount /
                            consultResponseV3BetweenDates.length) *
                          10000,
                      ) / 100 || 0
                    }}%)
                  </div>
                </b-list-group-item>
                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                >
                  미팅예정
                  <div>
                    {{ willMeetCount }}건 ({{
                      Math.round(
                        (willMeetCount / consultResponseV3BetweenDates.length) *
                          10000,
                      ) / 100 || 0
                    }}%)
                  </div>
                </b-list-group-item>
                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                >
                  미팅완료
                  <div>
                    {{ meetingCompleteCount }}건 ({{
                      Math.round(
                        (meetingCompleteCount /
                          consultResponseV3BetweenDates.length) *
                          10000,
                      ) / 100 || 0
                    }}%)
                  </div>
                </b-list-group-item>
                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                >
                  노쇼
                  <div>
                    {{ noShowCount }}건 ({{
                      Math.round(
                        (noShowCount / consultResponseV3BetweenDates.length) *
                          10000,
                      ) / 100 || 0
                    }}%)
                  </div>
                </b-list-group-item>
                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                >
                  2차미팅
                  <div>
                    {{ meetingSecondCount }}건 ({{
                      Math.round(
                        (meetingSecondCount /
                          consultResponseV3BetweenDates.length) *
                          10000,
                      ) / 100 || 0
                    }}%)
                  </div>
                </b-list-group-item>
              </b-list-group>
              <b-list-group class="my-2">
                <b-list-group-item
                  variant="success"
                  class="d-flex justify-content-between align-items-center"
                >
                  <h5>계약</h5>
                  <div>
                    {{ contractInProgCount + consultContractedCount }}건 ({{
                      Math.round(
                        ((contractInProgCount + consultContractedCount) /
                          consultResponseV3BetweenDates.length) *
                          10000,
                      ) / 100 || 0
                    }}%)
                  </div>
                </b-list-group-item>
                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                >
                  계약예정
                  <div>
                    {{ contractInProgCount }}건 ({{
                      Math.round(
                        (contractInProgCount /
                          consultResponseV3BetweenDates.length) *
                          10000,
                      ) / 100 || 0
                    }}%)
                  </div>
                </b-list-group-item>
                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                >
                  계약완료
                  <div>
                    {{ consultContractedCount }}건 ({{
                      Math.round(
                        (consultContractedCount /
                          consultResponseV3BetweenDates.length) *
                          10000,
                      ) / 100 || 0
                    }}%)
                  </div>
                </b-list-group-item>
              </b-list-group>
            </b-card>
          </b-col>
          <b-col cols="12" xl="10">
            <b-card class="my-2">
              <FullCalendar :options="calendarOptions" ref="fullCalendar" />
            </b-card>
          </b-col>
        </b-row>
      </div>
      <div class="bg-white table-responsive" v-else>
        <table
          class="table table-hover table-sm text-center table-nowrap"
          v-if="consultResponseTotalCount"
        >
          <colgroup>
            <col width="60" />
            <col width="200" />
            <col width="200" />
            <col width="auto" />
            <col width="200" />
            <col width="200" />
            <col width="200" />
          </colgroup>
          <thead>
            <tr>
              <th
                scope="col"
                v-bind:class="{ highlighted: consultResponseV3SearchDto.id }"
              >
                ID
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: consultResponseV3SearchDto.fnbOwnerStatus,
                }"
              >
                유형
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: consultResponseV3SearchDto.name,
                }"
              >
                사용자명
              </th>
              <!-- <th scope="col">
                나이
              </th> -->
              <th
                scope="col"
                v-bind:class="{ highlighted: consultResponseV3SearchDto.phone }"
              >
                휴대폰 번호
              </th>
              <th scope="col">
                미팅날짜
              </th>
              <th scope="col">
                담당자
              </th>
              <th scope="col">
                신청상태
              </th>
              <th scope="col">신청일</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="consult in consultResponseV3List"
              :key="consult.id"
              @click="
                $router.push(`/pickcook/consult-response-v3/${consult.id}`)
              "
              style="cursor:pointer;"
            >
              <th scope="row">
                {{ consult.id }}
              </th>
              <td>
                <template
                  v-if="
                    consult.proformaConsultResult &&
                      consult.proformaConsultResult.fnbOwnerStatus
                  "
                >
                  {{
                    consult.proformaConsultResult.fnbOwnerStatus
                      | enumTransformer
                  }}
                </template>
              </td>
              <td>{{ consult.name }}</td>
              <!-- <td>
                <template v-if="consult.ageGroupCodeStatus">
                  {{ consult.ageGroupCodeStatus.displayName }}
                </template>
              </td> -->
              <td>{{ consult.phone | phoneTransformer }}</td>
              <td>{{ consult.meetingDate }} {{ consult.meetingTime }}</td>

              <td>
                <template v-if="consult.admin">
                  {{ consult.admin.name }}
                </template>
              </td>
              <td>
                <template v-if="consult.consultCodeStatus">
                  <b-badge
                    :variant="getStatusColor(consult.consultCodeStatus.value)"
                    class="badge-pill p-2 mr-2"
                    >{{ consult.consultCodeStatus.comment }}</b-badge
                  >
                </template>
              </td>
              <td>{{ consult.created | dateTransformer }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else class="empty-data border">검색결과가 없습니다.</div>
      </div>
      <b-pagination
        v-model="pagination.page"
        v-if="consultResponseTotalCount && !isShowCalendar"
        pills
        :total-rows="consultResponseTotalCount"
        :per-page="pagination.limit"
        @input="paginateSearch()"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </template>
    <template v-else>
      <div class="half-circle-spinner py-4">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
      </div>
    </template>
    <!-- 상담신청 추가 모달 -->
    <b-modal id="add_consult" title="상담신청 추가" @ok="createConsult()">
      <b-form-row>
        <b-col cols="12">
          <b-form-group label="창업자 유형">
            <b-form-select v-model="consultResponseV3CreateDto.fnbOwnerStatus">
              <b-form-select-option
                v-for="status in fnbOwnerStatus"
                :key="status.key"
                :value="status.value"
                >{{ status.comment }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group label="이름">
            <b-form-input v-model="consultResponseV3CreateDto.name">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group label="휴대폰 번호">
            <b-form-input v-model="consultResponseV3CreateDto.phone">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="내용">
            <b-form-textarea v-model="consultResponseV3CreateDto.description">
            </b-form-textarea>
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-modal>
  </section>
</template>
<script lang="ts">
import { Pagination } from '@/common';
import FullCalendar, { CalendarOptions } from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  ClearOutQueryParamMapper,
  getStatusColor,
  ReverseQueryParamMapper,
  RouterQueryParamMapper,
} from '@/core';
import BaseComponent from '@/core/base.component';
import {
  ConsultResponseV3CreateDto,
  ConsultResponseV3Dto,
  ConsultResponseV3ListDto,
  ConsultMonthlyRequestDto,
  ProductConsultStatusUpdateDto,
  MeetingListDto,
  ConsultBetweenDatesRequestDto,
} from '@/dto';
import { PickcookCodeManagementDto } from '@/services/init/dto';
import {
  PaginationCount,
  CONST_PAGINATION_COUNT,
  RESERVATION_DELETE_REASON,
  CONST_RESERVATION_DELETE_REASON,
  BRAND_CONSULT,
  FNB_OWNER,
  CONST_FNB_OWNER,
} from '@/services/shared';
import { Component, Ref, Watch } from 'vue-property-decorator';
import CommonCodeService from '@/services/pickcook/common-code.service';
import ConsultResponseV3Service from '@/services/pickcook/consult-response-v3.service';
import axios from 'axios';
import toast from '../../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'ConsultResponseV3List',
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
})
export default class ConsultResponseV3List extends BaseComponent {
  private consultResponseV3List: ConsultResponseV3Dto[] = [];
  private consultResponseV3BetweenDates: ConsultResponseV3Dto[] = [];
  private consultResponseV3SearchDto = new ConsultResponseV3ListDto();
  private consultResponseV3CreateDto = new ConsultResponseV3CreateDto();
  private pagination = new Pagination();
  private consultResponseTotalCount = null;
  private newLimit = null;
  private paginationCount: PaginationCount[] = [...CONST_PAGINATION_COUNT];
  private searchPramsDto: any = {};
  private dataLoading = false;
  private fnbOwnerStatus: PickcookCodeManagementDto[] = [];
  private consultStatus: PickcookCodeManagementDto[] = [];
  private codeManagementDto = new PickcookCodeManagementDto();
  private paginationCode = new Pagination();

  private reservationDeleteReasons: RESERVATION_DELETE_REASON[] = [
    ...CONST_RESERVATION_DELETE_REASON,
  ];

  private selectedProductConsultNos: number[] = [];
  private consultStatusUpdateDto = new ProductConsultStatusUpdateDto();
  private newDate = new Date();
  private monthlyMeetings = new MeetingListDto();
  private consultBetweenDatesRequestDto = new ConsultBetweenDatesRequestDto();
  private isShowCalendar = false;
  private calendarApi = null;
  private calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin],
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'today',
    },
    buttonText: {
      today: '오늘',
      day: '일',
      week: '주',
      month: '월',
    },
    // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    // editable: true,
    height: 750,
    selectable: true,
    showNonCurrentDates: false,
    initialView: 'dayGridMonth',
    locale: 'ko',
    slotMinTime: '10:00:00',
    slotMaxTime: '19:00:00',
    slotDuration: '01:00:00',

    eventClick: this.pushToDetailPage,
    datesSet: this.onDatesSet,
    select: this.onSelect,
  };
  // excel options
  private fields = {
    ID: 'id',
    이름: 'name',
    // 나이: 'ageGroupCodeStatus.displayName',
    연락처: 'phone',
    // 미팅예약날짜: 'reservation.reservationDate',
    // 미팅예약시간: 'reservation.reservationTime',
    // 미팅취소사유: 'reservation.deleteReason',
    // 취소기타사유: 'reservation.deleteReasonEtc',
    미팅날짜: 'meetingDate',
    담당자: 'admin.name',
    신청상태: 'consultCodeStatus.comment',
    신청일: 'created',
  };
  private json_meta = [
    [
      {
        key: 'charset',
        value: 'utf-8',
      },
    ],
  ];

  private correctedEndDate: string = null;
  private BRAND_CONSULT = BRAND_CONSULT;

  get newConsultCount() {
    return this.consultResponseV3BetweenDates.filter(
      e => e.consultStatus == BRAND_CONSULT.NEW_CONSULT,
    ).length;
  }
  get callLaterCount() {
    return this.consultResponseV3BetweenDates.filter(
      e => e.consultStatus == BRAND_CONSULT.CONSULT_CALL_LATER,
    ).length;
  }

  get cannotContactCount() {
    return this.consultResponseV3BetweenDates.filter(
      e => e.consultStatus == BRAND_CONSULT.CONSULT_CANNOT_CONTACT,
    ).length;
  }
  get consultCompleteCount() {
    return this.consultResponseV3BetweenDates.filter(
      e => e.consultStatus == BRAND_CONSULT.CONSULT_COMPLETE,
    ).length;
  }
  get consultDropCount() {
    return this.consultResponseV3BetweenDates.filter(
      e => e.consultStatus == BRAND_CONSULT.CONSULT_DROPPED,
    ).length;
  }
  get willMeetCount() {
    return this.consultResponseV3BetweenDates.filter(
      e => e.consultStatus == BRAND_CONSULT.CONSULT_WILL_MEET,
    ).length;
  }
  get meetingCompleteCount() {
    return this.consultResponseV3BetweenDates.filter(
      e => e.consultStatus == BRAND_CONSULT.CONSULT_MEETING_COMPLETE,
    ).length;
  }
  get noShowCount() {
    return this.consultResponseV3BetweenDates.filter(
      e => e.consultStatus == BRAND_CONSULT.CONSULT_MEETING_NO_SHOW,
    ).length;
  }
  get meetingSecondCount() {
    return this.consultResponseV3BetweenDates.filter(
      e => e.consultStatus == BRAND_CONSULT.CONSULT_MEETING_SECOND,
    ).length;
  }
  get contractInProgCount() {
    return this.consultResponseV3BetweenDates.filter(
      e => e.consultStatus == BRAND_CONSULT.CONSULT_CONTRACT_IN_PROG,
    ).length;
  }
  get consultContractedCount() {
    return this.consultResponseV3BetweenDates.filter(
      e => e.consultStatus == BRAND_CONSULT.CONSULT_CONTRACTED,
    ).length;
  }

  // get status color
  getStatusColor(status: BRAND_CONSULT) {
    return getStatusColor(status);
  }

  getMeetings(date) {
    ConsultResponseV3Service.getMeetingsMonthly(date);
  }

  // get common codes
  getCommonCodes() {
    this.codeManagementDto.category = 'FNB_OWNER';
    CommonCodeService.findAll(
      this.codeManagementDto,
      this.paginationCode,
    ).subscribe(res => {
      this.fnbOwnerStatus = res.data.items;
    });

    this.codeManagementDto.category = 'BRAND_CONSULT';
    CommonCodeService.findAll(
      this.codeManagementDto,
      this.paginationCode,
    ).subscribe(res => {
      this.consultStatus = res.data.items;
    });
  }

  findAll(isPagination?: boolean, isSearch?: boolean) {
    this.dataLoading = true;
    this.pagination.limit = this.newLimit;
    if (!isPagination) {
      this.pagination.page = 1;
    } else {
      if (isSearch) this.pagination.page = 1;
      RouterQueryParamMapper(this.consultResponseV3SearchDto, this.pagination);
    }

    ConsultResponseV3Service.findAll(
      this.consultResponseV3SearchDto,
      this.pagination,
    ).subscribe(res => {
      if (res) {
        this.dataLoading = false;
        this.consultResponseV3List = res.data.items;
        this.consultResponseTotalCount = res.data.totalCount;
      }
    });
  }
  search() {
    this.findAll(true, true);
  }

  paginateSearch() {
    this.findAll(true);
  }
  pushToDetailPage(info) {
    const id = info.event._def.title.split('_')[0];
    this.$router.push(`/pickcook/consult-response-v3/${id}`);
  }
  clearOut() {
    if (location.search) {
      ClearOutQueryParamMapper();
    } else {
      this.consultResponseV3SearchDto = new ConsultResponseV3ListDto();
      this.findAll();
    }
  }

  createProforma() {
    axios.get('https://api.ipify.org?format=json').then(res => {
      this.consultResponseV3CreateDto.ipAddress = res.data.ip;
    });
  }

  createConsult() {
    ConsultResponseV3Service.create(this.consultResponseV3CreateDto).subscribe(
      res => {
        if (res) {
          toast.success('추가완료');
          this.clearOut();
        }
      },
    );
  }

  onDatesSet(date) {
    //처음 렌더될때, 캘린더 뷰가 변할때마다 해당년도와 달로 meeting 리스트를 가져와서 뿌림
    const consultMonthlyRequestDto = new ConsultMonthlyRequestDto();
    const year = date.start.getFullYear();
    const month = date.start.getMonth() + 1;
    consultMonthlyRequestDto.year = year;
    consultMonthlyRequestDto.month = month;
    ConsultResponseV3Service.getMeetingsMonthly(
      consultMonthlyRequestDto,
    ).subscribe(res => {
      this.calendarApi = (this.$refs['fullCalendar'] as any).getApi();
      if (res) {
        this.monthlyMeetings = res.data;
        this.calendarApi.getEvents().forEach(e => {
          e.remove();
        });
        res.data.forEach(e => {
          this.calendarApi.addEvent(e);
        });
      }
    });
  }

  onSelect(selectInfo) {
    this.consultBetweenDatesRequestDto.startDate = selectInfo.startStr;
    this.consultBetweenDatesRequestDto.endDate = selectInfo.endStr;
    const end = selectInfo.end;
    this.correctedEndDate = new Date(end - 100).toISOString().slice(0, 10);

    ConsultResponseV3Service.getConsultsBetween(
      this.consultBetweenDatesRequestDto,
    ).subscribe(res => {
      if (res) {
        this.consultResponseV3BetweenDates = res.data;
      }
    });
  }

  created() {
    this.newLimit = PaginationCount.TWENTY;
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.consultResponseV3SearchDto = query;
      this.pagination.page = +query.page;
      this.newLimit = +query.limit;
      this.paginateSearch();
    } else {
      this.findAll();
    }
    this.getCommonCodes();
  }
}
</script>
