<template>
  <section>
    <SectionTitle title="창업 설명회" divider>
      <template v-slot:rightArea>
        <router-link to="/presentation-event" class="btn btn-secondary"
          >목록으로</router-link
        >
      </template>
    </SectionTitle>
    <b-row>
      <b-col cols="4">
        <b-card no-body>
          <b-tabs card fill>
            <b-tab title="PC 이미지" active>
              <template v-if="!imageChanged">
                <b-img-lazy
                  :src="presentationEventDto.image[0].endpoint"
                  v-if="
                    presentationEventDto.image &&
                      presentationEventDto.image.length > 0
                  "
                />
                <b-img-lazy
                  :src="
                    require('@/assets/images/general/common/img_placeholder.jpg')
                  "
                  v-else
                ></b-img-lazy>
              </template>
              <template
                v-if="
                  newAttachments && newAttachments.length > 0 && imageChanged
                "
              >
                <b-img-lazy
                  :src="attachment.endpoint"
                  v-for="attachment in newAttachments"
                  :key="attachment.endpoint"
                />
                <div class="text-center mt-2">
                  <b-button variant="danger" @click="removeImage()"
                    >이미지 제거</b-button
                  >
                </div>
              </template>

              <div class="mt-2">
                <b-form-file
                  placeholder="파일 첨부"
                  ref="fileInput"
                  @input="uploadMainImage($event)"
                ></b-form-file>
              </div>
            </b-tab>
            <b-tab title="모바일 이미지">
              <template v-if="!mobieImageChanged">
                <b-img-lazy
                  :src="presentationEventDto.mobileImage[0].endpoint"
                  v-if="
                    presentationEventDto.mobileImage &&
                      presentationEventDto.mobileImage.length > 0
                  "
                />
                <b-img-lazy
                  :src="
                    require('@/assets/images/general/common/img_placeholder.jpg')
                  "
                  v-else
                ></b-img-lazy>
              </template>
              <template
                v-if="
                  newMobileAttachments &&
                    newMobileAttachments.length > 0 &&
                    mobieImageChanged
                "
              >
                <b-img-lazy
                  :src="attachment.endpoint"
                  v-for="attachment in newMobileAttachments"
                  :key="attachment.endpoint"
                />
                <div class="text-center mt-2">
                  <b-button variant="danger" @click="removeMobileImage()"
                    >이미지 제거</b-button
                  >
                </div>
              </template>
              <div class="mt-2">
                <b-form-file
                  placeholder="파일 첨부"
                  ref="fileInputMobile"
                  @input="uploadMobileImage($event)"
                ></b-form-file>
              </div>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
      <b-col cols="8">
        <b-form-row>
          <b-col cols="6" class="mb-3">
            <label for="event_type">창업 설명회 유형</label>
            <b-form-select
              id="event_type"
              v-model="presentationEventDto.displayType"
            >
              <b-form-select-option
                v-for="type in displayTypeSelect"
                :key="type.code"
                :value="type.key"
                >{{ type.value }}</b-form-select-option
              >
            </b-form-select>
          </b-col>
          <b-col cols="6" class="mb-3">
            <label for="event_type">이벤트 타입</label>
            <b-form-select
              id="event_type"
              v-model="presentationEventDto.eventType"
            >
              <b-form-select-option
                v-for="type in eventTypeSelect"
                :key="type.code"
                :value="type.key"
                >{{ type.value }}</b-form-select-option
              >
            </b-form-select>
          </b-col>
          <b-col cols="12" class="mb-3">
            <label for="">제목</label>
            <b-form-input v-model="presentationEventDto.title"></b-form-input>
          </b-col>
          <b-col cols="12" class="mb-3">
            <label for="">설명글</label>
            <b-form-textarea
              rows="3"
              max-rows="6"
              v-model="presentationEventDto.desc"
            ></b-form-textarea>
          </b-col>
          <template v-if="presentationEventDto.displayType !== 'ONLINE'">
            <b-col cols="12" class="mb-3">
              <label for="ended">설명회 날짜</label>
              <b-form-datepicker
                id="started"
                v-model="presentationEventDto.presentationDate"
              ></b-form-datepicker>
            </b-col>
            <b-col cols="12" class="mb-3">
              <label for="">설명회 시간</label>
              <b-form-checkbox-group v-model="presentationEventDto.schedule">
                <b-form-checkbox
                  v-for="(time, index) in scheduleList"
                  :key="index"
                  :value="time"
                  >{{ time }}</b-form-checkbox
                >
              </b-form-checkbox-group>
            </b-col>
          </template>
          <template v-else>
            <b-col cols="6" class="mb-3">
              <label for="zoom_id">ZOOM ID</label>
              <b-form-input
                id="zoom_id"
                v-model="presentationEventDto.zoomId"
              ></b-form-input>
            </b-col>
            <b-col cols="6" class="mb-3">
              <label for="zoom_id">ZOOM PASSWORD</label>
              <b-form-input
                id="zoom_password"
                v-model="presentationEventDto.zoomPassword"
              ></b-form-input>
            </b-col>
            <b-col cols="12" class="mb-3">
              <label for="zoom_link">ZOOM URL</label>
              <b-row no-gutters align-v="center" style="flex-wrap:nowrap">
                <b-form-input
                  id="zoom_link"
                  v-model="presentationEventDto.zoomLink"
                ></b-form-input>
                <a
                  :href="presentationEventDto.zoomLink"
                  target="_blank"
                  class="btn btn-lg  btn-info text-nowrap ml-2"
                  >링크 확인</a
                >
              </b-row>
            </b-col>
          </template>
          <b-col cols="6" class="mb-3">
            <label for="button_desc">버튼 이름</label>
            <b-form-input
              id="button_desc"
              v-model="presentationEventDto.buttonDesc"
            ></b-form-input>
          </b-col>
          <b-col cols="6" class="mb-3">
            <label for="contact_phone">문의 연락처</label>
            <b-form-input
              v-model="presentationEventDto.contactPhone"
            ></b-form-input>
          </b-col>
          <b-col cols="12" class="mb-3">
            <label for="">설명회 피드백</label>
            <b-form-textarea
              rows="3"
              max-rows="6"
              v-model="presentationEventDto.posteventDesc"
            ></b-form-textarea>
          </b-col>
        </b-form-row>
      </b-col>
    </b-row>
    <div class="text-right">
      <router-link to="/presentation-event" class="btn btn-secondary"
        >목록으로</router-link
      >
      <b-button variant="danger" v-b-modal.delete_event>
        삭제하기
      </b-button>
      <b-button variant="primary" @click="updateEvent()">
        수정하기
      </b-button>
    </div>
    <div class="divider my-4"></div>
    <div class="title mb-4" id="attendeesList">
      <h4>설명회 참석자</h4>
    </div>
    <div class="table-top">
      <div class="total-count">
        <h5>
          <span>TOTAL</span>
          <strong class="text-primary">{{ attendeesTotalCount }}</strong>
        </h5>
        <b-form-select
          v-model="newLimit"
          size="sm"
          class="select-limit ml-3"
          @change="findAll()"
          v-if="attendeesTotalCount"
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
        <download-excel
          class="btn btn-outline-success"
          :data="attendeesList"
          :fields="fields"
          :stringifyLongNum="true"
          worksheet="창업 설명회 참석자 리스트"
          :name="`창업_설명회_참석자_리스트_${newDate}.xls`"
          v-if="attendeesTotalCount"
        >
          <b-icon icon="file-earmark-arrow-down"></b-icon>
          엑셀 다운로드
        </download-excel>
        <b-button
          variant="primary"
          v-b-modal.add_attendee
          @click="clearOutCreateDto()"
          >참석자 정보 추가</b-button
        >
      </div>
    </div>
    <template v-if="!dataLoading">
      <div class="mt-4 bg-white table-responsive">
        <table
          class="table table-hover table-sm table-nowrap"
          v-if="attendeesTotalCount"
        >
          <thead>
            <tr>
              <th scope="col">NO</th>
              <th scope="col">이름</th>
              <th scope="col">연락처</th>
              <th scope="col">성별</th>
              <th scope="col">계약 여부</th>
              <th scope="col">이전 참석 여부</th>
              <th scope="col">참석 시간대</th>
              <th scope="col">신청일</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="attendee in attendeesList" :key="attendee.no">
              <th scope="row">
                {{ attendee.no }}
              </th>
              <td>
                {{ attendee.name }}
                <span class="text-danger" v-if="attendee.isNanudaUser !== 'Y'"
                  >(비회원)</span
                >
              </td>
              <td>
                {{ attendee.phone | phoneTransformer }}
              </td>
              <td>
                {{ attendee.gender | enumTransformer }}
              </td>
              <td>
                <b-badge
                  :variant="
                    attendee.isContracted === 'Y' ? 'success' : 'danger'
                  "
                  >{{ attendee.isContracted }}</b-badge
                >
              </td>
              <td>
                <b-badge
                  :variant="attendee.isAttended === 'Y' ? 'success' : 'danger'"
                  >{{ attendee.isAttended }}</b-badge
                >
              </td>
              <td>
                {{ attendee.scheduleTime }}
              </td>
              <td>{{ attendee.createdAt | dateTransformer }}</td>
              <td>
                <b-button
                  variant="secondary"
                  v-b-modal.update_attendee
                  @click="findAttendee(attendee.no)"
                  >수정</b-button
                >
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="empty-data border">검색결과가 없습니다.</div>
      </div>
      <b-pagination
        v-model="paginationAttendees.page"
        v-if="attendeesTotalCount"
        pills
        :total-rows="attendeesTotalCount"
        :per-page="paginationAttendees.limit"
        @input="paginateSearch()"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </template>
    <template v-else>
      <div class="loading-spinner">
        <div class="half-circle-spinner">
          <div class="circle circle-1"></div>
          <div class="circle circle-2"></div>
        </div>
      </div>
    </template>
    <!-- 삭제 모달 -->
    <b-modal
      id="delete_event"
      title="창업 설명회 삭제"
      header-bg-variant="danger"
      header-text-variant="light"
      hide-footer
    >
      <div class="text-center">
        <p>
          <b>정말로 삭제하시겠습니까?</b>
        </p>
        <div class="mt-2 text-right">
          <b-button variant="danger" @click="deleteOne()">삭제</b-button>
        </div>
      </div>
    </b-modal>
    <b-modal
      id="add_attendee"
      title="참석자 정보 추가"
      @ok="createAttendee()"
      @cancel="clearOutCreateDto()"
      ok-title="추가"
      cancel-title="취소"
    >
      <div class="form-row">
        <div class="col-12 mb-3">
          <label for="attendee_gender">이름</label>
          <b-form-input v-model="attendeesCreateDto.name"></b-form-input>
        </div>
        <div class="col-12 mb-3">
          <label for="attendee_gender">연락처</label>
          <b-form-input v-model="attendeesCreateDto.phone"></b-form-input>
        </div>
        <div class="col-12 mb-3">
          <label for="attendee_gender">성별</label>
          <select
            class="custom-select"
            id="attendee_gender"
            v-model="attendeesCreateDto.gender"
          >
            <option
              v-for="gender in genderSelect"
              :key="gender.key"
              :value="gender.key"
              >{{ gender.value }}</option
            >
          </select>
        </div>
        <div class="col-12 mb-3">
          <label for="attendee_attend">참석 여부</label>
          <select
            class="custom-select"
            id="attendee_attend"
            v-model="attendeesCreateDto.isAttended"
          >
            <option v-for="yn in ynSelect" :key="yn" :value="yn">{{
              yn | enumTransformer
            }}</option>
          </select>
        </div>
        <div class="col-12 mb-3">
          <label for="attendee_attend">계약 여부</label>
          <select
            class="custom-select"
            id="attendee_attend"
            v-model="attendeesCreateDto.isContracted"
          >
            <option v-for="yn in ynSelect" :key="yn" :value="yn">{{
              yn | enumTransformer
            }}</option>
          </select>
        </div>
        <div class="col-12 mb-3">
          <label for="attendee_attend">참석 시간대</label>
          <select
            class="custom-select"
            id="attendee_attend"
            v-model="attendeesCreateDto.scheduleTime"
          >
            <option
              v-for="(time, index) in scheduleList"
              :key="index"
              :value="time"
              >{{ time }}</option
            >
          </select>
        </div>
      </div>
    </b-modal>
    <!-- update attendee modal -->
    <b-modal
      id="update_attendee"
      title="참석자 정보 수정"
      @ok="updateAttendee(attendeesDto.no)"
      ok-title="수정"
      cancel-title="취소"
    >
      <div class="form-row">
        <div class="col-12 mb-3">
          <label for="attendee_gender">성별</label>
          <select
            class="custom-select"
            id="attendee_gender"
            v-model="attendeesDto.gender"
          >
            <option
              v-for="gender in genderSelect"
              :key="gender.key"
              :value="gender.key"
              >{{ gender.value }}</option
            >
          </select>
        </div>
        <div class="col-12 mb-3">
          <label for="attendee_attend">참석 여부</label>
          <select
            class="custom-select"
            id="attendee_attend"
            v-model="attendeesDto.isAttended"
          >
            <option v-for="yn in ynSelect" :key="yn" :value="yn">{{
              yn | enumTransformer
            }}</option>
          </select>
        </div>
        <div class="col-12 mb-3">
          <label for="attendee_attend">계약 여부</label>
          <select
            class="custom-select"
            id="attendee_attend"
            v-model="attendeesDto.isContracted"
          >
            <option v-for="yn in ynSelect" :key="yn" :value="yn">{{
              yn | enumTransformer
            }}</option>
          </select>
        </div>
      </div>
    </b-modal>
  </section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import { AttendeesDto, AttendeesListDto, PresentationEventDto } from '@/dto';
