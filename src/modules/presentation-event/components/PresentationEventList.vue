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
        >
          <b-card
            :img-src="[
              event.image && event.image.length > 0
                ? event.image[0].endpoint
                : require('@/assets/images/general/common/img_placeholder.jpg'),
            ]"
            img-alt="Image"
            img-top
            @click="findOne(event.no)"
          >
            <b-card-title>
              <b-badge
                :variant="[
                  event.eventTypeInfo.key === 'DELIVERY_EVENT'
                    ? 'primary'
                    : 'orange',
                ]"
                v-if="event.eventTypeInfo"
              >
                {{ event.eventTypeInfo.value }}
              </b-badge>
              <h5>{{ event.title }}</h5>
            </b-card-title>
            <b-card-text>
              <p>{{ event.desc }}</p>
              <div class="mt-2">
                <p>
                  {{ event.presentationDate | dateTransformer }}
                </p>
                <p>
                  <span
                    class="badge badge-time"
                    v-for="(time, index) in event.schedule"
                    :key="index"
                  >
                    {{ time }}
                  </span>
                </p>
              </div>
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
            <b-col cols="12" class="mb-3">
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
            <b-col cols="12" class="mb-3">
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
            </b-col>
            <b-col cols="12" class="mb-3">
              <label for="">이미지 (모바일)</label>
              <b-form-file
                placeholder="파일 첨부"
                ref="fileInputMobile"
                @input="uploadMobileImage($event)"
              ></b-form-file>
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
  private eventTypeSelect: CodeManagementDto[] = [];
  private scheduleList = ['11시 오전', '2시 오후'];

  // 이미지 업로드
  async uploadMainImage(file: File[]) {
    const attachments = await FileUploadService.upload(
      UPLOAD_TYPE.PRESENTATION_EVENT,
      file,
    );
    this.attachments = [];
    this.attachments.push(
      ...attachments.filter(
        fileUpload =>
          fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
      ),
    );
  }

  async uploadMobileImage(file: File[]) {
    const attachments = await FileUploadService.upload(
      UPLOAD_TYPE.PRESENTATION_EVENT,
      file,
    );
    this.mobileAttachments = [];
    this.mobileAttachments.push(
      ...attachments.filter(
        fileUpload =>
          fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
      ),
    );
  }

  getCommonCodes() {
    CodeManagementService.findAnyCode('PRESENTATION_EVENT_TYPE').subscribe(
      res => {
        this.eventTypeSelect = res.data;
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
    }
    if (this.mobileAttachments) {
      this.presentationEventCreateDto.image = this.mobileAttachments;
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