<template>
  <section>
    <SectionTitle title="설명회 등록" divider></SectionTitle>
  </section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import PresentationEventService from '@/services/presentation-event.service';
import FileUploadService, {
  UPLOAD_TYPE,
} from '@/services/shared/file-upload/file-upload.service';
import { PresentationEventDto } from '@/dto';
import {
  ATTACHMENT_REASON_TYPE,
  FileAttachmentDto,
} from '@/services/shared/file-upload';

@Component({
  name: 'PresentationEventList',
})
export default class PresentationEventList extends BaseComponent {
  private presentationEventCreateDto = new PresentationEventDto();
  private attachments: FileAttachmentDto[] = [];
  private mobileAttachments: FileAttachmentDto[] = [];

  // 이미지 업로드
  async uploadMainImage(file: File[]) {
    const attachments = await FileUploadService.upload(
      UPLOAD_TYPE.DELIVERY_SPACE,
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
      UPLOAD_TYPE.DELIVERY_SPACE,
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
}
</script>