import { CodeManagementDto } from '@/services/init/dto/index.js';
import CodeManagementService from '../../../services/code-management.service';
import PresentationEventService from '@/services/presentation-event.service';
import AttendeesService from '@/services/attendees.service';
import FileUploadService, {
  UPLOAD_TYPE,
} from '@/services/shared/file-upload/file-upload.service';
import {
  ATTACHMENT_REASON_TYPE,
  FileAttachmentDto,
} from '@/services/shared/file-upload';

import toast from '../../../../resources/assets/js/services/toast.js';
import router from '@/router';
import { CONST_YN, Pagination, YN } from '@/common';
import { CONST_PAGINATION_COUNT, PaginationCount } from '@/services/shared';
import { ReverseQueryParamMapper, RouterQueryParamMapper } from '@/core';

@Component({
  name: 'PresentationEventDetail',
})
export default class PresentationEventDetail extends BaseComponent {
  private attendeesList: AttendeesDto[] = [];
  private attendeesTotalCount = null;
  private attendeesSearchDto = new AttendeesListDto();
  private attendeesCreateDto = new AttendeesDto();
  private attendeesDto = new AttendeesDto();
  private paginationAttendees = new Pagination();

  private presentationEventDto = new PresentationEventDto();
  private newAttachments: FileAttachmentDto[] = [];
  private newMobileAttachments: FileAttachmentDto[] = [];
  private eventTypeSelect: CodeManagementDto[] = [];
  private displayTypeSelect: CodeManagementDto[] = [];
  private genderSelect: CodeManagementDto[] = [];
  private scheduleList = ['11시 오전', '2시 오후'];
  private onlineScheduleList = [
    '25일(월)',
    '26일(화)',
    '27일(수)',
    '28일(목)',
    '29일(금)',
  ];
  private imageChanged = false;
  private mobieImageChanged = false;
  private ynSelect: YN[] = [...CONST_YN];
  private dataLoading = false;
  private newDate = new Date();
  private newLimit = null;
  private paginationCount: PaginationCount[] = [...CONST_PAGINATION_COUNT];
  // excel options
  private fields = {
    회원여부: 'isNanudaUser',
    이름: 'name',
    연락처: 'phone',
    성별: 'genderInfo.value',
    계약여부: 'isContracted',
    이전참석여부: 'isAttended',
    참석시간대: 'scheduleTime',
  };
  private json_meta = [
    [
      {
        key: 'charset',
        value: 'utf-8',
      },
    ],
  ];

