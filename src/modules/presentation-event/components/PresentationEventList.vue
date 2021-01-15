<template>
  <section>
    <SectionTitle title="창업 설명회 관리" divider></SectionTitle>
    <div v-if="!dataLoading">
      <div class="table-top">
        <div class="total-count">
          <h5>
            <span>TOTAL</span>
            <strong class="text-primary">{{
              presentationEventTotalCount
            }}</strong>
          </h5>
        </div>
        <div>
          <b-button variant="primary" v-b-modal.add_event>
            이벤트 추가
          </b-button>
        </div>
      </div>
      <b-row>
        <b-col
          cols="12"
          md="6"
          lg="4"
          xl="3"
          v-for="event in presentationEventList"
          :key="event.no"
          class="my-3"
        >
          <b-card
            :img-src="
              event.image && event.mobileImage.length > 0
                ? event.mobileImage[0].endpoint
                : require('@/assets/images/general/common/img_placeholder.jpg')
            "
            img-alt="Image"
            img-top
            @click="findOne(event.no)"
          >
            <b-card-title>
              <b-badge
                variant="warning"
                v-if="event.displayType === 'ONLINE'"
                class="mr-1"
              >
                <b-icon icon="wifi"></b-icon>
                {{ event.displayType }}
              </b-badge>
              <b-badge
                :variant="
                  event.eventTypeInfo.key === 'DELIVERY_EVENT'
                    ? 'primary'
                    : 'orange'
                "
                v-if="event.eventTypeInfo"
              >
                {{ event.eventTypeInfo.value }}
              </b-badge>
              <div class="mt-1">
                <h5>{{ event.title }}</h5>
              </div>
            </b-card-title>
            <b-card-text>
              <p v-if="event.desc">{{ event.desc }}</p>
              <template v-if="event.displayType !== 'ONLINE'">
                <div class="pt-2 mt-2 border-top">
                  <p class="mt-1">
                    {{ event.presentationDate | dateTransformer }}
                  </p>
                  <p class="mt-1">
                    <span
                      class="badge badge-time"
                      v-for="(time, index) in event.schedule"
                      :key="index"
                    >
                      {{ time }}
                    </span>
                  </p>
                </div>
              </template>
            </b-card-text>
            <template #footer v-if="event.posteventDesc">
              {{ event.posteventDesc }}
            </template>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <div class="half-circle-spinner mt-5" v-if="dataLoading">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
    <b-modal
      id="add_event"
      size="xl"
      title="이벤트 추가"
      ok-title="추가"
      cancel-title="취소"
      @ok="createEvent()"
      @cancel="clearOutCreateDto()"
    >
      <b-form-row>
        <b-col cols="12" lg="8">
          <b-form-row>
            <b-col cols="6" class="mb-3">
              <label for="display_type">설명회 타입</label>
              <b-form-select
                id="event_type"
                v-model="presentationEventCreateDto.displayType"
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
                v-model="presentationEventCreateDto.eventType"
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
              <b-form-input
                v-model="presentationEventCreateDto.title"
              ></b-form-input>
            </b-col>
            <b-col cols="12" class="mb-3">
              <label for="">설명글</label>
              <b-form-textarea
                rows="3"
                max-rows="6"
                v-model="presentationEventCreateDto.desc"
              ></b-form-textarea>
            </b-col>
            <template
              v-if="presentationEventCreateDto.displayType === 'ONLINE'"
            >
              <b-col cols="6" class="mb-3">
                <label for="zoom_id">ZOOM ID</label>
                <b-form-input
                  v-model="presentationEventCreateDto.zoomId"
                ></b-form-input>
              </b-col>
              <b-col cols="6" class="mb-3">
                <label for="zoom_id">ZOOM PASSWORD</label>
                <b-form-input
                  v-model="presentationEventCreateDto.zoomPassword"
                ></b-form-input>
              </b-col>
              <b-col cols="12" class="mb-3">
                <label for="zoom_link">ZOOM URL</label>
                <b-form-input
                  id="zoom_link"
                  v-model="presentationEventCreateDto.zoomLink"
                ></b-form-input>
              </b-col>
            </template>
            <template v-else>
              <b-col cols="12" md="6" class="mb-3">
                <div>
                  <label for="ended">설명회 날짜</label>
                  <b-form-datepicker
                    id="started"
                    v-model="presentationEventCreateDto.presentationDate"
                  ></b-form-datepicker>
                </div>
              </b-col>
              <b-col cols="12" md="6" class="mb-3">
                <label for="">설명회 시간</label>
                <b-form-checkbox-group
                  v-model="presentationEventCreateDto.schedule"
                >
                  <b-form-checkbox
                    v-for="(time, index) in scheduleList"
                    :key="index"
                    :value="time"
                    >{{ time }}</b-form-checkbox
                  >
                </b-form-checkbox-group>
              </b-col>
              <b-col cols="12" class="mb-3">
                <label for="">설명회 장소</label>
                <b-form-input
                  v-model="presentationEventCreateDto.address"
                ></b-form-input>
              </b-col>
            </template>
            <b-col cols="6" class="mb-3">
              <label for="button_desc">버튼 이름</label>
              <b-form-input
                id="button_desc"
                v-model="presentationEventCreateDto.buttonDesc"
              ></b-form-input>
            </b-col>
            <b-col cols="6" class="mb-3">
              <label for="">문의 연락처</label>
              <b-form-input
                v-model="presentationEventCreateDto.contactPhone"
              ></b-form-input>
            </b-col>
          </b-form-row>
        </b-col>
        <b-col cols="12" lg="4">
          <b-form-row>
            <b-col cols="12" class="mb-3">
              <label for="">이미지</label>
              <b-form-file
                placeholder="파일 첨부"
                ref="fileInput"
                @input="uploadMainImage($event)"
              ></b-form-file>
              <template
                v-if="attachments && attachments.length > 0 && imageChanged"
              >
                <div class="mt-2">
                  <b-img-lazy
                    :src="attachment.endpoint"
                    v-for="attachment in attachments"
                    :key="attachment.endpoint"
                  />
                  <div class="text-center mt-2">
                    <b-button variant="danger" @click="removeImage()"
                      >이미지 제거</b-button
                    >
                  </div>
                </div>
              </template>
            </b-col>
            <b-col cols="12" class="mb-3">
              <label for="">이미지 (모바일)</label>
              <b-form-file
                placeholder="파일 첨부"
                ref="fileInputMobile"
                @input="uploadMobileImage($event)"
              ></b-form-file>
              <template
                v-if="
                  mobileAttachments &&
                    mobileAttachments.length > 0 &&
                    mobieImageChanged
                "
              >
                <div class="mt-2">
                  <b-img-lazy
                    :src="attachment.endpoint"
                    v-for="attachment in mobileAttachments"
                    :key="attachment.endpoint"
                  />
                  <div class="text-center mt-2">
                    <b-button variant="danger" @click="removeMobileImage()"
                      >이미지 제거</b-button
                    >
                  </div>
                </div>
              </template>
            </b-col>
          </b-form-row>
        </b-col>
      </b-form-row>
    </b-modal>
  </section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import CodeManagementService from '../../../services/code-management.service';
