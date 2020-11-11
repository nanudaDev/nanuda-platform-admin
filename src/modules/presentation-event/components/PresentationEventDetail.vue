<template>
  <section>
    <SectionTitle title="창업 설명회" divider>
      <template v-slot:rightArea>
        <router-link to="/presentation-event" class="btn btn-secondary"
          >목록으로</router-link
        >
        <b-button variant="primary" @click="updateEvent()">
          수정하기
        </b-button>
        <b-button variant="danger" v-b-modal.delete_event>
          삭제하기
        </b-button>
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
          <b-col cols="12" class="mb-3">
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
      <b-button variant="primary" @click="updateEvent()">
        수정하기
      </b-button>
    </div>
    <!-- TODO : 추후 API 로 불러와서 작업 -->
    <div v-if="presentationEventDto.signedUpAttendees.length > 0" class="mt-4">
      <div class="table-top">
        <div class="title">
          <h4>설명회 참석자</h4>
        </div>
      </div>
      <table class="table table-hover table-sm">
        <thead>
          <tr>
            <th scope="col">NO</th>
            <th scope="col">이름</th>
            <th scope="col">연락처</th>
            <th scope="col">성별</th>
            <th scope="col">계약 여부</th>
            <th scope="col">이전 참석 여부</th>
            <th scope="col">참석 시간대</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="attendee in presentationEventDto.signedUpAttendees"
            :key="attendee.no"
          >
            <td>
              {{ attendee.no }}
            </td>
            <td>
              {{ attendee.name }}
            </td>
            <td>
              {{ attendee.phone | phoneTransformer }}
            </td>
            <td>
              {{ attendee.gender | enumTransformer }}
            </td>
            <td>
              {{ attendee.isContracted }}
            </td>
            <td>
              {{ attendee.isAttended }}
            </td>
            <td>
              {{ attendee.scheduleTime }}
            </td>
            <td>
              <b-button
                variant="secondary"
                v-b-modal.update_attendee
                @click="findOneAttendee(attendee.no)"
                >수정</b-button
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
import { AttendeesDto, PresentationEventDto } from '@/dto';
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
import { CONST_YN, YN } from '@/common';

@Component({
  name: 'PresentationEventDetail',
})
export default class PresentationEventDetail extends BaseComponent {
  private attendeesDto = new AttendeesDto();
  private presentationEventDto = new PresentationEventDto();
  private newAttachments: FileAttachmentDto[] = [];
  private newMobileAttachments: FileAttachmentDto[] = [];
  private eventTypeSelect: CodeManagementDto[] = [];
  private genderSelect: CodeManagementDto[] = [];
  private scheduleList = ['11시 오전', '2시 오후'];
  private imageChanged = false;
  private mobieImageChanged = false;
  private ynSelect: YN[] = [...CONST_YN];

  getCommonCodes() {
    CodeManagementService.findAnyCode('PRESENTATION_EVENT_TYPE').subscribe(
      res => {
        this.eventTypeSelect = res.data;
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

  findOneAttendee(attendeeNo) {
    AttendeesService.findOne(attendeeNo).subscribe(res => {
      this.attendeesDto = res.data;
    });
  }

  updateAttendee(attendeeNo) {
    AttendeesService.update(attendeeNo, this.attendeesDto).subscribe(res => {
      toast.success('참석자 수정 완료');
      this.findOne(this.$route.params.id);
    });
  }

  deleteOne() {
    PresentationEventService.deleteForAdmin(this.$route.params.id).subscribe(
      res => {
        toast.success('설명회 삭제했습니다');
        this.$router.push('/presentation-event');
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
        toast.success('수정완료');
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
    this.getCommonCodes();
    this.getGender();
  }
}
</script>