  getCommonCodes() {
    CodeManagementService.findAnyCode('PRESENTATION_EVENT_TYPE').subscribe(
      res => {
        this.eventTypeSelect = res.data;
      },
    );

    CodeManagementService.findAnyCode('PRESENTATION_DISPLAY_TYPE').subscribe(
      res => {
        this.displayTypeSelect = res.data;
      },
    );
  }

  findOne(id) {
    PresentationEventService.findOne(this.$route.params.id).subscribe(res => {
      if (res) {
        this.presentationEventDto = res.data;
      }
    });
  }

  paginateSearch() {
    this.findAll(true);
  }

  findAll(isPagination?: boolean, isSearch?: boolean) {
    this.dataLoading = true;
    this.paginationAttendees.limit = this.newLimit;
    this.attendeesSearchDto.eventNo = parseInt(this.$route.params.id);
    if (!isPagination) {
      this.paginationAttendees.page = 1;
    } else {
      if (isSearch) this.paginationAttendees.page = 1;
      RouterQueryParamMapper(this.attendeesSearchDto, this.paginationAttendees);
    }
    AttendeesService.findAll(
      this.attendeesSearchDto,
      this.paginationAttendees,
    ).subscribe(res => {
      if (res) {
        this.dataLoading = false;
        this.attendeesList = res.data.items;
        this.attendeesTotalCount = res.data.totalCount;
      }
    });
  }