import PresentationEventService from '@/services/presentation-event.service';
import { PresentationEventDto, PresentationEventListDto } from '@/dto';
import FileUploadService, {
  UPLOAD_TYPE,
} from '@/services/shared/file-upload/file-upload.service';
import {
  ATTACHMENT_REASON_TYPE,
  FileAttachmentDto,
} from '@/services/shared/file-upload';
import { Pagination } from '@/common';
import { CodeManagementDto } from '@/services/init/dto';
import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'PresentationEventList',
})
export default class PresentationEventList extends BaseComponent {
  private presentationEventList: PresentationEventDto[] = [];
  private presentationEventTotalCount = null;
  private presentationEventSearchDto = new PresentationEventListDto();
  private presentationEventCreateDto = new PresentationEventDto();
  private attachments: FileAttachmentDto[] = [];
  private mobileAttachments: FileAttachmentDto[] = [];
  private dataLoading = false;
  private pagination = new Pagination();
  private displayTypeSelect: CodeManagementDto[] = [];
  private eventTypeSelect: CodeManagementDto[] = [];
  private scheduleList = ['11시 오전', '2시 오후'];
  private imageChanged = false;
  private mobieImageChanged = false;

  // 이미지 업로드
  async uploadMainImage(file: File) {
    const attachments = await FileUploadService.upload(
      UPLOAD_TYPE.PRESENTATION_EVENT,
      [file],
    );
    this.attachments = [];
    this.attachments.push(
      ...attachments.filter(
        fileUpload =>
          fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
      ),
    );
    this.imageChanged = true;
  }

  removeImage() {
    this.attachments = [];
    this.$refs['fileInput'].reset();
    this.imageChanged = false;
  }

  async uploadMobileImage(file: File) {
    const attachments = await FileUploadService.upload(
      UPLOAD_TYPE.PRESENTATION_EVENT,
      [file],
    );
    this.mobileAttachments = [];
    this.mobileAttachments.push(
      ...attachments.filter(
        fileUpload =>
          fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
      ),
    );
    this.mobieImageChanged = true;
  }

  removeMobileImage() {
    this.mobileAttachments = [];
    this.$refs['fileInputMobile'].reset();
    this.mobieImageChanged = false;
  }

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
    this.$router.push(`/presentation-event/${id}`);
  }

  search() {
    this.dataLoading = true;
    PresentationEventService.findAll(
      this.presentationEventSearchDto,
      this.pagination,
    ).subscribe(res => {
      if (res) {
        this.dataLoading = false;
        this.presentationEventList = res.data.items;
        this.presentationEventTotalCount = res.data.totalCount;
      }
    });
  }

  clearOutCreateDto() {
    this.presentationEventCreateDto = new PresentationEventDto();
  }

  createEvent() {
    if (this.attachments) {
      this.presentationEventCreateDto.image = this.attachments;
    } else {
      delete this.presentationEventCreateDto.image;
    }
    if (this.mobileAttachments) {
      this.presentationEventCreateDto.mobileImage = this.mobileAttachments;
    } else {
      delete this.presentationEventCreateDto.mobileImage;
    }
    PresentationEventService.create(this.presentationEventCreateDto).subscribe(
      res => {
        if (res) {
          toast.success('추가완료');
          this.search();
        }
      },
    );
  }

  created() {
    this.search();
    this.getCommonCodes();
  }
}
</script>
<style lang="scss">
.badge-orange {
  background-color: #ff7a00;
  color: #fff;
}
.badge-time {
  border: 1px solid #dcdcdc;
  border-radius: 0;
  + .badge-time {
    margin-left: 4px;
  }
}
</style>