  findAttendee(attendeeNo) {
    AttendeesService.findOne(attendeeNo).subscribe(res => {
      this.attendeesDto = res.data;
    });
  }

  createAttendee() {
    this.attendeesCreateDto.eventNo = parseInt(this.$route.params.id);
    AttendeesService.create(this.attendeesCreateDto).subscribe(res => {
      if (res) {
        toast.success('추가 완료');
        this.findAll();
      }
    });
  }

  clearOutCreateDto() {
    this.attendeesCreateDto = new AttendeesDto();
  }

  updateAttendee(attendeeNo) {
    AttendeesService.update(attendeeNo, this.attendeesDto).subscribe(res => {
      if (res) {
        toast.success('수정 완료');
        this.findOne(this.$route.params.id);
      }
    });
  }

  deleteOne() {
    PresentationEventService.deleteForAdmin(this.$route.params.id).subscribe(
      res => {
        if (res) {
          toast.success('삭제 완료');
          this.$router.push('/presentation-event');
        }
      },
    );
  }

  // 이미지 업로드
  async uploadMainImage(file: File) {
    if (file) {
      const attachments = await FileUploadService.upload(
        UPLOAD_TYPE.PRESENTATION_EVENT,
        [file],
      );
      this.newAttachments = [];
      this.newAttachments.push(
        ...attachments.filter(
          fileUpload =>
            fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
        ),
      );
      this.imageChanged = true;
    }
  }

  removeImage() {
    this.newAttachments = [];
    this.$refs['fileInput'].reset();
    this.imageChanged = false;
  }

  async uploadMobileImage(file: File) {
    if (file) {
      const attachments = await FileUploadService.upload(
        UPLOAD_TYPE.PRESENTATION_EVENT,
        [file],
      );
      this.newMobileAttachments = [];
      this.newMobileAttachments.push(
        ...attachments.filter(
          fileUpload =>
            fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
        ),
      );
      this.mobieImageChanged = true;
    }
  }

  removeMobileImage() {
    this.newMobileAttachments = [];
    this.$refs['fileInputMobile'].reset();
    this.mobieImageChanged = false;
  }

  updateEvent() {
    if (this.newAttachments.length > 0) {
      this.presentationEventDto.image = this.newAttachments;
    } else {
      delete this.presentationEventDto.image;
    }

    if (this.newMobileAttachments.length > 0) {
      this.presentationEventDto.mobileImage = this.newMobileAttachments;
    } else {
      delete this.presentationEventDto.mobileImage;
    }

    PresentationEventService.update(
      this.presentationEventDto.no,
      this.presentationEventDto,
    ).subscribe(res => {
      if (res) {
        toast.success('수정 완료');
        this.findOne(this.presentationEventDto.no);
      }
    });
  }

  // 성별
  getGender() {
    CodeManagementService.findGender().subscribe(res => {
      this.genderSelect = res.data;
    });
  }

  created() {
    this.findOne(this.$route.params.id);
    this.newLimit = PaginationCount.TWENTY;
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.attendeesSearchDto = query;
      if (!isNaN(+query.limit) && !isNaN(+query.page)) {
        this.paginationAttendees.limit = +query.limit;
        this.paginationAttendees.page = +query.page;
      } else {
        this.paginationAttendees = new Pagination();
      }
      this.paginateSearch();
    } else {
      this.findAll();
    }
    this.getCommonCodes();
    this.getGender();
  }
}
</script>
